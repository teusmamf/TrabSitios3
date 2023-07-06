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
if (!isset($data['vinhoId'])) {
    echo 'ID do prato não fornecido.';
    exit;
}

$vinhoId = $data['vinhoId'];
echo $data['vinhoId'];
var_dump($data['vinhoId']);
// Verifica se os parâmetros para a atualização foram recebidos
if (
    isset($data['nome']) &&
    isset($data['imagem']) &&
    isset($data['preco'])
) {
    $imagem = $data['imagem'];
    $nome = $data['nome'];
    $preco = $data['preco'];

    // Atualiza os dados do prato no banco de dados
    $query = "UPDATE vinhos SET nome = '$nome', preco = '$preco' WHERE id = '$vinhoId'";
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
