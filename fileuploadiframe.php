<html>
<head>

<link rel="stylesheet" type="text/css" href="fileupload.css">
<script src="http://code.jquery.com/jquery-1.9.1.min.js"></script>
</head>
<body><br/><br/>
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
					echo "<br/><p>Upload Pics, Video, etc...</p>";
				}		
		?>
		<br/>
		<form enctype="multipart/form-data" method="post">
			<input type="file" name="filez" id="filez" size="40">
			<br/>
			<input type="hidden" name="names" value="<?PHP echo $names; ?>" />
			<input type="hidden" name="pk" value="<?PHP echo $pk; ?>" />
			<br/><input id="uploadbutton" type="submit" onmouseup='$("#spinner").show()' ></input>
			<br/><br/>
			
		</form>

	</center>
	<?PHP echo "<script>parent.uploadnames='".$names."'</script>"; ?>
	<?PHP echo "<script>parent.uploadpk='".$pk."'</script>"; ?>
</body>
</html>