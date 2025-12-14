document.addEventListener("DOMContentLoaded", () => {
  // ====== BILLBOARD (1 sola imatge) ======
  const img = document.getElementById("billboardImg");
  if (img) {
    const frames = ["logo.jpg", "foto1.jpg", "foto2.jpg", "foto3.jpg"];
    let i = 0;

    const intervalMs = 5000;
    const t = 550; // 0.55s del CSS

    img.classList.remove("out","in");
    img.src = frames[i];

    img.addEventListener("error", () => {
      img.src = "logo.jpg";
    });

    const step = () => {
      img.classList.add("out");

      setTimeout(() => {
        i = (i + 1) % frames.length;

        img.classList.remove("out");
        img.classList.add("in");
        img.src = frames[i];

        void img.offsetWidth; // reflow
        img.classList.remove("in");

        setTimeout(step, intervalMs);
      }, t);
    };

    setTimeout(step, intervalMs);
  }

  // ====== RESSENYES (localStorage) ======
  const form = document.getElementById("reviewForm");
  const reviewsList = document.getElementById("reviewsList");
  const stars = document.querySelectorAll(".stars span");
  const ratingInput = document.getElementById("rating");

  if (form && reviewsList && ratingInput && stars.length) {
    let reviews = JSON.parse(localStorage.getItem("reviews")) || [];

    const renderReviews = () => {
      reviewsList.innerHTML = "";
      reviews.forEach(r => {
        const div = document.createElement("div");
        div.className = "review";
        const rating = Number(r.rating) || 0;
        div.innerHTML = `
          <strong>${r.name}</strong>
          ${"★".repeat(rating)}${"☆".repeat(5 - rating)}
        `;
        reviewsList.appendChild(div);
      });
    };

    stars.forEach(star => {
      star.addEventListener("click", () => {
        const value = star.dataset.value;
        ratingInput.value = value;
        stars.forEach(s => s.classList.toggle("active", s.dataset.value <= value));
      });
    });

    form.addEventListener("submit", e => {
      e.preventDefault();
      const name = document.getElementById("name").value.trim();
      const rating = ratingInput.value;

      if (!name) return alert("Escriu el teu nom");
      if (!rating || rating === "0") return alert("Selecciona estrelles");

      reviews.push({ name, rating });
      localStorage.setItem("reviews", JSON.stringify(reviews));

      form.reset();
      ratingInput.value = 0;
      stars.forEach(s => s.classList.remove("active"));

      renderReviews();
    });

    renderReviews();
  }
});
