# Registro de notas

Práctica 2 de Arrays · Desarrollo Web en Entorno Cliente · 2º DAW · IES Juan García Valdemora
Alba Casado García

Página para ver, filtrar, ordenar, añadir y borrar los alumnos de una clase con sus notas.

## Archivos

| Archivo | Para qué sirve |
|---|---|
| `index.html` | Estructura de la página: resumen, selectores, tabla y formulario |
| `estilos.css` | Diseño; verde para aprobados y rojo para suspensos |
| `notas.js` | Lógica con arrays (no toca el HTML) |
| `app.js` | Conecta la página con `notas.js`: dibuja la tabla y gestiona los eventos |
| `notas.md` | Apuntes, predicciones y respuestas de cada fase |

## Funciones que **cambian** la lista

- `anadirAlumno` — `push`
- `quitarUltimo` — `pop`
- `insertarEn` — `splice(posicion, 0, alumno)`
- `borrarPorNombre` — `findIndex` + `splice(indice, 1)`

## Funciones que **no cambian** la lista (devuelven una copia o un dato)

- `buscarPorNombre` — `find` → un alumno o `undefined`
- `ordenarPorNota` — `[...lista].sort(...)` → copia ordenada
- `ordenarPorNombre` — `[...lista].sort(localeCompare)` → copia ordenada
- `notaMedia` — `reduce` → número
- `notaMaxima` — `reduce` → número o `null`
- `aprobados` — `filter` → array nuevo
- `nombresAprobados` — `aprobados` + `map` → array de nombres
- `hayAlgunDiez` — `some` → `true` / `false`
- `todosAprobados` — `every` → `true` / `false`
- `ranking` — `ordenarPorNota` + `slice` → array nuevo
- `filtrarAlumnos` — `filter` / `[...lista]` → array nuevo
- `ordenarAlumnos` — funciones de ordenar de la Fase 2 → copia ordenada
- `esNotaValida` — no recibe la lista → `true` / `false`
