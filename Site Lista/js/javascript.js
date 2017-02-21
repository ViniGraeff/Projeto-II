var text, aux, num, str, ID, NOME, VALOR, STATUS, ESTOQUE, flag=0;

print = function(){
    $.get("http://192.168.1.171:3000/product", function(data) {
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
}

$(document).ready(function(){
    $('#table').empty();
    print();

    adiciona = function (){
        NOME = document.getElementById('nome').value;
        VALOR = document.getElementById('valor').value;
        STATUS = document.getElementById('status').value;
        ESTOQUE = document.getElementById('estoque').value;
        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: "http://192.168.1.171:3000/product/",
            data: {nome: NOME, valor: VALOR, status: STATUS, estoque: ESTOQUE}
        });
    }

    edita = function(){ 
        NOME = document.getElementById('nome').value;
        VALOR = document.getElementById('valor').value;
        STATUS = document.getElementById('status').value;
        ESTOQUE = document.getElementById('estoque').value;
        $.ajax({
            type: 'PUT',
            dataType: 'json',
            url: "http://192.168.1.171:3000/product/"+ID,
            data: {nome: NOME, valor: VALOR, status: STATUS, estoque: ESTOQUE}
        });
    }

    preencher = function(z){
        document.getElementById('nome').value = text[z].nome;
        document.getElementById('valor').value = text[z].valor;
        document.getElementById('status').value = text[z].status;
        document.getElementById('estoque').value = text[z].estoque;
        ID = text[z].id;
    }

    $("#modalclean").click(function(){
        document.getElementById('nome').value = "";
        document.getElementById('valor').value = "";
        document.getElementById('status').value = "";
        document.getElementById('estoque').value = "";
    });

    $("#adiciona").mouseup(function(){
        adiciona();
        location.reload(true);
    });

    $("#editar").mouseup(function(){
        edita();
        location.reload(true);
    });

    $("#ativos").mouseup(function(){
        $('#table').empty();
        flag=0;
        print();
    });

    $("#inativos").mouseup(function(){
        $('#table').empty();
        flag=1;
        print();
    });

    deleta = function(x){
        $.ajax({
            type: 'DELETE',
            url: "http://192.168.1.171:3000/product/" + x
        });
        location.reload(true);
    }

});

function isNumberKey(evt)
{
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode != 46 && charCode > 31 
        && (charCode < 48 || charCode > 57))
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

function isNumberKey1(evt)
{
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode >= 48 && charCode <= 57)
        return false;

        return true;
}