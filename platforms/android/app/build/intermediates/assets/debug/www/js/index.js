var usuarioLogueado;

var app = {
    // Application Constructor
    initialize: function() {
        funcPrincipal();


        /////////////

        // foto desde la cámara
        $('#but_take').click(function(){
            //alert(usuarioLogueado);
            navigator.camera.getPicture(onSuccess, onFail, { quality: 20,
                destinationType: Camera.DestinationType.FILE_URL
            });
        });

        // upload la seleccionada
        $("#but_select").click(function(){
            navigator.camera.getPicture(onSuccess, onFail, { quality: 50,
                sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
                allowEdit: true,
                destinationType: Camera.DestinationType.FILE_URI
            });
        });
    }
};

app.initialize();

//$(document).on('ready', funcPrincipal);

function funcPrincipal() {
    $('#btnVerificar').click(funcVerificar);
    //$('#formRegistro').click(registrarse);
    $('#formRegistro').on('submit', registrarse);
}


function registrarse(event) {

    var datosEnviados = {
        'usuario'   : $('#txtUsuario').val(),
        'contra'    : $('#txtPassword').val()
    };
    $.ajax({
        type        : 'POST',
        url         : 'http://educaballero.000webhostapp.com/registrarUsuario.php',
        data        : datosEnviados,
        dataType    : 'json',
        encode      : true
    }).done(function (datos) {
        //especificar como actuar con los datos recibidos
        if (datos.exito){
            alert(datos.mensaje);
        } else {
            if (datos.errores.usuario) alert(datos.errores.usuario);
            if (datos.errores.contra) alert(datos.errores.contra);
        }
    });
    event.preventDefault();

}

//var usuarioLogueado;


function funcVerificar() {
    var valorEscrito = $("#txtUsuarioLogin").val();
    var valorEscrito2 = $("#txtPasswordLogin").val();
    $.get("http://educaballero.000webhostapp.com/verificarUsuario.php?usuario="+valorEscrito+"&password="+valorEscrito2, function (data) {
        var respuesta;
        if (data=="0"){
            respuesta = "Este usuario no está registrado";
        } else {
            //respuesta = "Bienvenido!";
            usuarioLogueado = valorEscrito;
            //debug alert(usuarioLogueado);
            window.location.replace('main.html?usuario='+valorEscrito);
        }
        $('#respuesta').text(respuesta);
        //$('#usuariolog').text(valorEscrito);
        //usuarioLogueado = valorEscrito;
    });
}

function pasarUsuario(){

}

// cambia la fuente de la imagen y sube la foto a un servidor
function onSuccess(imageURI) {

    //cogemos el usuario logueado
    var usuarioLog = $("#usuariolog2").text();
    //debug alert(usuarioLog);

    //cogemos la etiqueta
    var etiqueta = $("#etiqueta").val();

    // Set fuente de la imagen
    var image = document.getElementById('img');
    image.src = imageURI  + '?' + Math.random();

    var options = new FileUploadOptions();
    options.fileKey = "file";
    options.fileName = imageURI.substr(imageURI.lastIndexOf('/') + 1);
    options.mimeType = "image/jpeg";

    var params = {};
    params.value1 = "test";
    params.value2 = "param";

    options.params = params;
    options.chunkedMode = false;

    var ft = new FileTransfer();
    ft.upload(imageURI, "http://educaballero.000webhostapp.com/upload.php?usuario="+usuarioLog+"&etiqueta="+etiqueta, function(result){
        alert('Subida correcta ' + result.response);
    }, function(error){
        alert('error : ' + JSON.stringify(error));
    }, options);
}


function onFail(message) {
    alert('Fallo debido a: ' + message);
}


