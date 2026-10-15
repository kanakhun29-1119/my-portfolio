const hamburger = document.querySelector(".hamburger");
const headerNav = document.querySelector(".header-nav");

hamburger.addEventListener("click", function () {
    hamburger.classList.toggle("is-open");
    headerNav.classList.toggle("is-open");
});

const galleries = {
    cafe: {
        title: "TODAY'S CAFE",
        images: [
            "./images/instagram-cafe01.png",
            "./images/instagram-cafe02.png",
            "./images/instagram-cafe03.png",
            "./images/instagram-cafe04.png",
            "./images/instagram-cafe05.png"
        ]
    },

    parenting: {
        title: "育児イラスト",
        images: [
            "./images/parenting01.png",
            "./images/parenting02.png",
            "./images/parenting03.png",
            "./images/parenting04.png",
            "./images/parenting05.png",
            "./images/parenting06.png",
            "./images/parenting07.png"
        ]
    }
};

const modal = document.querySelector("#gallery-modal");
const galleryImage = document.querySelector(".gallery-image");
const galleryTitle = document.querySelector(".gallery-title");
const galleryCount = document.querySelector(".gallery-count");
const closeButton = document.querySelector(".gallery-close");

let currentGallery = null;
let currentIndex = 0;
let lastFocusedElement = null;

function showGalleryImage() {
    galleryImage.src = currentGallery.images[currentIndex];
    galleryImage.alt = `${currentGallery.title} ${currentIndex + 1}枚目`;
    galleryCount.textContent =
        `${currentIndex + 1} / ${currentGallery.images.length}`;
}

document.querySelectorAll(".instagram-card").forEach(card => {
    card.addEventListener("click", () => {
        currentGallery = galleries[card.dataset.gallery];
        if (!currentGallery) return;

        lastFocusedElement = document.activeElement;
        currentIndex = 0;
        galleryTitle.textContent = currentGallery.title;
        showGalleryImage();

        modal.hidden = false;
        document.body.style.overflow = "hidden";
        closeButton.focus();
    });
});

function closeGallery() {
    modal.hidden = true;
    document.body.style.overflow = "";
    galleryImage.removeAttribute("src");
    lastFocusedElement?.focus();
}

closeButton.addEventListener("click", closeGallery);

document.querySelector(".gallery-prev").addEventListener("click", () => {
    currentIndex =
        (currentIndex - 1 + currentGallery.images.length)
        % currentGallery.images.length;
    showGalleryImage();
});

document.querySelector(".gallery-next").addEventListener("click", () => {
    currentIndex =
        (currentIndex + 1) % currentGallery.images.length;
    showGalleryImage();
});

modal.addEventListener("click", event => {
    if (event.target === modal) closeGallery();
});

document.addEventListener("keydown", event => {
    if (modal.hidden) return;

    if (event.key === "Escape") closeGallery();
    if (event.key === "ArrowLeft")
        document.querySelector(".gallery-prev").click();
    if (event.key === "ArrowRight")
        document.querySelector(".gallery-next").click();

    if (event.key === "Tab") {
        const controls = [
            closeButton,
            document.querySelector(".gallery-prev"),
            document.querySelector(".gallery-next")
        ];
        const index = controls.indexOf(document.activeElement);
        if (event.shiftKey && index === 0) {
            event.preventDefault();
            controls[controls.length - 1].focus();
        } else if (!event.shiftKey && index === controls.length - 1) {
            event.preventDefault();
            controls[0].focus();
        }
    }
});
