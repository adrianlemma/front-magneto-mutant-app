const STATS_URL = "https://magneto-mutant-app.herokuapp.com/stats"
const MUTANT_URL = "https://magneto-mutant-app.herokuapp.com/mutant"

const dna = document.getElementById("dna");
const preview = document.getElementById("prev");
const addButton = document.getElementById("addButton");
const sendButton = document.getElementById("sendButton");
const statButton = document.getElementById("statButton");

var dnaToSend = [];
var cont = 0;


function add() {
    
    if(!addButton.classList.contains("inactive")) {

        var aux = dna.value.toUpperCase();
        if(aux.length == 0) {
            alert("Ingrese un valor valido para la linea de DNA");
            dna.value = "";
            return;
        }
        if(aux.length < 4) {
            alert("Cada linea debe tener al menos 4 caracteres");
            dna.value = "";
            return;
        }
        for(var i = 0; i < aux.length; i++) {
            if(aux.charAt(i) != 'A' && aux.charAt(i) != 'C' && aux.charAt(i) != 'G' && aux.charAt(i) != 'T') {
                alert("Solo son validas las siguientes letras: A, C, G y T");
                dna.value = "";
                return;
            }
        }
        if(cont > 0 && dnaToSend[cont - 1].length != aux.length) {
            alert("Todas las lineas del ADN deben tener la misma longitud");
            dna.value = "";
            return;
        }

        dnaToSend[cont] = aux;
        cont++;

        aux = "{";
        
        for(var i = 0; i < dnaToSend.length; i++) {
            if(i == 0)
                aux = "{\"" + dnaToSend[i] + "\"";
            else
                aux = aux + ",\"" + dnaToSend[i] + "\"";
        }
        aux = aux + "}";
        dna.value = "";
        preview.innerHTML = aux;
        if(dnaToSend.length > 0 && dnaToSend.length == dnaToSend[0].length) {
            sendButton.classList.remove("inactive");
            addButton.classList.add("inactive");
        }
    } else {
        alert("Primero debe enviar el ADN ya cargado");
    }
}



function send() {
    
    if(!sendButton.classList.contains("inactive")) {
        
        var registro = {
            dna: dnaToSend
        }
        var mensaje;
        var salida;

        fetch(MUTANT_URL, {
            method: 'POST',
            body: JSON.stringify(registro),
            headers: {
                "Content-type": "application/json"
            }
        }).then(respuesta => {
            respuesta.json();
            salida = respuesta.status;
            console.log(salida);

            if(salida == 200)
                mensaje = "\nRegistro guardado correctamente\n\n******* Tipo: Mutante *******\n";
            else if(salida == 403)
                mensaje = "\nRegistro guardado correctamente\n\n******* Tipo: Humano *******\n";
            else if(salida == 409)
                mensaje = "\nNo se guardo el registro\n\nEl ADN ha sido registrado anteriormente\n";
            else
                mensaje = "\nHubo un error en la aplicación, intentelo nuevamente...\n";

            sendButton.classList.add("inactive");
            addButton.classList.remove("inactive");
        
            registro = null;
            dnaToSend = [];

            preview.innerHTML = "{...}";
            dna.value = "";
            cont=0;

            alert(mensaje);
        }).then(data => console.log(data))
        .catch(err => {
            err = null;
            console.log(respuesta);
        });
    } else {
        alert("Primero debe completar todas las lineas de ADN (tantas lineas como cantidad de caracteres por linea)");
    }
}


function stats() {

    fetch(STATS_URL, {
        method: 'GET',
        'Access-Control-Allow-Origin': '*'
    })
    .then(response => response.json())
    .then(data => { 
        var mensaje = "\n************* STATS *************\n\n    Cantidad de humanos: " + data.count_human_dna + 
            "\n\n    Cantidad de mutantes: " + data.count_mutant_dna + "\n\n          Ratio: " + data.ratio + 
            "\n\n**********************************";
        
            alert(mensaje);
    })
    .catch(err => console.error(err));

}