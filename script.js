document.addEventListener('DOMContentLoaded', () => {
  const arrayContainer = document.getElementById('array-container');
  const startBtn = document.getElementById('start-btn');

  // Generate a random array
  const array = Array.from({ length: 20 }, () => {
    return Math.floor(Math.random() * 100) + 1;
  });
  // console.log(array);

  // Create bars for visualization
  function createBars() {
    // Clear the container
    arrayContainer.innerHTML = '';
    array.forEach((value) => {
      const bar = document.createElement('div');
      bar.className = 'bar';
      bar.style.height = `${value * 3}px`;
      arrayContainer.append(bar);
    });
  }

  // Swap bar for the visualization
  async function swapBars(index1, index2) {
    const bars = document.querySelectorAll('.bar');
    bars[index1].style.height = `${array[index1] * 3}px`;
    bars[index2].style.height = `${array[index2] * 3}px`;

    bars[index1].classList.add('swapped');
    bars[index2].classList.add('swapped');

    await delay(300);

    bars[index1].classList.remove('swapped');
    bars[index2].classList.remove('swapped');
  }

  // Quick Sort
  async function quickSort(left, right) {
    if (left >= right) return;

    const pivotIndex = await partition(left, right);
    await quickSort(left, pivotIndex - 1);
    await quickSort(pivotIndex + 1, right);
  }

  // Partition fucntion
  async function partition(left, right) {
    const bars = document.querySelectorAll('.bar');
    const pivotValue = array[right];
    let partitionIndex = left;

    bars[right].classList.add('pivot');

    for (let i = left; i < right; i++) {
      bars[i].classList.add('compare');

      await delay(300);

      if (array[i] < pivotValue) {
        [array[i], array[partitionIndex]] = [array[partitionIndex], array[i]];
        await swapBars(i, partitionIndex);
        partitionIndex++;
      }

      bars[i].classList.remove('compare');
    }

    [array[partitionIndex], array[right]] = [
      array[right],
      array[partitionIndex],
    ];
    await swapBars(partitionIndex, right);

    bars[right].classList.remove('pivot');

    return partitionIndex;
  }

  // Delay for visualization
  function delay(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }

  // Initialize
  createBars();

  // Start sorting on button click
  startBtn.addEventListener('click', async () => {
    // Prevent multiple clicks
    startBtn.disabled = true;
    await quickSort(0, array.length - 1);
    startBtn.disabled = false;
  });
});
