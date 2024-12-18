document.addEventListener("DOMContentLoaded", () => {
    const carritoItemsStorage = JSON.parse(localStorage.getItem("cart")) || [];
    const carritoTableBody = document.getElementById("carrito-items");
    const totalgeneral = document.getElementById("total");
    let total = 0;

    // Recorrer los productos del carrito
    carritoItemsStorage.forEach((item) => {
        const row = document.createElement("tr");

        // Nombre del producto
        const nombreCelda = document.createElement("td");
        nombreCelda.textContent = item.title;
        row.appendChild(nombreCelda);

        // Precio del producto
        const precioCelda = document.createElement("td");
        precioCelda.textContent = `$${item.price.toFixed(2)}`; // Limitamos los decimales
        row.appendChild(precioCelda);

        // Cantidad
        const cantidadCelda = document.createElement("td");
        cantidadCelda.textContent = item.quantity; // Usamos la propiedad quantity directamente
        row.appendChild(cantidadCelda);

        // Subtotal
        const subtotal = item.price * item.quantity; // Calculamos el subtotal
        const subtotalCelda = document.createElement("td");
        subtotalCelda.textContent = `$${subtotal.toFixed(2)}`; // Limitamos los decimales
        row.appendChild(subtotalCelda);

        // Agregar fila a la tabla
        carritoTableBody.appendChild(row);

        // Sumar al total
        total += subtotal;
    });

    // Mostrar el total
    totalgeneral.textContent = `${total.toFixed(2)}`;

    // Botón para limpiar el carrito y volver al inicio
    document.getElementById("limpiar-carrito").addEventListener("click", () => {
        localStorage.removeItem("cart");
        window.location.href = "../index.html";
    });

    // Botón para finalizar la compra con SweetAlert
    document.getElementById("finalizar-compra").addEventListener("click", () => {
        Swal.fire({
            title: "Compra Procesada",
            text: "Se ha procesado la compra #1234",
            icon: "success",
            confirmButtonText: "Aceptar",
            customClass: {
                confirmButton: "custom-button",
            },
        });

        // Limpiar el carrito después de finalizar la compra
        localStorage.removeItem("cart");

        // Redirigir al inicio después de 4 segundos
        setTimeout(() => {
            window.location.href = "../index.html";
        }, 4000);
    });
});