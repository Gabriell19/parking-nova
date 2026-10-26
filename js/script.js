/**
 * Función para copiar un número de teléfono al portapapeles del dispositivo
 * @param {string} numero - El número telefónico que queremos copiar
 */
function copiarTelefono(numero) {
    // 1. Intentamos usar la herramienta moderna del navegador (Clipboard API)
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(numero)
            .then(() => {
                mostrarNotificacion("¡Teléfono " + numero + " copiado!");
            })
            .catch((err) => {
                console.error("Error al copiar: ", err);
                copiarConMetodoAlternativo(numero);
            });
    } else {
        // 2. Si estás probando el archivo directo desde tu carpeta (sin servidor),
        // usamos este método alternativo para que siempre te funcione.
        copiarConMetodoAlternativo(numero);
    }
}

/**
 * Método de respaldo para copiar texto cuando se abre el HTML directamente en la PC
 */
function copiarConMetodoAlternativo(texto) {
    // Creamos una caja de texto invisible temporalmente
    const inputTemporal = document.createElement("textarea");
    inputTemporal.value = texto;
    document.body.appendChild(inputTemporal);
    
    // Seleccionamos el texto y ejecutamos el comando de copiar
    inputTemporal.select();
    inputTemporal.setSelectionRange(0, 99999); // Para celulares
    document.execCommand("copy");
    
    // Borramos la caja temporal y mostramos el aviso
    document.body.removeChild(inputTemporal);
    mostrarNotificacion("¡Teléfono " + texto + " copiado!");
}

/**
 * Función que muestra el mensaje flotante en la parte inferior por 3 segundos
 * @param {string} mensaje - El texto que aparecerá en la notificación
 */
function mostrarNotificacion(mensaje) {
    const toast = document.getElementById("toast-notification");
    const toastMessage = document.getElementById("toast-message");
    
    // Colocamos el mensaje personalizado
    toastMessage.textContent = mensaje;
    
    // Agregamos la clase 'show' de CSS para que aparezca en pantalla
    toast.classList.add("show");
    
    // Después de 3000 milisegundos (3 segundos), quitamos la clase para ocultarlo
    setTimeout(() => {
        toast.classList.remove("show");
    }, 3000);
}