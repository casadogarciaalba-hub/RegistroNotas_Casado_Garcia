# Práctica 2 · Arrays — Apuntes

**Alumna:** Alba Casado García · DWEC · 2º DAW · IES Juan García Valdemora

---

## Fase 1 · Explora los arrays

| Línea | Código | Mi predicción | Lo que salió | ¿Cambia el original? |
|---|---|---|---|---|
| 1 | `a[0]` | `"x"` | `"x"` | — |
| 2 | `a[3]` | Error | `undefined` | — |
| 3 | `a.length` | `3` | `3` | — |
| 4 | `[1, "dos", true].length` | `3` | `3` | — |
| 5 | `const c = [1]; c.push(2); c` | Error (es `const`) | `[1, 2]` | Sí |
| 6 | `q.push(4)` y mirar `p` | `p = [1, 2, 3]` | devuelve `4`; `p = [1, 2, 3, 4]` | Sí, `p` también |
| 7 | `let r = [...p]; r.push(5)` y mirar `p` | `p = [1, 2, 3, 4]` | devuelve `5`; `p = [1, 2, 3, 4]` | No |
| 8 | `[10, 9, 1].sort()` | `[1, 9, 10]` | `[1, 10, 9]` | Sí (ordena en el sitio) |
| 9 | `[10, 9, 1].sort((x, y) => x - y)` | `[1, 9, 10]` | `[1, 9, 10]` | Sí |
| 10 | `n.push(4)` | `4` | devuelve `4`; `n = [3, 1, 2, 4]` | **Sí** |
| 11 | `n.pop()` | `2` | devuelve `2`; `n = [3, 1]` | **Sí** |
| 12 | `n.slice(0, 2)` | `[3, 1]` | devuelve `[3, 1]`; `n = [3, 1, 2]` | **No** |
| 13 | `n.map(x => x * 2)` | `[6, 2, 4]` | devuelve `[6, 2, 4]`; `n = [3, 1, 2]` | **No** |

### Preguntas

**1. ¿Qué da `a[3]` si el array solo tiene 3 elementos? ¿Por qué?**
Da `undefined`. Los índices empiezan en 0, así que un array de 3 elementos tiene las posiciones 0, 1 y 2. La posición 3 no existe y JavaScript no lanza un error: simplemente devuelve `undefined`.

**2. ¿Por qué `q.push(4)` cambió `p` y `r.push(5)` no? Copiar vs. referenciar.**
`let q = p` no copia el array: hace que `q` apunte al **mismo** array que `p` (es una **referencia**). Hay un solo array con dos nombres, así que lo que se hace por `q` se ve por `p`.
`let r = [...p]` sí hace una **copia**: el operador spread `...` saca los elementos de `p` y los mete en un array **nuevo**. `r` y `p` son arrays distintos, por eso cambiar `r` no afecta a `p`.
(Lo mismo explica la línea 5: `const` impide reasignar la variable, `c = otraCosa`, pero no impide cambiar el contenido del array.)

**3. ¿Por qué `[10, 9, 1].sort()` no dio `[1, 9, 10]`?**
Porque `sort()` sin función de comparación convierte los elementos a **texto** y los ordena como en un diccionario, carácter a carácter. `"10"` empieza por `"1"`, que va antes que `"9"`, así que queda `[1, 10, 9]`. Para ordenar números hay que pasarle `(x, y) => x - y`.

**4. ¿Cuáles cambian el array y cuáles devuelven uno nuevo?**
- Cambian el array (mutan): `push` y `pop`.
- Devuelven uno nuevo sin tocar el original: `slice` y `map`.

---

## Fase 2 · Añadir, quitar, buscar y ordenar

| Función | Método principal | ¿Cambia la lista? |
|---|---|---|
| `anadirAlumno` | `push` | **cambia** |
| `quitarUltimo` | `pop` | **cambia** |
| `buscarPorNombre` | `find` | no cambia |
| `insertarEn` | `splice(pos, 0, nuevo)` | **cambia** |
| `borrarPorNombre` | `findIndex` + `splice(i, 1)` | **cambia** |
| `ordenarPorNota` | `[...lista].sort(...)` | no cambia |
| `ordenarPorNombre` | `[...lista].sort(localeCompare)` | no cambia |

**Comprobación con los 10 alumnos:** `ordenarPorNota(ALUMNOS_INICIALES)` da Lucía (10), Marta (9,25), Hugo (9), Ana (7,5), Elena (6,75), Iván (5,5), Pablo (5), Luis (4), Diego (3,5), Sara (1).
Lucía sale primera, pero **el segundo puesto es Marta (9,25), no Hugo (9)**: el enunciado pone a Hugo segundo, pero 9,25 es mayor que 9. Hugo sale tercero, que es lo correcto.

### Preguntas

**1. ¿Qué funciones cambian la lista y cuáles no? ¿Cómo lo sabes?**
Cambian la lista `anadirAlumno`, `quitarUltimo`, `insertarEn` y `borrarPorNombre`, porque usan métodos que modifican el array en el sitio (`push`, `pop`, `splice`). No la cambian `buscarPorNombre` (solo lee con `find`), `ordenarPorNota` y `ordenarPorNombre` (ordenan una copia). Lo he comprobado en la consola mirando la lista antes y después de llamar a cada función.

**2. ¿Por qué `ordenarPorNota` hace una copia antes de ordenar?**
Porque `sort()` modifica el array original. Si ordenara la lista directamente, perderíamos el orden en que estaban los alumnos y cualquier otra parte del programa que use esa lista la vería desordenada. Con `[...lista]` ordenamos una copia y la lista original se queda igual.

