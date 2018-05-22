var mc;

$(document).ready(function(){

	var element = document.getElementById('show');
	mc = new Hammer(element);

	updateImages(document.getElementById("show").dataset.imageName);
});

function updateImages(actual)
{
	mc.off("swiperight");
	mc.off("swipeleft");

	$.post("http://educaballero.000webhostapp.com/imagenes.php",{"show":actual},function(data){
		document.getElementById("prev").dataset.imageName=data.prev;
		document.getElementById("show").dataset.imageName=data.show;
		document.getElementById("next").dataset.imageName=data.next;
		if(data.prev!="")
		{
			$("#prev").html("<img src='images/"+data.prev+"'>");
		}else{
			$("#prev").html("");
		}
		if(data.show!="")
		{
			$("#show").html("<img src='images/"+data.show+"'>");
		}else{
			$("#show").html("");
		}
		if(data.next!="")
		{
			$("#next").html("<img src='images/"+data.next+"'>");
		}else{
			$("#next").html("");
		}
		activeHammer();
	},"json");
}

function activeHammer()
{
	mc.on("swiperight", function(ev) {
		/* izquierda */
		if(document.getElementById("prev").dataset.imageName)
		{
			var imageName=document.getElementById("prev").dataset.imageName;
			$("#prev").css({display:"block"});
			$("#prev").animate({right:"0%"},100,function(){
				$("#show").html($("#prev").html());
				document.getElementById("show").dataset.imageName=imageName;
				$("#prev").css({right:"100%", display:"none"});
				updateImages(imageName);
			});
		}
	});
	mc.on("swipeleft", function(ev) {
		/* derecha */
		if(document.getElementById("next").dataset.imageName)
		{
			var imageName=document.getElementById("next").dataset.imageName;
			$("#next").css({display:"block"});
			$("#next").animate({left:"0"},100,function(){
				$("#show").html($("#next").html());
				document.getElementById("show").dataset.imageName=imageName;
				$("#next").css({left:"100%", display:"none"});
				updateImages(imageName);
			});
		}
	});
}
