var text, NOME, VALOR, STATUS, ESTOQUE, flag=0, flag2=0, igual=0, del;
//text tem que ser global


var servidor="http://192.168.1.172:3000/product";

print = function(){//Função que printa a tabela
	$('#table').empty();
	$.get(servidor, function(data) {
		text=data;
		for(var i=0;i<text.length;i++){
			var aux=text[i].id;
			var str=text[i].valor.toString();
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
}//Fim da função que printa a tabela

save = function(){//Função que salva o conteúdo dos inputs em variáveis
	NOME = $('#nome').val();
	VALOR = $('#valor').val();
	STATUS = $('#status').val();
	ESTOQUE = $('#estoque').val();
}//Fim da função que salva os inputs

adiciona = function (){//Função qe verifica se todos os campos estão preenchidos
	save();
	if(NOME=="" || VALOR=="" || STATUS=="" || ESTOQUE==""){
		timerAlert();
		$('#textalert').html("Todos os campos devem estar preenchidos!");
	}else{
		varredura();
	}
}//Fim da função que verifica se os campos estão preenchidos

varredura = function(){//Função que faz a varredura dos nomes, pra ver se já existe algum igual
	for(var i=0;i<text.length;i++){
		if(NOME.toLowerCase()===text[i].nome.toLowerCase()){
			igual=1;
		}
	}
	confereIgual();
}//Fim da função de varredura

confereIgual = function(){//Função que é executada após a varredura, confere se foi achado algum item igual ao que será adicionado
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
}//Fim da função que confere se há itens iguais

edita = function(){ //Função que verifica se todos os campos estão preenchidos e edita o item desejado
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
}//Fim da função que edita

timerAlert = function(){//Função que joga no modal um alerta, caso não estejam preenchidos todos os campos ou caso o item já exista
	$('#alerta').show();
	window.setTimeout(function() {
    $(".alert").slideUp(500, function(){
        $(this).hide(); 
    });
}, 4000);
}//Fim da função de alerta1

timerAlert2 = function(){//Função que joga um alerta na página principal, avisando que ocorreu algum erro com a ação feita
	$('#alerta2').show();
	$('#textalert2').html("Ops! Ocorreu algum problema...");
	window.setTimeout(function() {
    $(".alert").slideUp(500, function(){
        $(this).hide(); 
    });
}, 4000);
	print();
}//Fim da função de alerta2

timerAlert3 = function(){//Função que joga um alerta na página principal, indicando que as alterações foram feitas com sucesso
	$('#alerta3').show();
	window.setTimeout(function() {
    $(".alert").slideUp(500, function(){
        $(this).hide(); 
    });
}, 4000);
}//Fim da função de alerta3

noPaste = function(){//Função que impede CTRL+C e CTRL+V nas caixas de texto
	$('#nome').bind("cut copy paste",function(e) {
	e.preventDefault();
	});

	$('#valor').bind("cut copy paste",function(e) {
	e.preventDefault();
	});

	$('#estoque').bind("cut copy paste",function(e) {
	e.preventDefault();
	});
}//Fim da função CTRL+C/CTRL+V

deleta = function(x){//Função que arruma o modal do botão de delete
	del = x;
	flag2=2;
	tituloModal();
	hideButton();
	$('.textBox').hide();
}//fim da função modal delete

deletaConfirma = function(){//Função que é executada ao confirmar que se quer deletar um item no modal de delete
	$.ajax({
		type: 'DELETE',
		url: servidor +"/"+ del,
		success: print,
		error: timerAlert2
		
	});
	$('#abrir').modal('hide');
}//Fim da função de confirmar o delete

preencher = function(z){//Função que prepara o modal de editar, preenchendo as caixas de texto com as informações do item selecionado.
	$('#alerta').hide();
	$('.textBox').show();
	$('#nome').val(text[z].nome);
	$('#valor').val(text[z].valor);
	$('#status').val(text[z].status);
	$('#estoque').val(text[z].estoque);
	ID = text[z].id;
	flag2 = 1;
	tituloModal();
	hideButton();
}//Fim da função do modal editar

mudarTitulo = function(){//Função que muda o título da página
	if(flag==0){
		$('#titulo').html("Lista de Itens Ativos");
	}else{
		$('#titulo').html("Lista de Itens Inativos");
	}
}//Fim da função título página

tituloModal = function(){//Função que muda o título do modal
	if(flag2==0){
		$('#tituloModal').html("Adicionar Itens");
	}else if(flag2==1){
		$('#tituloModal').html("Editar Itens");
	}else{
		$('#tituloModal').html("Tem certeza que deseja excluir este item?");
	}
}//Fim da função título modal

hideButton = function(){//Função que prepara os botões do modal, dependendo da função que se quer realizar
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
}//Fim da função dos botões

mascara = function(){//Função que adiciona uma máscara no campo "valor"
	$("#valor").maskMoney({showSymbol:true, symbol:"R$", decimal:".", thousands:""});
}//Fim da máscara

condicoes = function(){//Função que cuida das restrições de caracteres para cada caixa de texto
	$('#nome').keypress(isNumberKey1);
	$('#valor').keypress(isNumberKey);
	$('#estoque').keypress(isNumberKey2);
}//Fim da função das restrições

actions = function(){//Função que cuida de todas as ações
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
}//Fim da função que cuida das ações

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