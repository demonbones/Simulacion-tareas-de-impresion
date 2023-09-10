import Queue from "./queue.js";
import Printer from "./printer.js";
import Task from "./task.js";

// Si el número es 180, decimos que se ha creado una tarea
function newPrinterTask() {
  const num = Math.floor(Math.random() * 180) + 1;
  if (num === 180) {
    return true;
  } else {
    return false;
  }
}

function simulation(numSeconds, pagesPerMinute) {
  // se crea una instancia de la clase impresora
  const labPrinter = new Printer(pagesPerMinute);
  // se crea una instancia de la clase cola
  const printQueue = new Queue();
  //  guarda el tiempo que la tarea pasó en la cola antes de que comience su impresión.
  const waitingTimes = [];

  for (let currentSecond = 0; currentSecond < numSeconds; currentSecond++) {
    /*Por cada segundo podemos simular la posibilidad de que se produzca una tarea de impresión 
    generando un número aleatorio entre 1 y 180. 
    Si el número es 180, decimos que se ha creado una tarea.*/
    if (newPrinterTask()) {
      // Crear una tarea de impresión.
      // A cada tarea se le dará una marca de tiempo (el segundo en el que fue creada)
      const task = new Task(currentSecond);
      // agrega una tarea a la cola con 'currentSecond' como la marca de tiempo.
      printQueue.enqueue(task);
    }

    // Si la impresora no está ocupada y si una tarea está en cola, usamos la impresora
    if (!labPrinter.busy() && !printQueue.is_empty()) {
      // Extraemos la siguiente tarea de la cola
      const nexTask = printQueue.dequeue();
      /*restamos el segundo en el que fue creada la tarea con el segundo actual para esta tarea.
        Añadimos el tiempo de espera para esa tarea a una lista para su procesamiento posterior */
      waitingTimes.push(nexTask.wait_time(currentSecond));
      // se asigna la tarea a la impresora
      labPrinter.start_next(nexTask);
    }
    // Con base en el número de páginas en la tarea de impresión averigüa cuánto tiempo se requerirá.
    // La impresora ejecuta un segundo de impresión, También resta un segundo del tiempo requerido para esa tarea.
    // Si la tarea se ha completado, en otras palabras, el tiempo requerido ha llegado a cero, la impresora ya no está ocupada.
    labPrinter.tick();
  }

  // Una vez completada la simulación, calcula el tiempo de espera promedio usando la lista de tiempos de espera generados
  const averageWait =
    waitingTimes.reduce(
      (acumulador, valorActual) => acumulador + valorActual,
      0
    ) / waitingTimes.length;

  console.log(
    `promedio de tiempo que los estudiantes esperarán a que sus trabajos sean impresos  ${averageWait.toFixed(
      2
    )} segundos   ${printQueue.size()}  tareas restantes en una hora.`
  );
}

// 3600 segundos es igual a 1 hora

for (let i = 0; i < 10; i++) {
  simulation(3600, 5);
}
