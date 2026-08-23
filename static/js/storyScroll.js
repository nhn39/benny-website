console.log("story scroll JS loaded");

const scenes = document.querySelectorAll(".story-scene");

function clamp(value) {
    return Math.max(0, Math.min(1, value));
}

function updateStoryAnimation() {
    const viewportHeight = window.innerHeight;
    const viewportWidth = window.innerWidth;

    scenes.forEach(function (scene) {
        const photo = scene.querySelector(".story-photo");
        const text = scene.querySelector(".story-text");

        const rect = scene.getBoundingClientRect();

        let progress = (viewportHeight - 2 * rect.top) / (viewportHeight * 1);

        progress = clamp(progress);

        const animation = scene.dataset.animation;

        // SPLIT
        if (animation === "split") {
            const photoProgress = clamp(progress / 0.65);
            const textProgress = clamp((progress - 0.65) / 0.35);

            const photoX = -viewportWidth * 1.1 * (1 - photoProgress);

            const textX = viewportWidth * 1.1 * (1 - textProgress);

            photo.style.transform = `translateX(${photoX}px)`;

            text.style.transform = `translateX(${textX}px)`;
        }

        // RISE
        if (animation === "rise") {
            const photoProgress = clamp(progress / 0.6);
            const textProgress = clamp((progress - 0.6) / 0.4);

            const photoY = viewportHeight * 0.9 * (1 - photoProgress);

            const textX = -viewportWidth * 1.1 * (1 - textProgress);

            photo.style.transform = `translateY(${photoY}px)`;

            text.style.transform = `translateX(${textX}px)`;
        }

        // ZOOM
        if (animation === "zoom") {
            const photoProgress = clamp(progress / 0.55);
            const textProgress = clamp((progress - 0.55) / 0.45);

            const scale = 0.45 + photoProgress * 0.55;

            const textX = viewportWidth * 1.1 * (1 - textProgress);

            photo.style.transform = `scale(${scale})`;

            text.style.transform = `translateX(${textX}px)`;
        }

        // CROSS
        if (animation === "cross") {
            const photoProgress = clamp(progress / 0.6);
            const textProgress = clamp((progress - 0.6) / 0.4);

            const photoX = viewportWidth * 1.1 * (1 - photoProgress);

            const textX = -viewportWidth * 1.1 * (1 - textProgress);

            photo.style.transform = `translateX(${photoX}px)`;

            text.style.transform = `translateX(${textX}px)`;
        }
    });
}

const videoScenes = document.querySelectorAll(".video-scene");

videoScenes.forEach(function (scene) {
    const video = scene.querySelector(".story-video");

    video.addEventListener("loadedmetadata", function () {
        const pixelsPerSecond = Number(scene.dataset.scrollSpeed) || 300;

        const playbackDistance = video.duration * pixelsPerSecond;

        // One viewport for the pinned frame
        // + enough scrolling to play the entire video
        scene.style.height = `${window.innerHeight + playbackDistance}px`;

        updateVideo();
    });

    function updateVideo() {
        const rect = scene.getBoundingClientRect();

        const scrollDistance = scene.offsetHeight - window.innerHeight;

        let progress = -rect.top / scrollDistance;

        progress = clamp(progress);

        if (video.duration) {
            video.currentTime = progress * video.duration;
        }
    }

    window.addEventListener("scroll", updateVideo);
    window.addEventListener("resize", updateVideo);
});

window.addEventListener("scroll", updateStoryAnimation);
window.addEventListener("resize", updateStoryAnimation);

updateStoryAnimation();
