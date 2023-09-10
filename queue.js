class Queue {
  constructor() {
    this.items = [];
  }

  enqueue(item) {
    this.items.push(item);
  }

  dequeue() {
    return this.items.shift();
  }

  is_empty() {
    return this.items.length === 0;
  }

  size() {
    return this.items.length;
  }
}

export default Queue;
