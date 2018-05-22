
var app = {
    // Application Constructor
    initialize: function() {
        //funcPrincipal();
        getImagesFromServer();


        /////////////

    }
};

app.initialize();

//$(document).on('ready', funcPrincipal);

function funcPrincipal() {

}



function onFail(message) {
    alert('Fallo debido a: ' + message);
}


function getImagesFromServer() {

    var container = document.getElementById('imagesGroup');

    $('#imagenesSubidas').click(function(){
    $.ajax({
        type: "POST",
        url: "http://educaballero.000webhostapp.com/getImagenes.php",
        //data: { "codigo" :  "codigo" },
        success: function(arrayImagenes){
            var imgs = arrayImagenes;
            /*Failed to load http://educaballero.000webhostapp.com/getImagenes.php: No 'Access-Control-Allow-Origin' header is present on the requested resource. Origin 'http://localhost:63342' is therefore not allowed access.*/
            for (var i = 0, j = imgs.length; i < j; i++) {
                var img = document.createElement('img');
                img.src = imgs[i]; // img[i] refers to the current URL.
                container.appendChild(img);
                $('img').addClass('img-responsive');//añado una clase para que el bootstrap controle el css de la imagen
            }
        }
    });
    });

}




/*function mostrarImagenes(event) {
    $.ajax({
        type        : 'POST',
        url         : 'http://educaballero.000webhostapp.com/getImagenes.php',
        //data        : datosEnviados,
        dataType    : 'json',
        encode      : true
    }).done(function (arrayImagenes) {
        //especificar como actuar con los datos recibidos
        alert(arrayImagenes);

        /*if (datos.exito){
            alert(datos.mensaje);
        } else {
            if (datos.errores.usuario) alert(datos.errores.usuario);
            if (datos.errores.contra) alert(datos.errores.contra);
        }*/
/* });
 event.preventDefault();
}*/


////////////////////////cristian////////////////////
/*var app = {
    // Application Constructor
    initialize: function () {
        $("#sendNom").click(sendNomAjax);
    }
};
app.initialize();
function sendNomAjax() {
    var nomInput = $("#inputNom").val();
    $.ajax({
        url: "http://localhost:8081/DAM_M10_17_18/practica06_AJAX/PHP_Notas/generaResposta.php",
//        url: "https://damm10cordova.000webhostapp.com/phpCorrecionParcial.php",
        dataType: "jsonp",
        jsonp: "callback",
        data: {"nombre": nomInput},
        beforeSend: function () {
            $("#respAjax").html('Connecting...');
        },
        success: function (respJSON) {

            for (var k = 0; k < respJSON.length; k++) {
                $("#respAjax").append("text:" + respJSON[k].text + "<br />");
            }

        }
    });
}
app.initialize();*/
