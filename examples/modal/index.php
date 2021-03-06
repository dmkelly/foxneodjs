<?php

$directory = ".";
$contents = scandir($directory);

$listing = "<ul>";

foreach($contents as $key => $value) 
{
	$validFile = true;
	$invalidFiles = array('.', '..', '.DS_Store', 'index.php', 'index.html');

	for ($i = 0; $i < sizeof($invalidFiles); $i++)
	{
	    $privateFile = (substr($value, 0, 1) === '_') ? false : true;

		if ($value === $invalidFiles[$i] || !$privateFile)
		{
			$validFile = false;
		}
	}

	if ($validFile)
	{
		$listing .= "<li><a href='$directory/$value'>$value</a></li>";
	}
}

$listing .= "</ul>";
?>

<html>
<head>
	<title>Directory Contents</title>

	<link href="../bootstrap/css/bootstrap.css" rel="stylesheet">
	<script type="text/javascript" src="//ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min.js"></script>
	<script src="../bootstrap/js/bootstrap.min.js"></script>

	<style type="text/css">
	body {
	    margin: 50px;
	}
	</style>
</head>
<body>
	<h1>File List</h1>
	<?=$listing ?>
</body>
</html>