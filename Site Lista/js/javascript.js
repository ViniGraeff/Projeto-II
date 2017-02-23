var text, aux, str, NOME, VALOR, STATUS, ESTOQUE, flag=0, flag2=0;

var servidor="http://192.168.1.168:3000/product";

print = function(){
	$('#table').empty();
	$.get(servidor, function(data) {
		text=data;
		for(var i=0;i<text.length;i++){
			aux=text[i].id;
			str=text[i].valor.toString();
			str=parseFloat(str).toFixed(2);
			str=str.replace(".",",");
			if(flag==0){
				if(text[i].status=="A"){
					$('#table').append('<tr><td>'+text[i].id+'</td><td>'+text[i].nome+'</td><td>'+'R$ '+str+'</td><td>'+'<img src="img/happybatman.jpg" alt= "Batman Feliz" style="width:40px;height:40px; border-radius:50%;";>'+'</td><td>'+text[i].estoque+'</td><td>'+'<button type="button" class="btn btn-default btn-sm"><span class="glyphicon glyphicon-pencil" aria-hidden="true" data-toggle="modal" data-target="#abrir" onclick="preencher('+i+')"></span></button>'+'</td><td>'+'<button type="button" class="btn btn-default btn-sm"  onclick="deleta('+aux+')"><span class="glyphicon glyphicon-remove-circle" aria-hidden="true"></span></button>'+'</td></tr>');
				}
			}
			else {
				if(text[i].status=="I"){
					$('#table').append('<tr><td>'+text[i].id+'</td><td>'+text[i].nome+'</td><td>'+'R$ '+str+'</td><td>'+'<img src="img/sadbatman.jpg" alt= "Batman Feliz" style="width:40px;height:40px; border-radius:50%;";>'+'</td><td>'+text[i].estoque+'</td><td>'+'<button type="button" class="btn btn-default btn-sm"><span class="glyphicon glyphicon-pencil" aria-hidden="true" data-toggle="modal" data-target="#abrir" onclick="preencher('+i+')"></span></button>'+'</td><td>'+'<button type="button" class="btn btn-default btn-sm"  onclick="deleta('+aux+')"><span class="glyphicon glyphicon-remove-circle" aria-hidden="true"></span></button>'+'</td></tr>');
				}
			}
		}
	});
	console.log("printou");
}

save = function(){
	NOME = $('#nome').val();
	VALOR = $('#valor').val();
	STATUS = $('#status').val();
	ESTOQUE = $('#estoque').val();
}

adiciona = function (){
	save();
	if(NOME=="" || VALOR=="" || STATUS=="" || ESTOQUE==""){

	}else{
		$.ajax({
			type: 'POST',
			dataType: 'json',
			url: servidor,
			data: {
				nome: NOME,
				valor: VALOR,
				status: STATUS,
				estoque: ESTOQUE
			},
			success: print
		});
	}
}

edita = function(){ 
	save();
	if(NOME=="" || VALOR=="" || STATUS=="" || ESTOQUE==""){

	}else{
		$.ajax({
			type: 'PUT',
			dataType: 'json',
			url: servidor+"/"+ID,
			data: {
				nome: NOME,
				valor: VALOR,
				status: STATUS,
				estoque: ESTOQUE
			},
			success: print
		});
	}
}

noPaste = function(){
	$('#nome').bind("cut copy paste",function(e) {
	e.preventDefault();
	});

	$('#valor').bind("cut copy paste",function(e) {
	e.preventDefault();
	});

	$('#estoque').bind("cut copy paste",function(e) {
	e.preventDefault();
	});
}

deleta = function(x){
	$.ajax({
		type: 'DELETE',
		url: servidor +"/"+ x,
		success: print
	});
	console.log("deletou");
}

preencher = function(z){
	document.getElementById('nome').value = text[z].nome;
	document.getElementById('valor').value = text[z].valor;
	document.getElementById('status').value = text[z].status;
	document.getElementById('estoque').value = text[z].estoque;
	ID = text[z].id;
	flag2 = 1;
	tituloModal();
	hideButton();
}

mudarTitulo = function(){
	if(flag==0){
		document.getElementById('titulo').innerHTML = "Lista de Itens Ativos";
	}else{
		document.getElementById('titulo').innerHTML = "Lista de Itens Inativos";
	}
}

tituloModal = function(){
	if(flag2==0){
		document.getElementById('tituloModal').innerHTML = "Adicionar Itens";
	}else{
		document.getElementById('tituloModal').innerHTML = "Editar Itens";
	}
}

hideButton = function(){
	if(flag2==0){
	$("#adiciona").show();
	$("#editar").hide();
	}else{
	$("#adiciona").hide();
	$("#editar").show();
	}
}

mascara = function(){
	$("#valor").maskMoney({showSymbol:true, symbol:"R$", decimal:".", thousands:""});
}

condicoes = function(){
	$('#nome').keypress(isNumberKey1);
	$('#valor').keypress(isNumberKey);
	$('#estoque').keypress(isNumberKey2);
}

actions = function(){
	condicoes();

	$("#modalclean").click(function(){
		$('#nome').val("");
		$('#valor').val("");
		$('#estoque').val("");
		flag2 = 0;
		tituloModal();
		hideButton();
	});

	$("#adiciona").mouseup(function(){
		adiciona();
	});

	$("#editar").mouseup(function(){
		edita();
	});

	$("#ativos").mouseup(function(){
		$('#table').empty();
		flag=0;
		print();
		mudarTitulo();
	});

	$("#inativos").mouseup(function(){
		$('#table').empty();
		flag=1;
		print();
		mudarTitulo();
	});

    $('[data-toggle="tooltip"]').tooltip(); 
}

function isNumberKey(evt)
{
	var charCode = (evt.which) ? evt.which : evt.keyCode;
	if (charCode != 46 && charCode > 31 
		&& (charCode < 48 || charCode > 57))
		return false;

		return true;
}

function isNumberKey1(evt)
{
	var charCode = (evt.which) ? evt.which : evt.keyCode;
	if (charCode >= 48 && charCode <= 57)
		return false;

		return true;
}

function isNumberKey2(evt)
{
	var charCode = (evt.which) ? evt.which : evt.keyCode;
	if (charCode = 46 && charCode > 31 
		&& (charCode < 48 || charCode > 57))
		return false;

		return true;
}

$(document).ready(function(){
	mudarTitulo();
	print();
	actions();
	noPaste();
	mascara();
});
