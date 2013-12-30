<html>
<head>
<script type="text/javascript" charset="utf-8" src="jq.mobi.min.js"></script>
<link rel="stylesheet" type="text/css" href="fileupload.css">
<link rel="stylesheet" type="text/css" href="jq.ui.eco.css" title="default"/>
</head>
<body>
<?PHP
$filez=$_FILES["filez"];
$names=$_REQUEST["names"];

$pk=$_REQUEST["pk"];
mkdir('../attachments/'.$pk);
$target = "../attachments/".$pk."/$filez[name]"; 

if(strlen($target)>30){	
	if (file_exists($target)){
	$frst=(explode(".",$filez[name]));
	$frst[0]=$frst[0].time();
	$target = "../attachments/".$pk."/".$frst[0].".".$frst[1]; 
	$filez[name]=$frst[0].".".$frst[1];
	}
}	
	
if($filez[name]!=''){
 if(move_uploaded_file($_FILES['filez']['tmp_name'], $target)) 
 {
 echo "<center>The file ". $filez[name]. " has been uploaded</center><hr/>";
 } 
 else {
 echo "<h1><b>Sorry, there was a problem uploading your file.<br/>Please try again</b></h1>";
 
 }
}
?><center>
<div id="spinner" class="bubblingG">
Please Wait...<br/>
<span id="bubblingG_1">
</span>
<span id="bubblingG_2">
</span>
<span id="bubblingG_3">
</span>
</div>
	
			<?PHP
		if($filez){
					if($filez[name]!=""){$names.="<br/>".$filez[name];}
					echo "Files uploaded<br/><b> $names </b><br/>";
					}else{
					echo "<br/><br/><p>Upload Pics, Video, etc...</p>";
				}		
		?>
		<br/>
		<form enctype="multipart/form-data" method="post">
			<input type="file" name="filez" id="filez" size="40">
			<br/>
			<input type="hidden" name="names" value="<?PHP echo $names; ?>" />
			<input type="hidden" name="pk" value="<?PHP echo $pk; ?>" />
			<br/><input type="submit" onmouseup='$("#spinner").show()' ></input>
			<br/><br/>
			
		</form>
		<div style="position:absolute;
					bottom:0px;
					width:100%;
					background-color:gray">
		<img src="img/done.png" style="padding:12px" id="uploaddonebutton" onmousedown="parent.uploaddone('<?PHP echo urlencode($names) ?>')"  />
		<div>
	</center>
</body>
</html>