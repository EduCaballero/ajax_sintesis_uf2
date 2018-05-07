<?php
/**
 * Created by PhpStorm.
 * User: edust
 * Date: 07/05/2018
 * Time: 0:56
 */

//pillamos usuario y etiqueta por get
$usuario = $_GET['usuario'];
$etiqueta = $_GET['etiqueta'];



// darle un nombre nuevo y aleatorio al fichero
$new_image_name = "newimage_".mt_rand().".jpg";
$path = "http://educaballero.000webhostapp.com/upload/".$new_image_name;
$score = 0;

/////meter imagen en bbdd
$con = mysqli_connect("localhost", "id5639494_sintesis", "sintesis", "id5639494_sintesis_uf2");

//traemos el id del usuario, porque me gusta complicarme
$userIDbyName = mysqli_query($con, "SELECT id FROM usuario WHERE name ='".$usuario."'");
//convertimos en un array el objeto de la query y cogemos el valor de la fila
$row= mysqli_fetch_array($userIDbyName);
$id = $row['id'];

mysqli_query($con, "INSERT foto VALUES(null, '".$path."', '".$score."', '".$id."', '".$usuario."', '".$etiqueta."')");

// upload fichero
move_uploaded_file($_FILES["file"]["tmp_name"], 'upload/'.$new_image_name);
echo $new_image_name ;