<?php
/**
 * Created by PhpStorm.
 * User: edust
 * Date: 08/05/2018
 * Time: 17:43
 */

$path='http://educaballero.000webhostapp.com/upload/*.jpg';
$images=glob($path);

foreach ($images as $value){
    echo  "<img src='$value' width='180' height='180' alt='img'";
}