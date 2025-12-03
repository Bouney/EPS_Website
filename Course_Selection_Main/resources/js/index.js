// for index.html
import Countdown from "./countdown.js";
import { navbarExport } from "/resources/js/navbar.config.js";

const Navbar = document.getElementById("navbar");
const BANNER = document.getElementById("BANNER");

// Function for changing class on scroll
function OnScrollAction() {
    // console.log(window.scrollY);
    navbarExport(BANNER, Navbar);
}

window.addEventListener("scroll", () => OnScrollAction());

// Countdown Timer
// Date is handled by the <time> element in index.html
const courseSelectionDate = new Date(document.getElementById("selection-deadline-time").dateTime).getTime();
const countdownElem = document.getElementById("CountdownDateGr12");

Countdown(courseSelectionDate, countdownElem);
