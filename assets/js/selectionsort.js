var container = document.querySelector(".array")
var speed = 1000;

//check sorting in progress
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


// Selection Sort
async function SelectionSort() {
    var blocks = document.querySelectorAll(".block");
    isSorting = true;
    isPaused = false; // ensure sorting is not paused initially
    updatePauseBtn();

    // Selection Sort Algorithm
    for (var i = 0; i < blocks.length; i++) {
        var minIndex = i;
        blocks[minIndex].style.backgroundColor = "#B2533E";

        for (var j = i + 1; j < blocks.length; j++) {
            
            // check if the sorting is stopped (shouldStop = true)
            if (shouldStop) {
                isSorting = false;
                shouldStop = false; // reset shouldStop
                updatePauseBtn();
                return;
            }

            // Change color of blocks that compare
            blocks[j].style.backgroundColor = "#B2533E";

            // create time interval to pause/resume sorting
            await new Promise((resolve) => {
                let interval = setInterval(() => {
                    if (!isPaused) { // if not paused (isPaused = false)
                        clearInterval(interval); // clear interval
                        resolve();
                    }
                }, speed);
            });

            // Get value of blocks
            var value1 = Number(blocks[minIndex].childNodes[0].innerHTML);
            var value2 = Number(blocks[j].childNodes[0].innerHTML);

            if (value1 > value2) {
                if (minIndex !== i) blocks[minIndex].style.backgroundColor = "#3F9BBF";
                minIndex = j;
                blocks[minIndex].style.backgroundColor = "#B2533E";
            } else {
                blocks[j].style.backgroundColor = "#3F9BBF";
            }
        }

        if (minIndex !== i) {
            await swap(blocks[i], blocks[minIndex]);
            blocks = document.querySelectorAll(".block");
        }

        blocks[i].style.backgroundColor = "#7A9D54";
    }

    isSorting = false;
    currentSort = null;
    updatePauseBtn();
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
}
// Speed Change
document.querySelector('.speed').addEventListener('change', function() {
    speed = document.querySelector('.speed').value;
});

// Start Sort
document.querySelector('.sort-Btn').addEventListener('click', function() {
    if (!isSorting) { // if not sorting (isSorting = false)
        // generateArray();
        // currentSort = SelectionSort();
        SelectionSort();
    } else { // if sorting (isSorting = true)
        shouldStop = true;
        currentSort.then(() => {
            isSorting = false;
            generateArray();
            currentSort = SelectionSort();
        })
    }
    updatePauseBtn();
})

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
})

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
    var tabs = document.getElementsByClassName('tab-link')
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