function getImagesFromServer() {

    var container = document.getElementById('imagesGroup');

    //$('#imagenesSubidas').click(function(){
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
    //});

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








/*var app = {
    // Application Constructor
    initialize: function () {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false)
        initPage()
        $("#switchIdentify").click(switchForm)
        $("#btnSubmit").click(onSubmit)
        $("#check").click(check)
    },
    onDeviceReady: function () { this.receivedEvent('deviceready') },
    receivedEvent: function (id) {
        var parentElement = document.getElementById(id)
        var listeningElement = parentElement.querySelector('.listening')
        var receivedElement = parentElement.querySelector('.received')
        listeningElement.setAttribute('style', 'display:none')
        receivedElement.setAttribute('style', 'display:block')
        console.log('Received Event: ' + id)
    }
}

app.initialize()

const baseUrl = "https://edu-sintesis.000webhostapp.com"

function renderIdentifyForm() {
    var html = `
        <form class="form">
            <h2 id="identifyTitle">Login</h2>
            <input type="text" id="nombre" class="form-control" placeholder="Nombre" autocomplete="name">
            <input type="email" id="email" class="form-control" placeholder="Email" autocomplete="email">
            <input type="password" id="contraseña" class="form-control" placeholder="Contraseña" autocomplete="new-password">
            <a id="switchIdentify">¿Aún no tienes cuenta?</a>
            <input type="hidden" id="typeIdentify" class="form-control" name="typeIdentify" value="login">
            <input type="button" value="Iniciar sesión" class="btn btn-success form-control" id="btnSubmit">
        </form>`
    $('body').html(html)
}

function renderHeader() {
    return `
    <div class="header">
        <h4>Sintesis</h4>
        <input class="form-control" type="search" placeholder="Introduce una etiqueta"/>
    </div>
    `
}

// function renderPostTemplate(post) {
//     return `
//         <>
//     `
// }

var idUser

function initPage() {
    if (idUser != null) {
        console.log("Is User")
        $("#divNotas").show()
        $("#divIdentify").hide()
        initNotas()
    } else {
        console.log("Is not User")
        // renderIdentifyForm()
        // $('body').html(renderHeader())
        $("#divNotas").hide()
        $("#divIdentify").show()
        $("#nombre").hide()
    }
}

function switchForm() {
    if ($("#typeIdentify").val() != "login") {
        $("#identifyTitle").html("Login")
        $("#switchIdentify").html("¿Aún no tienes cuenta?")
        $("#nombre").hide()
        $("#typeIdentify").val("login")
        $("#btnSubmit").val("Iniciar sesión")
    } else {
        $("#identifyTitle").html("Registro")
        $("#switchIdentify").html("¿Ya tienes cuenta?")
        $("#nombre").show()
        $("#typeIdentify").val("register")
        $("#btnSubmit").val("Registrarse")
    }
    console.log("Hidden: " + $("#typeIdentify").val())
}

function reloadPage() {
    window.location.reload(true)
}

// SUBMIT
function onSubmit() {
    if ($("#email").val() == "" || $("#contraseña").val() == "") {
        alertEmptyButtons()
        return
    } else {
        if ($("#typeIdentify").val() == "register") {
            if ($("#nombre").val() == "") {
                alertEmptyButtons()
                return
            }
        }
    }

    // Si ningún campo del formulario las siguientes lineas de código se ejecutarán
    submit()
}

function submit() {
    console.log('submit')
    $.ajax({
        type: "POST",
        dataType: "html",
        jsonp: "callback",
        url: `${baseUrl}/php/funciones.php`,
        data: {
            action: $("#typeIdentify").val(),
            nombre: $("#nombre").val(),
            email: $("#email").val(),
            contraseña: $("#contraseña").val()
        },
        success: function (data) {
            if ($("#typeIdentify").val() == "login") {
                if (data != "-1") {
                    window.location.href = baseUrl + "?id=" + data
                } else {
                    alertErrorIdentify()
                }
            } else {
                if (data == 1) {
                    alertUserCreated()
                } else {
                    alertErrorIdentify()
                }
            }
        }
    })
}

function check() {
    $.ajax({
        type: "POST",
        dataType: "html",
        jsonp: "callback",
        url: `${baseUrl}/php/funciones.php`,
        data: {
            action: "login",
            nombre: "edu",
            email: "edu@edu.edu",
            contraseña: "edu"
        },
        success: function (data) {
            if ($("#typeIdentify").val() == "login") {
                if (data != "-1") {
                    // window.location.href = baseUrl + "?id=" + data
                    console.log('Funciona!')
                } else {
                    alertErrorIdentify()
                }
            } else {
                if (data == 1) {
                    alertUserCreated()
                } else {
                    alertErrorIdentify()
                }
            }
        }
    })
}

function alertEmptyButtons() {
    navigator.notification.alert(
        'Rellena todos los campos',     // message
        null,                           // callback
        'Error',                        // title
        'Volver'                        // buttonName
    )
}

function alertUserCreated() {
    navigator.notification.alert(
        'Inicia sesión.',               // message
        reloadPage,                     // callback
        'Usuario creado',               // title
        'Vale'                          // buttonName
    )
}

function alertErrorIdentify() {
    var tipo
    if ($("#typeIdentify").val() == "login") {
        tipo = "hacer login"
    } else {
        tipo = "registrarse"
    }
    navigator.notification.alert(
        'Vuelve a intentar.',           // message
        null,                           // callback
        'Error al ' + tipo,             // title
        'Volver'                        // buttonName
    )
}*/

/*/////////////////////////////////////////por defecto///////////////////////////////
var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        this.receivedEvent('deviceready');
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

app.initialize();*/

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
