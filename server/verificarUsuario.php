<?php
/**
 * Created by PhpStorm.
 * User: edust
 * Date: 06/05/2018
 * Time: 13:42
 */


//demomento, uso la guarrada de get
$usuario = $_GET['usuario'];
$password = $_GET['password'];
//en 000webhost siempre el host es localhost, después tienes que poner el usuario (lo pone cuando la creas allí) y el resto que también lo pone cuando vas a entrar a tu bbdd creada
$con = mysqli_connect("localhost", "id5639494_sintesis", "sintesis", "id5639494_sintesis_uf2");
$result = mysqli_query($con, "SELECT * FROM usuario WHERE name ='".$usuario."' and password ='".$password."'");
if (mysqli_num_rows($result)>0) echo "1";
else echo "0";