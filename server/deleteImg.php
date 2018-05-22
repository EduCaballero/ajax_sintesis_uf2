<?php
/**
 * Created by PhpStorm.
 * User: edust
 * Date: 22/05/2018
 * Time: 18:58
 */

header("access-control-allow-origin: *");

//de momento, uso la guarrada de get
$url = $_POST['url'];

$datos = array();

//Generando nuestra  respuesta:

$con = mysqli_connect("localhost", "id5639494_sintesis", "sintesis", "id5639494_sintesis_uf2");
//$con = mysqli_connect("localhost", "id5842514_cordovaproject", "Parasintesis21101986", "id5842514_cordovaproject"); //por si falla el de arriba
$result = mysqli_query($con, "DELETE FROM `foto` WHERE url='".$url."'");


//$result = mysqli_query($con, "SELECT url FROM foto");

echo "0";