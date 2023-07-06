<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: text/csv");
header("Content-Disposition: attachment; filename=clients.csv");

$servername = "localhost";
$usernameDB = "root";
$passwordDB = "";
$dbname = "db_fernandes";

$conn = new mysqli($servername, $usernameDB, $passwordDB, $dbname);
$result = mysqli_query($conn, "SELECT * FROM clientes");


$output = fopen("php://output", "w");
fputcsv($output, array("Nome", "Email", "Username", "Senha")); 

while ($row = mysqli_fetch_assoc($result)) {
    fputcsv($output, array($row["nome"], $row["email"], $row["user"], $row["senha"]));
}

fclose($output);    
exit();
?>
