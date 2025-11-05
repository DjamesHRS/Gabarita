<?php
    include_once("../util/conexao.php");
    session_start();

    $stmt = $conexao->prepare('SELECT * FROM aluno WHERE email = ? AND senha = ?');
    $stmt->bind_param('ss', $_POST['email'], $_POST['senha']);
    $stmt->execute();

    $resultado = $stmt->get_result();

    $table = [];
    $retorno = ["status" => "", "mensagem" => "", "data" => [], "tipo" => ""];

    if($resultado->num_rows > 0){
        while($linha = $resultado->fetch_assoc()){
            $table[] = $linha;
        }
        $retorno = ["status" => "ok", "mensagem" => "Registros carregados com sucesso", "data" => $table, "tipo" => "aluno"];
        $_SESSION["aluno"] = $table[0];
    }else {
        $stmt = $conexao->prepare('SELECT * FROM professor WHERE email = ? AND senha = ?');
        $stmt->bind_param('ss', $_POST['email'], $_POST['senha']);
        $stmt->execute();

        $resultado = $stmt->get_result();

        $table = [];
        $retorno = ["status" => "", "mensagem" => "", "data" => []];
        if($resultado->num_rows > 0){
            while($linha = $resultado->fetch_assoc()){
                $table[] = $linha;
            }
            $retorno = ["status" => "ok", "mensagem" => "Registros carregados com sucesso", "data" => $table, "tipo" => "professor"];
            $_SESSION["professor"] = $table[0];
        } else {
            $stmt = $conexao->prepare('SELECT * FROM administrador WHERE email = ? AND senha = ?');
            $stmt->bind_param('ss', $_POST['email'], $_POST['senha']);
            $stmt->execute();

            $resultado = $stmt->get_result();

            $table = [];
            $retorno = ["status" => "", "mensagem" => "", "data" => []];
            if($resultado->num_rows > 0){
                while($linha = $resultado->fetch_assoc()){
                    $table[] = $linha;
                }
                $retorno = ["status" => "ok", "mensagem" => "Registros carregados com sucesso", "data" => $table, "tipo" => "administrador"];
                $_SESSION["administrador"] = $table[0];
            }else {
                $retorno = ["status" => "erro", "mensagem" => "Não encontrou registros", "data" => [], "tipo" => "indefinido"];
            }
        }
    } 

    $stmt->close();
    $conexao->close();

    header("Content-type: application/json;charset=utf-8");
    echo json_encode($retorno);
?>