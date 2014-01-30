
$( document ).ready(function() {
	$(function() {
	    $(".js__p_start, .js__p_another_start").simplePopup();
	  });

	if(getParameterByName("name")){
		setConfirm();
	}
});

function addtoCart(){

$.ajax({
	success:function(){
	 		
	var price = $("#popupPrice").text();
	var discount = $("#popupDiscount").text();

	var idProduct = $("#idProduct").val();
	var metodoDeselec = "deSeleccionar('"+idProduct+"','"+price+"','"+discount+"');";

	var subtotalActual = $("#tdSubTotal").text().substring(1,$("#tdSubTotal").text().length);
	var subtotalPresente = $("#popupPrice").text();

	$("#tbCarrito").append("<tr class='"+"list-"+idProduct+"'><td>&#10095;&nbsp;"+
						   $(".productTitle").text()+ 
						   "</td><td>$" +
						   $("#popupPrice").text()+
						   "</td><td>"+
		                   "<img onclick="+metodoDeselec+" class='pulse' src='/assets/delete.png' height='25px' width='25px'/>"+
						   "</td><tr>");

	$("#tdSubTotal").text("$" + getSubtotal(subtotalActual, subtotalPresente,"suma"));

	if(discount > 0){
	  $("#discount").text("Awesome! you have added a product with discount!");
	  $("#tdDiscount").text("$" + getDiscount(discount,"suma"));
	}

	$("#tdTotal").text("$" + getTotal("suma"));

	$(".p_close").trigger("click");

	$("#"+idProduct).addClass("selectedProduct");

	}});
}

function getProductInfo(id,name, description, price, discount, path){

	$("#idProduct").val("prod-"+id);
	$(".productDetails").html(description);
	$(".productPrice").html("Price: $<a id='popupPrice'>"+ price + "</a> | " 
							+ "Discount: $<a id='popupDiscount'>" + discount + "</a>");
	$(".imgDetails").attr("src","/assets/"+path);
  	$(".productTitle").html(name);
}

function clearCart(){

$.ajax({
success:function(){

	$("#tbCarrito").html("");
	$(".selectedProduct").removeClass("selectedProduct");

	$("#tdSubTotal").text("$0.0");
	$("#tdDiscount").text("$0.0");
	$("#tdTotal").text("$0.0");

}});

}

function goCheckout(){

	localStorage.carrito=$("#tabCart").html();
	window.location.href = "../cart/new";
}

function getTotal(operacion){

	var subtotal = parseInt($("#tdSubTotal").text().substring(1,$("#tdSubTotal").text().length));
	var discount = parseInt($("#tdDiscount").text().substring(1,$("#tdDiscount").text().length));
	var result;

		if(operacion == "resta")
			result = (subtotal - (subtotal * 0.13)) - discount;

		if(operacion == "suma")
			result = (subtotal + (subtotal * 0.13)) - discount;

	return result;
}

function getSubtotal(subtotal, nuevoprecio, operacion){

var precioActual;

	if(operacion == "suma")
		precioActual = parseInt(subtotal) + parseInt(nuevoprecio);
  
	if(operacion == "resta")
		precioActual = parseInt(subtotal) - parseInt(nuevoprecio);

 return precioActual;

}

function regresar(){

	window.location.href = "index";
}

function deSeleccionar(id, price, discount){

	 $.ajax({
	 	success:function(){

   	$("#"+id).removeClass("selectedProduct");
	$(".list-"+id).remove();
	
	$("#tdSubTotal").text("$"+getSubtotal($("#tdSubTotal").text().substring(1,$("#tdSubTotal").text().length),
	 	price,"resta"));

	if(discount > 0){
		$("#tdDiscount").text("$" + getDiscount(discount,"resta"));
		$("#discount").text("");
	}

	$("#tdTotal").text("$"+getTotal("resta"));

  	}});
}

function getDiscount(discount, operacion){

	var discountActual = $("#tdDiscount").text().substring(1,$("#tdDiscount").text().length);
	var discountNuevo;

	if(operacion == "suma")
		discountNuevo = parseInt(discountActual) + parseInt(discount);
  
	if(operacion == "resta")
		discountNuevo = parseInt(discountActual) - parseInt(discount);

 	return discountNuevo;
}

function confirm(){

	window.location.href = "../cart/?&total="+$("#tdTotal").html() +
								"&name=" + $("#txt_name").val() +
								"&lastname=" + $("#txt_lastName").val() +
								"&phone=" + $("#txt_phone").val() +
								"&country=" + $("#txt_country").val() +
								"&address=" + $("#txt_address").val() +
								"&creditnumber=" + $("#txt_numCredit").val() +
								"&creditcode=" + $("#txt_Codigo_de_Tarjeta").val();
				
}	

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function setConfirm(){

	$("#tdName").html(getParameterByName("name"));
	$("#tdLastName").html(getParameterByName("lastname"));
	$("#tdPhone").html(getParameterByName("phone"));
	$("#tdAddress").html(getParameterByName("address"));
	$("#tdCountry").html(getParameterByName("country"));
	$("#tdcreNumber").html(getParameterByName("creditnumber"));
	$("#tdcreCode").html(getParameterByName("creditcode"));
	$("#tdTotal").html(getParameterByName("total"));
}

function goProducts(){

	window.location.href = "/products/"
}