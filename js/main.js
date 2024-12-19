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
    selector: '.portfolio-lightbox'
  });

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
// JavaScript para abrir y cerrar el modal
document.getElementById("openFormButton").onclick = function () {
  document.getElementById("contactModal").style.display = "flex"; // Cambiamos a flex para centrar
};

document.getElementById("closeModalButton").onclick = function () {
  document.getElementById("contactModal").style.display = "none";
};

window.onclick = function (event) {
  const modal = document.getElementById("contactModal");
  if (event.target == modal) {
      modal.style.display = "none";
  }
};

// Envío de datos a la API
document.getElementById("contactForm").onsubmit = async function (event) {
  event.preventDefault();

  const name = event.target.name.value;
  const email = event.target.email.value;
  const message = event.target.message.value;

  console.log("Form submitted:", { name, email, message }); // Agregado para depuración

  const response = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, message }),
  });

  if (!response.ok) {
      const errorData = await response.json();
      console.error("Error response:", errorData); // Log para ver el error
      alert("There was an error. Please try again.");
  } else {
      alert("Message sent successfully!");
      event.target.reset();
      document.getElementById("contactModal").style.display = "none"; // Cierra el modal después de enviar
  }
};
AOS.init();
// Abre el formulario cuando se hace clic en el botón
document.getElementById("openFormButton").onclick = function() {
  document.getElementById("contactModal").style.display = "block";
};

// Cierra el modal cuando se hace clic en la "X"
document.getElementById("closeModalButton").onclick = function() {
  document.getElementById("contactModal").style.display = "none";
};

// Enviar formulario a WhatsApp cuando se haga submit
document.getElementById("contactForm").onsubmit = function(e) {
  e.preventDefault(); // Evitar la recarga de la página

  // Obtener los datos del formulario
  var name = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var message = document.getElementById("message").value;

  // Crear el mensaje para enviar a WhatsApp
  var whatsappMessage = encodeURIComponent(
    `*New Contact Request*\n\n` +
    `*Name:* ${name}\n` +
    `*Email:* ${email}\n` +
    `*Message:* ${message}`
  );

  // Reemplazar "your_phone_number" con tu número de WhatsApp
  var whatsappURL = `https://wa.me/34610229431?text=${whatsappMessage}`;

  // Redirigir al usuario al enlace de WhatsApp
  window.open(whatsappURL, '_blank');

  // Cerrar el modal después de enviar
  document.getElementById("contactModal").style.display = "none";
};
