<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Modern Portfolio</title>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js"></script>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        html {
            scroll-behavior: smooth;
        }

        body {
            background-color: #000;
        }

        .modern-button {
            background: rgba(255, 255, 255, 0.05);
            border: 1px solid rgba(255, 255, 255, 0.1);
            transition: all 0.3s ease;
        }

        .modern-button:hover {
            background: rgba(255, 255, 255, 0.1);
            transform: translateY(-2px);
        }

        .github-card {
            background: rgba(255, 255, 255, 0.02);
            border: 1px solid rgba(255, 255, 255, 0.1);
            transition: all 0.3s ease;
        }

        .loading {
            animation: pulse 1.5s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        .commit-info {
            background: rgba(255, 255, 255, 0.03);
            border-top: 1px solid rgba(255, 255, 255, 0.1);
            margin-top: 1rem;
            padding-top: 1rem;
        }
        
        .repo-stats {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
        }

        .updated-at {
            font-size: 0.875rem;
            color: rgba(255, 255, 255, 0.5);
        }

        @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: .5; }
        }

        .repo-slider {
            position: relative;
            padding: 0 48px;
        }

        .repo-container {
            overflow: hidden;
        }

        .repo-track {
            display: flex;
            transition: transform 0.5s ease;
            gap: 24px;
        }

        .repo-card {
            flex: 0 0 calc(33.333% - 16px);
            min-width: calc(33.333% - 16px);
        }

        .slider-button {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            width: 40px;
            height: 40px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.1);
            border: 1px solid rgba(255, 255, 255, 0.2);
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: all 0.3s ease;
            z-index: 10;
        }

        .slider-button:hover {
            background: rgba(255, 255, 255, 0.2);
        }

        .slider-button:disabled {
            opacity: 0.3;
            cursor: not-allowed;
        }

        .slider-button.prev {
            left: 0;
        }

        .slider-button.next {
            right: 0;
        }

        @media (max-width: 1024px) {
            .repo-card {
                flex: 0 0 calc(50% - 12px);
                min-width: calc(50% - 12px);
            }
        }

        @media (max-width: 640px) {
            .repo-card {
                flex: 0 0 100%;
                min-width: 100%;
            }
        }
    </style>
