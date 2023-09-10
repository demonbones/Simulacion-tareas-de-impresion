class Printer {
  constructor(ppm) {
    // páginas que la impresora imprime por minuto
    this.page_rate = ppm; //
    this.current_task = null;
    this.time_remaining = 0;
  }

  tick() {
    if (this.current_task !== null) {
      this.time_remaining = this.time_remaining - 1;
      if (this.time_remaining <= 0) {
        this.current_task = null;
      }
    }
  }

  busy() {
    if (this.current_task !== null) {
      return true;
    } else {
      return false;
    }
  }

  start_next(new_task) {
    this.current_task = new_task;
    this.time_remaining = (new_task.get_pages() * 60) / this.page_rate;
  }
}

export default Printer;
