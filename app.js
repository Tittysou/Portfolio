require('dotenv').config();
const express = require('express');
const axios = require('axios');
const path = require('path');
const nodemailer = require('nodemailer');
const rateLimit = require('express-rate-limit');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(__dirname));
app.use(express.json());

const GITHUB_API = 'https://api.github.com';
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_USERNAME = process.env.GITHUB_USERNAME;

const github = axios.create({
    baseURL: GITHUB_API,
    headers: {
        'Authorization': `Bearer ${GITHUB_TOKEN}`,
        'Accept': 'application/vnd.github.v3+json'
    }
});

async function getRepoTraffic(repoName) {
    try {
        const [views, clones] = await Promise.all([
            github.get(`/repos/${GITHUB_USERNAME}/${repoName}/traffic/views`),
            github.get(`/repos/${GITHUB_USERNAME}/${repoName}/traffic/clones`)
        ]);

        return {
            views: views.data.count || 0,
            clones: clones.data.count || 0
        };
    } catch (error) {
        console.error(`Error fetching traffic for ${repoName}:`, error.message);
        return { views: 0, clones: 0 };
    }
}

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/api/repos', async (req, res) => {
    try {
        const { data: repos } = await github.get(`/users/${GITHUB_USERNAME}/repos`, {
            params: { sort: 'updated', per_page: 9 }
        });

        const reposWithTraffic = await Promise.all(
            repos.map(async repo => {
                const traffic = await getRepoTraffic(repo.name);

                return {
                    name: repo.name,
                    description: repo.description,
                    url: repo.html_url,
                    language: repo.language,
                    updatedAt: new Date(repo.updated_at).toLocaleDateString(),
                    stars: repo.stargazers_count,
                    forks: repo.forks_count,
                    views: traffic.views,
                    clones: traffic.clones
                };
            })
        );

        res.json(reposWithTraffic);
    } catch (error) {
        console.error('Error fetching repositories:', error.message);
        res.status(500).json({ error: 'Failed to fetch repository data' });
    }
});

const contactLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 3
});

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

app.post('/api/contact', contactLimiter, async (req, res) => {
    try {
        const { name, email, message } = req.body;

        if (!name || !email || !message) {
            return res.status(400).json({ 
                error: 'All fields are required' 
            });
        }

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.RECIPIENT_EMAIL,
            subject: `Portfolio Contact from ${name}`,
            text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
            html: `
                <!DOCTYPE html>
                <html>
                <head>
                    <meta charset="UTF-8">
                    <style>
                        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap');
                        
                        * {
                            margin: 0;
                            padding: 0;
                            box-sizing: border-box;
                        }

                        body {
                            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                            line-height: 1.6;
                            color: #1a1a1a;
                            background: #f5f5f5;
                            padding: 30px;
                        }

                        .container {
                            max-width: 600px;
                            margin: 0 auto;
                            background: #ffffff;
                            border-radius: 16px;
                            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
                            overflow: hidden;
                        }

                        .header {
                            background: linear-gradient(to right, #1a1a1a, #2a2a2a);
                            padding: 30px;
                            color: white;
                        }

                        .header h1 {
                            font-size: 24px;
                            font-weight: 600;
                            margin: 0;
                        }

                        .content {
                            padding: 30px;
                        }

                        .field {
                            margin-bottom: 24px;
                        }

                        .field:last-child {
                            margin-bottom: 0;
                        }

                        .label {
                            font-size: 12px;
                            text-transform: uppercase;
                            letter-spacing: 0.05em;
                            color: #666;
                            margin-bottom: 8px;
                        }

                        .value {
                            font-size: 16px;
                            color: #1a1a1a;
                            padding: 12px;
                            background: #f8f8f8;
                            border-radius: 8px;
                        }

                        .message {
                            white-space: pre-wrap;
                        }

                        .footer {
                            background: #f8f8f8;
                            padding: 20px 30px;
                            font-size: 14px;
                            color: #666;
                            text-align: center;
                            border-top: 1px solid #eee;
                        }

                        .highlight {
                            color: #2563eb;
                        }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <div class="header">
                            <h1>New Contact Form Submission</h1>
                        </div>
                        <div class="content">
                            <div class="field">
                                <div class="label">From</div>
                                <div class="value">${name}</div>
                            </div>
                            <div class="field">
                                <div class="label">Email</div>
                                <div class="value">${email}</div>
                            </div>
                            <div class="field">
                                <div class="label">Message</div>
                                <div class="value message">${message}</div>
                            </div>
                        </div>
                        <div class="footer">
                            Received from <span class="highlight">titsou.js</span> portfolio contact form
                        </div>
                    </div>
                </body>
                </html>
            `
        };

        try {
            await transporter.sendMail(mailOptions);
            res.json({ success: true });
        } catch (emailError) {
            console.error('Email sending error:', emailError);
            res.status(500).json({ 
                error: 'Failed to send email. Please try again later.' 
            });
        }

    } catch (error) {
        console.error('Contact form error:', error);
        res.status(500).json({ 
            error: 'An unexpected error occurred. Please try again later.' 
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on localhost:${PORT}`);
});
