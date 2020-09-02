window.onload = function() {

  // El DOM permite obtener referencias hacia los elementos de la página HTML con los que vamos a interactuar.
  var form = document.getElementById('message-form');
  var messageField = document.getElementById('message');
  var messagesList = document.getElementById('messages');
  var socketStatus = document.getElementById('status');
  var closeBtn = document.getElementById('close');


  // Crea una conexión a nuestro WebSocket en BlueMix.
  var socket = new WebSocket('ws://Traductor-CarlosGaubert.mybluemix.net/ws/misocket');


  // Manejo básico de cualquier error que pueda ocurrir con respecto al WebSocket.
  socket.onerror = function(error) {
    console.log('Error de WebSocket: ' + error);
  };


  // Muestra un mensaje de estatus de conectado cuando el WebSocket es abierto de forma exitosa.
  socket.onopen = function(event) {
    console.log(event)
    socketStatus.innerHTML = 'Conectado a: ' + event.currentTarget.url;
  };


  // Gestión de la recepción de mensajes mandados por el servidor.
  socket.onmessage = function(event) {
    var message = event.data;
    messagesList.innerHTML += '<li class="received"><span>Recibido:</span>' +
                               message + '</li>';
  };


  // Muestra un mensaje de estatus de desconectado cuando el WebSocket es cerrado.
  socket.onclose = function(event) {
    socketStatus.innerHTML = 'Desconectado del WebSocket.';
  };


  // Manda el mensage cuando se pulsa el botón de submit (Enviar mensaje).
  form.onsubmit = function(e) {
    // Lee el mensaje escrito por el usuario en la textarea.
    var message = messageField.value;

    // Manda el mensaje al servidor usando el WebSocket.
    socket.send(message);

    // Agrega el mensaje a la lista de mensajes.
    messagesList.innerHTML = '<li class="sent"><span>Env&iacute;ado:</span>' + message +
                              '</li>';

    // Borra el contenido de la caja de texto en el que el usuario escribe el mensaje.
    messageField.value = '';

    return false;
  };


  // Cierra la conexión con el WebSocket, cuando se pulsa el botón ´Cerrar la conexión´.
  closeBtn.onclick = function(e) {
    // Cierra la conexión con el WebSocket.
    socket.close();

    return false;
  };

};
