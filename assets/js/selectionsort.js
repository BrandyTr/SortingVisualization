// Selection Sort
class SelectionSort extends SortStrategy {
    async sort() {
        var blocks = document.querySelectorAll(".block");
        isSorting = true;
        isPaused = false; // ensure sorting is not paused initially
        updatePauseBtn();
        
        // Selection Sort Algorithm
        var minIndex = 0;

        for (var i = 0; i < blocks.length; i++) {
            minIndex = i;

            blocks[i].style.backgroundColor = "#B7B597";
        
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
                await this.pause();
        
                // Get value of blocks
                var value1 = Number(blocks[minIndex].childNodes[0].innerHTML);
                var value2 = Number(blocks[j].childNodes[0].innerHTML);
        
                if (value1 > value2) {
                    if (minIndex !== i) {
                        blocks[minIndex].style.backgroundColor = "#3F9BBF";
                    }
                    minIndex = j;
                } else {
                    blocks[j].style.backgroundColor = "#3F9BBF";
                }
            }
        
            if (minIndex !== i) {
                await this.swap(blocks[i], blocks[minIndex]);
                // await swap(blocks[i], blocks[minIndex]);
                blocks = document.querySelectorAll(".block");
            }
        
            blocks[minIndex].style.backgroundColor = "#3F9BBF";
            blocks[i].style.backgroundColor = "#7A9D54";
        }
        
        isSorting = false;
        currentSort = null;
        updatePauseBtn();
    }

     // Swap function
    async swap(ele1, ele2) {
        return new Promise((resolve) => {
            // Swap the style heights
            var tempHeight = ele1.style.height;
            ele1.style.height = ele2.style.height;
            ele2.style.height = tempHeight;

            // Swap the labels
            var tempLabel = ele1.childNodes[0].innerHTML;
            ele1.childNodes[0].innerHTML = ele2.childNodes[0].innerHTML;
            ele2.childNodes[0].innerHTML = tempLabel;

            // Wait for the transition to end!
            window.requestAnimationFrame(function() {
                setTimeout(() => {
                    resolve();
                }, 250);
            });
        });
    }
}

var currentSortAlgorithm = 'selection';