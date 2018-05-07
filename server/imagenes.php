<?php
/**
 * Devolvemos un json con las tres imagenes a visualizar, anterior, actual y siguiente
 * Tiene que recibir por Post el nombre de la image actual. Si no la recibe,
 * devuelve la primera imagen.
 */

$extensions=array(".jpg",".png",".gif");
$path="http://educaballero.000webhostapp.com/images";

if(file_exists($_SERVER['DOCUMENT_ROOT']."/".$path))
{
	$return=array("prev"=>"None", "show"=>"None", "next"=>"None");

	$dh  = opendir($_SERVER['DOCUMENT_ROOT']."/".$path."/");
	$files=array();
	while ($files[] = readdir($dh));
	sort($files);
	closedir($dh);
	
	foreach($files as $filename)
	{
		if(is_file($_SERVER['DOCUMENT_ROOT']."/".$path."/".$filename) and in_array(substr(strtolower($filename),-4),$extensions))
		{
			if(($filename==$_POST["show"] || $_POST["show"]=="") && $return["show"]=="None")
			{
				$return["show"] = $filename;
			}elseif($return["show"]=="None"){
				$return["prev"] = $filename;
			}elseif($return["show"]!="None"){
				$return["next"] = $filename;
				break;
			}
		}
	}
	if($return["prev"]=="None")
		$return["prev"]="";
	if($return["next"]=="None")
		$return["next"]="";
}

echo json_encode($return);
?>
