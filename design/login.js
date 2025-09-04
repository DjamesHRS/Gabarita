function login() {
    var login = document.getElementById("login").value;
    var senha = document.getElementById("senha").value;

    let resultado = baseFake(login, senha);

    if (resultado === true) {
        document.getElementById("retorno").innerHTML = 
          '<div class="alert alert-success" role="alert">Login efetuado com sucesso!</div>';
    } else if (resultado === "senha errada") {
        document.getElementById("retorno").innerHTML = 
          '<div class="alert alert-warning" role="alert">Senha errada!</div>';
    } else {
        document.getElementById("retorno").innerHTML = 
          '<div class="alert alert-danger" role="alert">Falha ao efetuar o login!</div>';
    }
}

function baseFake(login, senha) {
    const arrFake = [
        {login: "Foo", senha: "Blaa"},
        {login: "teste", senha: "teste"},
        {login: "bla", senha: "1234"},
        {login: "1234", senha: "1234"},
        {login: "dedegritten@gmail.com", senha: "1234"}
    ];

    for (var i = 0; i < arrFake.length; i++) {
        var oAuth = arrFake[i];
        
        if (oAuth.login === login && oAuth.senha !== senha) {            
            return "senha errada";
        } else if (oAuth.login === login && oAuth.senha === senha) {            
            return true;
        }
    }
    return false;
}

document.getElementById("button").addEventListener("click", function(){
    login();
});
