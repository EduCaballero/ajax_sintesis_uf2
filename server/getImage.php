<?php
/**
 * Created by PhpStorm.
 * User: edust
 * Date: 22/05/2018
 */

header("access-control-allow-origin: *");

//de momento, uso la guarrada de get
$url = $_POST['url'];

$datos = array();

//Generando nuestra  respuesta:

$con = mysqli_connect("localhost", "id5639494_sintesis", "sintesis", "id5639494_sintesis_uf2");
//$con = mysqli_connect("localhost", "id5842514_cordovaproject", "Parasintesis21101986", "id5842514_cordovaproject"); //por si falla el de arriba
$result = mysqli_query($con, "SELECT * FROM foto WHERE url='".$url."'");

while( $row = mysqli_fetch_array($result) ) {
    $etiqueta = $row['etiqueta'];
    array_push($datos, $etiqueta);
    $propietario = $row['creador'];
    array_push($datos, $propietario);

}

//$result = mysqli_query($con, "SELECT url FROM foto");

header('Content-type: application/json');
//Dar respuesta:
echo json_encode($datos);