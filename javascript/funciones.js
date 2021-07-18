

//-------------Variable-----------------
var ImgName, ImgUrl;
var files = [];
var reader;

//-----------Proceso de seleccion de imagen--------------


/* function seleccionar() {
    
    var input = document.createElement('input');
    input.type = 'file';
    //PROCESO PARA MOSTRAR IMAGEN
    input.onchange = e => {
        files = e.target.files;
        reader = new FileReader();
        reader.onload = function () {
            document.getElementById("myImg").src = reader.result;
            console.log("Hola");
        }
        reader.readAsDataURL(files[0]);  //me lee la imagen como url y cuando termine, lo asigna a myImg.src, es asincrono
    }
    
} */

function seleccionar(event) {
    var file = event.target.files[0];
    var reader = new FileReader();
    reader.onload = function(e) {
      // The file's text will be printed here
      document.getElementById("myImg").src = reader.result;
    };
  
    reader.readAsDataURL(file);
  }
