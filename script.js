document.addEventListener("DOMContentLoaded", function () {
  // 1) Fill current year
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // 2) Mobile nav toggle (usa clase 'open' para controlar visibilidad)
  const navToggle = document.getElementById("navToggle");
  const navMenu = document.getElementById("navMenu");
  if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => {
      const isOpen = navMenu.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });
  }

  // 3) Floating WhatsApp button
  const waFloat = document.getElementById("waFloat");
  const phone = "573123611639"; // país + número
  if (waFloat) {
    const defaultMsg = "Hola La Mudanza, necesito información sobre su servicio.";
    waFloat.href = `https://wa.me/${phone}?text=${encodeURIComponent(defaultMsg)}`;
    waFloat.setAttribute("target", "_blank");
    waFloat.setAttribute("rel", "noopener noreferrer");
  }

  // 4) Form submit: build message and open WhatsApp
  const form = document.getElementById("quoteForm");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const data = new FormData(form);
      const cliente = data.get("cliente")?.toString().trim() || "No especificado";
      const telefono = data.get("telefono")?.toString().trim() || "";
      const origen = data.get("origen")?.toString().trim() || "No especificado";
      const destino = data.get("destino")?.toString().trim() || "No especificado";
      const inventario = data.get("inventario")?.toString().trim() || "No especificado";
      const fecha = data.get("fecha")?.toString().trim() || "Por confirmar";

      let message = `*Solicitud de cotización - La Mudanza*\n`;
      message += `*Nombre:* ${cliente}\n`;
      if (telefono) message += `*WhatsApp:* ${telefono}\n`;
      message += `*Origen:* ${origen}\n`;
      message += `*Destino:* ${destino}\n`;
      message += `*Fecha aproximada:* ${fecha}\n`;
      message += `*Inventario:* ${inventario}\n\n`;
      message += `Por favor envíen la cotización. Muchas gracias.`;

      const waUrl = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
      window.open(waUrl, "_blank", "noopener");
    });
  }

  // 5) Reset form
  const resetBtn = document.getElementById("resetBtn");
  if (resetBtn && form) {
    resetBtn.addEventListener("click", function () {
      form.reset();
    });
  }

  // 6) Smooth anchor scroll for internal links (#)
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      if (targetId && targetId.length > 1) {
        const targetEl = document.querySelector(targetId);
        if (targetEl) {
          e.preventDefault();
          targetEl.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    });
  });

  // 7) Slider (carrusel) - accesible y seguro
  (function setupSlider() {
    const slider = document.getElementById("gallerySlider");
    if (!slider) return;
    const track = slider.querySelector(".slider-track");
    const slides = slider.querySelectorAll(".slide");
    const btnLeft = slider.querySelector(".slider-btn.left");
    const btnRight = slider.querySelector(".slider-btn.right");
    if (!track || slides.length === 0 || !btnLeft || !btnRight) return;

    let index = 0;
    function moveSlider() {
      track.style.transform = `translateX(-${index * 100}%)`;
    }

    btnRight.addEventListener('click', () => {
      index = (index + 1) % slides.length;
      moveSlider();
    });

    btnLeft.addEventListener('click', () => {
      index = (index - 1 + slides.length) % slides.length;
      moveSlider();
    });

    // teclado: flechas izquierda/derecha cuando el slider tiene foco
    slider.addEventListener('keydown', (e) => {
      if (e.key === "ArrowRight") {
        index = (index + 1) % slides.length;
        moveSlider();
      } else if (e.key === "ArrowLeft") {
        index = (index - 1 + slides.length) % slides.length;
        moveSlider();
      }
    });

    // opcional: autoplay suave (si quieres activarlo descomenta)
    // let autoplay = setInterval(() => { index = (index + 1) % slides.length; moveSlider(); }, 6000);
    // slider.addEventListener('mouseenter', () => clearInterval(autoplay));
    // slider.addEventListener('mouseleave', () => autoplay = setInterval(() => { index = (index + 1) % slides.length; moveSlider(); }, 6000));
  })();

  // 8) ScrollReveal (sólo si está cargado)
  if (window.ScrollReveal) {
    const sr = ScrollReveal({
      distance: '40px',
      duration: 900,
      easing: 'ease-out',
      reset: false
    });

    sr.reveal(`
      .hero-content,
      .hero-media,
      .section-title,
      .section-sub,
      .card,
      .why-grid,
      .why-media,
      .why-content,
      .testi,
      footer,
      form,
      .footer-grid,
      .stats div
    `, {
      origin: 'bottom',
      interval: 120
    });

    sr.reveal('.hero-media img, .why-media img', {
      origin: 'right',
      distance: '60px',
      duration: 1000
    });

    sr.reveal('.hero-content, .why-content', {
      origin: 'left',
      distance: '60px',
      duration: 1000
    });
  }
});
