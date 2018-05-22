<?php
/**
 * Created by PhpStorm.
 * User: edust
 * Date: 22/05/2018
 * Time: 18:18
 */





//demomento, uso la guarrada de get
$usuario = $_GET['usuario'];
$password = $_GET['password'];
//en 000webhost siempre el host es localhost, después tienes que poner el usuario (lo pone cuando la creas allí) y el resto que también lo pone cuando vas a entrar a tu bbdd creada
$con = mysqli_connect("localhost", "id5639494_sintesis", "sintesis", "id5639494_sintesis_uf2");
//$con = mysqli_connect("localhost", "id5842514_cordovaproject", "Parasintesis21101986", "id5842514_cordovaproject"); //por si falla el de arriba
//$result = mysqli_query($con, "SELECT * FROM usuario WHERE name ='".$usuario."' and password ='".$password."'");
//$sql = "UPDATE MyGuests SET lastname='Doe' WHERE id=2";
$result = mysqli_query($con, "UPDATE `usuario` SET `password`='".$password."' WHERE name='".$usuario."'");
//if (mysqli_num_rows($result)>0) echo "1";
//else echo "0";

echo "0";