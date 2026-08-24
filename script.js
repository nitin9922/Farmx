// =====================================================
// FARMX
// Complete JavaScript
// =====================================================


// =====================================================
// GLOBAL VARIABLES
// =====================================================

let selectedSeed = "";
let selectedSoil = "";

let soilPH = "";
let waterPH = "";

let currentDay = 1;


// =====================================================
// LOGIN
// =====================================================

const loginForm = document.getElementById("loginForm");

loginForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const username =
        document.getElementById("username").value.trim();

    const password =
        document.getElementById("password").value.trim();

    const loginError =
        document.getElementById("loginError");


    if (username === "admin" && password === "1234") {

        loginError.innerText = "";

        document.getElementById("loginPage")
            .classList.add("hidden");

        document.getElementById("appPage")
            .classList.remove("hidden");

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    } else {

        loginError.innerText =
            "Incorrect username or password.";

    }

});


// =====================================================
// LOGOUT
// =====================================================

const logoutButton =
    document.getElementById("logoutButton");

logoutButton.addEventListener("click", function () {

    location.reload();

});


// =====================================================
// SOYBEAN SELECTION
// =====================================================

const soybeanButton =
    document.getElementById("soybeanButton");

soybeanButton.addEventListener("click", function () {

    selectedSeed = "Soybean";

    const seedStep =
        document.getElementById("seedStep");

    const soilStep =
        document.getElementById("soilStep");


    seedStep.classList.add("hidden");

    soilStep.classList.remove("hidden");

    soilStep.classList.add("plan-reveal");


    soilStep.scrollIntoView({
        behavior: "smooth"
    });

});


// =====================================================
// SOIL SELECTION
// =====================================================

const soilOptions =
    document.querySelectorAll(".soil-option");


soilOptions.forEach(function (soil) {

    soil.addEventListener("click", function () {

        // Remove previous selection

        soilOptions.forEach(function (item) {

            item.classList.remove("selected");

        });


        // Select soil

        soil.classList.add("selected");

        selectedSoil =
            soil.getAttribute("data-soil");


        // Small delay for selection animation

        setTimeout(function () {

            document.getElementById("soilStep")
                .classList.add("hidden");

            document.getElementById("phStep")
                .classList.remove("hidden");

            document.getElementById("phStep")
                .classList.add("plan-reveal");

            document.getElementById("phStep")
                .scrollIntoView({
                    behavior: "smooth"
                });

        }, 350);

    });

});


// =====================================================
// GENERATE PLAN
// =====================================================

const generatePlanButton =
    document.getElementById("generatePlanButton");


generatePlanButton.addEventListener("click", function () {

    soilPH =
        document.getElementById("soilPH").value.trim();

    waterPH =
        document.getElementById("waterPH").value.trim();

    const phError =
        document.getElementById("phError");


    // -----------------------------------------------
    // CHECK EMPTY INPUT
    // -----------------------------------------------

    if (soilPH === "" || waterPH === "") {

        phError.innerText =
            "Please enter both soil and water pH.";

        return;

    }


    // -----------------------------------------------
    // CHECK PH RANGE
    // -----------------------------------------------

    if (
        Number(soilPH) < 0 ||
        Number(soilPH) > 14 ||
        Number(waterPH) < 0 ||
        Number(waterPH) > 14
    ) {

        phError.innerText =
            "pH value must be between 0 and 14.";

        return;

    }


    phError.innerText = "";


    // -----------------------------------------------
    // SAVE INFORMATION TO PLAN
    // -----------------------------------------------

    document.getElementById("selectedSeed")
        .innerText = selectedSeed;

    document.getElementById("selectedSoil")
        .innerText = selectedSoil;

    document.getElementById("selectedSoilPH")
        .innerText = soilPH;

    document.getElementById("selectedWaterPH")
        .innerText = waterPH;


    // -----------------------------------------------
    // START PROFESSIONAL LOADING
    // -----------------------------------------------

    startPlanLoading();

});


// =====================================================
// PROFESSIONAL PLAN LOADING
// =====================================================

