/* soph_code.js */

// This code calculates the Fibonacci sequence up to a given number
// It also implements memoization to improve performance

function fibonacci(n) {
  if (n <= 1) {
    return n;
  }

  if (fibonacci.cache[n]) {
    return fibonacci.cache[n];
  }

  fibonacci.cache[n] = fibonacci(n - 1) + fibonacci(n - 2);
  return fibonacci.cache[n];
}

fibonacci.cache = {};

function printFibonacciSequence(limit) {
  for (let i = 0; i <= limit; i++) {
    console.log(`Fibonacci(${i}) = ${fibonacci(i)}`);
  }
}

printFibonacciSequence(20);

// This code implements a binary search algorithm on a sorted array

function binarySearch(arr, key, start, end) {
  if (start > end) {
    return -1;
  }

  const mid = Math.floor((start + end) / 2);

  if (arr[mid] === key) {
    return mid;
  } else if (arr[mid] < key) {
    return binarySearch(arr, key, mid + 1, end);
  } else {
    return binarySearch(arr, key, start, mid - 1);
  }
}

const sortedArray = [2, 5, 8, 12, 16, 23, 38, 56, 72, 91];
const searchKey = 23;
const resultIndex = binarySearch(sortedArray, searchKey, 0, sortedArray.length - 1);

console.log(`Index of ${searchKey} in the array: ${resultIndex}`);

// This code implements a simple linked list

class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
  }

  append(data) {
    const newNode = new Node(data);

    if (!this.head) {
      this.head = newNode;
    } else {
      let currNode = this.head;
      while (currNode.next) {
        currNode = currNode.next;
      }
      currNode.next = newNode;
    }
  }

  printList() {
    let currNode = this.head;
    while (currNode) {
      console.log(currNode.data);
      currNode = currNode.next;
    }
  }
}

const linkedList = new LinkedList();
linkedList.append("Node 1");
linkedList.append("Node 2");
linkedList.append("Node 3");
linkedList.printList();