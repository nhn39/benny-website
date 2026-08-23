// const logo = document.createElement("a");

// logo.href = "index.html";
// logo.className = "benny-logo";

// logo.innerHTML = `
//     <img src="static/img/benny_logo_no_BG.png" alt="Benny">
// `;

// document.body.prepend(logo);

// logo.addEventListener("click", function (event) {
//     event.preventDefault();

//     document.body.classList.add("page-exit");

//     setTimeout(function () {
//         window.location.href = "index.html";
//     }, 600);
// });

// -------------------------
// BENNY LOGO
// -------------------------

const logo = document.createElement("a");

logo.href = "index.html";
logo.className = "benny-logo";

logo.innerHTML = `
    <img src="static/img/benny_logo_no_BG.png" alt="Benny">
`;

document.body.prepend(logo);

// Logo click transition
logo.addEventListener("click", function (event) {
    event.preventDefault();

    document.body.classList.add("page-exit");

    setTimeout(function () {
        window.location.href = "index.html";
    }, 600);
});

// -------------------------
// SUPPORT BENNY
// -------------------------

const supportButton = document.createElement("a");

supportButton.href = "https://gofund.me/3ae458c05";
supportButton.className = "support-benny";
supportButton.target = "_blank";
supportButton.rel = "noopener noreferrer";
supportButton.innerHTML = `
    <img src="static/img/gofundme_logo_no_BG.png" alt="Support Benny">
`;
document.body.prepend(supportButton);
