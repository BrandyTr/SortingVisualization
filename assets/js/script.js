// Navbar
const navbarCollapseDiv = document.getElementById('navbar-collapse');
const navbarShowBtn = document.getElementById('navbar-show-btn');
const navbarCloseBtn = document.getElementById('navbar-close-btn');
const modalOverlay = document.getElementById('modal-overlay');


// show navbar
navbarShowBtn.addEventListener('click', () => {
    navbarCollapseDiv.classList.add('navbar-collapse-rmw')
    modalOverlay.classList.add('show');
});

// hide side bar
navbarCloseBtn.addEventListener('click', () => {
    navbarCollapseDiv.classList.remove('navbar-collapse-rmw');
    modalOverlay.classList.remove('show');
})

modalOverlay.addEventListener('click', (e) => {
    navbarCollapseDiv.classList.remove('navbar-collapse-rmw');
    modalOverlay.classList.remove('show');
})

document.addEventListener('click', (e) => {
    if (!navbarCollapseDiv.contains(e.target) && e.target.id != "navbar-show-btn" && e.target.parentElement.id != "navbar-show-btn") {
        navbarCollapseDiv.classList.remove('navbar-collapse-rmw');
        modalOverlay.classList.remove('show');
    }
})

// Stop animation & transition during window resizing
let resizeTimer;
window.addEventListener('resize', () => {
    document.body.classList.add("resize-animation-stopper");
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        document.body.classList.remove("resize-animation-stopper");
    }, 400) 
});