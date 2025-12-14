document.addEventListener("DOMContentLoaded", () => {
  const img = document.getElementById("billboardImg");
  if (!img) return;

  const frames = ["logo.jpg", "foto1.jpg", "foto2.jpg", "foto3.jpg"];
  let i = 0;

  const intervalMs = 5000;
  const t = 550; // ha de coincidir amb el CSS (0.55s)

  img.src = frames[i]; // comença pel logo

  setInterval(() => {
    // 1) surt (logo/foto actual desapareix)
    img.classList.add("out");

    // 2) quan ha sortit, canviem src i fem entrar des de la dreta
    setTimeout(() => {
      i = (i + 1) % frames.length;

      img.classList.remove("out");
      img.classList.add("in");
      img.src = frames[i];

      // força reflow perquè "in" s’apliqui abans d’entrar
      void img.offsetWidth;

      // 3) entra
      img.classList.remove("in");
    }, t);
  }, intervalMs);
});
