const link = document.createElement('link');
link.rel = 'stylesheet';
link.href = 'site_footer.css'; // adjust path if your CSS lives somewhere else
document.head.appendChild(link);

document.body.insertAdjacentHTML("beforeend", `
    <footer class="site-footer">
        <h4> Elgin Park Secondary </h4>
        <p class="footer-address">13484 24 Ave, Surrey, BC V4A 2G5 | (604) 538-6678</p>
        <a href="contact.html">Contact</a>

        <p class="footer-credit">Website Designed by the Elgin Park Computer Club</p>
    </footer>
`);