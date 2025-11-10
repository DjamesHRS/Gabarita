    document.addEventListener("DOMContentLoaded", () => {
        const url = new URLSearchParams(window.location.search);
        var id = url.get('id');
            
        if(id){
            fase1(id);
        }else{
            alert('É necessário ao menos informar um ID');
        }
    });

    async function fase1(id) {
        const retorno = await fetch("../../php/professor/get_professor.php?id="+id);
        const resposta = await retorno.json();
        if(resposta.status == "ok"){
            alert("Sucesso! " + resposta.mensagem);
            const reg = resposta.data[0];
            document.getElementById('nome').value = reg.nome;
            document.getElementById('email').value = reg.email;
            document.getElementById('senha').value = reg.senha;
            document.getElementById('cpf').value = reg.cpf;
            document.getElementById('minibiografia').value = reg.minibiografia;
            document.getElementById('id').value = id;
        }else{
            alert("Erro! " + resposta.mensagem);
        }
    }

    document.getElementById("enviar").addEventListener('click', function(){
        fase2();
    });

    async function fase2() {
        var nome = document.getElementById('nome').value;
        var email = document.getElementById('email').value;
        var senha = document.getElementById('senha').value;
        var cpf = document.getElementById('cpf').value;
        var id = document.getElementById('id').value;
        var minibiografia = document.getElementById('minibiografia').value;

        if(nome.length > 0 && email.length > 0 && senha.length > 0 && cpf.length > 0){
            const fd = new FormData();
            fd.append('nome', nome);
            fd.append('email', email);
            fd.append('senha', senha);
            fd.append('cpf', cpf);
            fd.append('minibiografia', minibiografia);

            const retorno = await fetch("../../php/professor/alterar_professor.php?id="+id,{
                method: "POST",
                body: fd
            });
            const resposta = await retorno.json();
            if(resposta.status == "ok"){
                alert("Sucesso! " + resposta.mensagem);
                window.location.href = "index.html";
            }else{
                alert("Erro! " + resposta.mensagem);
            }
        }else{
            alert("É necessário informar todos os campos");
        }
    }