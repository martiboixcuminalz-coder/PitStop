document.addEventListener("DOMContentLoaded", () => {
  const slides = document.querySelector(".slides");
  if (!slides) return;

  const total = slides.children.length;
  let index = 0;

  // comença mostrant el logo (index 0)
  slides.style.transform = "translateX(0%)";

  setInterval(() => {
    index = (index + 1) % total;
    slides.style.transform = `translateX(-${index * 100}%)`;
  }, 5000);
});
