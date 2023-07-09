
const socket = io();

const emitirMostrarCarrito = () => {
    console.log("Ejecuto")  //se ejecuta y pasa //
    const cartIdd = localStorage.getItem('cartId');
    console.log("pero no el cartid del localstorage", cartIdd) // me ejecuta y pasa //
    socket.emit('enviarCarrito', { cartIdd }); // debo verificar que hay momentos que emit y momentos que no //

};
emitirMostrarCarrito();



socket.on('cartUser', ({ cartUser }) => {
    console.log(cartUser);
    const cartHtml = document.getElementById('mostrarCarrito');
    cartHtml.innerHTML = '';
    const cartElement = document.createElement('div');
    cartElement.innerHTML = `
      <ul>
        ${cartUser.products.map((product) => `
          <li>
          <img class="img-product" src="${product.product.thumbnail}}" alt="">
            <p class="title"> ${product.product.title}</p>
            <p>Cantidad: ${product.quantity}</p>
            <p>Precio: ${product.product.price * product.quantity}</p>   
          </li>
        `).join('')}
      </ul>
    `;
    cartHtml.appendChild(cartElement);
});

