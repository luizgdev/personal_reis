(function () {
    var canvas = document.createElement('canvas');
    canvas.id = 'snow-canvas';
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '9999';
    document.body.appendChild(canvas);

    var ctx = canvas.getContext('2d');
    var width = window.innerWidth;
    var height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    var particles = [];
    var particleCount = 100;

    function initParticles() {
        particles = [];
        for (var i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * width,
                y: Math.random() * height,
                r: Math.random() * 3 + 1,
                d: Math.random() * particleCount,
                vx: Math.random() * 2 - 1, // wind
                vy: Math.random() * 2 + 1 // falling speed
            });
        }
    }

    function draw() {
        ctx.clearRect(0, 0, width, height);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.beginPath();
        for (var i = 0; i < particleCount; i++) {
            var p = particles[i];
            ctx.moveTo(p.x, p.y);
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2, true);
        }
        ctx.fill();
        update();
        requestAnimationFrame(draw);
    }

    function update() {
        for (var i = 0; i < particleCount; i++) {
            var p = particles[i];
            p.y += p.vy;
            p.x += p.vx;

            if (p.y > height) {
                particles[i] = {
                    x: Math.random() * width,
                    y: -10,
                    r: p.r,
                    d: p.d,
                    vx: p.vx,
                    vy: p.vy
                };
            }
            if (p.x > width + 5 || p.x < -5) {
                if (Math.random() > 0.5) {
                    particles[i].x = -5;
                } else {
                    particles[i].x = width + 5;
                }
            }
        }
    }

    window.addEventListener('resize', function () {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
        initParticles();
    });

    initParticles();
    draw();
})();
