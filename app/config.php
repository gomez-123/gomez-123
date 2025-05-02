<?php
define('SERVIDOR','localhost');
define('USUARIO','root');
define('PASSWORD','');
define('BD','sisgestionescolar');

define('APP_NAME','SISTEMA DE GESTION ESCOLAR');
define('APP_URL','http://localhost/sisgestionescolar');
define('REY_API_MAPS','');

$servidor = "mysql:dbname=".BD.";host=".SERVIDOR;

try{
    $pdo = new PDO($servidor, USUARIO, PASSWORD,array(PDO::MYSQL_ATTR_INIT_COMMAND=>"SET NAMES utf8"));
    //echo "conexion exitosa a la base de datos";
}catch (PDOException $e){
    print_r($e);
    echo "error no se pudo conectar a la base de datos";
}

date_default_timezone_set("America/Lima"); // Establece la zona horaria
$fechaHora = date('Y_m_d H:i:s');

$fecha_actual = date('Y-m-d');
$dia_actual = date('d');
$mes_actual = date('m');
$año_actual = date('Y');

$estado_de_registro = '1';

?>

