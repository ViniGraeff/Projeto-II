var text, aux, str, NOME, VALOR, STATUS, ESTOQUE, flag=0, flag2=0, igual=0, del;

var servidor="http://192.168.1.172:3000/product";

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
					$('#table').append('<tr><td>'+text[i].id+'</td><td>'+text[i].nome+'</td><td>'+'R$ '+str+'</td><td>'+'<img src="img/happybatman.jpg" alt= "Batman Feliz" style="width:40px;height:40px; border-radius:50%;";>'+'</td><td>'+text[i].estoque+'</td><td>'+'<button type="button" class="btn btn-default btn-sm"><span class="glyphicon glyphicon-pencil" aria-hidden="true" data-toggle="modal" data-target="#abrir" onclick="preencher('+i+')"></span></button>'+'</td><td>'+'<button type="button" class="btn btn-default btn-sm" onclick="deleta('+aux+')" data-toggle="modal" data-target="#abrir"><span class="glyphicon glyphicon-remove-circle" aria-hidden="true"></span></button>'+'</td></tr>');
				}
			}
			else {
				if(text[i].status=="I"){
					$('#table').append('<tr><td>'+text[i].id+'</td><td>'+text[i].nome+'</td><td>'+'R$ '+str+'</td><td>'+'<img src="img/sadbatman.jpg" alt= "Batman Feliz" style="width:40px;height:40px; border-radius:50%;";>'+'</td><td>'+text[i].estoque+'</td><td>'+'<button type="button" class="btn btn-default btn-sm"><span class="glyphicon glyphicon-pencil" aria-hidden="true" data-toggle="modal" data-target="#abrir" onclick="preencher('+i+')"></span></button>'+'</td><td>'+'<button type="button" class="btn btn-default btn-sm" onclick="deleta('+aux+')" data-toggle="modal" data-target="#abrir"><span class="glyphicon glyphicon-remove-circle" aria-hidden="true"></span></button>'+'</td></tr>');
				}
			}
		}
	});
	console.log("printou");
	$('#alerta').hide();
}

save = function(){
	NOME = $('#nome').val();
	VALOR = $('#valor').val();
	STATUS = $('#status').val();
	ESTOQUE = $('#estoque').val();
}

varredura = function(){
	for(var i=0;i<text.length;i++){
		if(NOME.toLowerCase()===text[i].nome.toLowerCase()){
			igual=1;
		}
	}
	confereIgual();
}

confereIgual = function(){
	if(igual==0){
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
			success: print,
			error: timerAlert2
		});
		$('#abrir').modal('hide');
		timerAlert3();
		$('#textalert3').html("Item adicionado com sucesso!");
	}else{
		timerAlert();
		$('#textalert').html("Item já existente!");
		igual=0;
	}
}

adiciona = function (){
	save();
	if(NOME=="" || VALOR=="" || STATUS=="" || ESTOQUE==""){
		timerAlert();
		$('#textalert').html("Todos os campos devem estar preenchidos!");
	}else{
		varredura();
	}
}

edita = function(){ 
	save();
	if(NOME=="" || VALOR=="" || STATUS=="" || ESTOQUE==""){
		timerAlert();
		$('#textalert').html("Todos os campos devem estar preenchidos!");
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
			success: print,
			error: timerAlert2
		});
		$('#abrir').modal('hide');
		timerAlert3();
		$('#textalert3').html("Item editado com sucesso!");
	}
}

timerAlert = function(){
	$('#alerta').show();
	window.setTimeout(function() {
    $(".alert").slideUp(500, function(){
        $(this).hide(); 
    });
}, 4000);
}

timerAlert2 = function(){
	$('#alerta2').show();
	$('#textalert2').html("Ops! Ocorreu algum problema...");
	window.setTimeout(function() {
    $(".alert").slideUp(500, function(){
        $(this).hide(); 
    });
}, 4000);
	print();
}

timerAlert3 = function(){
	$('#alerta3').show();
	window.setTimeout(function() {
    $(".alert").slideUp(500, function(){
        $(this).hide(); 
    });
}, 4000);
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
	del = x;
	flag2=2;
	tituloModal();
	hideButton();
	$('.textBox').hide();
}

deletaConfirma = function(){
	$.ajax({
		type: 'DELETE',
		url: servidor +"/"+ del,
		success: print,
		error: timerAlert2
		
	});
	$('#abrir').modal('hide');
}

preencher = function(z){
	$('#alerta').hide();
	$('.textBox').show();
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
	}else if(flag2==1){
		document.getElementById('tituloModal').innerHTML = "Editar Itens";
	}else{
		document.getElementById('tituloModal').innerHTML = "Tem certeza que deseja excluir este item?";
	}
}

hideButton = function(){
	if(flag2==0){
	$("#adiciona").show();
	$("#editar").hide();
	$("#botdel").hide();
	}else if(flag2==1){
	$("#adiciona").hide();
	$("#editar").show();
	$("#botdel").hide();
	}else{
	$("#adiciona").hide();
	$("#editar").hide();
	$("#botdel").show();
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
		$('#alerta').hide();
		$('#nome').val("");
		$('#valor').val("");
		$('#estoque').val("");
		flag2 = 0;
		tituloModal();
		hideButton();
		$('.textBox').show();
	});

	$("#adiciona").mouseup(function(){
		adiciona();
	});

	$("#editar").mouseup(function(){
		edita();
	});

	$('#botdel').mouseup(function(){
		deletaConfirma();
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
	$('#alerta2').hide();
	$('#alerta3').hide();
	mudarTitulo();
	print();
	actions();
	noPaste();
	mascara();
});