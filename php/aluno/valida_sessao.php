<?php
    session_start();
    $retorno = ['status' => '', 'message' => '', 'data' => []];

    if (isset($_SESSION['aluno']) && !empty($_SESSION['aluno'])){
        $status = 'ok';
        $data = $_SESSION['aluno'];

        $retorno = ['status' => $status, 'message' => '', 'data' => $data];
    }else{
        $status = 'nok';

        $retorno = ['status' => $status, 'message' => 'Sessão Inexistente', 'data' => []];
    }

    header("Content-type: application/json;charset:utf-8");
    echo json_encode($retorno);
?>