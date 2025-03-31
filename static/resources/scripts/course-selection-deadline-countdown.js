'use strict';

window.addEventListener("load", async (event) => {
  const deadlineCountdown = document.getElementById('deadline-countdown');

  try {
    console.log("Preparing to count down...");

    const deadlineString = deadlineCountdown.attributes['datetime'].nodeValue;
    const deadline = new Date(deadlineString);
    console.log(`The deadline is ${deadlineString}`);
    console.log(deadline);

    const updater = setInterval(function() {
      const now = new Date();
      const diff = deadline - now;
      if (diff <= 0) {
        deadlineCountdown.innerHTML = "Deadline Passed";
        clearInterval(updater);
        console.log('Done; deadline passed!');
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      deadlineCountdown.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;
    }, 1000);
  } catch (err) {
    console.error(err);
    deadlineCountdown.innerHTML = "Error Loading Deadline";
  }
});
