<?php
    session_start();
    if (isset($_SESSION['aluno'])){
        $status = 'ok';
    }else{
        $status = 'nok';
    }

    $retorno = ['status' => $status, 'message' => '', 'data' => []];

    header("Content-type: application/json;charset:utf-8");
    echo json_encode($retorno);
?>