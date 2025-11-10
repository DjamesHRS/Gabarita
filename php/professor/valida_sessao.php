<?php
    session_start();
    $retorno = ['status' => '', 'message' => '', 'data' => []];

    if (isset($_SESSION['professor']) && !empty($_SESSION['professor'])){
        $status = 'ok';
        $data = $_SESSION['professor'];

        $retorno = ['status' => $status, 'message' => '', 'data' => $data];
    }else{
        $status = 'nok';

        $retorno = ['status' => $status, 'message' => 'Sessão Inexistente', 'data' => []];
    }

    header("Content-type: application/json;charset:utf-8");
    echo json_encode($retorno);
?>