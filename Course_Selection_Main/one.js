// for index.html
import Countdown from "./Countdown.js";
import { navbarExport } from "./Navbar.config.js";
import { COURSE_SELECTION_SEMESTER_2 } from "./one.CONFIG.js";

const Navbar = document.getElementById("navbar");
const BANNER = document.getElementById("BANNER");

// Function for changing class on scroll
function OnScrollAction() {
    console.log(window.scrollY);
    navbarExport(BANNER, Navbar);
}

window.addEventListener("scroll", () => OnScrollAction());

// Countdown Timer
const courseSelectionDate = new Date(COURSE_SELECTION_SEMESTER_2).getTime();
const countdownElem = document.getElementById("CountdownDateGr12");

Countdown(courseSelectionDate, countdownElem);

// change the end date of the countdown to March 10 4:00 PM