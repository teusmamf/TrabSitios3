<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type");

// Inicializa a sessão
session_start();

// Verifica se o usuário está logado
if (isset($_SESSION['authenticated']) && $_SESSION['authenticated'] === true) {
    $response = array('success' => true, 'message' => 'User is logged in');
} else {
    $response = array('success' => false, 'message' => 'User is not logged in');
}
echo json_encode($response);


?>