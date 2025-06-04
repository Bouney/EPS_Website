document.addEventListener("DOMContentLoaded", function() {
    // Add navbar HTML
    // Note: ElginParkOrcaImage is wrapped in an <a> tag pointing to home.html
    document.body.insertAdjacentHTML("afterbegin", `
        <ul class="l1">
            <a href="home.html"><img src="./elgin_logo.png" id="ElginParkOrcaImage" alt="Elgin Park Orca Logo"></a>
            <div class="NavItem">
                <li><button data-page="home.html" onclick="location.href='home.html'">Home</button></li>
                <li><button data-page="cal.html" onclick="location.href='cal.html'">Calendar</button></li>
                <li class="dropdown">
                    <button class="dropbtn1">Departments</button>
                    <div class="dropdown-content">
                        <a class="dropbtn2" href="business.html">Business Education</a>
                        <a class="dropbtn2" href="careers.html">Career Education</a>
                        <a class="dropbtn2" href="ell.html">English Language Learning</a>
                        <a class="dropbtn2" href="fine_arts.html">Fine Arts</a>
                        <a class="dropbtn2" href="home_ec.html">Home Economics</a>
                        <a class="dropbtn2" href="language_arts.html">Language Arts</a>
                        <a class="dropbtn2" href="languages.html">Languages</a>
                        <a class="dropbtn2" href="mathematics.html">Mathematics</a>
                        <a class="dropbtn2" href="physical_ed.html">Physical Education</a>
                        <a class="dropbtn2" href="science.html">Sciences</a>
                        <a class="dropbtn2" href="social_studies.html">Social Studies</a>
                        <a class="dropbtn2" href="tech_ed.html">Technology Education</a>
                    </div>
                </li>
                <li class="dropdown">
                    <button class="dropbtn1">Specialized Programs</button>
                    <div class="dropdown-content">
                        <a class="dropbtn2" href="advanced_placement.html">Advanced Placement</a>
                        <a class="dropbtn2" href="leadership.html">Leadership</a>
                    </div>
                </li>
                <li><button data-page="forms.html" onclick="location.href='forms.html'">Forms</button></li>
                <li><button data-page="HybridLearning.html" onclick="location.href='HybridLearning.html'">Hybrid Learning</button></li>
                <li><button data-page="contact.html" onclick="location.href='contact.html'">Contact</button></li>
            </div>
        </ul>
    `);

    // Get navbar element
    const navbar = document.querySelector('.l1');
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

    // Active link highlighting
    const currentPage = window.location.pathname.split("/").pop(); // Get the current page file name
    if (navbar) { // Check if navbar exists
        const navButtons = navbar.querySelectorAll('.NavItem button[data-page], .NavItem a[data-page]');
        navButtons.forEach(button => {
            if (button.getAttribute('data-page') === currentPage) {
                button.classList.add('active-link');
            }
        });
        // Special case for home page if URL is just '/' or 'index.html'
        if (currentPage === '' || currentPage === 'index.html') {
            const homeButton = navbar.querySelector('.NavItem button[data-page="home.html"]');
            if (homeButton) homeButton.classList.add('active-link');
        }
    }

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