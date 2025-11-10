<?php
include_once("../../util/conexao.php");
session_start();

$retorno = ["status" => "", "mensagem" => "", "data" => []];

// Verifica se o professor está logado
if (!isset($_SESSION['professor_id'])) {
    $retorno = ["status" => "erro", "mensagem" => "Sessão inválida. Faça login novamente.", "data" => []];
    header("Content-type: application/json;charset=utf-8");
    echo json_encode($retorno);
    exit;
}

$enunciado = $_POST['enunciado'] ?? '';
$tipo = $_POST['tipo'] ?? '';
$nivel = $_POST['nivel'] ?? '';
$conteudo = $_POST['conteudo'] ?? '';
$gabarito = $_POST['gabarito'] ?? '';
$alternativas = $_POST['alternativas'] ?? '[]';
$professor_id = $_SESSION['professor_id'];

// Verificação mínima
if (empty($enunciado) || empty($tipo) || empty($nivel) || empty($gabarito)) {
    $retorno = ["status" => "erro", "mensagem" => "Preencha todos os campos obrigatórios."];
    header("Content-type: application/json;charset=utf-8");
    echo json_encode($retorno);
    exit;
}

$stmt = $conexao->prepare('INSERT INTO questao (enunciado, tipo, nivel_de_dificuldade, gabarito, alternativas, professor_id) VALUES (?, ?, ?, ?, ?, ?)');
$stmt->bind_param('sssssi', $enunciado, $tipo, $nivel, $gabarito, $alternativas, $professor_id);
$stmt->execute();

if ($stmt->affected_rows > 0) {
    $retorno = ["status" => "ok", "mensagem" => "Questão cadastrada com sucesso!", "data" => []];
} else {
    $retorno = ["status" => "erro", "mensagem" => "Erro ao inserir questão.", "data" => []];
}

$stmt->close();
$conexao->close();

header("Content-type: application/json;charset=utf-8");
echo json_encode($retorno);
?>
