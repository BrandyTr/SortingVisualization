var container = document.querySelector(".array");
var speed = 1000;
var observers = [];

// check sorting in progress
var isSorting = false;

// sort current sorting
var currentSort = null;

// stop sorting
var shouldStop = false; // true = stop, false = continue

// Pause sorting
var isPaused = false; // true = pause, false = continue

// Generate the array of block
function generateArray() {
    container.innerHTML = '';

    for (var i = 0; i < 20; i++) {
        var value = Math.ceil(Math.random() * 100);

        // Creating element div
        var array_ele = document.createElement("div");

        // Adding class 'block' to div
        array_ele.classList.add("block");

        // Adding style to div
        array_ele.style.height = `${value * 3}px`;
        array_ele.style.transform = `translate(${i * 33}px)`; // Translate the element

        // Create label in front of block
        var array_ele_label = document.createElement("label");
        // Adding class 'block_id' to div
        array_ele_label.classList.add("block_id");
        array_ele_label.innerText = value; // Note value to block

        array_ele.appendChild(array_ele_label); // Append label to div
        container.appendChild(array_ele);
    }
}

// Swap 2 blocks
function swap(ele1, ele2) {
    return new Promise((resolve) => {
        var temp = ele1.style.transform;
        ele1.style.transform = ele2.style.transform;
        ele2.style.transform = temp;

        // wait for the transition to end!
        window.requestAnimationFrame(function() {
            setTimeout(() => {
                // insert ele2 before ele1 in DOM (container)
                container.insertBefore(ele2, ele1);
                resolve();
            }, 250)
        })
    })
}

// Observer Pattern to notify updates
function addObserver(observer) {
    observers.push(observer);
}

function notifyObservers() {
    for (const observer of observers) {
        observer.update();
    }
}

// Base Sort Strategy
class SortStrategy {
    async sort() {
        throw new Error("Sort method must be implemented");
    }

    async pause() {
        return new Promise((resolve) => {
            let interval = setInterval(() => {
                if (!isPaused) { // if not paused (isPaused = false)
                    clearInterval(interval); // clear interval
                    resolve();
                }
            }, speed);
        });
    }
}

// Context for sorting strategy
class SortContext {
    constructor(strategy) {
        this.strategy = strategy;
    }

    async executeSort() {
        return await this.strategy.sort();
    }
}

// update button pause based on the state
function updatePauseBtn() {
    var pauseBtn = document.querySelector('.pause-Btn');
    if (isSorting) { // if sorting
        if (isPaused) { // if paused
            pauseBtn.innerHTML = '<i class="fa-solid fa-play"></i>'; // Resume icon
        } else {
            pauseBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
        }
    } else {
        pauseBtn.innerHTML = '<i class="fa-solid fa-play"></i>'; // Pause icon
    }
    notifyObservers();
}

// Speed Change
document.querySelector('.speed').addEventListener('change', function() {
    speed = document.querySelector('.speed').value;
    notifyObservers();
});

// Start Sort
document.querySelector('.sort-Btn').addEventListener('click', function() {
    if (!isSorting) { // if not sorting (isSorting = false)
        let sortContext = new SortContext(SortFactory.createSortAlgorithm(currentSortAlgorithm));
        currentSort = sortContext.executeSort();
    } else { // if sorting (isSorting = true)
        shouldStop = true;
        currentSort.then(() => {
            isSorting = false;
            generateArray();
            let sortContext = new SortContext(SortFactory.createSortAlgorithm(currentSortAlgorithm));
            currentSort = sortContext.executeSort();
        });
    }
    updatePauseBtn();
});

// Pause/ Resume state
document.querySelector('.pause-Btn').addEventListener('click', function() {
    var pauseBtn = document.querySelector('.pause-Btn');
    if (isSorting) {
        isPaused = !isPaused; // toggle isPaused
        updatePauseBtn();
    }
});

// randomize array
document.querySelector('.random-Btn').addEventListener('click', function() {
    generateArray();
    isSorting = false; // stop current sorting
    currentSort = null;
    updatePauseBtn();
});

generateArray();

// Content code
function showCode(language, element) {
    //Hide all code blocks
    var codeBlocks = document.querySelectorAll('.code-block');
    for (var i = 0; i < codeBlocks.length; i++) {
        codeBlocks[i].classList.remove('active');
    }

    //Show selected code block
    document.getElementById(language).classList.add('active');

    // Display the code container if it's hidden
    document.querySelector('.code-container').style.display = 'block';

    // Remove active class from all tabs
    var tabs = document.getElementsByClassName('tab-link');
    for (var i = 0; i < tabs.length; i++) {
        tabs[i].classList.remove('active');
    }

    // Active class to the selected tab
    element.classList.add('active');
}

// Initially show the first code block (optional)
document.addEventListener('DOMContentLoaded', function() {
    showCode('c', document.querySelector('.tab-link'));
});