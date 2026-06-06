document.addEventListener('DOMContentLoaded', () => {
    const gameSection = document.querySelector('.game-section') || document.getElementById('game');
    if (gameSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    document.body.classList.add('dark-mode');
                } else {
                    document.body.classList.remove('dark-mode');
                }
            });
        }, { threshold: 0.3 }); // Trigger when 30% of the game is visible
        observer.observe(gameSection);
    }
    const nav = document.querySelector('.pill-nav');
    if (nav) {
        window.addEventListener('scroll', () => {
            const currentScroll = window.scrollY;
            if (currentScroll > 80) {
                nav.classList.remove('hidden');
            } else if (currentScroll < 30) {
                nav.classList.add('hidden');
            }
        });
    }
    const workItems = document.querySelectorAll('.work__item');
    workItems.forEach(item => {
        const btn = item.querySelector('.disclose');
        const details = item.querySelector('.work__details');
        const text = item.querySelector('.disclose-text');
        if (!btn || !details || !text) return;
        btn.addEventListener('click', () => {
            const isExpanded = btn.getAttribute('aria-expanded') === 'true';
            btn.setAttribute('aria-expanded', !isExpanded);
            details.style.display = isExpanded ? 'none' : 'block';
            text.textContent = isExpanded ? 'More' : 'Less';
        });
    });
    const projects = document.querySelectorAll('.project');
    projects.forEach(project => {
        const head = project.querySelector('.project__head');
        const body = project.querySelector('.project__body');
        const toggle = project.querySelector('.project__toggle');
        if (!head || !body || !toggle) return;
        head.addEventListener('click', () => {
            const isExpanded = head.getAttribute('aria-expanded') === 'true';
            projects.forEach(p => {
                if (p !== project) {
                    p.querySelector('.project__head').setAttribute('aria-expanded', 'false');
                    p.querySelector('.project__body').style.maxHeight = '0';
                    p.querySelector('.project__toggle').textContent = '+';
                }
            });
            head.setAttribute('aria-expanded', !isExpanded);
            if (isExpanded) {
                body.style.maxHeight = '0';
                toggle.textContent = '+';
            } else {
                body.style.maxHeight = body.scrollHeight + 'px';
                toggle.textContent = '−';
            }
        });
        head.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                head.click();
            }
        });
    });
    const audio = document.getElementById('ambient-audio');
    const toggleBtn = document.getElementById('music-toggle');
    const hint = document.getElementById('music-hint');
    if (!audio || !toggleBtn || !hint) return;
    const iconMuted = toggleBtn.querySelector('.icon-muted');
    const iconPlaying = toggleBtn.querySelector('.icon-playing');
    if (!iconMuted || !iconPlaying) return;
    let hasAttemptedAutoplay = false;
    audio.volume = 0.35;
    const updateAudioIcon = () => {
        if (audio.paused) {
            iconMuted.classList.remove('hidden');
            iconPlaying.classList.add('hidden');
            toggleBtn.classList.remove('playing');
        } else {
            iconMuted.classList.add('hidden');
            iconPlaying.classList.remove('hidden');
            toggleBtn.classList.add('playing');
            hint.classList.add('hidden'); // hide hint when playing
        }
    };
    const tryPlay = () => {
        if (!hasAttemptedAutoplay && audio.paused) {
            hasAttemptedAutoplay = true;
            audio.play().then(() => {
                updateAudioIcon();
            }).catch(() => {
                hint.classList.remove('hidden');
                setTimeout(() => {
                    hint.classList.add('hidden');
                }, 5000);
            });
        }
    };
    toggleBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (audio.paused) {
            audio.play().then(updateAudioIcon).catch(console.error);
        } else {
            audio.pause();
            updateAudioIcon();
        }
    });
    ['click', 'keydown', 'touchstart', 'scroll'].forEach(evt => {
        window.addEventListener(evt, () => {
            if (!hasAttemptedAutoplay) tryPlay();
        }, { once: true });
    });
    const glyphMap = {
        'R': ['ℝ', '₹', 'Я', 'Ʀ'],
        'A': ['∀', '@', 'Δ', 'Λ'],
        'H': ['#', 'Ħ', '⊢', 'Ḣ'],
        'U': ['µ', '∪', 'Ǔ', 'Ü'],
        'L': ['|', '£', '∟', 'Ł'],
        'J': ['ʝ', 'Ɉ', 'Ĵ'],
        'O': ['0', 'Ø', '⊙', '°'],
        'S': ['$', '§', '∫', 'Š'],
        'E': ['3', '€', '∈', 'Ξ'],
        'P': ['₱', 'ρ', 'Π', 'Ƥ'],
        'T': ['⊤', '†', '+', 'Ť'],
        'M': ['₥', 'Σ', 'ʍ', 'Ṁ']
      };
    const beatElements = document.querySelectorAll('[data-beat-glyph]');
    const BPM = 480;
    const beatInterval = 60000 / BPM; // 125ms per beat
    beatElements.forEach(el => {
        const textNode = Array.from(el.childNodes).find(n => n.nodeType === Node.TEXT_NODE);
        if (!textNode) return;
        const text = textNode.textContent;
        const fragment = document.createDocumentFragment();
        for (let i = 0; i < text.length; i++) {
            const char = text[i];
            const span = document.createElement('span');
            if (glyphMap[char.toUpperCase()]) {
                span.className = 'ch';
                span.dataset.orig = char;
            } else {
                span.className = 'ch static';
            }
            span.textContent = char;
            fragment.appendChild(span);
        }
        el.replaceChild(fragment, textNode);
    });
    const activeSpans = Array.from(document.querySelectorAll('.ch:not(.static)'));
    let lastBeatTime = 0;
    let beatCount = 0;
    function doSwap() {
        activeSpans.forEach(span => {
            span.textContent = span.dataset.orig;
            span.classList.remove('beat-active');
        });
        if (beatCount % 4 === 1) {
            const count = Math.floor(Math.random() * 2) + 3; // 3 or 4
            for (let i = 0; i < count; i++) {
                const randomSpan = activeSpans[Math.floor(Math.random() * activeSpans.length)];
                if (!randomSpan) continue;
                const orig = randomSpan.dataset.orig.toUpperCase();
                const variants = glyphMap[orig];
                if (variants) {
                    const variant = variants[Math.floor(Math.random() * variants.length)];
                    randomSpan.textContent = variant;
                    randomSpan.classList.add('beat-active');
                }
            }
        }
    }
    function loop(time) {
        const clock = audio && !audio.paused ? audio.currentTime * 1000 : time;
        if (clock - lastBeatTime >= beatInterval) {
            lastBeatTime = clock;
            beatCount++;
            doSwap();
        }
        requestAnimationFrame(loop);
    }
    requestAnimationFrame(loop);
    const canvas = document.getElementById('gameCanvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        const modal = document.getElementById('gameModal');
        const modalTitle = document.getElementById('gameModalTitle');
        const finalScoreEl = document.getElementById('finalScore');
        const finalScoreDisplay = document.getElementById('gameFinalScoreDisplay');
        const playerNameInput = document.getElementById('playerName');
        const saveScoreBtn = document.getElementById('saveScoreBtn');
        const highScoreList = document.getElementById('highScoreList');
        let animationId;
        let isPlaying = false;
        let requestsProcessed = 0;
        let threatsBlocked = 0;
        let health = 8;
        let uptimeStr = "99.9%";
        let gatewayX = canvas.width / 2;
        const gatewayWidth = 220; // Larger component
        const gatewayHeight = 40;
        const gatewayY = canvas.height - 45;
        let rightPressed = false;
        let leftPressed = false;
        let spacePressed = false;
        let lastFireTime = 0;
        let projectiles = [];
        let packets = [];
        let gameStartTime = 0;
        let waveCount = 0;
        let spawnMultiplier = 1;
        let alertText = "";
        let alertEndTime = 0;
        const goodTypes = ['GET /health', 'POST /chat', 'PUT /profile', 'GET /users', 'GET /config'];
        const badTypes = ['DDOS', 'PROMPT_INJECTION', 'SQL_INJECTION', 'TOKEN_FLOOD', 'BGP_HIJACK'];
        document.addEventListener("keydown", (e) => {
            if(e.key === "Right" || e.key === "ArrowRight") rightPressed = true;
            else if(e.key === "Left" || e.key === "ArrowLeft") leftPressed = true;
            else if(e.key === " " || e.key === "Spacebar") {
                spacePressed = true;
                if(isPlaying) e.preventDefault(); // prevent scrolling
            }
        });
        document.addEventListener("keyup", (e) => {
            if(e.key === "Right" || e.key === "ArrowRight") rightPressed = false;
            else if(e.key === "Left" || e.key === "ArrowLeft") leftPressed = false;
            else if(e.key === " " || e.key === "Spacebar") spacePressed = false;
        });
        function spawnPacket() {
            const chance = 0.015 * spawnMultiplier;
            if(Math.random() < chance) {
                const threatDensity = Math.min(0.3 + (waveCount * 0.05), 0.8);
                const isBad = Math.random() < threatDensity;
                const textArray = isBad ? badTypes : goodTypes;
                const text = textArray[Math.floor(Math.random() * textArray.length)];
                ctx.font = "14px 'Departure Mono', monospace";
                const textWidth = ctx.measureText(text).width;
                const width = isBad ? textWidth + 30 : textWidth + 16; 
                packets.push({
                    x: Math.random() * (canvas.width - width - 20) + 10,
                    y: -40,
                    text: text,
                    isBad: isBad,
                    width: width,
                    height: 24,
                    speed: (Math.random() * 1.5 + 1) * (1 + waveCount*0.1)
                });
            }
        }
        function triggerWaveAlert() {
            const incidents = ['DDOS ATTACK', 'TOKEN FLOOD', 'PROMPT INJECTION CAMPAIGN', 'SQL MAP SCAN'];
            const incident = incidents[Math.floor(Math.random() * incidents.length)];
            alertText = `[ INCIDENT DETECTED: ${incident} ]`;
            alertEndTime = Date.now() + 3000;
        }
        function drawGateway(ctx, x, y, width, textColor) {
            ctx.textAlign = "center";
            ctx.fillStyle = textColor;
            ctx.font = "16px 'Departure Mono', monospace";
            ctx.fillText("════════════════════════════", x, y);
            ctx.fillText("║     API GATEWAY      ║", x, y + 20);
            ctx.fillText("════════════════════════════", x, y + 40);
        }
        function drawPacket(ctx, pkt, textColor) {
            ctx.textAlign = "center";
            ctx.font = "14px 'Departure Mono', monospace";
            if(pkt.isBad) {
                ctx.fillStyle = textColor; // Invert? Maybe just keep standard mono
                ctx.fillText(`< ${pkt.text} >`, pkt.x + pkt.width/2, pkt.y + 16);
            } else {
                ctx.fillStyle = textColor;
                ctx.fillText(`[ ${pkt.text} ]`, pkt.x + pkt.width/2, pkt.y + 16);
            }
        }
        function drawProjectile(ctx, p, textColor) {
            ctx.fillStyle = textColor;
            ctx.textAlign = "center";
            ctx.font = "14px 'Departure Mono', monospace";
            ctx.fillText("▲ 429", p.x, p.y);
        }
        function draw() {
            if(!isPlaying) return;
            const now = Date.now();
            if (now - gameStartTime > (waveCount + 1) * 10000) {
                waveCount++;
                spawnMultiplier += 0.5;
                triggerWaveAlert();
            }
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            const textColor = getComputedStyle(canvas).color || '#1c1914';
            if(now < alertEndTime) {
                if (Math.floor(now / 200) % 2 === 0) {
                    ctx.fillStyle = textColor;
                    ctx.textAlign = "center";
                    ctx.font = "bold 16px 'Departure Mono', monospace";
                    ctx.fillText(alertText, canvas.width/2, canvas.height/2);
                }
            }
            ctx.fillStyle = textColor;
            ctx.font = "12px 'Departure Mono', monospace";
            ctx.textAlign = "left";
            let dynamicLatency = Math.floor(Math.random() * 5 + 15 + waveCount * 2);
            ctx.fillText(`REQUESTS PROCESSED: ${requestsProcessed.toString().padStart(4, '0')}`, 10, 20);
            ctx.fillText(`THREATS BLOCKED: ${threatsBlocked.toString().padStart(4, '0')}`, 10, 40);
            ctx.fillText(`LATENCY: ${dynamicLatency}ms`, canvas.width - 150, 20);
            ctx.fillText(`UPTIME: ${uptimeStr}`, canvas.width - 150, 40);
            ctx.fillText(`GATEWAY HEALTH: ${'█'.repeat(health)}`, canvas.width/2 - 70, 20);
            if(rightPressed && gatewayX < canvas.width - gatewayWidth/2 + 20) gatewayX += 5 + (waveCount * 0.2);
            if(leftPressed && gatewayX > gatewayWidth/2 - 20) gatewayX -= 5 + (waveCount * 0.2);
            if(spacePressed && now - lastFireTime > 250) {
                projectiles.push({ x: gatewayX, y: gatewayY - 5 });
                lastFireTime = now;
            }
            drawGateway(ctx, gatewayX, gatewayY, gatewayWidth, textColor);
            for(let i = projectiles.length - 1; i >= 0; i--) {
                let p = projectiles[i];
                p.y -= 7;
                drawProjectile(ctx, p, textColor);
                if(p.y < 0) projectiles.splice(i, 1);
            }
            spawnPacket();
            for(let i = packets.length - 1; i >= 0; i--) {
                let pkt = packets[i];
                pkt.y += pkt.speed;
                drawPacket(ctx, pkt, textColor);
                if(pkt.y + pkt.height > gatewayY && pkt.y < gatewayY + gatewayHeight) {
                    if(pkt.x + pkt.width > gatewayX - gatewayWidth/2 && pkt.x < gatewayX + gatewayWidth/2) {
                        if(pkt.isBad) {
                            health--;
                            if (health <= 3) uptimeStr = "98.1%";
                        } else {
                            requestsProcessed++;
                        }
                        packets.splice(i, 1);
                        continue;
                    }
                }
                if(pkt.y > canvas.height) {
                    if(pkt.isBad) health--;
                    packets.splice(i, 1);
                    continue;
                }
                let hit = false;
                for(let j = projectiles.length - 1; j >= 0; j--) {
                    let p = projectiles[j];
                    if(p.x > pkt.x && p.x < pkt.x + pkt.width && p.y < pkt.y + pkt.height && p.y > pkt.y) {
                        if(pkt.isBad) {
                            threatsBlocked++;
                            hit = true;
                            projectiles.splice(j, 1);
                            break;
                        }
                    }
                }
                if(hit) {
                    packets.splice(i, 1);
                }
            }
            if(health <= 0) {
                gameOver();
                return;
            }
            animationId = requestAnimationFrame(draw);
        }
        function startGame() {
            let name = playerNameInput.value.trim().toUpperCase();
            if (!name) name = 'ANONYMOUS';
            playerNameInput.dataset.currentName = name;
            requestsProcessed = 0;
            threatsBlocked = 0;
            health = 8;
            uptimeStr = "99.9%";
            gatewayX = canvas.width / 2;
            projectiles = [];
            packets = [];
            waveCount = 0;
            spawnMultiplier = 1;
            gameStartTime = Date.now();
            alertText = "";
            alertEndTime = 0;
            isPlaying = true;
            modal.classList.add('hidden');
            finalScoreDisplay.style.display = 'none';
            draw();
        }
        function gameOver() {
            isPlaying = false;
            cancelAnimationFrame(animationId);
            let name = playerNameInput.dataset.currentName || 'ANONYMOUS';
            let scores = JSON.parse(localStorage.getItem('sys_noc_scores') || '[]');
            scores.push({name, score: requestsProcessed});
            scores.sort((a,b) => b.score - a.score);
            localStorage.setItem('sys_noc_scores', JSON.stringify(scores));
            modalTitle.textContent = "NOC TERMINAL";
            finalScoreEl.textContent = requestsProcessed;
            finalScoreDisplay.style.display = 'block';
            modal.classList.remove('hidden');
            loadHighScores();
        }
        function loadHighScores() {
            let scores = JSON.parse(localStorage.getItem('sys_noc_scores') || '[]');
            highScoreList.innerHTML = '';
            if (scores.length === 0) {
                highScoreList.innerHTML = '<li>NO RECORDS FOUND</li>';
                return;
            }
            scores.slice(0, 5).forEach((s, idx) => {
                let li = document.createElement('li');
                li.textContent = `${(idx+1).toString() + "."} ${s.name.padEnd(10, ' ')} ${s.score.toString().padStart(4, ' ')}`;
                highScoreList.appendChild(li);
            });
        }
        saveScoreBtn.addEventListener('click', () => {
            if (playerNameInput.value.trim().length === 0 && localStorage.getItem('sys_noc_scores') === null) {
                 playerNameInput.focus();
                 return;
            }
            startGame();
        });
        loadHighScores();
    }
});