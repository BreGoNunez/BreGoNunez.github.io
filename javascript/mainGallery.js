var fullImgBox = document.getElementById("fullImgBox");
var fullImg = document.getElementById("fullImg");

function openFullImg(picture){
    fullImgBox.style.display = "flex";
    fullImg.src = picture;
}

function closeFullImg(picture){
    fullImgBox.style.display = "none";
    fullImg.src = picture;
}