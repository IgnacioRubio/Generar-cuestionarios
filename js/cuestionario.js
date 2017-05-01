var contPreg = 0; // almacena el numero de preguntas generadas
var preguntas = new Array(); // almacena las preguntas que iremos generando


var formPreg; // formulario donde se crean las preguntas
var contPrinc; // refrencia al contenedor de preguntas y boton de "crear pregunta"  y "generar test"

var gPreg; // referencia al boton que crea la pregunta o modifica

window.onload = function()
{
	var btnCrearPreg = document.getElementById("bCrearPreg");
	var btnGenerarTest = document.getElementById("bGenerarTest");

	btnCrearPreg.addEventListener("click", crearPregunta, false);
	document.getElementById("btnCancelPreg").addEventListener("click", cancelarPreg, false);
	btnGenerarTest.addEventListener("click", generarTest, false);

	formPreg = document.getElementById("formPreg");

	contPrinc = document.getElementById("container");

	gPreg = document.getElementById("subPregunta");
}


function crearPregunta()
{
	formPreg.style.visibility = "visible";
	contPrinc.style.visibility = "hidden";

	document.getElementById("labelPreg").innerText = "Pregunta " + (contPreg + 1) + ". ";	

	gPreg.addEventListener("click", nuevaPregunta, false);
}

function cancelarPreg()
{
	formPreg.style.visibility = "hidden";
	contPrinc.style.visibility = "visible";
}

function nuevaPregunta()
{
	var preg = document.getElementById("preg");
	var resp1 = document.getElementById("respuesta1");
	var resp2 = document.getElementById("respuesta2");
	var resp3 = document.getElementById("respuesta3");
	var numResp = document.getElementById("respCorrecta");

	
	if(preg.value!= "" && resp1.value != "" && resp2 != "" && resp3.value != "")
	{
		preguntas.push(new Pregunta(preg.value, new Array(resp1.value, resp2.value, resp3.value), numResp.value));

		var divPr = document.getElementById("divPregs"); // referencia al espacio donde colocamos las preguntas creadas

		var btnPreg = document.createElement("BUTTON");
		btnPreg.setAttribute("value", contPreg);

		btnPreg.appendChild(document.createTextNode("Pregunta " + (contPreg + 1)));

		divPr.appendChild(btnPreg);

		// falta añadirle la funcionalidad de modificar la pregunta
		btnPreg.addEventListener("click", mostrarPregunta, false);


		contPreg++;

		preg.value = "";
		resp1.value = "";
		resp2.value = "";	
		resp3.value = "";
		numResp.selectedIndex = 0;

		formPreg.style.visibility = "hidden";
		contPrinc.style.visibility = "visible";
		
	}
	else
		alert("Debe de llenar todos los campos para crear la pregunta.");
}


var posPreg; // posicion de la pregunta

// funcionalidad de muestra la pregunta
function mostrarPregunta()
{
	formPreg.style.visibility = "visible";
	contPrinc.style.visibility = "hidden";

	posPreg = parseInt(this.value);

	document.getElementById("labelPreg").innerText = "Pregunta " + (posPreg + 1) + ". ";

	gPreg.innerText = "Modificar pregunta";
	gPreg.removeEventListener("click", nuevaPregunta);
	gPreg.addEventListener("click", modificarPregunta, false);


	var preg = document.getElementById("preg");
	var resp1 = document.getElementById("respuesta1");
	var resp2 = document.getElementById("respuesta2");
	var resp3 = document.getElementById("respuesta3");
	var numResp = document.getElementById("respCorrecta");

	preg.value = preguntas[posPreg].pregunta;
	resp1.value = preguntas[posPreg].respuestas[0];
	resp2.value = preguntas[posPreg].respuestas[1];
	resp3.value = preguntas[posPreg].respuestas[2];
	numResp.selectedIndex = preguntas[posPreg].posRespuestaCorrecta - 1;

}

// permite modificar la pregunta generada previamente
function modificarPregunta()
{
	var preg = document.getElementById("preg");
	var resp1 = document.getElementById("respuesta1");
	var resp2 = document.getElementById("respuesta2");
	var resp3 = document.getElementById("respuesta3");
	var numResp = document.getElementById("respCorrecta");

	if(preg.value!= "" && resp1.value != "" && resp2 != "" && resp3.value != "")
	{
		preguntas[posPreg].pregunta = preg.value;
		preguntas[posPreg].respuestas[0] = resp1.value;
		preguntas[posPreg].respuestas[1] = resp2.value;
		preguntas[posPreg].respuestas[2] = resp3.value;
		preguntas[posPreg].posRespuestaCorrecta = numResp.value;

		preg.value = "";
		resp1.value = "";
		resp2.value = "";	
		resp3.value = "";
		numResp.selectedIndex = 0;

		gPreg.removeEventListener("click", modificarPregunta);
		gPreg.addEventListener("click", nuevaPregunta, false);

		gPreg.innerText = "Guardar pregunta";

		formPreg.style.visibility = "hidden";
		contPrinc.style.visibility = "visible";		
	}
	else
		alert("Debe de llenar todos los campos para crear la pregunta.");
}

