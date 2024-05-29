class InsertionSort extends SortStrategy {
    async sort() {
        var blocks = document.querySelectorAll(".block");
        isSorting = true;
        isPaused = false; // ensure sorting is not paused initially
        updatePauseBtn();

        blocks[0].style.backgroundColor = "#7A9D54";

        // Insertion Sort Algorithm
        for (var i = 1; i < blocks.length; i++) {
            var j = i - 1;
            var key = parseInt(blocks[i].childNodes[0].innerHTML);
            var height = blocks[i].style.height;

            // for selected section having id ele
            var barval = document.getElementById("ele");
            barval.innerHTML = `<h3>Element selected: ${key}</h3>`;

            blocks[i].style.backgroundColor = "#B2533E";

            // create time interval to pause/resume sorting
            await this.pause();

            while (j >= 0 && Number(blocks[j].childNodes[0].innerHTML) > key) {
                // check if the sorting is stopped (shouldStop = true)
                if (shouldStop) {
                    isSorting = false;
                    shouldStop = false; // reset shouldStop
                    updatePauseBtn();
                    return;
                }

                blocks[j].style.backgroundColor = "#B2533E";
                blocks[j + 1].style.height = blocks[j].style.height;
                blocks[j + 1].childNodes[0].innerText = blocks[j].childNodes[0].innerText;

                j--;

                // create time interval to pause/resume sorting
                await this.pause();

                // Change color to the previous one
                for (let k = i; k >= 0; k--) {
                    blocks[k].style.backgroundColor = "#7A9D54";
                }
            }

            blocks[j + 1].style.height = height;
            blocks[j + 1].childNodes[0].innerText = key;
            
            // Change color of sorted part
            blocks[i].style.backgroundColor = "#7A9D54";
        }

        // Color the sorted array
        for (var i = 0; i < blocks.length; i++) {
            blocks[i].style.backgroundColor = "#7A9D54";
        }

        isSorting = false;
        currentSort = null;
        updatePauseBtn();
    }
}

// set current sort algorithm
var currentSortAlgorithm = 'insertion';