**3. ¿Qué pasaría con las notas 10, 9 y 1 sin función de comparación?**
Se ordenarían como texto: `"1"`, `"10"`, `"9"`. Saldrían 1, 10, 9 en vez de 10, 9, 1. Por eso uso `(a, b) => b.nota - a.nota`: si el resultado es positivo, `b` va antes que `a`, y así quedan de mayor a menor.

---

## Fase 3 · Estadísticas de la clase

### Experimento 1 · Todas las funciones con la lista vacía `[]`

| Función | Resultado con `[]` |
|---|---|
| `notaMedia([])` | `0` |
| `notaMaxima([])` | `null` |
| `aprobados([])` | `[]` |
| `nombresAprobados([])` | `[]` |
| `hayAlgunDiez([])` | `false` |
| `todosAprobados([])` | `true` |
| `ranking([], 2)` | `[]` |

### Experimento 2 · Quitar el valor inicial del `reduce` de `notaMedia`

Con `lista.reduce((acumulado, alumno) => acumulado + alumno.nota)` (sin el `, 0`) y la lista vacía, sale:

```
TypeError: Reduce of empty array with no initial value
```

Además, con una lista **con** alumnos el resultado también sale mal: sin valor inicial, el acumulador empieza siendo el primer **objeto** alumno, y al sumarle un número JavaScript lo convierte a texto (`"[object Object]4..."`). Después volví a poner el `0`.

### Preguntas

**1. ¿Por qué `reduce` necesita un valor inicial cuando la lista está vacía?**
`reduce` va acumulando: empieza con un valor y le va sumando cada elemento. Si no le das valor inicial, usa el primer elemento del array como punto de partida. Con una lista vacía no hay primer elemento, así que no tiene de dónde empezar y lanza un `TypeError`. Con el `0` empieza en 0 y, si no hay elementos, devuelve ese 0.

**2. ¿Qué devuelve `todosAprobados` con una lista vacía? ¿Es lógico?**
Devuelve `true`. Tiene sentido: `every` pregunta "¿hay algún alumno que **no** cumpla la condición?". Si no hay alumnos, no hay ninguno que suspenda, así que la respuesta es verdadera (en lógica se llama "verdad vacía"). Igual que `some` devuelve `false`: si no hay alumnos, no hay ninguno con un 10.

**3. ¿Qué diferencia hay entre `map` y `filter`?**
- `map` **transforma** cada elemento y devuelve un array con la **misma cantidad** de elementos.
  Ejemplo de mi código: `aprobados(lista).map(alumno => alumno.nombre)` convierte cada objeto alumno en su nombre.
- `filter` **selecciona** elementos: devuelve un array con los que cumplen la condición, sin cambiarlos, y puede tener **menos** elementos.
  Ejemplo de mi código: `lista.filter(alumno => alumno.nota >= 5)` se queda solo con los aprobados.

---

## Fase 4 · Tabla dinámica

### Preguntas

**1. ¿Por qué `filtrarAlumnos` y `ordenarAlumnos` devuelven copias?**
Porque solo sirven para **mostrar** la tabla de otra forma. La lista verdadera (`alumnos` en `app.js`) es la única que guarda los datos, y solo deben cambiarla añadir y borrar. Si filtrar quitara alumnos de la lista real, al volver a "Todos" ya no estarían.

**2. ¿Qué pasaría si `ordenarAlumnos` cambiara la lista original?**
La lista verdadera se iría reordenando cada vez que el usuario tocara el selector, y los datos guardados dependerían de lo último que se hubiera mostrado. Y si `filtrarAlumnos` hiciera lo mismo, al filtrar por "Aprobados" se borrarían de verdad los suspensos y no se podrían recuperar.

---

## Fase 5 · Depuración

### `console.table(alumnos)`
Muestra una tabla con una fila por alumno: la columna `(index)` con la posición (0 a 9) y las columnas `nombre` y `nota`. Se ve mucho mejor que `console.log`.
`console.table(alumnos.map(a => a.nota))` muestra una tabla con `(index)` y `Value`: solo las 10 notas.

### Fallo 1 · `notas.sort()` daba `[1, 10, 5, 9]`
- **Qué pasaba:** quería `[1, 5, 9, 10]` y salía `[1, 10, 5, 9]`.
- **Por qué:** `sort()` sin comparador ordena como texto, y `"10"` va antes que `"5"`.
- **Arreglo:** `notas.sort((a, b) => a - b);`
- **Herramienta:** `console.log(notas)`.

### Fallo 2 · `const copia = alumnos` desordenaba `alumnos`
- **Qué pasaba:** al ordenar `copia`, `alumnos` también salía ordenado en `console.table(alumnos)`.
- **Por qué:** `copia = alumnos` no copia, es otra referencia al mismo array.
- **Arreglo:** `const copia = [...alumnos];`
- **Herramienta:** `console.table(alumnos)` antes y después.

### Fallo 3 · `suma([])` daba error
- **Qué pasaba:** `TypeError: Reduce of empty array with no initial value`.
- **Por qué:** `reduce` sin valor inicial no puede empezar con una lista vacía.
- **Arreglo:** `return notas.reduce((a, b) => a + b, 0);`
- **Herramienta:** el mensaje de error de la consola.

### Fallo 4 · El bucle fallaba al final
- **Qué pasaba:** escribía los 10 nombres y luego `TypeError: Cannot read properties of undefined (reading 'nombre')`.
- **Por qué:** con `i <= alumnos.length` el bucle llega a `i = 10`, y `alumnos[10]` no existe (`undefined`). Las posiciones van de 0 a `length - 1`.
- **Arreglo:** `for (let i = 0; i < alumnos.length; i++)`
- **Herramienta:** el mensaje de error de la consola y `console.log(i)` dentro del bucle.
