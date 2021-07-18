

//-------------Variable-----------------
var ImgName, ImgUrl;
var files = [];
var reader;

//-----------Proceso de seleccion de imagen--------------


const inputElement = document.getElementById("select");
inputElement.addEventListener("change",handleFiles,false) ;
function handleFiles(){
    const fileList=this.files;
    ImgName = fileList[0];
}



document.getElementById("select").onclick = function (e) {
    
    var input = document.createElement('input');
    input.type = 'file';
    //PROCESO PARA MOSTRAR IMAGEN
    input.onchange = e => {
        files = e.target.files;
        reader = new FileReader();
        reader.onload = function () {
            document.getElementById("myImg").files[0] = reader.result;
            console.log("Hola");
        }
        reader.readAsDataURL(files[0]);  //me lee la imagen como url y cuando termine, lo asigna a myImg.src, es asincrono
    }
    input.click();
}
