<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Origin: http://localhost:5174");
header("Access-Control-Allow-Origin: http://localhost:5173");

$dbHost = 'localhost';
$dbUsername = 'root';
$dbPassword = '';
$dbName = 'db_fernandes';

$conn = new mysqli($dbHost, $dbUsername, $dbPassword, $dbName);
if ($conn->connect_error) {
    die('Erro na conexão com o banco de dados: ' . $conn->connect_error);
}

$data = json_decode(file_get_contents("php://input"), true);

// Verifica se o parâmetro pratoId foi recebido
if (!isset($data['pratoId'])) {
    echo 'ID do prato não fornecido.';
    exit;
}

$pratoId = $data['pratoId'];
echo $data['pratoId'];
var_dump($data['pratoId']);
// Verifica se os parâmetros para a atualização foram recebidos
if (
    isset($data['nome']) &&
    isset($data['descricao']) &&
    isset($data['preco'])
) {
    $nome = $data['nome'];
    $descricao = $data['descricao'];
    $preco = $data['preco'];

    // Atualiza os dados do prato no banco de dados
    $query = "UPDATE pratos SET nome = '$nome', descricao = '$descricao', preco = '$preco' WHERE id = '$pratoId'";
    $result = $conn->query($query);

    if ($result) {
        echo json_encode(['status' => 'success']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Erro ao atualizar os dados do prato: ' . $conn->error]);
    }
}else {
    echo 'Parâmetros para a atualização não fornecidos.';
}

// Fecha a conexão com o banco de dados
$conn->close();
?>
