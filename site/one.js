// This is the javascript file for index.html
import Countdown from "./Countdown.js";
import { navbarExport } from "./Navbar.config.js";
import { COURSE_SELECTION_SEMESTER_2 } from "./one.CONFIG.js";
const courseSelectionDate = new Date(COURSE_SELECTION_SEMESTER_2).getTime();
const COUNTDOWNELEMENT = document.getElementById("CountdownDate");
const COUNTDOWNELEMENTGR12 = document.getElementById("CountdownDateGr12");

const Navbar = document.getElementById("navbar");
const BANNER = document.getElementById("BANNER");

//Function for changing class on scroll
function OnScrollAction() {
  console.log(window.scrollY);
  navbarExport(BANNER, Navbar);
}

window.addEventListener("scroll", () => OnScrollAction());
Countdown(courseSelectionDate, COUNTDOWNELEMENT);
Countdown(courseSelectionDate, COUNTDOWNELEMENTGR12);


// change the end date of the countdown to March 10 4:00 PM 