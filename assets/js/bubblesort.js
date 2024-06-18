
// Bubble Sort
class BubbleSort extends SortStrategy {
    async sort() {
        var blocks = document.querySelectorAll(".block");
        isSorting = true;
        isPaused = false; // ensure sorting is not paused initially
        updatePauseBtn();
        
        // Bubble Sort Algorithm
        for(var i = 0; i < blocks.length; i++) {
            for (var j = 0; j < blocks.length - i - 1; j++) {
                
                // check if the sorting is stopped (shouldStop = true)
                if (shouldStop) {
                    isSorting = false;
                    shouldStop = false; // reset shouldStop
                    updatePauseBtn();
                    return;
                }
        
                // Change color of blocks that compare
                blocks[j].style.backgroundColor = "#B2533E";
                blocks[j + 1].style.backgroundColor = "#B2533E";
        
                // create time interval to pause/resume sorting
                await this.pause();
        
                // Get value of blocks
                // childNode[0]: label of block
                // innerHTML: value of label
                var value1 = Number(blocks[j].childNodes[0].innerHTML) //transfer string to number
                var value2 = Number(blocks[j+1].childNodes[0].innerHTML)    
        
                if (value1 > value2) {
                    await this.swap(blocks[j], blocks[j + 1]);
                    blocks = document.querySelectorAll(".block");
                    
                }
                // Change color to the previous one
                blocks[j].style.backgroundColor = "#3F9BBF";
                blocks[j + 1].style.backgroundColor = "#3F9BBF";
            }
            blocks[blocks.length - i - 1].style.backgroundColor = "#7A9D54";
        }
        
        isSorting = false;
        currentSort = null;
        updatePauseBtn();

    }

    async swap(ele1, ele2) {
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
}

// set current sort algorithm
var currentSortAlgorithm = 'bubble'; 