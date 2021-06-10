export function getMergeSortAnimations(array) {
  const animations = [];
  if (array.length <= 1) return array;
  const auxiliaryArray = array.slice();
  mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);
  return animations;
}

function mergeSortHelper(
  mainArray,
  startIdx,
  endIdx,
  auxiliaryArray,
  animations
) {
  if (startIdx === endIdx) return;
  const middleIdx = Math.floor((startIdx + endIdx) / 2);
  mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
  mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);
  doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
}
function doMerge(
  mainArray,
  startIdx,
  middleIdx,
  endIdx,
  auxiliaryArray,
  animations
) {
  let k = startIdx;
  let i = startIdx;
  let j = middleIdx + 1;
  while (i <= middleIdx && j <= endIdx) {
    // These are the values that we're comparing; we push them once
    // to change their color.
    animations.push([i, j]);
    // These are the values that we're comparing; we push them a second
    // time to revert their color.
    animations.push([i, j]);
    if (auxiliaryArray[i] <= auxiliaryArray[j]) {
      // We overwrite the value at index k in the original array with the
      // value at index i in the auxiliary array.
      animations.push([k, auxiliaryArray[i]]);
      mainArray[k++] = auxiliaryArray[i++];
    } else {
      // We overwrite the value at index k in the original array with the
      // value at index j in the auxiliary array.
      animations.push([k, auxiliaryArray[j]]);
      mainArray[k++] = auxiliaryArray[j++];
    }
  }
  while (i <= middleIdx) {
    // These are the values that we're comparing; we push them once
    // to change their color.
    animations.push([i, i]);
    // These are the values that we're comparing; we push them a second
    // time to revert their color.
    animations.push([i, i]);
    // We overwrite the value at index k in the original array with the
    // value at index i in the auxiliary array.
    animations.push([k, auxiliaryArray[i]]);
    mainArray[k++] = auxiliaryArray[i++];
  }
  while (j <= endIdx) {
    // These are the values that we're comparing; we push them once
    // to change their color.
    animations.push([j, j]);
    // These are the values that we're comparing; we push them a second
    // time to revert their color.
    animations.push([j, j]);
    // We overwrite the value at index k in the original array with the
    // value at index j in the auxiliary array.
    animations.push([k, auxiliaryArray[j]]);
    mainArray[k++] = auxiliaryArray[j++];
  }
}

export function getQuickSortAnimations(array) {
  const animations = [];
  quickSort(array, 0, array.length - 1, animations);
  return animations;
}
function quickSort(arr, left, right, animations) {
  let index;
  if (arr.length > 1) {
    index = partition(arr, left, right, animations);
    if (left < index - 1) {
      quickSort(arr, left, index - 1, animations);
    }
    if (index < right) {
      quickSort(arr, index, right, animations);
    }
  }
  return arr;
}
function partition(arr, left, right, animations) {
  let pivotIdx = Math.floor((right + left) / 2);
  let pivot = arr[pivotIdx];
  let i = left;
  let j = right;
  animations.push({ pivot: pivotIdx });
  while (i <= j) {
    while (arr[i] < pivot) {
      i++;
    }
    // animations.push({left: i});
    while (arr[j] > pivot) {
      j--;
    }
    animations.push({ compare: [i, j] });
    animations.push({ compare: [i, j] });
    if (i <= j) {
      animations.push({ swap: [i, arr[j]] });
      animations.push({ swap: [j, arr[i]] });
      swap(arr, i, j);
      i++;
      j--;
    }
  }
  return i;
}

function swap(arr, a, b) {
  const temp = arr[a];
  arr[a] = arr[b];
  arr[b] = temp;
}
export function getHeapSortAnimations(arr) {
  const animations = [1];
  heapSort(arr, animations);
  return animations;
}
function heapSort(arr, animations) {
  if (arr.length < 2) return arr;
  let arrlength = arr.length;
  for (let i = Math.floor(arr.length / 2) - 1; i >= 0; i--) {
    heapify(arr, arrlength, i, animations);
  }
  for (let i = arr.length - 1; i > 0; i--) {
    animations.push({ swap: [0, arr[i]] });
    animations.push({ swap: [i, arr[0]] });
    swap(arr, 0, i);
    arrlength--;
    heapify(arr, arrlength, 0, animations);
  }
  return arr;
}

function heapify(arr, n, i, animations) {
  const left = i * 2 + 1;
  const right = i * 2 + 2;
  let max = i;

  if (left < n) {
    animations.push({ compare: [left, max] });
    animations.push({ compare: [left, max] });
    if (arr[left] > arr[max]) {
      max = left;
    }
  }
  if (right < n) {
    animations.push({ compare: [right, max] });
    animations.push({ compare: [right, max] });
    if (right < n && arr[right] > arr[max]) {
      max = right;
    }
  }
  if (max !== i) {
    animations.push({ swap: [i, arr[max]] });
    animations.push({ swap: [max, arr[i]] });
    swap(arr, i, max);
    heapify(arr, n, max, animations);
  }
}
