// Função auxiliar para calcular o próximo ID baseado no tamanho atual da lista
function calcularProximoId(lista) {

    return String(lista.length + 1);
}


document.addEventListener("DOMContentLoaded", () => {
   
    var listaAdm = JSON.parse(localStorage.getItem("listaAdm")) || [];
    

    var proximoId = calcularProximoId(listaAdm);


    document.getElementById("id").value = proximoId; 
});


document.getElementById("enviar").addEventListener("click", function(){
    armazenar();
    window.location.href = "adm_home.html";
});

function armazenar(){
    var listaAdm = JSON.parse(localStorage.getItem("listaAdm")) || [];
    var obj = {nome: "", email:"", nivel: "", senha:"", datacadastro: "",status: ""};

    obj.id = document.getElementById("id").value;

    obj.nome = document.getElementById("nome").value;
    obj.email = document.getElementById("email").value;
    obj.nivel = document.getElementById("nivel").value;
    obj.senha = document.getElementById("senha").value;
    obj.datacadastro = document.getElementById("datacadastro").value;
    obj.status = document.getElementById("status").value;
    
    listaAdm.push(obj);
    localStorage.setItem("listaAdm",JSON.stringify(listaAdm));    
}
