<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
$name=$_REQUEST["name"];
$phone=$_REQUEST["phone"];
$address=$_REQUEST["address"];
$type=$_REQUEST["type"];
$dateform=$_REQUEST["date"];
$time=$_REQUEST["time"];
$flashlight=$_REQUEST["flashlight"];
$whistle=$_REQUEST["whistle"];
$phonenumber=$_REQUEST["phonenumber"];
$walked=$_REQUEST["walked"];
$dfw=$_REQUEST["dfw"];
$recipientAddr=$_REQUEST["recipientAddr"];
if($whistle=="true"){$whistle="checked";}else{$whistle="";}
if($walked=="true"){$walked="checked";}else{$walked="";}
if($phonenumber=="true"){$phonenumber="checked";}else{$phonenumber="";}
if($flashlight=="true"){$flashlight="checked";}else{$flashlight="";}
if($dfw=="true"){$dfw="checked";}else{$dfw="";}
$dateform=date("m/d/Y",strtotime($dateform));
$d=date("m/d/Y");
$date=date("m/d/Y",$pk/1000);
if($email==''){$email="dbuffington@hotmail.com";}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////this is the service response mail part///////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

$fromAddr = 'fireForms@ci.bremerton.wa.us'; // the address to show in From field.
if($recipientAddr==""){$recipientAddr = 'david.buffington@ci.bremerton.wa.us';}
$subjectStr = 'Fire Watch at '.$address;
$mailBodyText = '
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html;charset=utf-8">
<title>$d</title>
</head>
<body>
<h1>New Fire Watch Report</h1>
<h1>'.$address.'</h1>
		Date: '.$dateform.'<br/>
		time: '.$time.'<br/>
		name: '.$name.'<br/>
		Phone: '.$phone.'<br/>
		Address: '.$address.'<br/><hr/>
		<input type="checkbox" '.$flashlight.'> Flashlight<br/>
		<input type="checkbox" '.$whistle.'> Whistle/Notification Method<br/>
		<input type="checkbox" '.$phonenumber.'> Phone Number<br/>
		<input type="checkbox" '.$walked.'> Entire Site Walked and Checked<br/>
		<input type="checkbox" '.$dfw.'> Dedicated Fire Watch<br/>
		

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