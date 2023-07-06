<?php
header("Access-Control-Allow-Origin: http://localhost:5174");
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "db_fernandes";

$data = json_decode(file_get_contents("php://input"), true);


$conn = new mysqli($servername, $username, $password, $dbname);


if ($conn->connect_error) {
    die("Conexão falhou: " . $conn->connect_error);
}

$nome = $data['nome'];
$descricao = $data['descricao'];
$imagens = $data['imagens'];
$preco = $data['preco'];
$userId = $data['userId'];

$sql = "INSERT INTO pratos (userId,nome, descricao, imagens, preco) VALUES ('$userId','$nome', '$descricao', '$imagens', '$preco')";

if ($conn->query($sql) === TRUE) {
    
    $response = array('message' => 'Prato adicionado criado com sucesso!');
    echo json_encode($response);
} else {
    
    $response = array('message' => 'Erro ao adicionar Prato: ' . $conn->error);
    echo json_encode($response);
}

$conn->close();
?>
