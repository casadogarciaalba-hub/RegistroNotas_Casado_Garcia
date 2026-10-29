// =====================================================================
//  notas.js — Lógica del registro de notas (solo datos, nada de HTML)
// =====================================================================

/**
 * Lista inicial de la clase. Cada alumno es un objeto { nombre, nota }.
 * Es constante: la página trabaja sobre una COPIA de esta lista.
 */
const ALUMNOS_INICIALES = [
  { nombre: "Ana", nota: 7.5 },
  { nombre: "Luis", nota: 4 },
  { nombre: "Marta", nota: 9.25 },
  { nombre: "Pablo", nota: 5 },
  { nombre: "Lucía", nota: 10 },
  { nombre: "Diego", nota: 3.5 },
  { nombre: "Elena", nota: 6.75 },
  { nombre: "Hugo", nota: 9 },
  { nombre: "Sara", nota: 1 },
  { nombre: "Iván", nota: 5.5 }
];

// ---------------------------------------------------------------------
//  FASE 2 · Añadir, quitar, buscar y ordenar
// ---------------------------------------------------------------------

/**
 * Añade un alumno al final de la lista.
 * CAMBIA la lista (usa push).
 * @param {Array<{nombre: string, nota: number}>} lista - Lista de alumnos.
 * @param {string} nombre - Nombre del alumno nuevo.
 * @param {number} nota - Nota del alumno nuevo.
 * @returns {number} La nueva cantidad de alumnos.
 */
function anadirAlumno(lista, nombre, nota) {
  return lista.push({ nombre: nombre, nota: nota });
}

/**
 * Quita el último alumno de la lista.
 * CAMBIA la lista (usa pop).
 * @param {Array<{nombre: string, nota: number}>} lista - Lista de alumnos.
 * @returns {{nombre: string, nota: number} | undefined} El alumno quitado
 *          (undefined si la lista estaba vacía).
 */
function quitarUltimo(lista) {
  return lista.pop();
}

/**
 * Busca un alumno por su nombre exacto.
 * NO cambia la lista (usa find).
 * @param {Array<{nombre: string, nota: number}>} lista - Lista de alumnos.
 * @param {string} nombre - Nombre que se busca.
 * @returns {{nombre: string, nota: number} | undefined} El alumno, o undefined si no existe.
 */
function buscarPorNombre(lista, nombre) {
  return lista.find(alumno => alumno.nombre === nombre);
}

/**
 * Mete un alumno en una posición concreta sin borrar a nadie.
 * CAMBIA la lista (usa splice con 0 elementos a borrar).
 * @param {Array<{nombre: string, nota: number}>} lista - Lista de alumnos.
 * @param {number} posicion - Índice donde se inserta (0 = al principio).
 * @param {string} nombre - Nombre del alumno.
 * @param {number} nota - Nota del alumno.
 * @returns {void} No devuelve nada.
 */
function insertarEn(lista, posicion, nombre, nota) {
  lista.splice(posicion, 0, { nombre: nombre, nota: nota });
}

/**
 * Borra al alumno que tenga ese nombre.
 * CAMBIA la lista (usa findIndex + splice).
 * @param {Array<{nombre: string, nota: number}>} lista - Lista de alumnos.
 * @param {string} nombre - Nombre del alumno a borrar.
 * @returns {boolean} true si se ha borrado a alguien, false si no existía.
 */
function borrarPorNombre(lista, nombre) {
  const indice = lista.findIndex(alumno => alumno.nombre === nombre);
  if (indice === -1) {
    return false;
  }
  lista.splice(indice, 1);
  return true;
}

/**
 * Ordena de la nota más alta a la más baja.
 * NO cambia la lista: hace una copia con [...lista] y ordena la copia.
 * @param {Array<{nombre: string, nota: number}>} lista - Lista de alumnos.
 * @returns {Array<{nombre: string, nota: number}>} Copia ordenada por nota descendente.
 */
function ordenarPorNota(lista) {
  return [...lista].sort((a, b) => b.nota - a.nota);
}

/**
 * Ordena alfabéticamente de la A a la Z (respetando tildes del español).
 * NO cambia la lista: ordena una copia.
 * @param {Array<{nombre: string, nota: number}>} lista - Lista de alumnos.
 * @returns {Array<{nombre: string, nota: number}>} Copia ordenada por nombre.
 */
function ordenarPorNombre(lista) {
  return [...lista].sort((a, b) => a.nombre.localeCompare(b.nombre, "es"));
}

// ---------------------------------------------------------------------
//  FASE 3 · Estadísticas de la clase (ninguna cambia la lista)
// ---------------------------------------------------------------------

/**
 * Calcula la nota media, sin redondear.
 * NO cambia la lista (usa reduce).
 * @param {Array<{nombre: string, nota: number}>} lista - Lista de alumnos.
 * @returns {number} La media, o 0 si no hay alumnos.
 */
function notaMedia(lista) {
  // El 0 del final es el VALOR INICIAL del acumulador: sin él, falla con la lista vacía.
  const suma = lista.reduce((acumulado, alumno) => acumulado + alumno.nota, 0);
  return lista.length === 0 ? 0 : suma / lista.length;
}

