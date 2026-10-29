// =====================================================================
//  app.js — La página: conecta el HTML con las funciones de notas.js
// =====================================================================

// LA LISTA VERDADERA: la única que se guarda y se modifica (añadir y borrar).
// Es una copia de ALUMNOS_INICIALES para no tocar la constante original.
const alumnos = ALUMNOS_INICIALES.map(alumno => ({ ...alumno }));

// Elementos del HTML que vamos a usar
const selectFiltro = document.getElementById("filtro");
const selectOrden = document.getElementById("orden");
const cuerpoTabla = document.getElementById("cuerpo-tabla");
const formulario = document.getElementById("form-alumno");
const inputNombre = document.getElementById("nombre");
const inputNota = document.getElementById("nota");
const mensaje = document.getElementById("mensaje");
const resumen = document.getElementById("resumen");

/**
 * Formatea una nota al estilo español: 7.5 → "7,5".
 * @param {number} nota
 * @returns {string}
 */
function formatearNota(nota) {
  return nota.toLocaleString("es-ES");
}

/**
 * ÚNICA función que dibuja la tabla. Se llama cada vez que algo cambia.
 * 1. Coge la lista verdadera.  2. Filtra (copia).  3. Ordena (copia).  4. Pinta.
 * No cambia la lista: filtrar y ordenar devuelven copias.
 */
function pintarTabla() {
  const filtrados = filtrarAlumnos(alumnos, selectFiltro.value);
  const visibles = ordenarAlumnos(filtrados, selectOrden.value);

  cuerpoTabla.innerHTML = ""; // vaciamos la tabla antes de volver a pintarla

  if (visibles.length === 0) {
    const fila = document.createElement("tr");
    const celda = document.createElement("td");
    celda.colSpan = 3;
    celda.className = "vacio";
    celda.textContent = "No hay alumnos que mostrar.";
    fila.appendChild(celda);
    cuerpoTabla.appendChild(fila);
  } else {
    visibles.forEach(alumno => {
      const fila = document.createElement("tr");

      const celdaNombre = document.createElement("td");
      celdaNombre.textContent = alumno.nombre;

      const celdaNota = document.createElement("td");
      celdaNota.textContent = formatearNota(alumno.nota);
      celdaNota.className = alumno.nota >= 5 ? "aprobado" : "suspenso";

      const celdaBorrar = document.createElement("td");
      celdaBorrar.className = "col-borrar";
      const boton = document.createElement("button");
      boton.type = "button";
      boton.className = "btn-borrar";
      boton.textContent = "✕";
      boton.title = "Borrar a " + alumno.nombre;
      boton.addEventListener("click", () => {
        borrarPorNombre(alumnos, alumno.nombre); // se borra de la lista VERDADERA
        pintarTabla();
      });
      celdaBorrar.appendChild(boton);

      fila.append(celdaNombre, celdaNota, celdaBorrar);
      cuerpoTabla.appendChild(fila);
    });
  }

  pintarResumen();
}

/**
 * Escribe el resumen de la clase usando las funciones de la Fase 3.
 * Siempre sobre la lista verdadera completa (no sobre la filtrada).
 */
function pintarResumen() {
  const maxima = notaMaxima(alumnos);
  const datos = [
    { valor: alumnos.length, texto: "Alumnos" },
    { valor: notaMedia(alumnos).toFixed(2).replace(".", ","), texto: "Nota media" },
    { valor: maxima === null ? "—" : formatearNota(maxima), texto: "Nota máxima" },
    { valor: aprobados(alumnos).length, texto: "Aprobados" }
  ];

  resumen.innerHTML = "";
  datos.forEach(dato => {
    const caja = document.createElement("div");
    caja.className = "dato";
    const numero = document.createElement("strong");
    numero.textContent = dato.valor;
    const etiqueta = document.createElement("span");
    etiqueta.textContent = dato.texto;
    caja.append(numero, etiqueta);
    resumen.appendChild(caja);
  });
}

/**
 * Muestra un mensaje en la página (sin alert).
 * @param {string} texto
 * @param {"error" | "ok"} tipo
 */
function mostrarMensaje(texto, tipo) {
  mensaje.textContent = texto;
  mensaje.className = "mensaje " + tipo;
}

// Paso 3 · Filtro y orden: al cambiar un selector, se vuelve a dibujar
selectFiltro.addEventListener("change", pintarTabla);
selectOrden.addEventListener("change", pintarTabla);

// Paso 4 · Añadir
formulario.addEventListener("submit", evento => {
  evento.preventDefault(); // evita que el formulario recargue la página

  const nombre = inputNombre.value.trim();
  const textoNota = inputNota.value;

  if (nombre === "") {
    mostrarMensaje("Escribe un nombre.", "error");
    return;
  }
  if (buscarPorNombre(alumnos, nombre) !== undefined) {
    mostrarMensaje("Ya hay un alumno llamado " + nombre + ".", "error");
    return;
  }
  if (!esNotaValida(textoNota)) {
    mostrarMensaje("La nota tiene que ser un número de 0 a 10.", "error");
    return;
  }

  const nota = Number(textoNota.trim().replace(",", "."));
  anadirAlumno(alumnos, nombre, nota);
  mostrarMensaje(nombre + " añadido con un " + formatearNota(nota) + ".", "ok");
  formulario.reset();
  inputNombre.focus();
  pintarTabla();
});

// Primer dibujado al cargar la página
pintarTabla();
