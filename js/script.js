function toggleChatbot() {
    let chatbotContainer = document.getElementById('chatbot-container');
    let chatToggle = document.getElementById('chatbot-toggle');
  
    if (chatbotContainer.classList.contains('open')) {
      chatbotContainer.classList.remove('open');
      // Reanuda la animación cuando se cierra el chat
      chatToggle.classList.add('burbuja-parpadeante');
    } else {
      chatbotContainer.style.display = 'block';
      setTimeout(() => chatbotContainer.classList.add('open'), 10);
      // Detiene la animación cuando se abre el chat
      chatToggle.classList.remove('burbuja-parpadeante');
    }
  }
  
  document.addEventListener('DOMContentLoaded', function() {
    let chatToggle = document.getElementById('chatbot-toggle');
    chatToggle.classList.add('burbuja-parpadeante'); // Inicia con la animación de parpadeo
  });
  
  function agregarMensajeChatbot(texto) {
    let contenedorMensajes = document.querySelector('.chatbot-body');
    let mensajeChatbot = document.createElement('div');
    mensajeChatbot.className = 'chatbot-message';
    mensajeChatbot.innerHTML = `<p>${texto}</p>`;
    contenedorMensajes.appendChild(mensajeChatbot);
    mensajeChatbot.scrollIntoView({ behavior: 'smooth' });
  }
  
  function agregarMensajeUsuario(texto) {
    if (texto.trim() === '') return;
  
    let contenedorMensajes = document.querySelector('.chatbot-body');
    let mensajeUsuario = document.createElement('div');
    mensajeUsuario.className = 'user-message';
    mensajeUsuario.innerHTML = `<p>${texto}</p>`;
    contenedorMensajes.appendChild(mensajeUsuario);
    mensajeUsuario.scrollIntoView({ behavior: 'smooth' });
  }
  
  function mostrarPreguntaPerfil() {
    agregarMensajeChatbot("Por favor ingresa idioma que dominas, turno de interés y último grado de estudios.");
    document.getElementById('user-input-container').style.display = 'block';
  }
  
  function enviarRespuesta() {
    let userInput = document.getElementById('user-input').value;
    if (userInput.trim() === '') return;
  
    agregarMensajeUsuario(userInput);
    // Aquí puedes agregar más lógica en función de la respuesta del usuario
  
    document.getElementById('user-input').value = '';
  }
  document.addEventListener('DOMContentLoaded', function() {
    // Asegúrate de que el campo de entrada exista en tu HTML
    var inputPerfil = document.getElementById('user-input');
    if (inputPerfil) {
      inputPerfil.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
          event.preventDefault(); // Previene el comportamiento predeterminado de Enter
          enviarRespuesta(); // Llama a tu función de envío de respuesta
        }
      });
    }
  
    // Aquí puedes agregar cualquier otro código de inicialización
  });
  
  
  document.addEventListener('DOMContentLoaded', function() {
    let chatbotToggle = document.getElementById('chatbot-toggle');
    chatbotToggle.addEventListener('click', toggleChatbot);
  });
  
  // letiable global para llelet un registro del estado actual de la conversación
  let estadoConversacion = 'inicio';
  
  function enviarRespuesta() {
    let userInput = document.getElementById('user-input').value;
    if (userInput.trim() === '') return;
  
    agregarMensajeUsuario(userInput);
  
    // Decide qué hacer a continuación, basado en el estado actual de la conversación
    if (estadoConversacion === 'inicio') {
      mostrarPreguntaExperiencia();
      estadoConversacion = 'preguntaExperiencia';
    } else if (estadoConversacion === 'preguntaExperiencia') {
      mostrarPreguntaConocimientos();
      estadoConversacion = 'preguntaConocimientos';
    } else if (estadoConversacion === 'preguntaConocimientos') {
      // Aquí puedes procesar la respuesta sobre los conocimientos
      // y continuar con la siguiente parte de la conversación
      mostrarResultados();
      estadoConversacion = 'finalizado';
    }
  
    document.getElementById('user-input').value = ''; // Limpia el campo de entrada
  }
  
  function mostrarPreguntaExperiencia() {
    agregarMensajeChatbot("Puedes ingresar tu experiencia. Ejemplo: (Empresa) (Puesto) (Años)...");
  }
  
  function mostrarPreguntaConocimientos() {
    agregarMensajeChatbot("¿Cuáles son tus especialidades o conocimientos? Ejemplo: (Operaciones, Ventas, Contabilidad, etc..)");
  }
  
  function mostrarResultados() {
    agregarMensajeChatbot("Estoy buscando las vacantes adecuadas para ti...");
    // Aquí puedes agregar la lógica para mostrar los resultados de las vacantes
  }
  function iniciarBusquedaPorUbicacion() {
    // Agrega un mensaje con la selección de estado al chat
    agregarMensajeChatbot("Selecciona el estado para buscar vacantes:");
    agregarSelectorEstado();
  }
  
  function agregarSelectorEstado() {
    let contenedorMensajes = document.querySelector('.chatbot-body');
    let selectEstado = document.createElement('select');
    selectEstado.id = 'seleccion-estado';
    selectEstado.onchange = mostrarSeleccionAlcaldia; // Evento cuando se selecciona un estado
    // Suponiendo que tienes una lista de estados
    let estados = ['Estado 1', 'Estado 2', 'Estado 3']; 
    estados.forEach(function(estado) {
      let option = document.createElement('option');
      option.value = estado;
      option.text = estado;
      selectEstado.appendChild(option);
    });
    // Añade una opción predeterminada que solicita la selección
    let defaultOption = document.createElement('option');
    defaultOption.text = 'Seleccione un estado';
    defaultOption.selected = true;
    defaultOption.disabled = true;
    selectEstado.insertBefore(defaultOption, selectEstado.firstChild);
  
    contenedorMensajes.appendChild(selectEstado);
    selectEstado.scrollIntoView({ behavior: 'smooth' });
  }
  
  function mostrarSeleccionAlcaldia() {
    let estadoSeleccionado = document.getElementById('seleccion-estado').value;
    agregarMensajeUsuario(estadoSeleccionado); // Muestra el estado seleccionado como mensaje del usuario
    agregarMensajeChatbot("Ahora, selecciona la alcaldía:");
    agregarSelectorAlcaldia(estadoSeleccionado);
  }
  
  function agregarSelectorAlcaldia(estadoSeleccionado) {
    let contenedorMensajes = document.querySelector('.chatbot-body');
    let selectAlcaldia = document.createElement('select');
    selectAlcaldia.id = 'seleccion-alcaldia';
    selectAlcaldia.onchange = confirmarBusqueda; // Evento cuando se selecciona una alcaldía
  
    // Supongamos que estas son las alcaldías disponibles para todos los estados en este ejemplo
    let alcaldias = {
      'Estado 1': ['Alcaldía A1', 'Alcaldía A2', 'Alcaldía A3'],
      'Estado 2': ['Alcaldía B1', 'Alcaldía B2', 'Alcaldía B3'],
      'Estado 3': ['Alcaldía C1', 'Alcaldía C2', 'Alcaldía C3']
    };
  
    // Rellena el select con las alcaldías del estado seleccionado
    alcaldias[estadoSeleccionado].forEach(function(alcaldia) {
      let option = document.createElement('option');
      option.value = alcaldia;
      option.text = alcaldia;
      selectAlcaldia.appendChild(option);
    });
  
    // Añade una opción predeterminada que solicita la selección
    let defaultOption = document.createElement('option');
    defaultOption.text = 'Seleccione una alcaldía';
    defaultOption.selected = true;
    defaultOption.disabled = true;
    selectAlcaldia.insertBefore(defaultOption, selectAlcaldia.firstChild);
  
    contenedorMensajes.appendChild(selectAlcaldia);
    selectAlcaldia.scrollIntoView({ behavior: 'smooth' });
  }
  
  function confirmarBusqueda() {
    let alcaldiaSeleccionada = document.getElementById('seleccion-alcaldia').value;
    agregarMensajeUsuario(alcaldiaSeleccionada); // Muestra la alcaldía seleccionada como mensaje del usuario
    agregarMensajeChatbot(`Buscando puestos en ${alcaldiaSeleccionada}...`);
    // Aquí se implementaría la lógica de búsqueda de puestos
  }