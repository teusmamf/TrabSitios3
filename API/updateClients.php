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

// Verifica se o parâmetro clientId foi recebido
if (!isset($data['clientId'])) {
    echo 'ID do cliente não fornecido.';
    exit;
}

$clientId = $data['clientId'];

// Verifica se os parâmetros para a atualização foram recebidos
if (
    isset($data['nome']) &&
    isset($data['email']) &&
    isset($data['user']) &&
    isset($data['senha'])
) {
    $nome = $data['nome'];
    $email = $data['email'];
    $user = $data['user'];
    $senha = $data['senha'];

    // Atualiza os dados do cliente no banco de dados
    $query = "UPDATE clientes SET nome = '$nome', email = '$email', user = '$user', senha = '$senha' WHERE id = $clientId";
    $result = $conn->query($query);

    if ($result) {
        echo 'success';
    } else {
        echo 'Erro ao atualizar os dados do cliente: ' . $conn->error;
    }
} else {
    echo 'Parâmetros para a atualização não fornecidos.';
}

// Fecha a conexão com o banco de dados
$conn->close();
?>
