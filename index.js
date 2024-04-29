const sections = document.querySelectorAll(".section");
const mainCanvas = document.getElementById("mainCanvas");
const sidebar = document.getElementsByClassName("sidebar")[0];
const navigationItems = document.getElementsByClassName("navigationItem");
const burgerButton = document.getElementById("burgerButton");

var currentSectionId = "what";

const sectionsData = {
    "what": {
        left: 0,
        top: 0
    }, "statistics": {
        left: 800,
        top: 800
    }, "evolution": {
        left: -800,
        top: 800
    }, "timeline": {
        left: -800,
        top: 1600
    }, "tendency": {
        left: -2000,
        top: 800
    }, "FAQ": {
        left: -800,
        top: -800
    }, "about": {
        left: 800,
        top: -800
    }
};

sections.forEach((section) => {
    var data = sectionsData[section.id];

    section.data = data;

    section.style.left = `calc(${data.left}px + 10vw)`;
    section.style.top = `calc(${data.top}px + 10vh)`;
});

function moveToSection(id) {
    let oldSection = document.querySelector(".navigationItem[dest='"+currentSectionId+"']");
    oldSection.style.borderColor = "#ddd";
    oldSection.style.color = "black";
    let currentSection = document.querySelector(".navigationItem[dest='"+id+"']");
    currentSection.style.borderColor = "color-mix(in srgb, var(--contrast), white 70%)";
    currentSection.style.color = "var(--contrast)";
    
    currentSectionId = id;

    moveTo(sectionsData[id].left, sectionsData[id].top);
}
function moveTo(x, y) {
    mainCanvas.style.left = `${-x}px`;
    mainCanvas.style.top = `${-y}px`;
    document.body.style.backgroundPositionX = `${-x * 0.8}px`;
    document.body.style.backgroundPositionY = `${-y * 0.8}px`;
}

/* Start Animation */

mainCanvas.animate([
    {
        top: "25vh",
        left: "25vw",
        scale: 0.1
    }, {
        scale: 1
    }], 2000);
document.body.animate([
    {
        backgroundSize: "1vw 1vw"
    }, {
        backgroundSize: "2vw 2vw"
    }], 2000);

moveToSection("what");


const burgerButtonBar1 = document.getElementsByClassName("burgerButtonBar1")[0];
const burgerButtonBar2 = document.getElementsByClassName("burgerButtonBar2")[0];
const burgerButtonBar3 = document.getElementsByClassName("burgerButtonBar3")[0];

burgerButton.onclick = function() {
    if (sidebar.classList.contains("sidebarOpened")) {
        sidebar.classList.remove("sidebarOpened");

        burgerButtonBar1.setAttribute("d", "M4 18L20 18");
        burgerButtonBar3.setAttribute("d", "M4 6L20 6");

        burgerButtonBar1.setAttribute("stroke-width", "2");
        burgerButtonBar3.setAttribute("stroke-width", "2");

        burgerButtonBar2.setAttribute("d", "M4 12L20 12");
    } else {
        sidebar.classList.add("sidebarOpened");

        burgerButtonBar1.setAttribute("d", "M5.5 18L18.5 6");
        burgerButtonBar3.setAttribute("d", "M5.5 6L18.5 18");
        
        burgerButtonBar1.setAttribute("stroke-width", "2.5");
        burgerButtonBar3.setAttribute("stroke-width", "2.5");

        burgerButtonBar2.setAttribute("d", "M12 12L12 12");
    }
}