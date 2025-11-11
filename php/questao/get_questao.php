<?php
include_once("../../util/conexao.php");

$retorno = ["status" => "", "mensagem" => "", "data" => []];

if (isset($_GET['id'])) {
    // 🔹 Buscar questão específica
    $id = $_GET['id'];
    $stmt = $conexao->prepare('
        SELECT 
            q.*,
            p.nome AS professor_nome,
            c.nome AS conteudo_nome
        FROM questao q
        JOIN professor p ON q.professor_id = p.id
        JOIN conteudo c ON q.conteudo_id = c.id
        WHERE q.id = ?
    ');
    $stmt->bind_param('i', $id);

} elseif (isset($_GET['id_professor'])) {
    // 🔹 Buscar todas as questões do professor logado
    $id_professor = $_GET['id_professor'];
    $stmt = $conexao->prepare('
        SELECT 
            q.*, 
            p.nome AS professor_nome,
            c.nome AS conteudo_nome
        FROM questao q
        JOIN professor p ON q.professor_id = p.id
        JOIN conteudo c ON q.conteudo_id = c.id
        WHERE q.professor_id = ?
        ORDER BY q.id DESC
    ');
    $stmt->bind_param('i', $id_professor);

} else {
    $retorno = ["status" => "erro", "mensagem" => "Parâmetro ausente (id ou id_professor).", "data" => []];
    header("Content-type: application/json; charset=utf-8");
    echo json_encode($retorno);
    exit;
}

$stmt->execute();
$resultado = $stmt->get_result();

$table = [];
if ($resultado->num_rows > 0) {
    while ($linha = $resultado->fetch_assoc()) {
        $table[] = $linha;
    }
    $retorno = ["status" => "ok", "mensagem" => "Registros carregados com sucesso", "data" => $table];
} else {
    $retorno = ["status" => "erro", "mensagem" => "Nenhuma questão encontrada", "data" => []];
}

$stmt->close();
$conexao->close();

header("Content-type: application/json; charset=utf-8");
echo json_encode($retorno);
?>
