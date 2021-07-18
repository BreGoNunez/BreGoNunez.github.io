

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
//-----------Proceso de seleccion de imagen--------------
function seleccionar(event) {
    var file = event.target.files[0];
    var reader = new FileReader();
    reader.onload = function(e) {
      // The file's text will be printed here
      document.getElementById("myImg").src = reader.result;
    };
  
    reader.readAsDataURL(file);
  }

  //-----------Proceso de upload de imagen--------------
//-----------upload de imagen--------------
  document.getElementById('upload').onclick=function(){
    ImgName= document.getElementById('namebox').value;
    var uploadTask= firebase.storage().ref('Imagenes/'+ImgName+'.png').put(files[0]);
    var res = encodeURI(ImgName);
    console.log(res);

    uploadTask.on('state_changed',function(snapshot){
        var progress=(snapshot.bytesTransferred/snapshot.totalBytes)*100;
        document.getElementById('upProgress').innerHTML= 'Upload'+progress+'%'; //el innerHTML y esta linea es para estar reemplazando 
 //-----------error handling -------------                                                            //la etiqueta con cada porcentaje nuevo
    },
function(error){
    alert('Error en el proceso de guardado');
},
 //-----------submit image link a la database------------- 
function(){
        uploadTask.snapshot.ref.getDownloadURL().then(function(url){  //conseguir la URL de la imagen guardada del storage
            ImgUrl= url;
        
        firebase.database().ref('Pictures/'+ImgName).set({   //guardar la URL en el database de Firebase
            Name: ImgName,
            Link:ImgUrl
        });
        alert('Imagen agregada con exito');
}
    );
});
}