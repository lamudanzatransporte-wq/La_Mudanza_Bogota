// script.js
document.addEventListener("DOMContentLoaded", function () {
  // Fill current year
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Mobile nav toggle
  const navToggle = document.getElementById("navToggle");
  const navMenu = document.getElementById("navMenu");
  if (navToggle) {
    navToggle.addEventListener("click", () => {
      const expanded = navToggle.getAttribute("aria-expanded") === "true";
      navToggle.setAttribute("aria-expanded", String(!expanded));
      if (navMenu) navMenu.style.display = expanded ? "none" : "flex";
    });
  }

  // Floating WhatsApp button
  const waFloat = document.getElementById("waFloat");
  const phone = "573123611639"; // replace with your phone (country code + number)
  if (waFloat) {
    waFloat.href = `https://wa.me/${phone}?text=${encodeURIComponent("Hola La Mudanza, necesito información sobre su servicio.")}`;
  }

  // Form submit: build message and open WhatsApp
  const form = document.getElementById("quoteForm");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      const data = new FormData(form);
      const cliente = data.get("cliente") || "No especificado";
      const telefono = data.get("telefono") || "";
      const origen = data.get("origen") || "No especificado";
      const destino = data.get("destino") || "No especificado";
      const inventario = data.get("inventario") || "No especificado";
      const fecha = data.get("fecha") || "Por confirmar";

      let message = `*Solicitud de cotización - La Mudanza*\n`;
      message += `*Nombre:* ${cliente}\n`;
      if (telefono) message += `*WhatsApp:* ${telefono}\n`;
      message += `*Origen:* ${origen}\n`;
      message += `*Destino:* ${destino}\n`;
      message += `*Fecha aproximada:* ${fecha}\n`;
      message += `*Inventario:* ${inventario}\n\n`;
      message += `Por favor envíen la cotización. Muchas gracias.`;

      const waUrl = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
      window.open(waUrl, "_blank");
    });
  }

  // Reset form
  const resetBtn = document.getElementById("resetBtn");
  if (resetBtn) {
    resetBtn.addEventListener("click", function () {
      document.getElementById("quoteForm").reset();
    });
  }

  // Smooth anchor scroll
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      if (targetId.length > 1) {
        e.preventDefault();
        document.querySelector(targetId).scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });
});