// used in index.js
export default function Countdown(time, element) {
    const x = setInterval(function() {
        const now = new Date().getTime();

        const distance = time - now;

        // Time calculations for days, hours, minutes and seconds
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        element.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;

        // If done
        if (distance < 0) {
            clearInterval(x);
            element.innerHTML = "Deadline Reached";
        }
    }, 1000);
}