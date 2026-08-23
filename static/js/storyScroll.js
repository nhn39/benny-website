console.log("story scroll JS loaded");

const scene = document.querySelector("#scene-2016");
const photo = scene.querySelector(".story-photo");
const text = scene.querySelector(".story-text");

function updateStoryAnimation() {
    const rect = scene.getBoundingClientRect();
    const viewportHeight = window.innerHeight;

    let progress = (viewportHeight - rect.top) / (viewportHeight * 0.8);

    progress = Math.max(0, Math.min(1, progress));

    // Photo starts far to the left
    const photoX = -window.innerWidth * 3 * (1 - progress);

    // Text starts far to the right
    const textX = window.innerWidth * 3 * (1 - progress);

    photo.style.transform = `translateX(${photoX}px)`;

    text.style.transform = `translateX(${textX}px)`;
}

window.addEventListener("scroll", updateStoryAnimation);
window.addEventListener("resize", updateStoryAnimation);

updateStoryAnimation();
