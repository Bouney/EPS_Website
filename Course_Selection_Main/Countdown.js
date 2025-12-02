// used in one.js
export default function Countdown(time, element) {
    const x = setInterval(function() {
        // Get today's date and time
        const now = new Date().getTime();

        // Find the distance between now and the count down date
        const distance = time - now;

        // Time calculations for days, hours, minutes and seconds
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Display the result
        element.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;

        // If the count down is finished, write some text
        if (distance < 0) {
            clearInterval(x);
            element.innerHTML = "Deadline Reached";
        }
    }, 1000);
}