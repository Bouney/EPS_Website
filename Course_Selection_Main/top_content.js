document.addEventListener("DOMContentLoaded", function() {
    // Add navbar HTML
    // Note: ElginParkOrcaImage is wrapped in an <a> tag pointing to index.html
    document.body.insertAdjacentHTML("afterbegin", `
        <ul class="l1">
            <a href="/"><img src="./elgin_logo.png" id="ElginParkOrcaImage" alt="Elgin Park Orca Logo"></a>
            <div class="NavItem">
                <li><button data-page="/" onclick="location.href='index.html'">Home</button></li>
                <li><button data-page="cal" onclick="location.href='cal.html'">Calendar</button></li>
                <li class="dropdown">
                    <button class="dropbtn1">Departments</button>
                    <div class="dropdown-content">
                        <a class="dropbtn2" data-page="business" href="business.html">Business Education</a>
                        <a class="dropbtn2" data-page="computers" href="computers.html">Computer Education</a>
                        <a class="dropbtn2" data-page="careers" href="careers.html">Career Education</a>
                        <a class="dropbtn2" data-page="ell" href="ell.html">English Language Learning</a>
                        <a class="dropbtn2" data-page="fine_arts" href="fine_arts.html">Fine Arts</a>
                        <a class="dropbtn2" data-page="home_ec" href="home_ec.html">Home Economics</a>
                        <a class="dropbtn2" data-page="language_arts" href="language_arts.html">Language Arts</a>
                        <a class="dropbtn2" data-page="languages" href="languages.html">Languages</a>
                        <a class="dropbtn2" data-page="mathematics" href="mathematics.html">Mathematics</a>
                        <a class="dropbtn2" data-page="physical_ed" href="physical_ed.html">Physical Education</a>
                        <a class="dropbtn2" data-page="science" href="science.html">Sciences</a>
                        <a class="dropbtn2" data-page="social_studies" href="social_studies.html">Social Studies</a>
                        <a class="dropbtn2" data-page="tech_ed" href="tech_ed.html">Technology Education</a>
                    </div>
                </li>
                <li class="dropdown">
                    <button class="dropbtn1">Specialized Programs</button>
                    <div class="dropdown-content">
                        <a class="dropbtn2" data-page="advanced_placement" href="advanced_placement.html">Advanced Placement</a>
                        <a class="dropbtn2" data-page="leadership" href="leadership.html">Leadership</a>
                    </div>
                </li>
                <li><button data-page="forms" onclick="location.href='forms.html'">Forms</button></li>
                <li><button data-page="HybridLearning" onclick="location.href='HybridLearning.html'">Hybrid Learning</button></li>
                <li><button data-page="contact" onclick="location.href='contact.html'">Contact</button></li>
            </div>
        </ul>
    `);

    // Get navbar element
    const navbar = document.querySelector('.l1');
    if (!navbar) return;
    let lastScroll = 0;

    // Debounce function
    function debounce(func, wait = 20) { // Reduced wait time for responsiveness
        let timeout;
        return function(...args) {
            const context = this;
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(context, args), wait);
        };
    }

    // Scroll handler
    function handleScroll() {
        const currentScroll = window.pageYOffset;

        if (navbar) { // Check if navbar exists
            // Scrolling down and past navbar height - hide navbar
            if (currentScroll > lastScroll && currentScroll > navbar.offsetHeight) {
                navbar.classList.add('nav-hidden');
            }
            // Scrolling up - show navbar
            else if (currentScroll < lastScroll) {
                navbar.classList.remove('nav-hidden');
            }
        }
        lastScroll = currentScroll <= 0 ? 0 : currentScroll; // For Mobile or negative scrolling
    }

    // Add passive scroll event listener
    const debouncedScroll = debounce(handleScroll);
    window.addEventListener('scroll', debouncedScroll, { passive: true });

    const currentPage = window.location.pathname.split("/").pop();
    const navButtons = navbar.querySelectorAll('[data-page]');

    navButtons.forEach(element => {
        if (element.getAttribute('data-page') === currentPage) {
            element.classList.add('active-link');

            // Highlight the parent dropdown button too
            const dropdown = element.closest('.dropdown');
            if (dropdown) {
                const parentButton = dropdown.querySelector('.dropbtn1');
                if (parentButton) parentButton.classList.add('active-link');
            }
        }
    });


    // Dropdown hover/focus is handled by CSS, JS for this is removed to simplify.
    // Memory optimization for dropdowns is less critical if relying on CSS :hover.
    // Cleanup on visibility change can still be useful for scroll listener.
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            window.removeEventListener('scroll', debouncedScroll);
        } else {
            window.addEventListener('scroll', debouncedScroll, { passive: true });
        }
    });
});