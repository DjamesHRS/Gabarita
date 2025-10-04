document.addEventListener("DOMContentLoaded", () => {
    carregaItens(); 
});

document.getElementById("novo").addEventListener("click", function(){
   
    window.location.href = "novo_adm.html"; 
});

function editarAdmin(index) {
    // 1. Pega a lista completa (igual ao excluir)
    var listaAdmins = JSON.parse(localStorage.getItem("listaAdm"));
    
    // 2. Pega o objeto ADM que o usuário quer editar
    var admParaEditar = listaAdmins[index];
    
    // 3. O SEGREDO DO UPDATE: Salva o objeto na 'sessão' (LocalStorage) 
    // com uma chave temporária. Isso indica que a próxima vez que a 
    // tela de cadastro abrir, é uma EDIÇÃO.
    localStorage.setItem("admEditando", JSON.stringify(admParaEditar));

    // 4. Salva o ÍNDICE. Precisamos saber onde na lista salvar depois!
    localStorage.setItem("indiceEditando", index);

    // 5. Redireciona para o formulário de cadastro (novo_admin.html)
    window.location.href = "novo_adm.html";
}

function carregaItens(){
   
    if(localStorage.getItem("listaAdm")){
        var lista = JSON.parse(localStorage.getItem("listaAdm")); 
        
    
        var html = "";
        html += "<table>";
        html += "<tr>";
        html += "<td>Ações</td>"; 
        html += "<td>ID</td>";
        html += "<td>Nome</td>";
        html += "<td>Email</td>";
        html += "<td>Nível</td>";
        html += "<td>Data Cadastro</td>";
        html += "<td>Status</td>";
        html += "</tr>";

        for(var i=0; i < lista.length; i++){
            html += "<tr>";
            html += "<td>";
            html += "<a href='javascript:excluirAdmin("+i+")'>Excluir</a> | ";
            html += "<a href='javascript:editarAdmin("+i+")'>Editar</a>"; 
            html += "</td>"; // FECHA A CÉLULA AQUI
            
            
            html += "<td>"+lista[i].id+"</td>"; 
            html += "<td>"+lista[i].nome+"</td>";
            html += "<td>"+lista[i].email+"</td>";
            html += "<td>"+lista[i].nivel+"</td>";
            html += "<td>"+lista[i].datacadastro+"</td>";
            html += "<td>"+lista[i].status+"</td>";

            html += "</tr>";
        }

        html += "</table>";
        document.getElementById("lista").innerHTML = html;

    } else {
      
        document.getElementById("lista").innerHTML = "Nenhum administrador cadastrado.";
    }
}


function excluirAdmin(index){
  
    var listaAdmins = JSON.parse(localStorage.getItem("listaAdm"));
    
  
    listaAdmins.splice(index, 1); 
    
  
    localStorage.setItem("listaAdm", JSON.stringify(listaAdmins));
    
    
    window.location.reload(); 
}