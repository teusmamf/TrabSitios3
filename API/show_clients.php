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

// Consulta os pedidos do cliente
$query = "SELECT nome, email, user, senha FROM clientes WHERE id = $clientId";
$result = $conn->query($query);

if (!$result) {
    echo 'Erro ao buscar os pedidos.';
    exit;
}

$orders = array();


// Constrói o array de pedidos
while ($row = $result->fetch_assoc()) {
    $order = array(
        'nome' => $row['nome'],
        'email' => $row['email'],
        'user' => $row['user'],
        'senha' => $row['senha'],
    );
    $orders[] = $order;
}

// Retorna os pedidos como JSON
header('Content-Type: application/json');
echo json_encode($orders);

// Fecha a conexão com o banco de dados
$conn->close();
?>
