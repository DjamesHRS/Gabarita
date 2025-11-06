<?php
    include_once("../../util/conexao.php");

    if (isset($_GET['id'])){
        $id = $_GET['id'];
        $stmt = $conexao->prepare('SELECT * FROM aluno WHERE id = ?');
        $stmt->bind_param('i', $id);
    } else{
        $stmt = $conexao->prepare('SELECT * FROM aluno ORDER BY nome');
    }
    $stmt->execute();

    $resultado = $stmt->get_result();

    $table = [];
    $retorno = ["status" => "", "mensagem" => "", "data" => []];

    if($resultado->num_rows > 0){
        while($linha = $resultado->fetch_assoc()){
            $table[] = $linha;
        }
        $retorno = ["status" => "ok", "mensagem" => "Registros carregados com sucesso", "data" => $table];
    } else {
        $retorno = ["status" => "Erro", "mensagem" => "Não encontrou registros", "data" => []];
    }

    $stmt->close();
    $conexao->close();

    header("Content-type: application/json;charset:utf-8");
    echo json_encode($retorno);
?>