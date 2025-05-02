<?php

include('../app/config.php');

session_start(); 

$email = trim($_POST['email']);
$password = trim($_POST['password']);

$sql = "SELECT * FROM usuarios WHERE email = :email AND estado = '1'";  
$query = $pdo->prepare($sql);
$query->bindParam(':email', $email, PDO::PARAM_STR); 
$query->execute();

// Recuperar el resultado de la consulta
$usuario = $query->fetch(PDO::FETCH_ASSOC);

if ($usuario) {  
    $password_tabla = $usuario['password'];  

    if (md5($password) === $password_tabla) {
        session_start();        $_SESSION['mensaje'] = "Bienvenido al sistema";
        $_SESSION['icono'] = "success";
        $_SESSION['sesion email'] = "$email";
        header('Location: ' . APP_URL . '/admin');
        exit;  
    } else {
        $_SESSION['mensaje'] = "Contraseña incorrecta";
        header('Location: ' . APP_URL . '/login');
        exit;  
    }
} else {
    $_SESSION['mensaje'] = "Los datos introducidos son incorrectos, vuelva a intentarlo";
    header('Location: ' . APP_URL . '/login');
    exit; 
}
?>
