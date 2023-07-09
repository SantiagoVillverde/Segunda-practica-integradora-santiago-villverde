const socket = io();

const addToCartButtons = document.querySelectorAll(".addToCart");
const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

const addProduct = (productId) => {
  let found = false;

  cartItems.forEach((item) => {
    if (item.productId === productId) {
      item.quantity += 1;
      found = true;
    }
  });

  if (!found) {
    const productInfo = { productId, quantity: 1 };
    cartItems.push(productInfo);
  }

  localStorage.setItem("cartItems", JSON.stringify(cartItems));
  alert("¡Producto agregado al carrito!");

  generateCartItemsHTML();
};


socket.on('cartId', (cartId) => {
  const existingCartId = localStorage.getItem('cartId');
  if (!existingCartId) {
    localStorage.setItem('cartId', cartId);
  }
  socket.emit('cartIdMostrar', cartId); // creo que no emite nada, debo verificar 
});

const cartId = localStorage.getItem('cartId');
console.log(cartId)



addToCartButtons.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const productId = e.target.dataset.productId;
    socket.emit('agregarProducto', { cartId, productId });
  });
});


