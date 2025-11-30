document.addEventListener("DOMContentLoaded", function() {
    // Add navbar HTML
    // Note: ElginParkOrcaImage is wrapped in an <a> tag pointing to index.html
    document.body.insertAdjacentHTML("afterbegin", `
        <ul class="l1">
            <a href="index.html"><img src="./elgin_logo.png" id="ElginParkOrcaImage" alt="Elgin Park Orca Logo"></a>
            <button class="nav-toggle" aria-expanded="false" aria-label="Toggle navigation">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">
                    <path d="M4 5h16"></path>
                    <path d="M4 12h16"></path>
                    <path d="M4 19h16"></path>
                </svg>
            </button>
            <div class="NavItem">
                <li><button data-page="index.html" onclick="location.href='index.html'">Home</button></li>
                <li><button data-page="calendar.html" onclick="location.href='calendar.html'">Calendar</button></li>
                <li class="dropdown">
                    <button class="dropbtn1">Departments</button>
                    <div class="dropdown-content">
                        <a class="dropbtn2" data-page="business.html" href="business.html">Business Education</a>
                        <a class="dropbtn2" data-page="computers.html" href="computers.html">Computer Education</a>
                        <a class="dropbtn2" data-page="careers.html" href="careers.html">Career Education</a>
                        <a class="dropbtn2" data-page="ell.html" href="ell.html">English Language Learning</a>
                        <a class="dropbtn2" data-page="fine_arts.html" href="fine_arts.html">Fine Arts</a>
                        <a class="dropbtn2" data-page="home_ec.html" href="home_ec.html">Home Economics</a>
                        <a class="dropbtn2" data-page="language_arts.html" href="language_arts.html">Language Arts</a>
                        <a class="dropbtn2" data-page="languages.html" href="languages.html">Languages</a>
                        <a class="dropbtn2" data-page="mathematics.html" href="mathematics.html">Mathematics</a>
                        <a class="dropbtn2" data-page="physical_ed.html" href="physical_ed.html">Physical Education</a>
                        <a class="dropbtn2" data-page="science.html" href="science.html">Sciences</a>
                        <a class="dropbtn2" data-page="social_studies.html" href="social_studies.html">Social Studies</a>
                        <a class="dropbtn2" data-page="tech_ed.html" href="tech_ed.html">Technology Education</a>
                    </div>
                </li>
                <li class="dropdown">
                    <button class="dropbtn1">Specialized Programs</button>
                    <div class="dropdown-content">
                        <a class="dropbtn2" data-page="advanced_placement.html" href="advanced_placement.html">Advanced Placement</a>
                        <a class="dropbtn2" data-page="leadership.html" href="leadership.html">Leadership</a>
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
    if (!navbar) return;
    const navToggle = navbar.querySelector('.nav-toggle');
    const mobileMediaQuery = window.matchMedia('(max-width: 900px)');
    let lastScroll = 0;

    const dropdowns = Array.from(navbar.querySelectorAll('.dropdown'));

    function closeDropdowns() {
        dropdowns.forEach(dropdown => dropdown.classList.remove('open'));
    }

    function closeMobileMenu() {
        navbar.classList.remove('nav-open');
        if (navToggle) navToggle.setAttribute('aria-expanded', 'false');
        closeDropdowns();
    }

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
        if (navbar.classList.contains('nav-open')) return;
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

    if (navToggle) {
        navToggle.addEventListener('click', () => {
            const isOpen = navbar.classList.toggle('nav-open');
            navToggle.setAttribute('aria-expanded', isOpen);
            if (!isOpen) closeDropdowns();
            else navbar.classList.remove('nav-hidden');
        });
    }

    const dropdownButtons = navbar.querySelectorAll('.dropbtn1');
    dropdownButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            if (!mobileMediaQuery.matches) return;
            event.preventDefault();
            const dropdown = button.closest('.dropdown');
            if (!dropdown) return;

            const willOpen = !dropdown.classList.contains('open');
            closeDropdowns();
            if (willOpen) dropdown.classList.add('open');
        });
    });

    navButtons.forEach(element => {
        element.addEventListener('click', () => {
            if (mobileMediaQuery.matches) closeMobileMenu();
        });
    });

    document.addEventListener('click', (event) => {
        if (!mobileMediaQuery.matches) return;
        if (!navbar.classList.contains('nav-open')) return;
        if (navbar.contains(event.target)) return;
        closeMobileMenu();
    });

    const handleMobileChange = (event) => {
        if (!event.matches) {
            closeMobileMenu();
        }
    };

    if (mobileMediaQuery.addEventListener) {
        mobileMediaQuery.addEventListener('change', handleMobileChange);
    } else if (mobileMediaQuery.addListener) {
        mobileMediaQuery.addListener(handleMobileChange);
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
