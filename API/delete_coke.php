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


if (!isset($data['refrigeranteId'])) {
    echo 'ID do cliente não fornecido.';
    exit;
}

$refrigeranteId = $data['refrigeranteId'];

if (
    isset($data['refrigeranteId'])
) {
    $refrigeranteId = $data['refrigeranteId'];

    $query = "DELETE FROM refrigerantes WHERE id = $refrigeranteId";
    $result = $conn->query($query);

    if ($result) {
        echo 'success';
    } else {
        echo 'Erro ao atualizar os dados do cliente: ' . $conn->error;
    }
} else {
    echo 'Parâmetros para a atualização não fornecidos.';
}

$conn->close();
?>