</head>
<body class="text-white">
    <nav class="fixed w-full bg-black/90 backdrop-blur-sm z-50 border-b border-white/10">
        <div class="container mx-auto px-6 py-4">
            <div class="flex items-center justify-between">
                <a href="#top" class="text-2xl font-bold">Portfolio.</a>
                <div class="hidden md:flex space-x-8">
                    <a href="#work" class="hover:text-gray-300 transition-colors">Work</a>
                    <a href="#about" class="hover:text-gray-300 transition-colors">About</a>
                    <a href="#contact" class="hover:text-gray-300 transition-colors">Contact</a>
                </div>
                <a href="#contact" class="modern-button px-6 py-2 rounded-lg text-sm font-medium">
                    Contact
                </a>
            </div>
        </div>
    </nav>

    <section id="top" class="min-h-screen flex items-center justify-center pt-20">
        <div class="container mx-auto px-6 py-24">
            <div class="text-center" data-scroll>
                <h1 class="text-5xl md:text-7xl font-bold mb-8">Building Digital <br/>Experiences</h1>
                <p class="text-gray-400 text-xl mb-12 max-w-2xl mx-auto">
                    Full-stack developer crafting modern web applications with a focus on user experience and performance.
                </p>
                <div class="flex justify-center gap-6">
                    <a href="#work" class="modern-button px-8 py-3 rounded-lg text-sm font-medium">
                        View Projects
                    </a>
                    <a href="#about" class="modern-button px-8 py-3 rounded-lg text-sm font-medium">
                        About Me
                    </a>
                </div>
            </div>
        </div>
    </section>

    <section id="work" class="py-24">
        <div class="container mx-auto px-6">
            <h2 class="text-4xl font-bold mb-6">Recent Work</h2>
            <p class="text-gray-400 mb-16 text-lg">Explore my latest GitHub projects and contributions.</p>
            
            <div class="repo-slider">
                <button class="slider-button prev" disabled>←</button>
                <button class="slider-button next">→</button>
                
                <div class="repo-container">
                    <div id="github-projects" class="repo-track">
                        <div class="repo-card github-card p-6 rounded-xl loading">
                            <div class="h-8 bg-white/10 rounded mb-4"></div>
                            <div class="h-4 bg-white/10 rounded w-3/4 mb-4"></div>
                            <div class="h-4 bg-white/10 rounded w-1/2 mb-4"></div>
                            <div class="h-20 bg-white/10 rounded"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section id="about" class="py-24 bg-white/5">
        <div class="container mx-auto px-6">
            <div class="max-w-3xl mx-auto text-center">
                <h2 class="text-4xl font-bold mb-8">About Me</h2>
                <p class="text-gray-400 text-lg mb-12">
                    Passionate developer with 5+ years of experience in building scalable web applications. 
                    Specializing in modern JavaScript frameworks and cloud architecture.
                </p>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div class="github-card p-6 rounded-lg">
                        <h3 class="text-3xl font-bold mb-2">50+</h3>
                        <p class="text-gray-400">Projects Completed</p>
                    </div>
                    <div class="github-card p-6 rounded-lg">
                        <h3 class="text-3xl font-bold mb-2">5+</h3>
                        <p class="text-gray-400">Years Experience</p>
                    </div>
                    <div class="github-card p-6 rounded-lg">
                        <h3 class="text-3xl font-bold mb-2">100%</h3>
                        <p class="text-gray-400">Client Satisfaction</p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <div id="alert" class="alert fixed top-4 right-4 p-4 rounded-lg z-50 max-w-sm"></div>

    <section id="contact" class="py-24">
        <div class="container mx-auto px-6">
            <div class="max-w-4xl mx-auto text-center">
                <h2 class="text-4xl font-bold mb-8">Let's Work Together</h2>
                <p class="text-gray-400 mb-12">Have a project in mind? Let's create something amazing.</p>
                <form id="contact-form" class="space-y-6 max-w-xl mx-auto">
                    <input type="text" name="name" placeholder="Your Name" required
                           class="w-full px-6 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-white/30">
                    <input type="email" name="email" placeholder="Your Email" required
                           class="w-full px-6 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-white/30">
                    <textarea name="message" placeholder="Your Message" rows="4" required
                              class="w-full px-6 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-white/30"></textarea>
                    <button type="submit" class="modern-button w-full py-3 rounded-lg text-sm font-medium">
                        Send Message
                    </button>
                </form>
            </div>
        </div>
    </section>

    <script>
        document.addEventListener('DOMContentLoaded', () => {
            gsap.registerPlugin(ScrollTrigger);

            const animateElements = document.querySelectorAll('[data-scroll]');
            animateElements.forEach(element => {
                gsap.from(element, {
                    scrollTrigger: {
                        trigger: element,
                        start: "top 80%",
                        once: true
                    },
                    opacity: 0,
                    y: 50,
                    duration: 1,
                    ease: "power2.out"
                });
            });

            async function fetchGitHubRepos() {
                try {
                    const response = await fetch('/api/repos');
                    if (!response.ok) throw new Error("Failed to fetch repos");
                    
                    const repos = await response.json();
                    const projectsContainer = document.getElementById("github-projects");
                    projectsContainer.innerHTML = "";
            
                    repos.forEach(repo => {
                        const projectElement = document.createElement("div");
                        projectElement.className = "repo-card github-card p-6 rounded-xl";
            
                        projectElement.innerHTML = `
                            <div class="flex justify-between items-start mb-4">
                                <div>
                                    <h3 class="text-xl font-bold mb-1">
                                        <a href="${repo.url}" target="_blank" class="hover:text-gray-300 transition-colors">
                                            ${repo.name}
                                        </a>
                                    </h3>
                                    <p class="text-gray-400 text-sm">Updated ${repo.updatedAt}</p>
                                </div>
                                ${repo.language ? `
                                    <span class="px-3 py-1 text-xs font-medium rounded-full bg-white/5 border border-white/10">
                                        ${repo.language}
                                    </span>
                                ` : ''}
                            </div>
                            <p class="text-gray-400 mb-6 text-sm">
                                ${repo.description || "No description available."}
                            </p>
                            <div class="flex flex-wrap gap-6">
                                <div class="flex items-center space-x-2">
                                    <span class="text-sm text-gray-400">⭐</span>
                                    <span class="font-medium">${repo.stars}</span>
                                </div>
                                <div class="flex items-center space-x-2">
                                    <span class="text-sm text-gray-400">🍴</span>
                                    <span class="font-medium">${repo.forks}</span>
                                </div>
                                <div class="flex items-center space-x-2">
                                    <span class="text-sm text-gray-400">👁️</span>
                                    <span class="font-medium">${repo.views} views</span>
                                </div>
                                <div class="flex items-center space-x-2">
                                    <span class="text-sm text-gray-400">📥</span>
                                    <span class="font-medium">${repo.clones} clones</span>
                                </div>
                            </div>
                        `;
            
                        projectsContainer.appendChild(projectElement);
                    });
            
                    initializeSlider();
            
                } catch (error) {
                    console.error(error);
                    const projectsContainer = document.getElementById("github-projects");
                    projectsContainer.innerHTML = `
                        <div class="col-span-full text-center p-8">
                            <p class="text-gray-400">Unable to load GitHub projects. Please try again later.</p>
                        </div>
                    `;
                }
            }

            function getTimeAgo(date) {
                const seconds = Math.floor((new Date() - date) / 1000);
                
                let interval = seconds / 31536000;
                if (interval > 1) return Math.floor(interval) + " years ago";
                
                interval = seconds / 2592000;
                if (interval > 1) return Math.floor(interval) + " months ago";
                
                interval = seconds / 86400;
                if (interval > 1) return Math.floor(interval) + " days ago";
                
                interval = seconds / 3600;
                if (interval > 1) return Math.floor(interval) + " hours ago";
                
                interval = seconds / 60;
                if (interval > 1) return Math.floor(interval) + " minutes ago";
                
                return Math.floor(seconds) + " seconds ago";
            }

            function initializeSlider() {
                const track = document.getElementById('github-projects');
                const cards = track.getElementsByClassName('repo-card');
                const prevButton = document.querySelector('.slider-button.prev');
                const nextButton = document.querySelector('.slider-button.next');
                
                let currentIndex = 0;
                const cardsPerView = window.innerWidth >= 1024 ? 3 : window.innerWidth >= 640 ? 2 : 1;
                const maxIndex = Math.max(0, cards.length - cardsPerView);

                function updateSliderPosition() {
                    const cardWidth = cards[0].offsetWidth + 24;
                    track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
                    
                    prevButton.disabled = currentIndex === 0;
                    nextButton.disabled = currentIndex >= maxIndex;
                }

                prevButton.addEventListener('click', () => {
                    if (currentIndex > 0) {
                        currentIndex--;
                        updateSliderPosition();
                    }
                });

                nextButton.addEventListener('click', () => {
                    if (currentIndex < maxIndex) {
                        currentIndex++;
                        updateSliderPosition();
                    }
                });

                updateSliderPosition();

                window.addEventListener('resize', () => {
                    currentIndex = 0;
                    updateSliderPosition();
                });
            }

            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                    e.preventDefault();
                    const target = document.querySelector(this.getAttribute('href'));
                    if (target) {
                        const headerOffset = 80;
                        const elementPosition = target.getBoundingClientRect().top;
                        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                        window.scrollTo({
                            top: offsetPosition,
                            behavior: 'smooth'
                        });
                    }
                });
            });

            const form = document.getElementById('contact-form');
            form.addEventListener('submit', async (e) => {
                e.preventDefault();
                const button = form.querySelector('button');
                button.disabled = true;
                button.textContent = 'Sending...';

                await new Promise(resolve => setTimeout(resolve, 1000));
                
                button.textContent = 'Message Sent!';
                form.reset();
                
                setTimeout(() => {
                    button.disabled = false;
                    button.textContent = 'Send Message';
                }, 2000);
            });

            fetchGitHubRepos();
        });
    </script>
</body>
</html>