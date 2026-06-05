document.addEventListener('DOMContentLoaded', () => {
    // Nav Visibility
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

    // Work Experience Disclosures
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

    // Project Accordions
    const projects = document.querySelectorAll('.project');
    projects.forEach(project => {
        const head = project.querySelector('.project__head');
        const body = project.querySelector('.project__body');
        const toggle = project.querySelector('.project__toggle');
        
        if (!head || !body || !toggle) return;

        head.addEventListener('click', () => {
            const isExpanded = head.getAttribute('aria-expanded') === 'true';
            
            // Close others (optional, but good for UX)
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

        // Keyboard support
        head.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                head.click();
            }
        });
    });

    // Ambient Music
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
                // Autoplay blocked
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

    // Try to play on any user interaction
    ['click', 'keydown', 'touchstart', 'scroll'].forEach(evt => {
        window.addEventListener(evt, () => {
            if (!hasAttemptedAutoplay) tryPlay();
        }, { once: true });
    });


    // Beat Glyph Effect
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

    // Wrap chars in spans
    beatElements.forEach(el => {
        const textNode = Array.from(el.childNodes).find(n => n.nodeType === Node.TEXT_NODE);
        if (!textNode) return;
        
        const text = textNode.textContent;
        const fragment = document.createDocumentFragment();
        
        for (let i = 0; i < text.length; i++) {
            const char = text[i];
            const span = document.createElement('span');
            // Only add class if it's a target char (case-insensitive)
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
        // Reset all
        activeSpans.forEach(span => {
            span.textContent = span.dataset.orig;
            span.classList.remove('beat-active');
        });

        // 2nd beat of 4-beat cycle (so beatCount % 4 === 1)
        if (beatCount % 4 === 1) {
            // Pick a few random elements
            const count = Math.floor(Math.random() * 2) + 3; // 3 or 4
            for (let i = 0; i < count; i++) {
                const randomSpan = activeSpans[Math.floor(Math.random() * activeSpans.length)];
                if (!randomSpan) continue;
                const orig = randomSpan.dataset.orig.toUpperCase();
                const variants = glyphMap[orig];
                if (variants) {
                    const variant = variants[Math.floor(Math.random() * variants.length)];
                    // Preserve original casing visually if possible, but the variants are distinct
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

    // --- Breakout Game Logic ---
    const canvas = document.getElementById('gameCanvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        const gameScoreEl = document.getElementById('gameScore');
        const finalScoreEl = document.getElementById('finalScore');
        const modal = document.getElementById('gameModal');
        const modalTitle = document.getElementById('gameModalTitle');
        const playerNameInput = document.getElementById('playerName');
        const saveScoreBtn = document.getElementById('saveScoreBtn');
        const highScoreList = document.getElementById('highScoreList');

        let animationId;
        let isPlaying = false;
        let score = 0;

        // Physics variables
        let ballRadius = 6;
        let x = canvas.width / 2;
        let y = canvas.height - 30;
        let dx = 4;
        let dy = -4;

        let paddleHeight = 10;
        let paddleWidth = 80;
        let paddleX = (canvas.width - paddleWidth) / 2;

        let rightPressed = false;
        let leftPressed = false;

        let brickRowCount = 5;
        let brickColumnCount = 9;
        let brickWidth = 55;
        let brickHeight = 15;
        let brickPadding = 8;
        let brickOffsetTop = 40;
        let brickOffsetLeft = 20;

        let bricks = [];

        function initBricks() {
            bricks = [];
            for(let c=0; c<brickColumnCount; c++) {
                bricks[c] = [];
                for(let r=0; r<brickRowCount; r++) {
                    bricks[c][r] = { x: 0, y: 0, status: 1 };
                }
            }
        }

        // Input Listeners
        document.addEventListener("keydown", keyDownHandler, false);
        document.addEventListener("keyup", keyUpHandler, false);
        canvas.addEventListener("mousemove", mouseMoveHandler, false);
        canvas.addEventListener("touchmove", touchMoveHandler, {passive: true});

        function keyDownHandler(e) {
            if(e.key === "Right" || e.key === "ArrowRight") rightPressed = true;
            else if(e.key === "Left" || e.key === "ArrowLeft") leftPressed = true;
        }

        function keyUpHandler(e) {
            if(e.key === "Right" || e.key === "ArrowRight") rightPressed = false;
            else if(e.key === "Left" || e.key === "ArrowLeft") leftPressed = false;
        }

        function mouseMoveHandler(e) {
            const relativeX = e.clientX - canvas.getBoundingClientRect().left;
            if(relativeX > 0 && relativeX < canvas.width) {
                paddleX = relativeX - paddleWidth/2;
            }
        }

        function touchMoveHandler(e) {
            if(e.touches && e.touches[0]) {
                const relativeX = e.touches[0].clientX - canvas.getBoundingClientRect().left;
                if(relativeX > 0 && relativeX < canvas.width) {
                    paddleX = relativeX - paddleWidth/2;
                }
            }
        }

        function collisionDetection() {
            for(let c=0; c<brickColumnCount; c++) {
                for(let r=0; r<brickRowCount; r++) {
                    let b = bricks[c][r];
                    if(b.status === 1) {
                        if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) {
                            dy = -dy;
                            b.status = 0;
                            score += 10;
                            gameScoreEl.textContent = score.toString().padStart(4, '0');
                            if(score === brickRowCount * brickColumnCount * 10) {
                                gameOver(true);
                            }
                        }
                    }
                }
            }
        }

        function drawBall() {
            ctx.beginPath();
            ctx.rect(x - ballRadius, y - ballRadius, ballRadius * 2, ballRadius * 2);
            ctx.fillStyle = "#fff";
            ctx.fill();
            ctx.closePath();
        }

        function drawPaddle() {
            ctx.beginPath();
            ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
            ctx.fillStyle = "#fff";
            ctx.fill();
            ctx.closePath();
        }

        function drawBricks() {
            for(let c=0; c<brickColumnCount; c++) {
                for(let r=0; r<brickRowCount; r++) {
                    if(bricks[c][r].status === 1) {
                        let brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
                        let brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
                        bricks[c][r].x = brickX;
                        bricks[c][r].y = brickY;
                        ctx.beginPath();
                        ctx.rect(brickX, brickY, brickWidth, brickHeight);
                        ctx.fillStyle = "#745d44"; // Accent color
                        ctx.fill();
                        ctx.closePath();
                    }
                }
            }
        }

        function draw() {
            if(!isPlaying) return;
            
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            drawBricks();
            drawBall();
            drawPaddle();
            collisionDetection();

            if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) dx = -dx;
            if(y + dy < ballRadius) {
                dy = -dy;
            } else if(y + dy > canvas.height-ballRadius) {
                if(x > paddleX && x < paddleX + paddleWidth) {
                    dy = -dy;
                    // Add slight angle based on hit position
                    dx = 8 * ((x-(paddleX+paddleWidth/2))/paddleWidth);
                } else {
                    gameOver(false);
                    return;
                }
            }

            if(rightPressed && paddleX < canvas.width-paddleWidth) paddleX += 7;
            else if(leftPressed && paddleX > 0) paddleX -= 7;

            x += dx;
            y += dy;
            animationId = requestAnimationFrame(draw);
        }

        function startGame() {
            initBricks();
            score = 0;
            gameScoreEl.textContent = '0000';
            x = canvas.width / 2;
            y = canvas.height - 30;
            dx = 4;
            dy = -4;
            paddleX = (canvas.width - paddleWidth) / 2;
            isPlaying = true;
            modal.classList.add('hidden');
            draw();
        }

        function gameOver(win) {
            isPlaying = false;
            cancelAnimationFrame(animationId);
            modalTitle.textContent = win ? "SYSTEM SECURED" : "SYSTEM FAILED";
            finalScoreEl.textContent = score;
            modal.classList.remove('hidden');
            loadHighScores();
        }

        // High Score System
        function loadHighScores() {
            let scores = JSON.parse(localStorage.getItem('sys_highscores') || '[]');
            highScoreList.innerHTML = '';
            if (scores.length === 0) {
                highScoreList.innerHTML = '<li>NO RECORDS FOUND</li>';
                return;
            }
            scores.slice(0, 5).forEach(s => {
                let li = document.createElement('li');
                li.textContent = `${s.name.padEnd(12, '.')} ${s.score.toString().padStart(4, '0')}`;
                highScoreList.appendChild(li);
            });
        }

        saveScoreBtn.addEventListener('click', () => {
            if(score > 0 || localStorage.getItem('sys_highscores') === null) {
                let name = playerNameInput.value.trim().toUpperCase() || 'ANONYMOUS';
                let scores = JSON.parse(localStorage.getItem('sys_highscores') || '[]');
                scores.push({name, score});
                scores.sort((a,b) => b.score - a.score);
                localStorage.setItem('sys_highscores', JSON.stringify(scores));
                playerNameInput.value = '';
            }
            startGame();
        });

        // Initialize display
        loadHighScores();
    }
});
