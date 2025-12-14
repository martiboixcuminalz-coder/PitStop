document.addEventListener("DOMContentLoaded", () => {
  const img = document.getElementById("billboardImg");
  if (!img) return;

  const frames = ["logo.jpg", "foto1.jpg", "foto2.jpg", "foto3.jpg"];
  let i = 0;

  const intervalMs = 5000;
  const t = 550; // = 0.55s del CSS

  // Estat inicial
  img.classList.remove("out", "in");
  img.src = frames[i];

  // Fallback si una imatge no carrega
  img.addEventListener("error", () => {
    img.src = "logo.jpg";
  });

  const step = () => {
    // surt
    img.classList.add("out");

    setTimeout(() => {
      // següent frame
      i = (i + 1) % frames.length;

      // prepara entrada des de dreta
      img.classList.remove("out");
      img.classList.add("in");
      img.src = frames[i];

      // força reflow
      void img.offsetWidth;

      // entra
      img.classList.remove("in");

      // programa següent canvi (5s)
      setTimeout(step, intervalMs);
    }, t);
  };

  // primer canvi al cap de 5s
  setTimeout(step, intervalMs);
});
