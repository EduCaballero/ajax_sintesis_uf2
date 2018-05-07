<?php
/**
 * Created by PhpStorm.
 * User: edust
 * Date: 08/05/2018
 * Time: 0:05
 */


$errores = array();
$datos = array();

//Generando nuestra  respuesta:
$con = mysqli_connect("localhost", "id5639494_sintesis", "sintesis", "id5639494_sintesis_uf2");
//$result = mysqli_query($con, "INSERT usuario VALUES(null, '".$usuario."', '".$contrasenya."', null)");//de momento no uso el email hasta que pruebe autentificar con google

$result = mysqli_query($con, "SELECT url FROM foto");

$datos['exito'] = true;
$datos['mensaje'] = 'El registro de ha realizado correctamente';
$datos['exito'] = false;
$datos['errores'] = $errores;

if (mysqli_num_rows($result) > 0) {

}
else echo "0";


//Dar respuesta:
echo json_encode($datos);