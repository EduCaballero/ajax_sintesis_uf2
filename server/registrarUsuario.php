<?php
/**
 * Created by PhpStorm.
 * User: edust
 * Date: 06/05/2018
 * Time: 23:18
 */

//demomento, uso la guarrada de get
$usuario = $_POST['usuario'];
$contrasenya = $_POST['contra'];

$errores = array();
$datos = array();

//validamos los parámetros:
if (empty($_POST['usuario'])){
    $errores['usuario'] = 'Se requiere especificar un nombre de usuario';
} else $usuario = $_POST['usuario'];

if (empty($_POST['contra'])){
    $errores['contra'] = 'Se requiere especificar un password';
} else $contrasenya = $_POST['contra'];

//Generando nuestra  respuesta:
if (empty($errores)){

    $con = mysqli_connect("localhost", "id5639494_sintesis", "sintesis", "id5639494_sintesis_uf2");
    //$con = mysqli_connect("localhost", "id5842514_cordovaproject", "Parasintesis21101986", "id5842514_cordovaproject"); //por si falla el de arriba
    $result = mysqli_query($con, "INSERT usuario VALUES(null, '".$usuario."', '".$contrasenya."', null)");//de momento no uso el email hasta que pruebe autentificar con google

    $datos['exito'] = true;
    $datos['mensaje'] = 'El registro de ha realizado correctamente';
} else {
    $datos['exito'] = false;
    $datos['errores'] = $errores;
}

//Dar respuesta:
echo json_encode($datos);