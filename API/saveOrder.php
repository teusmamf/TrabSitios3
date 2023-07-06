<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Origin: http://localhost:5174");
header("Access-Control-Allow-Origin: http://localhost:5173");

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(200);
    exit();
}

// Verifica se há dados enviados via POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Recupera os dados enviados
    $pedido = json_decode(file_get_contents("php://input"), true);
    var_dump($pedido);
    // Verifica se os dados estão presentes e são arrays
    if (
        isset($pedido["pratos"]) && is_array($pedido["pratos"]) &&
        isset($pedido["bebidas"]) && is_array($pedido["bebidas"]) &&
        isset($pedido["clienteId"]) && isset($pedido["precos"] )&& isset($pedido["nomeCliente"] )
    ) {
        // Verifica se o ID do cliente está presente
        // Converte os arrays em strings para armazenar no banco de dados
        $pratos = implode(", ", $pedido["pratos"]);
        $bebidas = implode(", ", $pedido["bebidas"]);
        $clienteId = $pedido["clienteId"]; // Obtém o ID do cliente
        $nomeCliente = $pedido["nomeCliente"];
        
        
        if (is_array($pedido["precos"])) {
            $precos = implode(", ", $pedido["precos"]);
        } else {
            $precos = $pedido["precos"];
        }

        // Faça a conexão com o banco de dados e execute a consulta SQL
        $servername = "localhost";
        $username = "root";
        $password = "";
        $dbname = "db_fernandes";

        $conn = new mysqli($servername, $username, $password, $dbname);
        if ($conn->connect_error) {
            die("Falha na conexão com o banco de dados: " . $conn->connect_error);
        }

        $sql = "INSERT INTO pedidos (pratos, bebidas,cliente_id,precos,nomeCliente) VALUES ('$pratos', '$bebidas','$clienteId','$precos','$nomeCliente')";

        if ($conn->query($sql) === TRUE) {
            // Pedido salvo com sucesso
            http_response_code(200);
            echo json_encode(array("message" => "Pedido salvo com sucesso."));
        } else {
            // Erro ao salvar o pedido
            http_response_code(500);
            echo json_encode(array("message" => "Erro ao salvar o pedido: " . $conn->error));
        }

        $conn->close();
    } else {
        // Dados inválidos
        http_response_code(400);
        echo json_encode(array("message" => "Dados inválidos enviados."));
    }
} else {
    // Método de requisição inválido
    http_response_code(405);
    echo json_encode(array("message" => "Método de requisição inválido."));
}
?>
