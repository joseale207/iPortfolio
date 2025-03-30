/**
* Template Name: iPortfolio
* Updated: Jan 09 2024 with Bootstrap v5.3.2
* Template URL: https://bootstrapmade.com/iportfolio-bootstrap-portfolio-websites-template/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim();
    return all ? [...document.querySelectorAll(el)] : document.querySelector(el);
  };

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    const selectEl = select(el, all);
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener));
      } else {
        selectEl.addEventListener(type, listener);
      }
    }
  };

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener);
  };

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true);
  const navbarlinksActive = () => {
    let position = window.scrollY + 200;
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return;
      let section = select(navbarlink.hash);
      if (!section) return;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active');
      } else {
        navbarlink.classList.remove('active');
      }
    });
  };
  
  window.addEventListener('load', navbarlinksActive);
  onscroll(document, navbarlinksActive);

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let elementPos = select(el).offsetTop;
    window.scrollTo({
      top: elementPos,
      behavior: 'smooth'
    });
  };

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top');
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active');
      } else {
        backtotop.classList.remove('active');
      }
    };
    window.addEventListener('load', toggleBacktotop);
    onscroll(document, toggleBacktotop);
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('body').classList.toggle('mobile-nav-active');
    this.classList.toggle('bi-list');
    this.classList.toggle('bi-x');
  });

  /**
   * Scrool with offset on links with a class name .scrollto
   */
  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault();

      let body = select('body');
      if (body.classList.contains('mobile-nav-active')) {
        body.classList.remove('mobile-nav-active');
        let navbarToggle = select('.mobile-nav-toggle');
        navbarToggle.classList.toggle('bi-list');
        navbarToggle.classList.toggle('bi-x');
      }
      scrollto(this.hash);
    }
  }, true);

  /**
   * Scroll with offset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash);
      }
    }
  });

  /**
   * Hero type effect
   */
  const typed = select('.typed');
  if (typed) {
    let typed_strings = typed.getAttribute('data-typed-items');
    typed_strings = typed_strings.split(',');
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  /**
   * Skills animation
   */
  let skilsContent = select('.skills-content');
  if (skilsContent) {
    new Waypoint({
      element: skilsContent,
      offset: '80%',
      handler: function(direction) {
        let progress = select('.progress .progress-bar', true);
        progress.forEach((el) => {
          el.style.width = el.getAttribute('aria-valuenow') + '%';
        });
      }
    });
  }

  /**
   * Portfolio isotope and filter
   */
  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item'
      });

      let portfolioFilters = select('#portfolio-flters li', true);

      on('click', '#portfolio-flters li', function(e) {
        e.preventDefault();
        portfolioFilters.forEach(function(el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        portfolioIsotope.on('arrangeComplete', function() {
          AOS.refresh();
        });
      }, true);
    }
  });

  /**
   * Initiate portfolio lightbox 
   */
  const portfolioLightbox = GLightbox({
    selector: '[data-lightbox="screenshots"]',
    touchNavigation: true,
    openEffect: 'zoom',
    closeEffect: 'fade'
  });
  console.log('Lightbox iniciado con', 
    document.querySelectorAll('[data-lightbox="screenshots"]').length, 'imágenes'); // Debug
  /**
   * Portfolio details slider
   */
  new Swiper('.portfolio-details-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Testimonials slider
   */
  new Swiper('.testimonials-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 20
      },
      1200: {
        slidesPerView: 3,
        spaceBetween: 20
      }
    }
  });

  /**
   * Animation on scroll
   */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  });

  /**
   * Initiate Pure Counter 
   */
  new PureCounter();
})();

// contenido_ingles.js
function establecerContenidoIngles() {
  document.getElementById('titulo').textContent = 'Welcome';
  document.getElementById('contenido').textContent = 'This is an example of a multilingual page.';
}

let idiomaActual = 'es';

