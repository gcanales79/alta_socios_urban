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

var emailSocio;
var nombreSocio;
var numSocio;
var numSesiones;
var inicioPaquete;
var finPaquete;

$("#altaSocio").on("click", function (event) {
    event.preventDefault();
    nombreSocio = $("#contactName").val();
    emailSocio = $("#contactEmail").val();
    numSocio = $("#numSocio").val();
    numSesiones = parseInt($("#numSesiones").val());
    inicioPaquete = $("#inicioPaquete").val();
    finPaquete = $("#finPaquete").val();

    revisarEmail();


    //* Alta de Socio en la base de datos

})


//* Revisa si el correo ya esta en la base de datos
function revisarEmail() {
    var query = dataRef.ref("/socias").orderByChild("emailSocio").equalTo(emailSocio);
    query.once("value", function (snapshot) {
        var existeCorreo = snapshot.exists();
        if (existeCorreo == false) {
            altaSocio();
        }
        else {
            $("#Respuesta").text("Ese correo ya esta dado de alta en la base de datos, no se puede dar de alta al socio");
            $("#contactName").val("");
            $("#contactEmail").val("");
            $("#numSocio").val("");
            $("#numSesiones").val("");
            $("#inicioPaquete").val("");
            $("#finPaquete").val("");
        }
    })
}


//* Proceso para dar de alta al socio
function altaSocio() {
    dataRef.ref().child("/socias").push({
        nombreSocio: nombreSocio,
        emailSocio: emailSocio,
        numSocio: numSocio,
        numSesiones: numSesiones,
        inicioPaquete: inicioPaquete,
        finPaquete: finPaquete

    })

    $("#Respuesta").text("El socio fue dado de alta exitosamente")
    $("#contactName").val("");
    $("#contactEmail").val("");
    $("#numSocio").val("");
    $("#numSesiones").val("");
    $("#inicioPaquete").val("");
    $("#finPaquete").val("");

}