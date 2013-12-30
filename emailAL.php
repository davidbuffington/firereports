<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
$name=$_REQUEST["name"];
$phone=$_REQUEST["phone"];
$address=$_REQUEST["address"];
$problem=$_REQUEST["problem"];
$correction=$_REQUEST["correction"];
$date=$_REQUEST["date"];
$time=$_REQUEST["time"];
$recipientAddr=$_REQUEST["recipientAddr"];

if($scenario==""){$scenario="Other - not specified";}

$date=date("m/d/Y",strtotime($date));
if($email==''){$email="dbuffington@hotmail.com";}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////this is the service response mail part///////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

$fromAddr = 'fireForms@ci.bremerton.wa.us'; // the address to show in From field.
if($recipientAddr==""){$recipientAddr = 'david.buffington@ci.bremerton.wa.us';}
$subjectStr = 'Fire Alarm at '.$address;
$mailBodyText = '
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html;charset=utf-8">
<title>$d</title>
</head>
<body>
<h1>Fire Alarm Activation Report</h1>
<h1>'.$address.'</h1>
		Date: '.$date.'<br/>
		time: '.$time.'<br/>
		name: '.$name.'<br/>
		Phone: '.$phone.'<br/>
		Address: '.$address.'<br/><hr/>
		<b>Problem:</b> '.$problem.'<br/><br/>
		<b>Correction:</b>'.$correction.'<br/>
		

</body>
</html>
';
// To send HTML mail, the Content-type header must be set
$headers  = 'MIME-Version: 1.0' . "\r\n";
$headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";

// Additional headers
$headers .= 'To: '.$recipientAddr . "\r\n";
$headers .= 'From: '.$fromAddr. "\r\n";


if (mail( $recipientAddr , $subjectStr , $mailBodyText, $headers ) ) {
  echo json_encode('<p>Thanx you!<br/>Email has been sent<br/>');
} else {
  echo json_encode('<p>Mail was NOT sent!!!</p> '.$recipientAddr . $subjectStr . $mailBodyEncodedText);
}

?>