function cambiarIdioma() {
  if (idiomaActual === 'es') {
    // Cambiar a inglés
    establecerContenidoIngles();
    idiomaActual = 'en';
    document.documentElement.lang = 'en';
  } else {
    // Cambiar a español
    establecerContenidoEspanol();
    idiomaActual = 'es';
    document.documentElement.lang = 'es';
  }
}

function establecerContenidoEspanol() {
  document.getElementById('titulo').textContent = 'Bienvenido';
  document.getElementById('contenido').textContent = 'Este es un ejemplo de página multilingüe.';
}

document.addEventListener('DOMContentLoaded', function() {
  const screenshotItem = document.querySelector('.screenshot-item');

  screenshotItem.addEventListener('click', function() {
    // Añadir la clase 'active' para iniciar la animación
    this.classList.add('active');

    // Eliminar la clase después de que la animación termine
    setTimeout(() => {
      this.classList.remove('active');
    }, 500); // Tiempo de la animación en milisegundos
  });
});

// Funciones del servidor
function handler(req, res) {
  const result = calculateSomething();
  console.log("Resultado de calculateSomething:", result);  // Agregar un log para revisar qué devuelve
  if (typeof result !== 'string') {
    res.status(500).send("Error: Expected a string result.");
    return; // Detiene la ejecución si el resultado no es el tipo esperado
  }
  res.send(result);  // Envía el resultado como string
}

function exampleFunction(input) {
  // Lógica para procesar 'input'
  let result;

  // Asegúrate de que 'result' sea siempre un string
  if (typeof input === 'number') {
    result = input.toString(); // Convierte números a string
  } else if (typeof input === 'object') {
    result = JSON.stringify(input); // Convierte objetos a string
  } else {
    result = String(input); // Convierte otros tipos a string
  }

  return result; // Asegúrate de que siempre se retorna un string
}
function each(collection, callback) {
  if (typeof callback !== 'function') {
    console.error('callback is not a function', callback);
    return; // Salir si callback no es una función
  }

  if (isNode(collection) || collection === window || collection === document) {
    collection = [collection];
  }

  // Resto del código...
}

