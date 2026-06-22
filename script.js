document.addEventListener("DOMContentLoaded", () => {
  // ==========================================
  // 1. MENU MOBILE
  // ==========================================
  const burgerMenu = document.querySelector(".burger-menu");
  const navMenu = document.querySelector("nav ul");

  if (burgerMenu) {
    burgerMenu.addEventListener("click", () => {
      navMenu.classList.toggle("show");
    });
  }

  // ==========================================
  // 2. GESTION DE LA GALERIE (LIGHTBOX)
  // ==========================================
  const modal = document.getElementById("image-modal");
  const modalImg = document.getElementById("modal-img");
  const modalCaption = document.getElementById("modal-caption");
  const closeModalBtn = document.querySelector(".close-modal");
  const prevBtn = document.querySelector(".prev-modal-btn");
  const nextBtn = document.querySelector(".next-modal-btn");

  let currentGalleryImages = [];
  let currentImageIndex = 0;

  function openModal() {
    if (currentGalleryImages.length > 0 && modal && modalImg) {
      const targetImg = currentGalleryImages[currentImageIndex];
      modalImg.src = targetImg.src;
      if (modalCaption) {
        modalCaption.textContent =
          targetImg.alt || `Toile ${currentImageIndex + 1}`;
      }
      modal.classList.add("show");
    }
  }

  function nextImage() {
    if (currentGalleryImages.length > 0) {
      currentImageIndex = (currentImageIndex + 1) % currentGalleryImages.length;
      openModal();
    }
  }

  function prevImage() {
    if (currentGalleryImages.length > 0) {
      currentImageIndex =
        (currentImageIndex - 1 + currentGalleryImages.length) %
        currentGalleryImages.length;
      openModal();
    }
  }

  if (nextBtn)
    nextBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      nextImage();
    });
  if (prevBtn)
    prevBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      prevImage();
    });

  if (closeModalBtn) {
    closeModalBtn.addEventListener("click", () => {
      modal.classList.remove("show");
    });
  }

  if (modal) {
    modal.addEventListener("click", (e) => {
      if (
        e.target === modal ||
        e.target.classList.contains("modal-image-wrapper")
      ) {
        modal.classList.remove("show");
      }
    });
  }

  document.addEventListener("keydown", (e) => {
    if (modal && modal.classList.contains("show")) {
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
      if (e.key === "Escape") modal.classList.remove("show");
    }
  });

  // ==========================================
  // 3. CLIC SUR LE CARROUSEL VISIBLE
  // ==========================================
  document.querySelectorAll("[data-gallery]").forEach((galleryContainer) => {
    const images = Array.from(galleryContainer.querySelectorAll("img"));
    images.forEach((img, index) => {
      img.addEventListener("click", () => {
        // Au clic sur le carrousel, on charge la banque complète cachée
        const hiddenImages = Array.from(
          document.querySelectorAll("#data-all-paintings img"),
        );
        if (hiddenImages.length > 0) {
          currentGalleryImages = hiddenImages;
          currentImageIndex = index; // On ouvre sur l'index cliqué si correspondance
          openModal();
        } else {
          // Sécurité si les 50 images ne sont pas encore intégrées
          currentGalleryImages = images;
          currentImageIndex = index;
          openModal();
        }
      });
    });
  });

  // ==========================================
  // 4. BOUTON "VISIONNER LES 50 TOILES"
  // ==========================================
  const btnAllPaintings = document.getElementById("btn-all-paintings");
  if (btnAllPaintings) {
    btnAllPaintings.addEventListener("click", () => {
      const hiddenImages = Array.from(
        document.querySelectorAll("#data-all-paintings img"),
      );
      if (hiddenImages.length > 0) {
        currentGalleryImages = hiddenImages;
        currentImageIndex = 0;
        openModal();
      }
    });
  }
});
