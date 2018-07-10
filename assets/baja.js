// Initialize Firebase
var config = {
    apiKey: "AIzaSyBRrNpwc14FhpcVXutaKZIoa2XWXRYc4J4",
    authDomain: "urbantreeschedule.firebaseapp.com",
    databaseURL: "https://urbantreeschedule.firebaseio.com",
    projectId: "urbantreeschedule",
    storageBucket: "",
    messagingSenderId: "794911316272"
};
firebase.initializeApp(config);

var dataRef = firebase.database();

initApp = function() {
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {

     

      } else {
        // User is signed out.
        console.log("-- User Signed Out --");
        window.location.href='login.html';
        //document.getElementById('sign-in-status').textContent = 'Signed out';
        //document.getElementById('sign-in').textContent = 'Sign in';
        //document.getElementById('account-details').textContent = 'null';
      }
    }, function(error) {
      console.log(error);
    });
  };

  window.addEventListener('load', function() {
    initApp()
  });


var diaClase;
var randomFormat = "YYYY/MM/DD";
var nombreSocio;
var key;
var horarioEscogidomodificado;
var sesionesDisponibles;
var emailSocio;

$("#buscarDatos").on("click", function (event) {
    event.preventDefault();
    nombreSocio = $("#nombreSocia").val().trim();
    diaClase = $("#fechaClase").val();
    var horarioClase = $("#horarioClase").val();
    var horarioClase = $("#horarioClase").val();
    var horarioEscogido = diaClase + horarioClase;
    horarioEscogidomodificado = horarioEscogido.replace(/\.|\s|:/g, "");
    //console.log("El correo es " + nombreSocio)
    //console.log("El horario escogido es" + horarioEscogidomodificado)
    dataRef.ref().child("/" + horarioEscogidomodificado).orderByChild("nombre").equalTo(nombreSocio).once("value", function (snapshot) {
        if(snapshot.exists()){
        key = Object.keys(snapshot.val())[0];
        //console.log("Los datos de firebase son " + key);
        infoSocios();
        $("#Respuesta").text("El socio si tiene clase ese día y hora da click en Borrar Clase para cancelar su reservación")
        
        //*Esto permite que se active el boton para borrar clase
        $("#borrarClase").prop("disabled", false)
        }
        else{
            //console.log("No Existe");
            $("#Respuesta").text("Este socio no tiene clase este dia y a esta hora, por favor verificar datos")
        }
    });
})

$("#borrarClase").on("click", function (event) {
    event.preventDefault();
    var reposicionClase=$("#reposicionClase").val()
    if (reposicionClase==="Si"){
        sesionesDisponibles++;
        sumarClase()
        $("#Respuesta").empty();
        $("#Respuesta").text("Se ha eliminado la clase del socio con exito y se le han agregado una sesión")
        dataRef.ref("/" + horarioEscogidomodificado).child(key).remove();
        limpiarCampos();
    }
    else{
        $("#Respuesta").empty();
        $("#Respuesta").text("Se ha eliminado la clase del socio con exito sin reposición")
        dataRef.ref("/" + horarioEscogidomodificado).child(key).remove();
        limpiarCampos();
    }
    
        
});

//*Funcion para restar clases

function sumarClase() {
    var query = dataRef.ref("/socias").orderByChild("emailSocio").equalTo(emailSocio);
    query.once("child_added", function (snapshot) {
        snapshot.ref.update({ numSesiones:sesionesDisponibles })
    })
}

//* Funcion para buscar el correo y las sesiones del socio
function infoSocios(){
    var query = dataRef.ref("/socias").orderByChild("nombreSocio").equalTo(nombreSocio);
    query.once("child_added", function (snapshot) {
        sesionesDisponibles=snapshot.val().numSesiones;
        emailSocio=snapshot.val().emailSocio;
        //console.log("Sus sesiones disponibles son " + sesionesDisponibles);
        //console.log("Sus correo es " + emailSocio);
    })
}

function limpiarCampos(){
    $("#nombreSocia").val("");
}