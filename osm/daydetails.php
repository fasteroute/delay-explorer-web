<?php
$percent = 100;
$ontime = rand(0,$percent);
$percent = $percent - $ontime;
$fifteenmin = rand(0,$percent);
$percent = $percent - $fifteenmin;
$thirtymin = rand(0,$percent);
$cancelled = $percent - $thirtymin;
$data = array( 
	array("period" => "On Time", "value" => $ontime),
	array("period" => "15m Late", "value" => $fifteenmin),
	array("period" => "30m Late", "value" => $thirtymin),
	array("period" => "Cancelled", "value" => $cancelled)
);
header('Content-Type: application/json');
echo(
	json_encode(
		array("data" => $data)
	)
);
?>
