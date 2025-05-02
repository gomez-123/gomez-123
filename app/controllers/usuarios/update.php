<?php

include('../../../app/config.php');
session_start();

$fechaHora = date('Y-m-d H:i:s'); // Definir la fecha actual

$id_usuario = $_POST['id_usuario'];
$nombres = $_POST['nombres'];
$rol_id = $_POST['rol_id'];
$email = $_POST['email'];
$password = $_POST['password'];
$repeat_password = $_POST['repeat_password'];

if ($password == "") {
    $sentencia = $pdo->prepare("UPDATE usuarios
        SET nombres=:nombres,
            rol_id=:rol_id,
            email=:email,
            fyh_actualizacion=:fyh_actualizacion
        WHERE id_usuario=:id_usuario");

    $sentencia->bindParam(':nombres', $nombres);
    $sentencia->bindParam(':rol_id', $rol_id);
    $sentencia->bindParam(':email', $email);
    $sentencia->bindParam(':fyh_actualizacion', $fechaHora);
    $sentencia->bindParam(':id_usuario', $id_usuario);

} else {
    if ($password == $repeat_password) {
        $password_hash = password_hash($password, PASSWORD_DEFAULT);

        $sentencia = $pdo->prepare("UPDATE usuarios
            SET nombres=:nombres,
                rol_id=:rol_id,
                email=:email,
                password=:password,
                fyh_actualizacion=:fyh_actualizacion
            WHERE id_usuario=:id_usuario");

        $sentencia->bindParam(':nombres', $nombres);
        $sentencia->bindParam(':rol_id', $rol_id);
        $sentencia->bindParam(':email', $email);
        $sentencia->bindParam(':password', $password_hash);
        $sentencia->bindParam(':fyh_actualizacion', $fechaHora);
        $sentencia->bindParam(':id_usuario', $id_usuario);
    } else {
        $_SESSION['mensaje'] = "Las contraseñas introducidas no son iguales";
        $_SESSION['icono'] = "error";
        header("Location: " . APP_URL . "/admin/usuarios");
        exit();
    }
}

try {
    if ($sentencia->execute()) {
        $_SESSION['mensaje'] = "Se actualizó el usuario de la manera correcta en la base de datos";
        $_SESSION['icono'] = "success";
    } else {
        $_SESSION['mensaje'] = "Error: no se pudo actualizar en la base de datos. Comuníquese con el administrador.";
        $_SESSION['icono'] = "error";
    }
} catch (Exception $exception) {
    $_SESSION['mensaje'] = "El email de este usuario ya existe en la base de datos";
    $_SESSION['icono'] = "error";
}

header("Location: " . APP_URL . "/admin/usuarios");
exit();