// Espera a que el documento esté completamente cargado
document.addEventListener('DOMContentLoaded', () => {
  // Agrega el evento de clic al icono del conejo
  document.getElementById('rabbit-icon').addEventListener('click', () => {
      const message = document.getElementById('message');
      
      // Muestra el mensaje
      message.style.display = 'block';

      // Opcional: Desvanecer el mensaje después de un tiempo
      setTimeout(() => {
          message.style.opacity = '1'; // Asegúrate de que la opacidad esté al 1 para mostrarlo
          setTimeout(() => {
              message.style.opacity = '0'; // Cambia la opacidad a 0 para ocultarlo
              setTimeout(() => {
                  message.style.display = 'none'; // Oculta el mensaje completamente
              }, 500); // Espera a que termine la animación
          }, 5000); // Muestra el mensaje por 5 segundos
      }, 100); // Pequeña pausa para asegurarse de que se muestre
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const rabbitIcon = document.getElementById('rabbit-icon');
  const message = document.getElementById('message');
  const animationContainer = document.getElementById('animation-container');

  rabbitIcon.addEventListener('click', () => {
      // Mostrar el mensaje
      message.style.display = 'block';
      message.style.opacity = '0,5';


      // Animación de mariposas
      for (let i = 0; i < 5; i++) {
          const butterfly = document.createElement('div');
          butterfly.className = 'butterfly';
          butterfly.textContent = '🦋'; // Mariposa
          butterfly.style.left = `${rabbitIcon.offsetLeft + 15}px`; // Centrado sobre el icono
          butterfly.style.top = `${rabbitIcon.offsetTop - 20}px`; // Ajustar posición arriba del icono
          animationContainer.appendChild(butterfly);
        
          // Animación de mariposas
          setTimeout(() => {
              butterfly.style.transform = `translateY(-100px)`;
              butterfly.style.opacity = '0';
              setTimeout(() => {
                  butterfly.remove();
              }, 2000);
          }, 50);
      }

      // Desvanecer el mensaje después de  segundos
      setTimeout(() => {
          message.style.opacity = '0';
          setTimeout(() => {
              message.style.display = 'none';
              message.style.opacity = '1'; // Resetea la opacidad para el próximo clic
          }, 2000);
      }, 2000);
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const preguntas = [
    {
      pregunta: "¿Qué ley protege los datos personales en Europa?",
      respuestas: ["GDPR", "DMCA", "Ley del Zodiaco"],
      correcta: 0
    },
    {
      pregunta: "¿Cuál de estos métodos evalúa candidatos con pruebas situacionales?",
      respuestas: ["Assessment Center", "Entrevista libre", "Prueba de suerte"],
      correcta: 0
    },
    {
      pregunta: "Según la legislación, ¿cuál NO es un criterio válido para rechazar a un candidato?",
      respuestas: ["Edad", "Falta de experiencia", "Religión"],
      correcta: 2
    }
  ];

  let preguntaActual = 0;
  const botonWhatsApp = document.getElementById("whatsapp-btn");
  const modalOverlay = document.getElementById("acertijo-modal");
  const modalContent = document.querySelector(".modal-content");
  const textoPregunta = document.getElementById("pregunta");
  const botonesRespuestas = document.querySelectorAll(".respuesta");
  const cerrarModal = document.getElementById("cerrar-modal");

  let timer;

  // Abrir modal cuando el usuario presiona el botón de WhatsApp
  botonWhatsApp.addEventListener("click", function () {
    modalOverlay.classList.add("show");
    modalContent.classList.add("show");
    mostrarPregunta();
  });

  // Cerrar modal
  cerrarModal.addEventListener("click", function () {
    modalOverlay.classList.remove("show");
    modalContent.classList.remove("show");
    preguntaActual = 0;
    clearTimeout(timer);  // Limpiar el temporizador al cerrar
  });

  function mostrarPregunta() {
    let p = preguntas[preguntaActual];
    textoPregunta.textContent = p.pregunta;
    botonesRespuestas.forEach((boton, i) => {
      boton.textContent = p.respuestas[i];
    });

    // Limpiar cualquier temporizador anterior antes de establecer uno nuevo
    clearTimeout(timer);

    // Establecer el temporizador de 10 segundos para cada pregunta
    timer = setTimeout(function () {
      // Si no se respondió en 10 segundos, cerrar el modal y reiniciar las preguntas
      alert("Tiempo agotado. Por razones de seguridad, tendrás que intentar de nuevo.");
      modalOverlay.classList.remove("show");
      modalContent.classList.remove("show");
      preguntaActual = 0;  // Reiniciar a la primera pregunta
    }, 10000); // 10 segundos = 10000ms
  }

  window.verificarRespuesta = function (indice) {
    clearTimeout(timer);  // Limpiar el temporizador si ya se respondió correctamente

    if (indice === preguntas[preguntaActual].correcta) {
      preguntaActual++;
      if (preguntaActual < preguntas.length) {
        mostrarPregunta();
      } else {
        modalOverlay.classList.remove("show");
        modalContent.classList.remove("show");
        window.location.href = "https://wa.me/34610229431"; // Redirigir a WhatsApp cuando se respondan correctamente todas las preguntas
      }
    } else {
      alert("Respuesta incorrecta. Inténtalo de nuevo.");
      preguntaActual = 0;
      mostrarPregunta();
    }
  };
});
// Inicialización consistente de GLightbox
const lightbox = GLightbox({
  selector: '[data-lightbox="portfolio"]',
  touchNavigation: true,
  keyboardNavigation: true
});

// Debugging
console.log('Lightbox iniciado con:', 
  document.querySelectorAll('[data-lightbox="portfolio"]').length, 'imágenes');