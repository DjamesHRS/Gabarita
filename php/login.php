<?php
    include_once("../util/conexao.php");

    $stmt = $conexao->prepare('SELECT * FROM aluno WHERE email = ? AND senha = ?');
    $stmt->bind_param('ss', $_POST['email'], $_POST['senha']);
    $stmt->execute();

    $resultado = $stmt->get_result();

    $table = [];
    $retorno = ["status" => "", "mensagem" => "", "data" => []];

    if($resultado->num_rows > 0){
        while($linha = $resultado->fetch_assoc()){
            $table[] = $linha;
        }
        $retorno = ["status" => "ok", "mensagem" => "Registros carregados com sucesso", "data" => $table];
        //session_start();
        //$_SESSION['usuario'] = $table[0];
    } else {
        $retorno = ["status" => "erro", "mensagem" => "Não encontrou registros", "data" => []];
    }

    $stmt->close();
    $conexao->close();

    header("Content-type: application/json;charset:utf-8");
    echo json_encode($retorno);
?>