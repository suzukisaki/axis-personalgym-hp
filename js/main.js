// ===============================
// 共通：fadeIn 判定関数
// ===============================
function fadeInOnScroll() {
  $(".scale, .filter, .fadein, .fadein-right, .fadein-left, .section-title_animation").each(function () {
    const elemTop = $(this).offset().top;
    const scroll = $(window).scrollTop();
    const windowHeight = $(window).height();

    if (scroll > elemTop - windowHeight + 100) {
      $(this).addClass("active");
    }
  });
}

$(function () {

  // ------------------------------------
  // ローディング
  // ------------------------------------
  setTimeout(function () {
    $('#loading').fadeOut(300, function () {
      // ローディングが消えた後に fadein 判定
      fadeInOnScroll();
    });
  }, 800);

  // スクロール時にも判定
  $(window).on("scroll", function () {
    fadeInOnScroll();
  });

  // ------------------------------------
  // header ハンバーガー
  // ------------------------------------
  const header = document.querySelector("header");
  const toggle = document.querySelector(".hamburger_toggle");
  const mask = document.querySelector(".menu-bg");
  const hamburgerMenu = document.querySelector(".hamburger-menu");

  toggle.addEventListener("click", () => {
    header.classList.toggle("active");
    document.body.classList.toggle("no-scroll");
  });

  mask.addEventListener("click", () => {
    header.classList.remove("active");
    document.body.classList.remove("no-scroll");
  });

  hamburgerMenu.addEventListener("click", () => {
    header.classList.remove("active");
    document.body.classList.remove("no-scroll");
  });

  // ------------------------------------
  // FAQ アコーディオン
  // ------------------------------------
  $(".qa-list dd").hide();

  $(".qa-list dt").on("click", function () {
    const $dl = $(this).closest("dl");
    $dl.find("dd").slideToggle("fast");
    $dl.toggleClass("open");
  });

  // ------------------------------------
  // スクロール連動・スティッキーギャラリー
  // ------------------------------------
  const texts = document.querySelectorAll(".text");
  const photos = document.querySelectorAll(".photo");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const index = entry.target.dataset.img;
        photos.forEach(p => p.classList.remove("active"));
        photos[index].classList.add("active");
      }
    });
  }, {
    threshold: 0.2
  });

  texts.forEach(t => observer.observe(t));

});
