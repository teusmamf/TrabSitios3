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

var_dump($data);
if (!isset($data['ClientId'])) {
    echo 'ID do cliente não fornecido.';
    exit;
}

$clientId = $data['ClientId'];
echo $clientId;
if (
    isset($data['ClientId'])
) {
    $clientId = $data['ClientId'];

    $query = "DELETE FROM clientes WHERE id = $clientId";
    $result = $conn->query($query);

    if ($result) {
        echo json_encode(array("status" => "success"));
    } else {
        echo json_encode(array("status" => "Erro ao atualizar os dados do cliente: " . $conn->error));
    }
} else {
    echo 'Parâmetros para a atualização não fornecidos.';
}

$conn->close();
?>
