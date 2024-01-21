import chalk from "chalk";
import readline from "readline";

const read = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let tareas = [];

const listar = () => {
  if (tareas.length === 0) {
    console.log(chalk.blue("No hay tareas."));
  } else {
    console.log(chalk.blue("Tareas"));
    tareas.forEach((tarea, indice) => {
      const estado = tarea.completada
        ? chalk.green("Completada")
        : chalk.red("Pendiente");
      console.log(indice + 1 + ".   " + tarea.descripcion + "   -   " + estado);
    });
  }
  console.log("\n");
};

const crear = (descripcion) => {
  tareas.push({
    descripcion,
    completada: false,
  });
  listar();
};

const completar = (indice) => {
  if (indice >= 0 && indice < tareas.length) {
    tareas[indice].completada = true;
  } else {
    console.log(chalk.blue("No existe la tarea"));
  }
  listar();
};

const borrar = (indice) => {
  indice = parseInt(indice, 10);
  if (indice >= 0 && indice < tareas.length) {
    tareas.splice(indice, 1);
  } else {
    console.log(chalk.blue("No existe la tarea"));
  }
  listar();
};

const menu = () => {
  console.log(chalk.blue("Lista de tareas"));
  console.log("1. Listar tareas");
  console.log("2. Crear tarea");
  console.log("3. Completar tarea");
  console.log("4. Borrar tarea");
  console.log("0. Salir \n");
  read.question("Digite el número de la opción que desee: ", (eleccion) => {
    if (eleccion === "0") {
      console.log("Adiós");
      read.close();
    } else {
      switch (eleccion) {
        case "1":
          listar();
          menu();
          break;
        case "2":
          read.question(
            "Ingrese la tarea que desea agregar: ",
            (descripcion) => {
              crear(descripcion);
              menu();
            }
          );
          break;
        case "3":
          read.question("Ingrese el número de tarea completada: ", (indice) => {
            completar(indice - 1);
            menu();
          });
          break;
        case "4":
          read.question(
            "Ingrese el número de tarea que desea borrar: ",
            (indice) => {
              borrar(indice - 1);
              menu();
            }
          );
          break;
        default:
          console.log(
            chalk.red("Error, digite el número de la opción que desee usar.")
          );
          menu();
          break;
      }
    }
  });
};

menu();
