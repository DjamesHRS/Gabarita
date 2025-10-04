
function calcularProximoId(lista) {
    return String(lista.length + 1);
}


document.addEventListener("DOMContentLoaded", () => {
    
    //UPDATE
    if (localStorage.getItem("admEditando")) {
        
        var adm = JSON.parse(localStorage.getItem("admEditando"));

        
        document.getElementById("id").value = adm.id; 
        document.getElementById("nome").value = adm.nome;
        document.getElementById("email").value = adm.email;
        document.getElementById("senha").value = adm.senha;
        document.getElementById("nivel").value = adm.nivel;
        document.getElementById("datacadastro").value = adm.datacadastro;
        document.getElementById("status").value = adm.status;
        
        
        document.getElementById("enviar").innerText = "Salvar Edição";
        
        
        return; 
    }

    //CREATE
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
    
    // [1] Pega os valores da tela e monta o objeto (para Edição OU Cadastro)
    var novoAdmin = {}; 
    novoAdmin.id = document.getElementById("id").value;
    novoAdmin.nome = document.getElementById("nome").value;
    novoAdmin.email = document.getElementById("email").value;
    novoAdmin.nivel = document.getElementById("nivel").value;
    novoAdmin.senha = document.getElementById("senha").value;
    novoAdmin.datacadastro = document.getElementById("datacadastro").value;
    novoAdmin.status = document.getElementById("status").value;
    
    
    // [2] LÓGICA DE SALVAR: Verifica se está em modo de Edição (UPDATE)
    if (localStorage.getItem("admEditando")) {
        
        // É EDIÇÃO (UPDATE)
        var index = localStorage.getItem("indiceEditando");
        
        // Sobrescreve o objeto antigo pelo novo objeto na posição (índice) correta
        listaAdm[index] = novoAdmin; 
        
        // LIMPA as chaves temporárias (CRUCIAL!)
        localStorage.removeItem("admEditando");
        localStorage.removeItem("indiceEditando");
        
    } else {
        // É NOVO CADASTRO (CREATE)
        listaAdm.push(novoAdmin);
    }

    // [3] Salva a lista completa (com a alteração ou adição)
    localStorage.setItem("listaAdm", JSON.stringify(listaAdm));
}
