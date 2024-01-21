// Variables de Elementos Hmtl
const tablaDeTareas = document.querySelector("tbody")
const tareaInput = document.querySelector("#nuevaTarea")
const btnAgregar = document.querySelector("#agregarTarea")
const cuentaTareas = document.querySelector("#cuenta-tareas");
const cuentaTareasRealizadas = document.querySelector("#cuenta-tareas-realizadas");

// Array de Tareas
const tareas = [
    {
        id: 1,
        tarea: 'Levantarse y sacar la basura',
        estado: true,
    },
    {
        id: 2,
        tarea: 'Sacar a pasear el perro',
        estado: false,
    },
    {
        id: 3,
        tarea: 'Ir a trabajar',
        estado: true,
    }
]

// Renderizar Tareas verificando si esta tickeado el checkbox
function mostrarTareas() {
    let html = "";
    for (let tarea of tareas) {
        html += `<tr>
                    <td>${tarea.id}</td>
                    <td>${tarea.tarea}</td>
                    <td><input type="checkbox" ${tarea.estado ? 'checked' : ''} onchange="cambiarEstado(${tarea.id}, this.checked)"></td>
                    <td><span onclick="borrar(${tarea.id})" class="icons mdi mdi-delete-forever"></span></td>
                </tr>`;
    }
    tablaDeTareas.innerHTML = html;
    cuentaTareas.textContent = `${tareas.length}`;
    cuentaTareasRealizadas.textContent = `${tareas.filter(t => t.estado).length}`;
}
mostrarTareas();

// Agregar Tareas al Array verificando que el input no este vacío   
btnAgregar.addEventListener("click", () => {
    const tarea = tareaInput.value.trim();
    if (tarea !== "") {
        // Encontrar el máximo ID actual
        const maxId = Math.max(...tareas.map(t => t.id), 0);
        tareas.push({ id: maxId + 1, tarea: tarea, estado: false });
        tareaInput.value = "";
        mostrarTareas();
    } else {
        alert("Debe agregar una tarea");
    }
});

// Funcion eliminar tarea preguntando si esta seguro de querer eliminarla
function borrar(id) {
    const confirmacion = confirm("¿Está seguro de que desea borrar la tarea?");
    if (confirmacion) {
        const index = tareas.findIndex((ele) => ele.id == id)
        tareas.splice(index, 1)
        mostrarTareas();
    }
}

// Funcion Cambiar Estado de Tarea
function cambiarEstado(id, nuevoEstado) {
    const tarea = tareas.find(t => t.id == id);
    if (tarea) {
        tarea.estado = nuevoEstado;
        mostrarTareas();
    }
}