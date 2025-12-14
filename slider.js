document.addEventListener("DOMContentLoaded", () => {
  const track = document.querySelector(".slides");
  if (!track) return;

  const slides = Array.from(track.children);
  const firstClone = slides[0].cloneNode(true);
  track.appendChild(firstClone);

  const total = track.children.length; // originals + clon
  let index = 0;
  const intervalMs = 5000;

  // Estat inicial: logo
  track.style.transform = "translateX(0%)";

  const goTo = (i, withTransition = true) => {
    track.style.transition = withTransition ? "transform .8s ease-in-out" : "none";
    track.style.transform = `translateX(-${i * 100}%)`;
  };

  setInterval(() => {
    index += 1;
    goTo(index, true);

    // Si hem arribat al clon (últim), quan acabi la transició tornem al 0 sense transició
    if (index === total - 1) {
      setTimeout(() => {
        index = 0;
        goTo(index, false);
      }, 820); // lleugerament més que 0.8s
    }
  }, intervalMs);
});
