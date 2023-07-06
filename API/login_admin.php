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
$result = mysqli_query($conn, "SELECT * FROM users WHERE username = '$username' AND password = '$password'");

$nums = mysqli_num_rows($result);
$rs = mysqli_fetch_array($result);

if ($nums >= 1) {
    $response = array(
        "id" => $rs["id"],
        "nome" => $rs["nome"],
        "Status" => 200
    );
    http_response_code(200);
    echo json_encode($response);
} else {
    http_response_code(202);
}
?>
