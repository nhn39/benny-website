console.log("carousel JS loaded");
const videos = document.querySelectorAll('.intro-video');
const dots = document.querySelectorAll('.dot');

const preButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');

let currentSlide = 0;

function showSlide(index) {
    videos[currentSlide].classList.remove('active');
    dots[currentSlide].classList.remove('active');

    currentSlide = index;

    if (currentSlide >= videos.length) {
        currentSlide = 0;
    }

    if (currentSlide < 0) {
        currentSlide = videos.length - 1;
    }

    videos[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');

    videos[currentSlide].currentTime = 0;
    videos[currentSlide].play();
}


nextButton.addEventListener('click', function ()  {
    showSlide(currentSlide + 1);
});

preButton.addEventListener('click', function () {
        showSlide(currentSlide - 1);
    });  

dots.forEach(function (dot, index) {
        dot.addEventListener('click', function () {
            showSlide(index);
        });     

    });
