document.addEventListener("DOMContentLoaded", function() {
    // Add navbar HTML
    // Note: ElginParkOrcaImage is wrapped in an <a> tag pointing to index.html
    document.body.insertAdjacentHTML("afterbegin", `
        <ul class="l1">
            <a href="/"><img src="/resources/img/logos/logo.png" id="ElginParkOrcaImage" alt="Elgin Park Orca Logo"></a>
            <div class="NavItem">
                <li><a data-page="" href="/" class="top-level">Home</a></li><!-- data-page is empty string for home -->
                <li><a data-page="cal" href="/cal" class="top-level">Calendar</a></li>
                <li class="dropdown">
                    <button class="dropbtn1 top-level">Departments</button>
                    <div class="dropdown-content">
                        <a class="dropbtn2" data-page="business" href="/business">Business Education</a>
                        <a class="dropbtn2" data-page="computers" href="/computers">Computer Education</a>
                        <a class="dropbtn2" data-page="careers" href="/careers">Career Education</a>
                        <a class="dropbtn2" data-page="ell" href="/ell">English Language Learning</a>
                        <a class="dropbtn2" data-page="fine_arts" href="/fine_arts">Fine Arts</a>
                        <a class="dropbtn2" data-page="home_ec" href="/home_ec">Home Economics</a>
                        <a class="dropbtn2" data-page="language_arts" href="/language_arts">Language Arts</a>
                        <a class="dropbtn2" data-page="languages" href="/languages">Languages</a>
                        <a class="dropbtn2" data-page="mathematics" href="/mathematics">Mathematics</a>
                        <a class="dropbtn2" data-page="physical_ed" href="/physical_ed">Physical Education</a>
                        <a class="dropbtn2" data-page="science" href="/science">Sciences</a>
                        <a class="dropbtn2" data-page="social_studies" href="/social_studies">Social Studies</a>
                        <a class="dropbtn2" data-page="tech_ed" href="/tech_ed">Technology Education</a>
                    </div>
                </li>
                <li class="dropdown">
                    <button class="dropbtn1 top-level">Specialized Programs</button>
                    <div class="dropdown-content">
                        <a class="dropbtn2" data-page="advanced_placement" href="/advanced_placement">Advanced Placement</a>
                        <a class="dropbtn2" data-page="leadership" href="/leadership">Leadership</a>
                    </div>
                </li>
                <li><a data-page="forms" href="/forms" class="top-level">Forms</a></li>
                <li><a data-page="HybridLearning" href="/HybridLearning" class="top-level">Hybrid Learning</a></li>
                <li><a data-page="contact" href="/contact" class="top-level">Contact</a></li>
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