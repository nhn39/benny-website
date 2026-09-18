console.log("carousel JS loaded");
const videos = document.querySelectorAll(".intro-video");
const dots = document.querySelectorAll(".dot");

const preButton = document.querySelector(".prev");
const nextButton = document.querySelector(".next");

let currentSlide = 0;

function showSlide(index) {
    // Stop current slide if it is a video
    if (videos[currentSlide].tagName === "VIDEO") {
        videos[currentSlide].pause();
        videos[currentSlide].currentTime = 0;
    }

    videos[currentSlide].classList.remove("active");
    dots[currentSlide].classList.remove("active");

    currentSlide = index;

    if (currentSlide >= videos.length) {
        currentSlide = 0;
    }

    if (currentSlide < 0) {
        currentSlide = videos.length - 1;
    }

    videos[currentSlide].classList.add("active");
    dots[currentSlide].classList.add("active");

    // Play new slide if it is a video
    if (videos[currentSlide].tagName === "VIDEO") {
        videos[currentSlide].currentTime = 0;
        videos[currentSlide].play();
    }
}

nextButton.addEventListener("click", function () {
    showSlide(currentSlide + 1);
});

preButton.addEventListener("click", function () {
    showSlide(currentSlide - 1);
});

dots.forEach(function (dot, index) {
    dot.addEventListener("click", function () {
        showSlide(index);
    });
});

const enterButton = document.querySelector(".enter-button");
enterButton.addEventListener("click", function (event) {
    event.preventDefault();

    document.body.classList.add("page-exit");

    setTimeout(function () {
        window.location.href = "story.html";
    }, 400);
});

window.addEventListener("pageshow", function () {
    document.body.classList.remove("page-exit");
});
