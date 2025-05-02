<?php

include('../../../app/config.php');
session_start();

$nombres = $_POST['nombres'];
$rol_id = $_POST['rol_id'];
$email = $_POST['email'];
$password = $_POST['password'];
$repeat_password = $_POST['repeat_password'];

$fechaHora = date("Y-m-d H:i:s");
$estado_de_registro = "1"; 

if ($password == $repeat_password) {
    $password_hash = password_hash($password, PASSWORD_DEFAULT);

    $sentencia = $pdo->prepare('INSERT INTO usuarios
        (nombres, rol_id, email, password, fyh_creacion, estado)
        VALUES (:nombres, :rol_id, :email, :password, :fyh_creacion, :estado)'
    );

    $sentencia->bindParam(':nombres', $nombres);
    $sentencia->bindParam(':rol_id', $rol_id);
    $sentencia->bindParam(':email', $email);
    $sentencia->bindParam(':password', $password_hash);
    $sentencia->bindParam(':fyh_creacion', $fechaHora);
    $sentencia->bindParam(':estado', $estado_de_registro);

    try {
        if ($sentencia->execute()) {
            $_SESSION['mensaje'] = "Se registro el usuario de la manera correcta en la base de datos";
            $_SESSION['icono'] = "success";
        } else {
            $_SESSION['mensaje'] = "Error no se pudo registrar en la base de datos, comuniquese con el administrador";
            $_SESSION['icono'] = "error";
        }
    } catch (Exception $exception) {
        $_SESSION['mensaje'] = "El email de este usuario ya existe en la base de datos";
        $_SESSION['icono'] = "error";
    }

    header("Location: " . APP_URL . "/admin/usuarios");
    exit();

} else {
    $_SESSION['mensaje'] = "Las contraseñas introducidas no son iguales";
    $_SESSION['icono'] = "error";
    header("Location: " . APP_URL . "/admin/usuarios");
    exit();
}
