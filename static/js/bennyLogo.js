const logo = document.createElement('a');

logo.href = 'index.html';
logo.className = 'benny-logo';

logo.innerHTML = `
    <img src="static/img/benny_logo_no_BG.png" alt="Benny">
`;

document.body.prepend(logo);

logo.addEventListener('click', function(event) {
    event.preventDefault();

    document.body.classList.add('page-exit');

    setTimeout(function() {
        window.location.href = 'index.html';
    }, 600);
});