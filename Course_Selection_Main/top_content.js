document.addEventListener("DOMContentLoaded", function() {
    // Add navbar HTML
    document.body.insertAdjacentHTML("afterbegin", `
        <ul class="l1">
            <a href="home.html"><img src="./elgin_logo.png" id="ElginParkOrcaImage"></a>
            <div class="NavItem">
                <li><button onclick="location.href='home.html'">Home</button></li>
                <li><button onclick="location.href='cal.html'">Calendar</button></li>
                <li class="dropdown">
                    <button class="dropbtn1">Departments</button>
                    <div class="dropdown-content">
                        <a class="dropbtn2" href="business.html">Business Education</a>
                        <a class="dropbtn2" href="careers.html">Career Education</a>
                        <a class="dropbtn2" href="ell.html">English Language Learning</a>
                        <a class="dropbtn2" href="fine_arts.html">Fine Arts</a>
                        <a class="dropbtn2" href="home_ec.html">Home Economics</a>
                        <a class="dropbtn2" href="english.html">Language Arts</a>
                        <a class="dropbtn2" href="language_arts.html">Languages</a>
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
                <li> <button onclick="location.href='forms.html'">Forms</button></li>
                <li><button onclick="location.href='HybridLearning.html'">Hybrid Learning</button></li>
                <li> <button onclick="location.href='contact.html'">Contact</button></li>
            </div>
        </ul>
    `);

    // Get navbar element
    const navbar = document.querySelector('.l1');
    let lastScroll = 0;

    // Debounce functions
    function debounce(func, wait = 40) {
        let timeout;
        return function() {
            const context = this;
            const args = arguments;
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                func.apply(context, args);
            }, wait);
        };
    }

    // Scroll handler
    function handleScroll() {
        const currentScroll = window.pageYOffset;

        // Scrolling down - hide navbar
        if (currentScroll > lastScroll && currentScroll > 60) {
            navbar.classList.add('nav-hidden');
        }
        // Scrolling up - show navbar
        else if (currentScroll < lastScroll) {
            navbar.classList.remove('nav-hidden');
        }

        lastScroll = currentScroll;
    }


    //!Memory optimization stuff idk I chatgpt this shit
    // Cache DOM references
    const dropdowns = document.querySelectorAll('.dropdown');
    const dropdownContents = document.querySelectorAll('.dropdown-content');

    // Add passive scroll event listener
    const debouncedScroll = debounce(handleScroll);
    window.addEventListener('scroll', debouncedScroll, { passive: true });

    // Cleanup when page is hidden
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            window.removeEventListener('scroll', debouncedScroll);
            dropdowns.forEach(dropdown => {
                dropdown.removeEventListener('mouseenter', showDropdown);
                dropdown.removeEventListener('mouseleave', hideDropdown);
            });
        } else {
            window.addEventListener('scroll', debouncedScroll, { passive: true });
            // Reattach dropdown events if needed
        }
    });

    // Debounce dropdown animations
    const showDebounced = debounce(showDropdown, 15);
    const hideDebounced = debounce(hideDropdown, 15);

    dropdowns.forEach(dropdown => {
        dropdown.addEventListener('mouseenter', showDebounced);
        dropdown.addEventListener('mouseleave', hideDebounced);
    });

    // Dropdown functions
    function showDropdown() {
        this.querySelector('.dropdown-content').style.opacity = '1';
        this.querySelector('.dropdown-content').style.visibility = 'visible';
    }

    function hideDropdown() {
        this.querySelector('.dropdown-content').style.opacity = '0';
        this.querySelector('.dropdown-content').style.visibility = 'hidden';
    }

    // Reattach dropdown events when page becomes visible again
    document.addEventListener('visibilitychange', () => {
        if (!document.hidden) {
            dropdowns.forEach(dropdown => {
                dropdown.addEventListener('mouseenter', showDebounced);
                dropdown.addEventListener('mouseleave', hideDebounced);
            });
        }
    });
});