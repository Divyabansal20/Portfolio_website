document.addEventListener("DOMContentLoaded", () => {

    // --- THEME TOGGLE ---
    const themeToggleBtn = document.getElementById('theme-toggle');
    if (themeToggleBtn) {
        const themeIcon = themeToggleBtn.querySelector('i');
        themeToggleBtn.addEventListener('click', () => {
            document.body.classList.toggle('light-theme');
            if (document.body.classList.contains('light-theme')) {
                themeIcon.classList.remove('fa-sun');
                themeIcon.classList.add('fa-moon');
            } else {
                themeIcon.classList.remove('fa-moon');
                themeIcon.classList.add('fa-sun');
            }
        });
    }

    // --- STORY TIMELINE ---
    const nodes = document.querySelectorAll('.timeline-node');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateX(0)';
            }
        });
    }, { threshold: 0.5 });

    nodes.forEach((node, index) => {
        node.style.opacity = 0;
        node.style.transform = 'translateX(-20px)';
        node.style.transitionDelay = `${index * 0.15}s`;
        observer.observe(node);
    });

    // --- PIPELINE ANIMATION PARTICLES ---
    const flowsGroup = document.querySelector('.pipeline-svg .particles');

    function createParticle() {
        if (!flowsGroup) return;

        // Define paths roughly based on the flows
        const paths = [
            { startX: 110, startY: 50, endX: 140, endY: 50 },
            { startX: 250, startY: 50, endX: 280, endY: 50 },
            { startX: 360, startY: 50, endX: 415, endY: 50 },
            { startX: 475, startY: 50, endX: 520, endY: 50 },
            { startX: 630, startY: 50, endX: 660, endY: 50 }
        ];

        let path = paths[Math.floor(Math.random() * paths.length)];

        let particle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        particle.setAttribute("r", 2);
        particle.setAttribute("class", "particle");
        particle.setAttribute("cx", path.startX);
        particle.setAttribute("cy", path.startY);

        flowsGroup.appendChild(particle);

        let startTime = performance.now();
        let duration = 800 + Math.random() * 400; // ms

        function animateMap(time) {
            let elapsed = time - startTime;
            let progress = elapsed / duration;

            if (progress > 1) {
                if (flowsGroup.contains(particle)) {
                    flowsGroup.removeChild(particle);
                }
                return;
            }

            let currentX = path.startX + (path.endX - path.startX) * progress;
            let currentY = path.startY + (path.endY - path.startY) * progress;

            particle.setAttribute("cx", currentX);
            particle.setAttribute("cy", currentY);

            requestAnimationFrame(animateMap);
        }

        requestAnimationFrame(animateMap);
    }

    setInterval(createParticle, 400);

    // --- CONTACT FORM SUBMISSION ---
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = document.getElementById('sender-name').value;
            const email = document.getElementById('sender-email').value;
            const message = document.getElementById('sender-message').value;
            
            const subject = encodeURIComponent(`New Inquiry from ${name}`);
            const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
            
            window.location.href = `mailto:bansaldivya20082005@gmail.com?subject=${subject}&body=${body}`;
            
            // Optionally, reset form after generating the link
            // contactForm.reset();
        });
    }

});