/**
 * Devuelve la nota más alta.
 * NO cambia la lista (usa reduce).
 * @param {Array<{nombre: string, nota: number}>} lista - Lista de alumnos.
 * @returns {number | null} La nota máxima, o null si no hay alumnos.
 */
function notaMaxima(lista) {
  if (lista.length === 0) {
    return null;
  }
  return lista.reduce(
    (maxima, alumno) => (alumno.nota > maxima ? alumno.nota : maxima),
    lista[0].nota
  );
}

/**
 * Devuelve los alumnos aprobados (nota de 5 o más).
 * NO cambia la lista (usa filter, que crea un array nuevo).
 * @param {Array<{nombre: string, nota: number}>} lista - Lista de alumnos.
 * @returns {Array<{nombre: string, nota: number}>} Nuevo array con los aprobados.
 */
function aprobados(lista) {
  return lista.filter(alumno => alumno.nota >= 5);
}

/**
 * Devuelve solo los nombres de los aprobados.
 * NO cambia la lista (usa aprobados + map).
 * @param {Array<{nombre: string, nota: number}>} lista - Lista de alumnos.
 * @returns {string[]} Array con los nombres de los aprobados.
 */
function nombresAprobados(lista) {
  return aprobados(lista).map(alumno => alumno.nombre);
}

/**
 * Indica si algún alumno tiene un 10.
 * NO cambia la lista (usa some).
 * @param {Array<{nombre: string, nota: number}>} lista - Lista de alumnos.
 * @returns {boolean} true si al menos un alumno tiene un 10.
 */
function hayAlgunDiez(lista) {
  return lista.some(alumno => alumno.nota === 10);
}

/**
 * Indica si todos los alumnos han aprobado.
 * NO cambia la lista (usa every).
 * @param {Array<{nombre: string, nota: number}>} lista - Lista de alumnos.
 * @returns {boolean} true si todos tienen 5 o más (también true con la lista vacía).
 */
function todosAprobados(lista) {
  return lista.every(alumno => alumno.nota >= 5);
}

/**
 * Devuelve los n mejores alumnos, de la nota más alta a la más baja.
 * NO cambia la lista (usa ordenarPorNota, que copia, + slice).
 * @param {Array<{nombre: string, nota: number}>} lista - Lista de alumnos.
 * @param {number} n - Cuántos alumnos se quieren.
 * @returns {Array<{nombre: string, nota: number}>} Los n mejores.
 */
function ranking(lista, n) {
  return ordenarPorNota(lista).slice(0, n);
}

// ---------------------------------------------------------------------
//  FASE 4 · Funciones para la página
// ---------------------------------------------------------------------

/**
 * Filtra los alumnos según el filtro elegido.
 * NO cambia la lista: siempre devuelve un array nuevo.
 * @param {Array<{nombre: string, nota: number}>} lista - Lista de alumnos.
 * @param {"todos" | "aprobados" | "suspensos"} filtro - Qué alumnos mostrar.
 * @returns {Array<{nombre: string, nota: number}>} Copia con los alumnos que cumplen el filtro.
 */
function filtrarAlumnos(lista, filtro) {
  if (filtro === "aprobados") {
    return aprobados(lista);
  }
  if (filtro === "suspensos") {
    return lista.filter(alumno => alumno.nota < 5);
  }
  return [...lista]; // "todos": una copia de toda la lista
}

/**
 * Ordena los alumnos según el criterio elegido. Usa las funciones de la Fase 2.
 * NO cambia la lista: devuelve una copia ordenada.
 * @param {Array<{nombre: string, nota: number}>} lista - Lista de alumnos.
 * @param {"nombre" | "nota-desc" | "nota-asc"} criterio - Cómo ordenar.
 * @returns {Array<{nombre: string, nota: number}>} Copia ordenada.
 */
function ordenarAlumnos(lista, criterio) {
  if (criterio === "nombre") {
    return ordenarPorNombre(lista);
  }
  if (criterio === "nota-asc") {
    // ordenarPorNota ya devuelve una copia, así que darle la vuelta no toca la original
    return ordenarPorNota(lista).reverse();
  }
  return ordenarPorNota(lista); // "nota-desc"
}

/**
 * Comprueba si un texto es una nota válida (número de 0 a 10).
 * Acepta punto o coma decimal: "7.5" y "7,5".
 * NO trabaja con la lista.
 * @param {string} texto - Lo que ha escrito el usuario.
 * @returns {boolean} true si es un número entre 0 y 10; false si está vacío o no es un número.
 */
function esNotaValida(texto) {
  if (texto.trim() === "") {
    return false;
  }
  const numero = Number(texto.trim().replace(",", "."));
  return !Number.isNaN(numero) && numero >= 0 && numero <= 10;
}

// Permite probar este archivo con Node.js (en el navegador se ignora).
if (typeof module !== "undefined") {
  module.exports = {
    ALUMNOS_INICIALES, anadirAlumno, quitarUltimo, buscarPorNombre, insertarEn,
    borrarPorNombre, ordenarPorNota, ordenarPorNombre, notaMedia, notaMaxima,
    aprobados, nombresAprobados, hayAlgunDiez, todosAprobados, ranking,
    filtrarAlumnos, ordenarAlumnos, esNotaValida
  };
}
