
let saturate = document.querySelector("#saturate");
let contrast = document.querySelector("#contrast");
let brightness = document.querySelector("#brightness");
let sepia = document.querySelector("#sepia");
let grayscale = document.querySelector("#grayscale");
let blur = document.querySelector("#blur");
let hue_rotate = document.querySelector("#hue-rotate");

let download = document.querySelector("#download");
let reset = document.querySelector(".reset");
let upload = document.querySelector("#upload");
let img = document.querySelector("#img");
let img_box = document.querySelector(".img-box");



window.onload = function(){
    download.style.display = "none";
    reset.style.display = "none";
    img_box.style.display = "none";
}

upload.onchange = function(){
    download.style.display = "block";
    reset.style.display = "block";
    img_box.style.display = "block";
    let file = new FileReader();
    file.readAsDataURL(upload.files[0]);
    file.onload = function(){
        img.src = this.result;
    }
}


let filters = document.querySelectorAll("ul li input");

filters.forEach(filter => {
    filter.addEventListener("input", function(){
        img.style.filter = `
            saturate(${saturate.value}%)
            contrast(${contrast.value}%)
            brightness(${brightness.value}%)
            sepia(${sepia.value}%)
            grayscale(${grayscale.value})
            blur(${blur.value}px)
            hue-rotate(${hue_rotate.value}deg)
        `
    })
})