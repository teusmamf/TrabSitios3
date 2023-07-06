<?php
header("Access-Control-Allow-Origin: *");
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "db_fernandes";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Conexão falhou: " . $conn->connect_error);
}

$sqlPratos = "SELECT * FROM pratos";
$resultPratos = $conn->query($sqlPratos);

$sqlSobremesas = "SELECT * FROM sobremesas";
$resultSobremesas = $conn->query($sqlSobremesas);

$sqlVinhos = "SELECT * FROM vinhos";
$resultVinhos = $conn->query($sqlVinhos);


$sqlCervejas = "SELECT * FROM cervejas";
$resultCervejas = $conn->query($sqlCervejas);

$sqlClientes = "SELECT * FROM clientes";
$resultClientes = $conn->query($sqlClientes);


$sqlPedidos = "SELECT * FROM pedidos";
$resultPedidos = $conn->query($sqlPedidos);

$sqlRefrigerantes = "SELECT * FROM refrigerantes";
$resultRefrigerantes = $conn->query($sqlRefrigerantes);


if ($resultPratos->num_rows > 0 || $resultSobremesas->num_rows > 0) {


    $Pedidos = array();
    while ($row = $resultPedidos->fetch_assoc()) {
        $Pedidos[] = array(
            'id' => $row["id"],
            'pratos' => $row["pratos"],
            'bebidas' => $row["bebidas"],
            'precos' => $row["precos"], 
            'nomeCliente'=> $row["nomecliente"], 
        );
    }



    $Clientes = array();
    while ($row = $resultClientes->fetch_assoc()) {
        $Clientes[] = array(
            'id' => $row["id"],
            'nome' => $row["nome"],
            'email' => $row["email"],
            'user' => $row["user"],
            'senha'=> $row['senha'], 
        );
    }


    $pratos = array();
    while ($row = $resultPratos->fetch_assoc()) {
        $pratos[] = array(
            'id' => $row["id"],
            'nome' => $row["nome"],
            'descricao' => $row["descricao"],
            'imagens' => $row["imagens"],
            'preco'=> $row['preco'], 
        );
    }

    $sobremesas = array();
    while ($row = $resultSobremesas->fetch_assoc()) {
        $sobremesas[] = array(
            'nome' => $row["nome"],
            'descricao' => $row["descricao"],
            'imagens' => $row["imagem"],
            'preco'=> $row['preco'], 
        );
    }

    $vinhos = array();
    while ($row = $resultVinhos->fetch_assoc()){
         $vinhos[] = array(
            'id' => $row['id'],
            'nome' => $row['nome'],
            'imagem' => $row['imagem'],
            'preco'=> $row['preco'], 
         );   
    }

    $cervejas = array();
    while ($row = $resultCervejas->fetch_assoc()){
         $cervejas[] = array(
            'id' => $row['id'],
            'nome' => $row['nome'],
            'imagem' => $row['imagem'],
            'preco'=> $row['preco'], 
         );   
    }

    $Refrigerantes = array();
    while ($row = $resultRefrigerantes->fetch_assoc()){
         $Refrigerantes[] = array(
            'id' => $row['id'],
            'nome' => $row['nome'],
            'imagem' => $row['imagem'],
            'preco'=> $row['preco'], 
         );   
    }

    $data = array(
        'pratos' => $pratos,
        'sobremesas' => $sobremesas,
        'vinhos'=> $vinhos,
        'cervejas'=>$cervejas,
        'refrigerantes'=>$Refrigerantes,
        'clientes'=>$Clientes,
        'pedidos'=>$Pedidos
    );

    

    header('Content-Type: application/json');
    echo json_encode($data);
} else {
    echo "Não foram encontrados resultados";
}

$conn->close();
?>
