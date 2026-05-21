let saturate = document.querySelector("#saturate");
let contrast = document.querySelector("#contrast");
let brightness = document.querySelector("#brightness");
let sepia = document.querySelector("#sepia");
let grayscale = document.querySelector("#grayscale");
let blur = document.querySelector("#blur");
let hue_rotate = document.querySelector("#hue-rotate");

let download = document.querySelector("#download");
let reset = document.querySelector(".reset-btn");
let upload = document.querySelector("#upload");
let img = document.querySelector("#img");
let img_box = document.querySelector(".img-box");

let filters = document.querySelectorAll(".filters-list input[type='range']");

window.onload = function() {
    download.style.display = "none";
    reset.style.display = "none";
    img_box.style.display = "none";
}

upload.onchange = function() {
    if (upload.files && upload.files[0]) {
        download.style.display = "inline-flex";
        reset.style.display = "inline-flex";
        img_box.style.display = "flex";

        let file = new FileReader();
        file.readAsDataURL(upload.files[0]);
        file.onload = function() {
            img.src = this.result;
            resetFilters();
        }
    }
}

function applyFilters() {
    img.style.filter = `
        saturate(${saturate.value}%)
        contrast(${contrast.value}%)
        brightness(${brightness.value}%)
        sepia(${sepia.value}%)
        grayscale(${grayscale.value})
        blur(${blur.value}px)
        hue-rotate(${hue_rotate.value}deg)
    `;
}

filters.forEach(filter => {
    filter.addEventListener("input", applyFilters);
});

function resetFilters() {
    saturate.value = "100";
    contrast.value = "100";
    brightness.value = "100";
    sepia.value = "0";
    grayscale.value = "0";
    blur.value = "0";
    hue_rotate.value = "0";
    applyFilters();
}

reset.addEventListener("click", resetFilters);

download.addEventListener("click", function(e) {
    e.preventDefault();

    let canvas = document.createElement("canvas");
    let ctx = canvas.getContext("2d");

    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;

    ctx.filter = `
        saturate(${saturate.value}%)
        contrast(${contrast.value}%)
        brightness(${brightness.value}%)
        sepia(${sepia.value}%)
        grayscale(${grayscale.value})
        blur(${blur.value}px)
        hue-rotate(${hue_rotate.value}deg)
    `;

    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    let originalFileName = upload.files[0].name;
    let extensionIndex = originalFileName.lastIndexOf('.');
    let baseName = extensionIndex !== -1 ? originalFileName.substring(0, extensionIndex) : originalFileName;

    download.download = `${baseName}_edited.png`;
    download.href = canvas.toDataURL("image/png");

    let clickEvent = new MouseEvent("click", {
        bubbles: true,
        cancelable: true,
        view: window
    });

    download.dispatchEvent(clickEvent);
});
