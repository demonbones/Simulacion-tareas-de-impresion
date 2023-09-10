class Task {
  constructor(time) {
    this.timestamp = time;
    this.pages = Math.floor(Math.random() * 20) + 1;
  }

  get_stamp() {
    return this.timestamp;
  }

  get_pages() {
    return this.pages;
  }

  wait_time(current_time) {
    return current_time - this.timestamp;
  }
}
export default Task;
