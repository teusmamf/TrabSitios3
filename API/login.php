<?php
header("Access-Control-Allow-Origin: http://localhost:5174");
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

$data = json_decode(file_get_contents("php://input"));

$username = $data->username;
$password = $data->password;

$servername = "localhost";
$usernameDB = "root";
$passwordDB = "";
$dbname = "db_fernandes";

$conn = new mysqli($servername, $usernameDB, $passwordDB, $dbname);

if ($conn->connect_error) {
    die("Conexão falhou: " . $conn->connect_error);
}


$username = $conn->real_escape_string($username);

$hashedPassword = md5($password);

$stmt = $conn->prepare("SELECT * FROM clientes WHERE user = ? AND senha = ?");
$stmt->bind_param("ss", $username, $hashedPassword);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    $response = array(
        "id" => $row["id"],
        "nome" => $row["nome"],
        "Status" => 200
    );
    http_response_code(200);
    echo json_encode($response);
} else {
    http_response_code(202);
}

$stmt->close();
$conn->close();
?>
