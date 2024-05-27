/* data = {"country" : {"year" : {"field": ...}}} */


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
    }, "map": {
        left: 1,
        top: 1
    }, "evolution": {
        left: -1,
        top: 1
    }, "timeline": {
        left: -1,
        top: 2
    }, "tendency": {
        left: -2.5,
        top: 1
    }, "FAQ": {
        left: -1,
        top: -1
    }, "about": {
        left: 1,
        top: -1
    }
};

sections.forEach((section) => {
    var data = sectionsData[section.id];

    section.data = data;

    section.style.left = `calc(${data.left} * 110vw + 5vw)`;
    section.style.top = `calc(${data.top} * 110vh + 5vh)`;
});

function moveToSection(id) {
    let oldSection = document.querySelector(".navigationItem[dest='"+currentSectionId+"']");
    oldSection.style.borderColor = "#ddd";
    oldSection.style.color = "black";
    
	let currentSection = document.querySelector(".navigationItem[dest='"+id+"']");
    currentSection.style.borderColor = "color-mix(in srgb, var(--contrast), white 70%)";
    currentSection.style.color = "var(--contrast)";
	
	document.getElementById(id).classList.add("sectionVisited");
    
    currentSectionId = id;

    moveTo(sectionsData[id].left, sectionsData[id].top);
}
function moveTo(x, y) {
    mainCanvas.style.left = `calc(${-x} * 110vw)`;
    mainCanvas.style.top = `calc(${-y} * 110vh)`;
    document.body.style.backgroundPositionX = `calc(${-x} * 90vw)`;
    document.body.style.backgroundPositionY = `calc(${-y} * 90vh)`;
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



const statsYearInput = document.getElementById("statsYearInput");
const statsYearCounter = document.getElementById("statsYearCounter");

const countries = document.querySelectorAll(".landxx");

countries.forEach(country => {
    title = country.querySelector("title");

    if (title == null) {
        title = country.parentElement.querySelector("title")
    }

    if (title == null) {
        country.countryName = null;
    } else {
        country.countryName = title.innerHTML;
    }

    if (country.countryName) {
        country.onmouseenter = function() {
            let text = document.getElementById(`txt-${country.id}`);

            if (text) {
                let fields = getCountryData(country.countryName, Number.parseInt(statsYearInput.value));
                
                if (fields) {
                    text.textContent = text.textContent.split("\n")[0];
                    text.textContent += "\n" + fields["numberofabortions"] + " avortements";
                }
                
                //text.setAttribute("abortion-count", `url("data:image/svg+xml; utf8, <svg>${fields["numberofabortions"]}</svg>")`);
                
                text.classList.add("hovered");
            }
        }
        country.onmouseleave = function() {
            text = document.getElementById(`txt-${country.id}`);
            
            if (text) {
                text.classList.remove("hovered");
            }
        }
    }
});


const lowColor = [240, 100, 100];
const highColor = [100, 200, 120];
const noData = "rgb(100, 100, 100)";
/*const forbidden = "rgb(240, 50, 80)";
const outsideHealthSector = "rgb(230, 100, 50)";
const belowSurvey = "rgb(200, 150, 50)";
const allowed = "rgb(50, 200, 100)";*/
const maximum = 100000;
// const maxVal = 50;


function interpolate(vala, valb, t) {
    minVal = Math.min(vala, valb);
    maxVal = Math.max(vala, valb);
    return Math.min(Math.round(vala + (valb-vala) * t), maxVal);
}

function getCountryData(countryName, year) {
    countryData = data[countryName];

    if (countryData) {
		year = Number.parseInt(statsYearInput.value);
        fields = countryData[year];

		for (i=1 ; i < 30 ; i++) {
			if (fields == null) {
				fields = countryData[year - i];

                if (fields == null) {
                    fields = countryData[year + i];
                } else {
                    break;
                }
			} else {
				break;
			}
		}

        if (fields) {
            return fields;
        }
    }
    return null;
}


statsYearInput.oninput = function() {
    statsYearCounter.textContent = statsYearInput.value;

    countries.forEach(country => {
        if (country.countryName != null) {
            country.style.setProperty("--fillColor", noData);

            year = Number.parseInt(statsYearInput.value);
            fields = getCountryData(country.countryName, year);

            if (fields) {

                /*color = allowed;

                if (fields["classification"] == "Below survey of women") {
                    color = belowSurvey;
                } else if (fields["classification"] == "Outside health sector") {
                    color = outsideHealthSector;
                } else if (fields["numberofabortions"] > 20000) {
                    color = allowed;
                }*/


                if (fields["numberofabortions"] > 0) {
					t = fields["numberofabortions"] / maximum;
					color = `rgb(${interpolate(lowColor[0], highColor[0], t)},${interpolate(lowColor[1], highColor[1], t)},${interpolate(lowColor[2], highColor[2], t)})`;

					country.style.setProperty("--fillColor", color);
				}
            }
        }
    })
}
statsYearInput.oninput()


const tendencyMapCountries = document.querySelector("#tendencyMap #countries");

Array.from(tendencyMapCountries.children).forEach((country) => {
    let title = document.createElementNS("http://www.w3.org/2000/svg", 'title');
    title.textContent = country.getAttribute("data-name");
    country.appendChild(title);
});



const questionContainers = document.querySelectorAll(".questionContainer");

questionContainers.forEach((questionContainer) => {
    questionContainer.onclick = function() {
        if (questionContainer.classList.contains("questionContainerOpened")) {
            questionContainer.classList.remove("questionContainerOpened");
        } else {
            questionContainer.classList.add("questionContainerOpened");
        }
    }
});



const abortionCounterSeconds = document.getElementById("abortionCounterSeconds");
const abortionCounterNumber = document.getElementById("abortionCounterNumber");
const unsafeAbortionCounterNumber = document.getElementById("unsafeAbortionCounterNumber");


var secondsElapsed = -0.5;

function updateCounters() {
	secondsElapsed += 0.5;

    let seconds = Number.parseInt(secondsElapsed);
    let abortions = Number.parseInt(secondsElapsed * 2.3);
    let unsafeAbortions = Number.parseInt(secondsElapsed * 0.73);
	
    if (seconds.toString() != abortionCounterSeconds.innerText) {
        abortionCounterSeconds.innerText = seconds;
        animateCounter(abortionCounterSeconds);
    }
	
	abortionCounterNumber.innerText = abortions;
    animateCounter(abortionCounterNumber);

    if (unsafeAbortions.toString() != unsafeAbortionCounterNumber.innerText) {
        unsafeAbortionCounterNumber.innerText = unsafeAbortions;
        animateCounter(unsafeAbortionCounterNumber);
    }
	
	setTimeout(updateCounters, 500);
}
function animateCounter(counter) {
    counter.animate([
        {
            opacity: 0.5
        }, {
            opcaity: 1
        }
    ], 200);
}
updateCounters()
