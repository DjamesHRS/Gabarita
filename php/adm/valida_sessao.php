<?php
    session_start();
    $retorno = ['status' => '', 'message' => '', 'data' => []];

    if (isset($_SESSION['administrador']) && !empty($_SESSION['administrador'])){
        $status = 'ok';
        $data = $_SESSION['administrador'];

        $retorno = ['status' => $status, 'message' => '', 'data' => $data];
    }else{
        $status = 'nok';

        $retorno = ['status' => $status, 'message' => 'Sessão Inexistente', 'data' => []];
    }

    header("Content-type: application/json;charset:utf-8");
    echo json_encode($retorno);
?>