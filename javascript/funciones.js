

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
/* function seleccionar(event) {
    var file = event.target.files[0];
    var reader = new FileReader();
    reader.onload = function(e) {
      // The file's text will be printed here
      document.getElementById("myImg").src = reader.result;
    };
  
    reader.readAsDataURL(file);
  } */
// -----------------MOSTRAR PREVIEW Y GUARDAR IMAGENES EN ARRAY
  document.getElementById('select').addEventListener('change', function(e) {
    files = e.target.files;
    document.getElementById("myImg").src = URL.createObjectURL(files[0]);;
    
    });
// -----------------------------BOTON DE UPLOAD
    document.getElementById("upload").addEventListener("click", function() {
        //checks if files are selected
        if (files.length != 0) {
  
        //Loops through all the selected files
        for (let i = 0; i < files.length; i++) {
  
          //create a storage reference
          var storage = firebase.storage().ref('Imagenes/'+files[i].name);
  
          //upload file
          var upload = storage.put(files[i]);
  
          //update progress bar
          upload.on(
            "state_changed",
            function progress(snapshot) {
              var percentage =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              document.getElementById("upProgress").value = percentage;
            },
  
            function error() {
              alert("error uploading file");
            },
  
            function complete() {
              document.getElementById(
                "upProgress"
              ).innerHTML += `${files[i].name} upoaded <br />`;
            }
          );
        }
        } else {
        alert("No file chosen");
        }
        });

        //------------------- RETRIEVE FROM STORAGE, pero este era uno por uno
        /* function getFileUrl(filename) {
            //create a storage reference
            var storage = firebase.storage().ref(filename);
            
            //get file url
            storage
            .getDownloadURL()
            .then(function(url) {
              console.log(url);
            })
            .catch(function(error) {
              console.log("error encountered");
            });
            }
 */
         //------------------- RETRIEVE FROM STORAGE, LISTAR TODOS  

         var storage = firebase.storage();
         var storageRef= storage.ref();
         
         //document.getElementById('List').html('');
         var i=0;
// PARA LISTAR IMAGENES NECESITO LA version 2 de las reglas de Firebase
         storageRef.child('Imagenes/').listAll().then(function(result){   
             result.items.forEach(function(imageRef){
                 console.log("Image reference"+ imageRef.toString());

                 i++;
                 displayImage(i,imageRef);

             });
         });

function displayImage(row,images){
    images.getDownloadURL().then(function(url){

        console.log(url);

        let new_html='';
        new_html += '<tr>';
        new_html += '<td>';
        new_html += row;
        new_html += '</td>';
        new_html += '<td>';
        new_html += '<img src="'+url+'" width="100px" style="float:right">';
        new_html += '</td>';
        new_html += '</tr>';

        //document.getElementById('List').find('tbody').append(new_html);
        rowGaleria.insertAdjacentHTML('afterbegin','<em>HOLA</em>');
    });
}

  //-----------Proceso de upload de imagen--------------
//-----------upload de imagen--------------
 /*  document.getElementById('upload').onclick=function(){
    ImgName= document.getElementById('namebox').value;
    var uploadTask= firebase.storage().ref('Imagenes/'+ImgName+'.jpg').put(file);
    var res = encodeURI(ImgName);
    console.log(res);

    uploadTask.on('state_changed',function(snapshot){
        var progress=(snapshot.bytesTransferred/snapshot.totalBytes)*100;
        document.getElementById('upProgress').innerHTML= 'Upload'+progress+'%'; //el innerHTML y esta linea es para estar reemplazando 
 //-----------error handling -------------                                                            //la etiqueta con cada porcentaje nuevo
    },
function(error){
    alert('Error en el proceso de guardado'+ error);
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
} */