// genera el cuestionario a partir de las preguntas creadas
function generarTest()
{
	
	if(contPreg > 0)
	{
		var nomCuestionario = prompt("Nombre del cuestionario: ");

		var ventCuestionario = window.open();

		// div que encapsula todo el contenido del cuestionario
		ventCuestionario.document.write("<div style='width:90%; border: 2px solid #1F1F1F; background-color: #FFFFCC; margin:auto; margin-top: 45px;font-family: Arial, Helvetica, sans-serif;'>");

		// nombre del cuestionario
		ventCuestionario.document.write("<h1 style='text-align: center'>" + nomCuestionario + "</h1>");

		// mensaje
		ventCuestionario.document.write("<p style='text-align: center'>Contesta a las siguientes preguntas marcando la respuesta correcta:</p>");

		// preguntas y respuestas
		for(var i = 0; i<preguntas.length; i++)
		{
			// div que encapsula las preguntas con sus respuestas
			ventCuestionario.document.write("<div style='width:  80%; margin: auto; background-color: #F6D1A7; border-top: 15px solid #CC0000; border-left:  15px solid #CC0000; border-bottom: 2px solid #CC0000; border-right: 2px solid #CC0000;'>");

			// numero de la pregunta
			ventCuestionario.document.write("<p style='margin: 0; margin-left: -15px; display: inline; background-color: #0000FF; color: white; font-weight: bold; font-size: 1.5em; padding: 15px 12px 5px 11px;'>" + (i+1) + "</p>");

			// pregunta
			ventCuestionario.document.write("<p style='width: 80%; margin-left: 50px; margin-top: 0; margin-bottom: 25px;'>" + preguntas[i].pregunta + "</p>");

			for(var j = 0; j<preguntas[i].respuestas.length; j++)
			{
				ventCuestionario.document.write("<p style='width: 75%; margin-left: 70px; margin-bottom: 0;'>" + (j+1) + ". <input style='margin-left: 15px;' type='radio' name='" +i + "'value='" +(j+1)+"'>" +  preguntas[i].respuestas[j] + "</p>");
				// ventCuestionario.document.write("<br>");
			}

			ventCuestionario.document.write("</div>");
		}

		// botones de calificiacións y reperitr cuestionario
		ventCuestionario.document.write("<div style='background-color: #F6D1A7; width: 95%; margin: auto; margin-top: 20px; margin-bottom: 20px; border: 1px solid #CC0000; padding: 20px; box-sizing: border-box;'>");

		ventCuestionario.document.write("<button style='display: block; margin: auto; margin-bottom: 50px;' onclick='calificarCuestionario()'>Calificación final</button>");
		ventCuestionario.document.write("<button style='display: block; margin: auto;' onclick='intarNuevo()'>Intentalo de nuevo</button>");

		ventCuestionario.document.write("</div>");

		ventCuestionario.document.write("</div>");

	

		// funciones para los botones
		ventCuestionario.document.write("<script>function intarNuevo(){var inputs = document.getElementsByTagName('input'); for(var i = 0; i < inputs.length; i++) {if(inputs[i].type.includes('radio')) inputs[i].checked = false;}}function calificarCuestionario() {var numPreguntas = 0; var respCorrectas = 0; numPreguntas = window.opener.preguntas.length; for(var i = 0; i < window.opener.preguntas.length; i++) {var res = document.getElementsByName(i); var sol = null; for(var z = 0; z < res.length; z++) {if(res[z].checked) sol = res[z].value; } if(sol == window.opener.preguntas[i].posRespuestaCorrecta) respCorrectas++; } alert('\\nRespuestas correctas = ' + respCorrectas + '\\nRespuestas falladas = ' + (numPreguntas-respCorrectas) + '\\nNº preguntas = ' + numPreguntas); }<\/script>");
	}
	else
		alert("No se ha creado ninguna pregunta, crea una pregunta antes de generar el cuestionario.")
}



/////////////////////////////
/////////////////////////////
/////////////////////////////
/////////////////////////////


// Clase para alamacenar una pregunta con sus respuestas
// pregunta :: pregunta de tipo string
// respuestas :: un array con las respuestas posibles a la pregunta
// posRespuestaCorrecta :: posicion donde se encuentra la respuesta correcta (posibles valores >=1) 
		
function Pregunta(pregunta, respuestas, posRespuestaCorrecta)
{
	this.pregunta = pregunta;
	this.respuestas = respuestas;
	this.posRespuestaCorrecta = posRespuestaCorrecta;
}