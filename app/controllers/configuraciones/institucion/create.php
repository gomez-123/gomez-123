<?php

include('../../../../app/config.php');

$nombre_institucion = $_POST['nombre_institucion'];
$direccion = $_POST['direccion'];
$telefono = $_POST['telefono'];
$celular = $_POST['celular'];
$correo = $_POST['correo'];
$fechaHora = date("Y-m-d H:i:s");
$estado_de_registro = "1"; // o el valor que corresponda

$logo = "";

if (isset($_FILES['file']) && $_FILES['file']['error'] === UPLOAD_ERR_OK) {
    $nombre_original = basename($_FILES['file']['name']);
    $nombre_del_archivo = date('Y-m-d-H-i-s') . '-' . $nombre_original;
    $location = "../../../../public/images/configuracion/" . $nombre_del_archivo;
    
    if (move_uploaded_file($_FILES['file']['tmp_name'], $location)) {
        $logo = $nombre_del_archivo;
    }
}

$sentencia = $pdo->prepare('INSERT INTO configuracion_instituciones
    (nombre_institucion, logo, direccion, telefono, celular, correo, fyh_creacion, estado)
    VALUES (:nombre_institucion, :logo, :direccion, :telefono, :celular, :correo, :fyh_creacion, :estado)');

$sentencia->bindParam(':nombre_institucion', $nombre_institucion);
$sentencia->bindParam(':logo', $logo);
$sentencia->bindParam(':direccion', $direccion);
$sentencia->bindParam(':telefono', $telefono);
$sentencia->bindParam(':celular', $celular);
$sentencia->bindParam(':correo', $correo);
$sentencia->bindParam(':fyh_creacion', $fechaHora);
$sentencia->bindParam(':estado', $estado_de_registro);

if ($sentencia->execute()) {
    echo 'success';
    // header('Location:' .$URL.'/'); // Descomenta si tienes una redirección
} else {
    echo 'error al registrar en la base de datos';
}
?>
