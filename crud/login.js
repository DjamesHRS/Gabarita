document.getElementById("button").addEventListener("click", function(){
    login();
});

function login() {
    var email = document.getElementById("email").value;
    var senha = document.getElementById("senha").value;

    let professores = JSON.parse(localStorage.getItem("listaProfessores")) || [];
    const professor = professores.find(p => p.email === email && p.senha === senha);

    let adms = JSON.parse(localStorage.getItem("listaAdm")) || [];
    const adm = adms.find(adm => adm.email === email && adm.senha === senha);

    let alunos = JSON.parse(localStorage.getItem("listaAlunos")) || [];
    const aluno = alunos.find(a => a.email === email && a.senha === senha);

    if (professor){
        localStorage.setItem("usuarioLogado", JSON.stringify(professor));
        document.getElementById("retorno").innerHTML = 
        '<div class="alert alert-success" role="alert">Login efetuado com sucesso!</div>';
        window.location.href = `prof_home.html?id=${professor.id}`

    } else if (adm) {
        localStorage.setItem("usuarioLogado", JSON.stringify(adm));
        document.getElementById("retorno").innerHTML = 
        '<div class="alert alert-success" role="alert">Login efetuado com sucesso!</div>';
        window.location.href = `adm_home.html?id=${adm.id}`
    } else if (aluno){
        localStorage.setItem("usuarioLogado", JSON.stringify(aluno));
        document.getElementById("retorno").innerHTML = 
        '<div class="alert alert-success" role="alert">Login efetuado com sucesso!</div>';
        window.location.href = `aluno_home.html?id=${aluno.id}`
    } else{
        document.getElementById("retorno").innerHTML = 
        '<div class="alert alert-danger" role="alert">Falha ao efetuar o login!</div>';
    }
}