function startPlanLoading() {

    // Create loader

    const loader =
        document.createElement("div");

    loader.className = "plan-loader";

    loader.id = "farmXLoader";


    loader.innerHTML = `

        <div class="loader-box">

            <div class="loader-icon">
                🌱
            </div>

            <h3 id="loaderTitle">
                Creating your plan
            </h3>

            <p
                id="loaderMessage"
                class="loader-message">
                Analysing your farming needs...
            </p>

            <div class="loader-progress">

                <div
                    id="loaderProgressBar"
                    class="loader-progress-bar">
                </div>

            </div>

        </div>

    `;


    document.body.appendChild(loader);


    const message =
        document.getElementById("loaderMessage");

    const progress =
        document.getElementById("loaderProgressBar");


    const loadingMessages = [

        "Analysing your farming needs...",

        "Checking selected soil type...",

        "Analysing soil pH...",

        "Analysing water pH...",

        "Preparing soybean germination plan...",

        "Organising your 30-day farming journey...",

        "Finalising your farming plan..."

    ];


    let currentMessage = 0;

    let progressValue = 0;


    // -----------------------------------------------
    // CHANGE LOADING MESSAGE
    // -----------------------------------------------

    const loadingInterval =
        setInterval(function () {

            if (currentMessage < loadingMessages.length) {

                message.innerText =
                    loadingMessages[currentMessage];


                progressValue += 14;

                progress.style.width =
                    progressValue + "%";


                currentMessage++;

            }

        }, 400);


    // -----------------------------------------------
    // FINISH LOADING
    // -----------------------------------------------

    setTimeout(function () {

        clearInterval(loadingInterval);

        progress.style.width = "100%";

        message.innerText =
            "Your farming plan is ready ✓";


        setTimeout(function () {

            loader.classList.add("hide");


            setTimeout(function () {

                loader.remove();

                showPlan();

            }, 400);

        }, 600);

    }, 3300);

}


// =====================================================
// SHOW PLAN
// =====================================================

function showPlan() {

    document.getElementById("phStep")
        .classList.add("hidden");


    const planStep =
        document.getElementById("planStep");


    planStep.classList.remove("hidden");

    planStep.classList.add("plan-reveal");


    planStep.scrollIntoView({
        behavior: "smooth"
    });

}


// =====================================================
// START 30 DAY PLAN
// =====================================================

const startPlanButton =
    document.getElementById("startPlanButton");


startPlanButton.addEventListener("click", function () {

    currentDay = 1;


    document.getElementById("planStep")
        .classList.add("hidden");


    const trackingStep =
        document.getElementById("trackingStep");


    trackingStep.classList.remove("hidden");

    trackingStep.classList.add("plan-reveal");


    // Create 30 points

    createDayPoints();


    // Show Day 1

    updateDay();


    trackingStep.scrollIntoView({
        behavior: "smooth"
    });

});


// =====================================================
// CREATE 30 DAY POINTS
// =====================================================

function createDayPoints() {

    const dayPoints =
        document.getElementById("dayPoints");


    dayPoints.innerHTML = "";


    for (let i = 1; i <= 30; i++) {

        const point =
            document.createElement("div");


        point.classList.add("day-point");


        const number =
            document.createElement("span");


        number.innerText = i;


        point.appendChild(number);

        dayPoints.appendChild(point);

    }

}


// =====================================================
// FARMING PLAN DATA
// =====================================================

const farmingPlan = {

    1: {

        title: "Seed & Soil Preparation",

        description:
            "Prepare the selected farming area and get the soil ready for soybean germination.",

        activities: [

            "Prepare the soil properly.",

            "Check soil moisture.",

            "Prepare the soybean seeds for sowing."

        ]

    },


    2: {

        title: "Sowing Preparation",

        description:
            "Prepare the field and complete the initial sowing process according to the prototype plan.",

        activities: [

            "Check the prepared soil.",

            "Maintain suitable soil moisture.",

            "Complete the planned sowing process."

        ]

    },


    3: {

        title: "Moisture Check",

        description:
            "Check the soil condition and make sure it has suitable moisture.",

        activities: [

            "Check soil moisture.",

            "Observe the sowing area.",

            "Avoid unnecessary watering."

        ]

    },


    4: {

        title: "Early Germination Observation",

        description:
            "Observe the field for early signs of germination.",

        activities: [

            "Observe the soil surface.",

            "Check moisture condition.",

            "Record visible changes."

        ]

    },


    5: {

        title: "Seedling Observation",

        description:
            "Continue observing the field and newly emerging seedlings.",

        activities: [

            "Observe seedling growth.",

            "Check soil moisture.",

            "Keep the area clean from weeds."

        ]

    },


    6: {

        title: "Field Monitoring",

        description:
            "Monitor the growing area and check the overall condition.",

        activities: [

            "Observe plant condition.",

            "Check soil moisture.",

            "Look for unwanted weeds."

        ]

    },


    7: {

        title: "First Week Review",

        description:
            "Review the first week of the germination process.",

        activities: [

            "Check overall germination.",

            "Observe seedling condition.",

            "Record first-week progress."

        ]

    }

};


