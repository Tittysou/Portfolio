require('dotenv').config();
const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(__dirname));

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

app.listen(PORT, () => {
    console.log(`Server running on localhost:${PORT}`);
});
