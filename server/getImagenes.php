<?php
/**
 * Created by PhpStorm.
 * User: edust
 * Date: 08/05/2018
 * Time: 0:05
 */


$arrayImagenes = array();
$imagen;

//Generando nuestra  respuesta:
$con = mysqli_connect("localhost", "id5639494_sintesis", "sintesis", "id5639494_sintesis_uf2");
//$result = mysqli_query($con, "INSERT usuario VALUES(null, '".$usuario."', '".$contrasenya."', null)");//de momento no uso el email hasta que pruebe autentificar con google

$result = mysqli_query($con, "SELECT url FROM foto");

while( $row = mysqli_fetch_array($result) ) {
    //array_push($images['images'], array('id' => $row['id'], 'ruta' => $row['ruta'], 'photo' => base64_encode($row['photo'])));
    //$arrayImagenes = $row['url'];
    $imagen = $row['url'];
    array_push($arrayImagenes, $imagen);
}


//header('Content-type: application/json');
//Dar respuesta:
echo json_encode($arrayImagenes);