// =====================================================
// DEFAULT DAYS 8 - 30
// =====================================================

function getDayInformation(day) {

    if (farmingPlan[day]) {

        return farmingPlan[day];

    }


    return {

        title: "Daily Farm Monitoring",

        description:
            "Continue monitoring the crop, soil moisture and overall field condition according to the farming plan.",

        activities: [

            "Observe crop growth.",

            "Check soil moisture.",

            "Record today's progress."

        ]

    };

}


// =====================================================
// UPDATE DAY
// =====================================================

function updateDay() {

    const dayContent =
        document.querySelector(".day-content");

    const dayNumberElement =
        document.querySelector(".day-title strong");


    // -----------------------------------------------
    // DAY CHANGE ANIMATION
    // -----------------------------------------------

    dayContent.classList.remove("day-enter");

    dayContent.classList.add("day-changing");

    dayNumberElement.classList.add("day-changing");


    setTimeout(function () {

        // -------------------------------------------
        // BASIC DAY INFORMATION
        // -------------------------------------------

        document.getElementById("currentDay")
            .innerText = currentDay;

        document.getElementById("dayNumber")
            .innerText = currentDay;


        // -------------------------------------------
        // GET FARMING DATA
        // -------------------------------------------

        const dayData =
            getDayInformation(currentDay);


        document.getElementById("dayTitle")
            .innerText = dayData.title;


        document.getElementById("dayDescription")
            .innerText = dayData.description;


        document.getElementById("activityOne")
            .innerText = dayData.activities[0];


        document.getElementById("activityTwo")
            .innerText = dayData.activities[1];


        document.getElementById("activityThree")
            .innerText = dayData.activities[2];


        // -------------------------------------------
        // UPDATE BUTTON
        // -------------------------------------------

        const continueButton =
            document.getElementById("continueButton");


        if (currentDay === 30) {

            continueButton.innerText =
                "Complete Plan ✓";

        } else {

            continueButton.innerText =
                "Complete Day " + currentDay;

        }


        // -------------------------------------------
        // UPDATE PROGRESS
        // -------------------------------------------

        updateProgress();


        // -------------------------------------------
        // ENTER ANIMATION
        // -------------------------------------------

        dayContent.classList.remove(
            "day-changing"
        );

        dayContent.classList.add(
            "day-enter"
        );


        dayNumberElement.classList.remove(
            "day-changing"
        );


    }, 250);

}


// =====================================================
// UPDATE PROGRESS
// =====================================================

function updateProgress() {

    const points =
        document.querySelectorAll(".day-point");


    points.forEach(function (point, index) {

        const day = index + 1;


        point.classList.remove(
            "active",
            "completed"
        );


        if (day < currentDay) {

            point.classList.add("completed");

        }


        if (day === currentDay) {

            point.classList.add("active");

        }

    });


    const progressBar =
        document.getElementById("progressBar");


    const progress =
        ((currentDay - 1) / 29) * 100;


    progressBar.style.width =
        progress + "%";

}


// =====================================================
// COMPLETE / CONTINUE DAY
// =====================================================

const continueButton =
    document.getElementById("continueButton");


continueButton.addEventListener("click", function () {


    // -----------------------------------------------
    // DAY 30 COMPLETE
    // -----------------------------------------------

    if (currentDay === 30) {

        showCompletion();

        return;

    }


    // -----------------------------------------------
    // COMPLETE CURRENT DAY
    // -----------------------------------------------

    const currentPoint =
        document.querySelectorAll(".day-point")
        [currentDay - 1];


    if (currentPoint) {

        currentPoint.classList.add(
            "completed"
        );

    }


    // Small delay makes transition feel natural

    setTimeout(function () {

        currentDay++;

        updateDay();

    }, 300);

});


// =====================================================
// 30 DAY COMPLETION
// =====================================================

function showCompletion() {

    const trackingStep =
        document.getElementById("trackingStep");


    trackingStep.innerHTML = `

        <div
            class="loader-box success-animation"
            style="margin: 80px auto;"
        >

            <div class="loader-icon">
                🌱
            </div>

            <h3>
                Plan Completed!
            </h3>

            <p class="loader-message">
                Congratulations! You completed
                the 30-day FarmX prototype journey.
            </p>

            <button
                class="primary-button"
                onclick="location.reload()"
            >
                Start New Plan
            </button>

        </div>

    `;

}