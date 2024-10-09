// script.js

// Función para verificar si es un nodo
function isNode(obj) {
    return obj && typeof obj === 'object' && 'nodeType' in obj;
}

// Función each que itera sobre una colección
function each(collection, callback) {
    // Verificar que callback sea una función
    if (typeof callback !== 'function') {
        console.error('callback is not a function', callback);
        return; // Salir si callback no es una función
    }

    // Si la colección es un nodo o una ventana, conviértelo en un array
    if (isNode(collection) || collection === window || collection === document) {
        collection = [collection];
    }

    // Iterar sobre la colección
    for (let i = 0; i < collection.length; i++) {
        callback(collection[i], i); // Llamar a la función callback
    }
}

// Ejemplo de uso
const items = [1, 2, 3, 4];

// Llamada a la función each con una función como callback
each(items, function(item) {
    console.log(item); // Esto debería funcionar sin problemas
});
import { Analytics } from "@vercel/analytics/react"
