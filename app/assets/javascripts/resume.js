$( document ).ready(function() {

		$("#tabCart").replaceWith(localStorage.carrito);
		localStorage.carrito = "";
});

function getResumen(){

	window.location.href = "show";
}