<?php
/**
 * Created by PhpStorm.
 * User: edust
 * Date: 22/05/2018
 * Time: 17:55
 */

header("access-control-allow-origin: *");


$arrayUsers = array();
$user;

//Generando nuestra  respuesta:
$con = mysqli_connect("localhost", "id5639494_sintesis", "sintesis", "id5639494_sintesis_uf2");
//$con = mysqli_connect("localhost", "id5842514_cordovaproject", "Parasintesis21101986", "id5842514_cordovaproject"); //por si falla el de arriba

$result = mysqli_query($con, "SELECT name FROM usuario");

while( $row = mysqli_fetch_array($result) ) {
    $user = $row['name'];
    array_push($arrayUsers, $user);
}


header('Content-type: application/json');
//Dar respuesta:
echo json_encode($arrayUsers);