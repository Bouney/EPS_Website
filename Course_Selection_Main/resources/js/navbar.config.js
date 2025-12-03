function navbarExport(BANNER, NAVBAR) {
  if (window.scrollY > BANNER.offsetTop + BANNER.offsetHeight) {
    NAVBAR.className = "navbarActive";
  } else if (window.scrollY < BANNER.offsetTop + BANNER.offsetHeight) {
    NAVBAR.className = "navbar";
  }
}

export { navbarExport };