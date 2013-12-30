<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
$bname=$_REQUEST["bname"];//business name
$bphone=$_REQUEST["bphone"];//business location
$baddress=$_REQUEST["baddress"];
$bcontact=$_REQUEST["bcontact"];
$lat=$_REQUEST["lat"];
$lng=$_REQUEST["lng"];
$pk=$_REQUEST["pk"];
$typeos=$_REQUEST["typeos"];
$status=$_REQUEST["status"];
$comments=$_REQUEST["comments"];
$docs=$_REQUEST["docs"];
$indate=$_REQUEST["indate"];
$indate=date("m/d/Y",strtotime($indate));
$iname=$_REQUEST["iname"];
$iphone=$_REQUEST["iphone"];
$iemail=$_REQUEST["iemail"];
$icompany=$_REQUEST["icompany"];
$nicet=$_REQUEST["nicet"];
$uploads=$_REQUEST["uploads"];
$attch="http://webapp1.ci.bremerton.wa.us/fire/attachments/".$pk;
//$comments=$_REQUEST["comments"];
$recipientAddr=$_REQUEST["recipientAddr"];
$d=date("m/d/Y");
$date=date("m/d/Y",$pk/1000);
if($email==''){$email="dbuffington@hotmail.com";}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////get picture names///////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*
$dir="pics";
$dh=opendir($dir);
while (($file = readdir($dh)) !== false) {
            if(strpos($file,$t)){
								$piclink=$piclink."<a href='http://webapp1.ci.bremerton.wa.us/graffiti/pics/".$file."'><img height='200'src='http://webapp1.ci.bremerton.wa.us/graffiti/pics/".$file."'></a><br/>";
								$piclink2=$piclink2."http://webapp1.ci.bremerton.wa.us/graffiti/pics/".$file." <br/>";
								}
        }
closedir($dh);
*/
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////make the KML file///////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
$kmlfile='
<kml >
  <Document>
    <Placemark>
      <name>'.$bname.'</name>
     <Point>
        <coordinates>'.$lng.','.$lat.'</coordinates>
      </Point>
	   <description>
        <![CDATA[
        business address: '.$baddress.'<br/>
		business phone: '.$bphone.'<br/>
		business contact:'.$bcontact.'<br/><br/>
		inpector name:'.$iname.'<br/>
		inspector phone:'.$iphone.'<br/>
		inspector email:'.$iemail.'<br/>
		inspector company:'.$icompany.'<br/><br/>
		inspection date:'.$indate.'<br/>
		type of system: '.$typeos.'<br/>
		status: '.$status.'<br/>
		NICET: '.$nicet.'<br/>
		comments: '.$comments.'<br/><hr/>
		Attachments:<b>'.urldecode($docs).'<br/>
		'.$bname.'.kml</b><br/><hr/>
		  <a href="http://webapp1.ci.bremerton.wa.us/fire/attachments/'.$pk.'/"/>files</a><br/>
		 ]]>
      </description>
    </Placemark>
  </Document>
</kml>';
$bn2=str_replace(" ","_",$bname);
if($bn2==""){$bn2="NA";}
$fn=$bn2.".kml";
$fpath='../attachments/'.$pk.'/'.$fn;
$urlpath='hhttp://webapp1.ci.bremerton.wa.us/fire/attachments/'.$pk.'/'.$fn;
$fh=fopen($fpath,'w');
fwrite($fh,$kmlfile);
fclose($fh);


////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////this is the service response mail part///////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

$fromAddr = 'fireForms@ci.bremerton.wa.us'; // the address to show in From field.
if($recipientAddr==""){$recipientAddr = 'kelsie.donleycott@ci.bremerton.wa.us,david.buffington@ci.bremerton.wa.us';}
$subjectStr = 'Fire Inspection Forms'.$bl;
$gmapsq="hhhttp://webapp1.ci.bremerton.wa.us/fire/attachments/".$pk."/".$fn;
$mailBodyText = '
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html;charset=utf-8">
<title>$d</title>
</head>
<body>
<h1>New Fire Inspection Report</h1>
<h1>'.$bname.'</h1>
		Bsiness Address: '.$baddress.'<br/>
		Business Phone: '.$bphone.'<br/>
		Business Contact: '.$bcontact.'<br/><br/>
		Inpector Name: '.$iname.'<br/>
		Inspector Phone: '.$iphone.'<br/>
		Inspector Email: '.$iemail.'<br/>
		Inspector Company: '.$icompany.'<br/><br/>
		Inspection Date: '.$indate.'<br/>
		Type of System: '.$typeos.'<br/>
		Status: '.$status.'<br/>
		NICET: '.$nicet.'<br/>
		Comments: '.$comments.'<br/><hr/>
		Attachments:<b> '.urldecode($docs).'<br/>
		'.$bname.'.kml</b><br/><hr/>
		Attachments : <a href="h'.$attch.'">Attachments</a><br/>
		Map it: <a href="hhttps://maps.google.com/maps?q="'.$urlpath.'">google maps</a><br/>
		Map all: <a href="hhttp://webapp1.ci.bremerton.wa.us/fire/review">review page</a><br/>
</body>
</html>
';

$filePath = $fpath;
$fileName = basename($filePath);
$fileType = 'application/vnd.google-earth.kml+xml';
$mineBoundaryStr='otecuncocehccj8234acnoc231';
$headers= <<<EEEEEEEEEEEEEE
From: $fromAddr
MIME-Version: 1.0
Content-Type: multipart/mixed; boundary="$mineBoundaryStr"

EEEEEEEEEEEEEE;
// Add a multipart boundary above the plain message 
$mailBodyEncodedText = <<<TTTTTTTTTTTTTTTTT
This is a multi-part message in MIME format.

--{$mineBoundaryStr}
Content-Type: text/html; charset=UTF-8
Content-Transfer-Encoding: quoted-printable

$mailBodyText

TTTTTTTTTTTTTTTTT;

$file = fopen($filePath,'rb'); 
$data = fread($file,filesize($filePath)); 
fclose($file);
$data = chunk_split(base64_encode($data));

// file attachment part
$mailBodyEncodedText .= <<<FFFFFFFFFFFFFFFFFFFFF
--$mineBoundaryStr
Content-Type: $fileType;
 name=$fileName
Content-Disposition: attachment;
 filename="$fileName"
Content-Transfer-Encoding: base64

$data

--$mineBoundaryStr--

FFFFFFFFFFFFFFFFFFFFF;
//&& mail( $iemail , $subjectStr , $mailBodyEncodedText, $headers )
if (mail( $recipientAddr , $subjectStr , $mailBodyEncodedText, $headers ) ) {
  $json='<br/>Fire Department has been Notified';
} else {
  $json='<hr/><p>Unable to send Email</p>';exit();
}
if (mail( $iemail , $subjectStr , $mailBodyEncodedText, $headers ) ) {
	echo json_encode('<h4>'.$json.'<hr/>You have been sent a copy of the email<hr/></h4>');
	}else{
	echo json_encode('<h4>'.$json.'<hr/>Failed to cc your email address<hr/></h4>');
	}
//include 'emailCustomer.php';
?>