<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "db_fernandes";

// Receber os dados do usuário via POST
$data = json_decode(file_get_contents("php://input"), true);

// Criar a conexão com o banco de dados
$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Conexão falhou: " . $conn->connect_error);
}

$name = $data['name'];
$email = $data['email'];
$user = $data['username'];
$userPassword = md5($data['password']); // Converter a senha para MD5

$sql = "INSERT INTO clientes (nome, email, user, senha) VALUES ('$name', '$email', '$user', '$userPassword')";

if ($conn->query($sql) === TRUE) {
    // Responder com uma mensagem de sucesso
    $response = array('message' => 'Usuário criado com sucesso!');
    echo json_encode($response);
} else {
    // Responder com uma mensagem de erro
    $response = array('message' => 'Erro ao criar usuário: ' . $conn->error);
    echo json_encode($response);
}

$conn->close();

?>
