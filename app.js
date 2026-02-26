const burger = document.querySelector(".burger");
const nav = document.querySelector(".nav");

burger.addEventListener("click", () => {
  burger.classList.toggle("active");
  nav.classList.toggle("active");
});

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const target = document.querySelector(this.getAttribute("href"));
    if (!target) return;

    e.preventDefault();

    target.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

    burger.classList.remove("active");
    nav.classList.remove("active");
  });
});

document.querySelectorAll(".faq-question").forEach((button) => {
  button.addEventListener("click", () => {
    const item = button.closest(".faq-item");
    item.classList.toggle("active");
  });
});

(() => {
  const total = 17;
  const base = "images/certificates";

  const root = document.querySelector(".certs-carousel");
  const track = root.querySelector(".certs-track");
  const dotsWrap = root.querySelector(".certs-dots");
  const prevBtn = root.querySelector(".prev");
  const nextBtn = root.querySelector(".next");
  const viewport = root.querySelector(".certs-viewport");

  let index = 0;
  const slides = [];

  // === Створюємо слайди + крапки ===
  for (let i = 1; i <= total; i++) {
    const li = document.createElement("li");
    li.className = "certs-slide";
    li.setAttribute("role", "group");
    li.setAttribute("aria-label", `Слайд ${i} з ${total}`);

    const img = document.createElement("img");
    img.src = `${base}/${i}.PNG`;
    img.alt = `Сертифікат ${i}`;
    li.appendChild(img);

    track.appendChild(li);
    slides.push(li);

    if (dotsWrap) {
      const dot = document.createElement("button");
      dot.className = "certs-dot";
      dot.setAttribute("role", "tab");
      dot.setAttribute("aria-label", `Перейти до слайду ${i}`);
      dot.addEventListener("click", () => goTo(i - 1));
      dotsWrap.appendChild(dot);
    }
  }

  const render = () => {
    const n = slides.length;
    const vw = window.innerWidth;

    const stepX = vw < 768 ? 0 : 300; // відступ для десктопу
    slides.forEach((el, i) => {
      const d = i - index;
      let tx = d * stepX;
      let tz = -Math.abs(d) * 100;
      let sc = 1 - Math.min(Math.abs(d) * 0.1, 0.5);
      let op = Math.max(0, 1 - Math.abs(d) * 0.2);

      if (vw < 768) {
        tz = 0;
        sc = 1;
        op = 1;
        tx = 0;
      }

      el.style.transform = `translate3d(calc(-50% + ${tx}px),0,${tz}px) scale(${sc})`;
      el.style.zIndex = String(100 - Math.abs(d));
      el.style.opacity = op;
      el.classList.toggle("is-active", d === 0);
    });

    if (dotsWrap) {
      [...dotsWrap.children].forEach((d, i) =>
        d.setAttribute("aria-selected", String(i === index)),
      );
    }
  };

  const goTo = (i) => {
    index = (i + slides.length) % slides.length;
    render();
  };
  const goNext = () => goTo(index + 1);
  const goPrev = () => goTo(index - 1);

  nextBtn.addEventListener("click", goNext);
  prevBtn.addEventListener("click", goPrev);

  window.addEventListener("resize", render);
  render();

  // === Модалка ===
  const modal = document.getElementById("certModal");
  const modalImg = document.getElementById("certModalImg");
  const modalClose = document.querySelector(".cert-modal-close");

  slides.forEach((slide) => {
    slide.addEventListener("click", () => {
      modalImg.src = slide.querySelector("img").src;
      modalImg.alt = slide.querySelector("img").alt;
      modal.classList.add("open");
    });
  });

  modalClose.addEventListener("click", () => modal.classList.remove("open"));
  modal.addEventListener("click", (e) => {
    if (e.target === modal) modal.classList.remove("open");
  });
})();
