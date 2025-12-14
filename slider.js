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
})
  const form = document.getElementById("reviewForm");
const reviewsList = document.getElementById("reviewsList");
const stars = document.querySelectorAll(".stars span");
const ratingInput = document.getElementById("rating");

let reviews = JSON.parse(localStorage.getItem("reviews")) || [];

// pintar estrelles
stars.forEach(star => {
  star.addEventListener("click", () => {
    const value = star.dataset.value;
    ratingInput.value = value;

    stars.forEach(s => {
      s.classList.toggle("active", s.dataset.value <= value);
    });
  });
});

// enviar ressenya
form.addEventListener("submit", e => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const rating = ratingInput.value;

  if (!rating) return alert("Selecciona estrelles");

  const review = { name, rating };
  reviews.push(review);

  localStorage.setItem("reviews", JSON.stringify(reviews));
  form.reset();
  ratingInput.value = 0;
  stars.forEach(s => s.classList.remove("active"));

  renderReviews();
});

// mostrar ressenyes
function renderReviews(){
  reviewsList.innerHTML = "";
  reviews.forEach(r => {
    const div = document.createElement("div");
    div.className = "review";
    div.innerHTML = `
      <strong>${r.name}</strong>
      ${"★".repeat(r.rating)}${"☆".repeat(5 - r.rating)}
    `;
    reviewsList.appendChild(div);
  });
}

renderReviews();

  
  ;
