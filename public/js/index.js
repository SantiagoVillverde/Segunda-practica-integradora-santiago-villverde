
const socket = io();


const render = async (data) => {
  const messageHtml = document.getElementById('List-Message');
  if (data && data.messages && data.messages.length > 0) {
    data.messages.forEach((message) => {   
      const messageElement = document.createElement('div');
      messageElement.innerHTML = `
      <p>${message.user}</p>
      <p>Requerimiento: ${message.menssage}</p>
    `;
      messageHtml.appendChild(messageElement); 
    });
  }
};

socket.on('List-Message', (data) => {
  render(data); 
});

/*
socket.on('List-Product', (products) => {
  render(products);
});



socket.on('product_updated', (data) => {
  render(data);
});
*/