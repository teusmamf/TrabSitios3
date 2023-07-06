<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: text/csv");
header("Content-Disposition: attachment; filename=clients.csv");

$servername = "localhost";
$usernameDB = "root";
$passwordDB = "";
$dbname = "db_fernandes";

$conn = new mysqli($servername, $usernameDB, $passwordDB, $dbname);
$result = mysqli_query($conn, "SELECT * FROM pedidos");

// Gerar o arquivo CSV
$output = fopen("php://output", "w");
fputcsv($output, array("Pratos", "Bebidas", "IdCliente", "TotalPedidos","NomeCliente")); // Cabeçalho do CSV

while ($row = mysqli_fetch_assoc($result)) {
    fputcsv($output, array($row["pratos"], $row["bebidas"], $row["cliente_id"], $row["precos"],$row["nomeCliente"]));
}

fclose($output);
exit();
?>
