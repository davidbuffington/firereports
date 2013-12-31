var recipientAddr="david.buffington@ci.bremerton.wa.us";
var typeos = "NA";
var t = new Date().getTime();
t=Math.round(t/1000);
var docs = "NA";
var statuscolor = "NA";
var fwsendcheck = "0";
var fdcheck = "0";
var alcheck = "0";
var cccheck = "0";
var fdscenario = null; 
var uploadnames = "none";//this is for corrected code violation uploads
var uploadpk = "0";//this is for corrected code violation uploads
////map variables
    var map = null;
	var ll = 0;
	var lt = "47.56693806524162";
    var lg = "-122.62597756958007";

$(function() {
  
  var ht2=$( document ).height() - 50;
  var wt2=$( document ).width() - 50;
    $( "#popupMap iframe" ).attr( "width", 0 ).attr( "height", 0 );
	$( "#popupupload iframe" ).attr( "width", 0 ).attr( "height", 0 );	
 
    $( "#popupMap iframe" ).contents().find( "#map_canvas" ).css( { "width" : 0, "height" : 0 } );
 
    $( "#popupMap" ).on({
        popupbeforeposition: function() {
            var w = wt2;
            var h = ht2;
			$( "#popupMap iframe" ).attr( "width", w ).attr( "height", h ).attr( "src","map.html?lt="+lt+"&lg="+lg );
			$( "#popupMap iframe" ).contents().find( "#map_canvas" ).css( { "width": w, "height" : h } );
			return null;
        },
        popupafterclose: function() {
			$("#popupmappic1").attr("src","img/slonsmall2.png");
            $( "#popupMap iframe" ).attr( "width", 0 ).attr( "height", 0 );
            $( "#popupMap iframe" ).contents().find( "#map_canvas" ).css( { "width": 0, "height" : 0 } );   
             return null;  
			}
    });
	$( "#popupcc" ).on({
        popupbeforeposition: function() {
				var w = wt2;
				var h = ht2;
				$( "#popupcc iframe" ).attr( "width", w ).attr( "src","http://webapp1.ci.bremerton.wa.us/fire/mobile2/fileuploadiframe.php?pk="+ t ).attr( "height", h );
				return null; 
				},
        popupafterclose: function() {
			//$("#popupuploadpic1").attr("src","img/uploadonsmall2.png");
            $( "#popupcc iframe" ).attr( "width", 0 ).attr( "height", 0 );
			return null; 
			}
    });	$( "#popupupload" ).on({
        popupbeforeposition: function() {
				var w = wt2;
				var h = ht2;
				$( "#popupupload iframe" ).attr( "width", w ).attr( "src","http://webapp1.ci.bremerton.wa.us/fire/mobile2/fileuploadiframe.php?pk="+ t ).attr( "height", h );
				return null; 
				},
        popupafterclose: function() {
			$("#popupuploadpic1").attr("src","img/uploadonsmall2.png");
            $( "#popupupload iframe" ).attr( "width", 0 ).attr( "height", 0 );
			return null; 
			}
    });
	
});
function firewatch(){
$.mobile.changePage( $("#firewatch"), { transition: "slide"} );
var fwname = localStorage.getItem("fwname");
var fwdate = localStorage.getItem("fwdate");
var fwphone = localStorage.getItem("fwphone");
var fwaddress = localStorage.getItem("fwaddress");
$("#fwdate").val(fwdate);
$("#fwname").val(fwname);
$("#fwphone").val(fwphone);
$("#fwaddress").val(fwaddress);
}
function reportalarm(){
$.mobile.changePage( $("#reportalarm"), { transition: "slide"} );
}
function firedrill(){
$.mobile.changePage( $("#firedrill"), { transition: "slide"} );
}
function correctcode(){
$.mobile.changePage( $("#correctcode"), { transition: "slide"} );
}
function fireforms(){
$.mobile.changePage( $("#forms"), { transition: "slide"} );
}
function webpageforms(){
window.location = "http://www.ci.bremerton.wa.us/display.php?id=395#fire";
}
function fdbutton(val){
			fdscenario=val;
			fdcheck="1";
			$( "#popupfd" ).popup( "close" );
			return null;
}
function alsend(){
				if(alcheck!=="1"){$( "#popupal2" ).popup( "open" );return null;}
						var date=$("#aldate").val();
						var time=$("#altime").val();
						if(time===""){$( "#popupal3" ).popup( "open" );return null;}
						var name=$("#alname").val();
						var phone=$("#alphone").val();
						var address=$("#aladdress").val();
						var problem=$("#alproblem").val();
						var correction=$("#alsteps").val();
						
						vals="?name="+name+"&phone="+phone+"&time="+time+"&date="+date+"&problem="+encodeURIComponent(problem)+"&correction="+encodeURIComponent(correction)+"&address="+address+"&recipientAddr="+recipientAddr;
						$.getJSON("http://webapp1.ci.bremerton.wa.us/fire/mobile2/emailAL.php"+vals,function(result1){
																	$("#aljsonresult").html('<center><h3>'+result1+'</h3></center>');
																	$( "#popupal4" ).popup( "open" );
																	});
						return null;											
}
function ccsend(){
				if(cccheck!=="1"){$( "#popupcc2" ).popup( "open" );return null;}
						var date=$("#ccdate").val();
						var time=$("#cctime").val();
						if(time===""){$( "#popupcc3" ).popup( "open" );return null;}
						var name=$("#ccname").val();
						var phone=$("#ccphone").val();
						var address=$("#ccaddress").val();
						var problem=$("#ccproblem").val();
						var correction=$("#ccsteps").val();
						
						vals="?name="+name+"&phone="+phone+"&time="+time+"&date="+date+"&problem="+encodeURIComponent(problem)+"&correction="+encodeURIComponent(correction)+"&address="+address+"&recipientAddr="+recipientAddr+"&docs="+uploadnames+"&pk="+uploadpk;
						$.getJSON("http://webapp1.ci.bremerton.wa.us/fire/mobile2/emailCC.php"+vals,function(result1){
																	$("#ccjsonresult").html('<center><h3>'+result1+'</h3></center>');
																	$( "#popupcc4" ).popup( "open" );
																	});
						return null;											
}
function fdsend(){
				if(fdcheck!=="1"){$( "#popupfd2" ).popup( "open" );return null;}
						var date=$("#fddate").val();
						var time=$("#fdtime").val();
						if(time===""){$( "#popupfd3" ).popup( "open" );return null;}
						var name=$("#fdname").val();
						var phone=$("#fdphone").val();
						var address=$("#fdaddress").val();
						var scenarioother=$("#fdother").val();
						if(fdscenario=="other"){fdscenario=scenarioother;}
						if(fdscenario=="alarm"){fdscenario="Used fire alarm to activate drill";}
												
						vals="?name="+name+"&phone="+phone+"&time="+time+"&date="+date+"&scenario="+encodeURIComponent(fdscenario)+"&address="+address+"&recipientAddr="+recipientAddr;
						$.getJSON("http://webapp1.ci.bremerton.wa.us/fire/mobile2/emailFD.php"+vals,function(result1){
																	$("#fdjsonresult").html('<center><h3>'+result1+'</h3></center>');
																	$( "#popupfd4" ).popup( "open" );
																	});
						return null;											
}
function fwsend(){
	if(fwsendcheck==="1"){
					
						var date=$("#fwdate").val();
						var time=$("#fwtime").val();
						if(time===""){$( "#popupfw3" ).popup( "open" );return null;}
						var name=$("#fwname").val();
						var phone=$("#fwphone").val();
						var address=$("#fwaddress").val();
						var flashlight=$("#fwcb1").prop("checked");
						var whistle=$("#fwcb2").prop("checked");
						var phonenumber=$("#fwcb3").prop("checked");
						var walked=$("#fwcb4").prop("checked");
						var dedicatedfirewatch=$("#fwcb5").prop("checked");
						var vals="?type=firewatch&date="+date+"&time="+time+"&name="+name+"&phone="+phone+"&address="+address+"&recipientAddr="+recipientAddr;
						try{
						localStorage.setItem('fwname',name);
						localStorage.setItem('fwphone',phone);
						localStorage.setItem('fwaddress',address);
						localStorage.setItem('fwdate',date);}
						catch(e){var one=1;}
						if(flashlight === true){vals+="&flashlight=true";}else{vals+="&flashlight=false";}
						if(whistle === true){vals+="&whistle=true";}else{vals+="&whistle=false";}
						if(phonenumber === true){vals+="&phonenumber=true";}else{vals+="&phonenumber=false";}
						if(walked === true){vals+="&walked=true";}else{vals+="&walked=false";}
						if(dedicatedfirewatch === true){vals+="&dfw=true";}else{vals+="&dfw=false";}
						fwsendcheck="0";
						$.getJSON("http://webapp1.ci.bremerton.wa.us/fire/mobile2/emailFW.php"+vals,function(result1){
																	$("#fwjsonresult").html('<center><h3>'+result1+'</h3></center>');
																	$("#fwtime").val("");
																	$( "#popupfw4" ).popup( "open" );
																	});
						}
			else{
			$( "#popupfw2" ).popup( "open" );
			}
return null;
}
function popupfw(){
					$( "#popupfw" ).popup( "open" );
					fwsendcheck="1";
}
function popupfd(){
					$( "#popupfd" ).popup( "open" );
}
function popupcc(){
					$( "#popupcc" ).popup( "open" );
}
function popupal(){
					var h=$(document).height();
					var w=$(document).width();
					alcheck=1;
					$("#alsteps").css("height",h-300);
					$("#popupal").css("height",h-100);
					$("#popupal").css("width",w-100);
					$( "#popupal" ).popup( "open" );
}
function ccpopupclose(){
				cccheck="1";
				$( "#popupcc" ).popup( "close" );//once for the iframe
				$( "#popupcc" ).popup( "close" );
}
function fdpopupclose(){
				fdcheck="1";
				$( "#popupfd" ).popup( "close" );
}
function fwpopupclose(){
				$( "#popupfw" ).popup( "close" );
}
function alpopupclose(){
				alcheck="1";
				$( "#popupal" ).popup( "close" );
}
function fwpopup2close(){
				$( "#popupfw2" ).popup( "close" );
}
function fdpopup2close(){
				$( "#popupfd2" ).popup( "close" );
}
function alpopup2close(){
				$( "#popupal2" ).popup( "close" );
}
function ccpopup2close(){
				$( "#popupcc2" ).popup( "close" );
}
function fwpopup3close(){
				$( "#popupfw3" ).popup( "close" );
}
function fdpopup3close(){
				$( "#popupfd3" ).popup( "close" );
}
function alpopup3close(){
				$( "#popupal3" ).popup( "close" );
}
function ccpopup3close(){
				$( "#popupcc3" ).popup( "close" );
}
function fwpopup4close(){
				$( "#popupfw4" ).popup( "close" );
}
function fdpopup4close(){
				$( "#popupfd4" ).popup( "close" );
}
function alpopup4close(){
				$( "#popupal4" ).popup( "close" );
}
function ccpopup4close(){
				$( "#popupcc4" ).popup( "close" );
}
function showPosition(position){lt=position.coords.latitude;lg=position.coords.longitude;}
if(navigator.geolocation){ navigator.geolocation.getCurrentPosition(showPosition);}
function techaccess(){
				$.mobile.changePage( $("#techone"), { transition: "slide"} );
}
function mappopup(){
					$( "#popupMap" ).popup( "open" );
}
function uploadpopup(){
					$( "#popupupload" ).popup( "open" );
}
function closemappopup(){
					$( "#popupMap" ).popup( "close" );// once to close the iframe
					$( "#popupMap" ).popup( "close" );
}
function closeuploadpopup(){
					$( "#popupupload" ).popup( "close" );// once to close the iframe
					$( "#popupupload" ).popup( "close" );
}
function sione(){
var iname = localStorage.getItem("techname");
var iphone = localStorage.getItem("techphone");
var iemail = localStorage.getItem("techemail");
var icompany = localStorage.getItem("techcompany");
$("#iname").val(iname);
$("#iphone").val(iphone);
$("#iemail").val(iemail);
$("#icompany").val(icompany);
$.mobile.changePage( $("#techtwo"), { transition: "slide"} );
}
function sitwo(){
//local storage

var techname = $("#iname").val();
var techphone = $("#iphone").val();
var techemail = $("#iemail").val();
var techcompany = $("#icompany").val();
try{
	localStorage.setItem('techname',techname);
	localStorage.setItem('techphone',techphone);
	localStorage.setItem('techemail',techemail);
	localStorage.setItem('techcompany',techcompany);
	}catch(e){
	alert("If you want to save your tech info, please turn off 'private browsing'");
	}
$.mobile.changePage( $("#actionpage"), { transition: "slide"} );
$.mobile.changePage( $("#actionpage"), { transition: "slide"} );
}

function reportpage(thework){
				var date = new Date();
				var day = date.getDate();
				var month = date.getMonth() + 1;
				var year = date.getFullYear();

				if (month < 10){month = "0" + month;}
				if (day < 10){day = "0" + day;}

				var today = year + "-" + month + "-" + day;       
				$("#reportdate").attr("value", today);
				$("#reportheader").html("<center><h2>" + thework + "</h2></center>");
				$("#perotpagesendbutton").attr("onclick","send2('" + thework + "')");
				$.mobile.changePage( $("#reportpage"), { transition: "slide"} );
}
function techthreepage(){
$.mobile.changePage( $("#techthree"), { transition: "slide"} );
}
function prev(){
parent.history.back();
}
function tosclick(){
$.mobile.changePage( $("#tos"), { transition: "slide"} );
}
function instaclick(){
if(typeos=="NA"){$( "#popup" ).popup( "open" );return null;}
$.mobile.changePage( $("#insta"), { transition: "slide"} );return null;
}
function insstatusclick(){
if(typeos=="NA"){$( "#popup" ).popup( "open" );return null;}
$.mobile.changePage( $("#insstatus"), { transition: "slide"} );return null;
}
function insdatestart(){
if(typeos=="NA"){$( "#popup" ).popup( "open" );return null;}
				var date = new Date();
				var day = date.getDate();
				var month = date.getMonth() + 1;
				var year = date.getFullYear();

				if (month < 10){month = "0" + month;}
				if (day < 10){day = "0" + day;}

				var today = year + "-" + month + "-" + day;       
				$("#insdateinput").attr("value", today);
				$.mobile.changePage( $("#insdate"), { transition: "slide"} );	
				return null;
}
function uploadlink(){
	if(typeos=="NA"){$( "#popup" ).popup( "open" );return null;}
	var ht=$( document ).height()-95;
	$("#insuploaddiv").html('<iframe padding="0px" border="0px" width="100%" height="'+ht+'" src="http://webapp1.ci.bremerton.wa.us/fire/mobile2/fileupload.php?pk='+ t + '" />');
	$.mobile.changePage( $("#insupload"), { transition: "slide"} );	
	return null;
}
function uploaddone(namez){
	$("#insuploadpic").attr("src","img/uploadon.png");
	$.mobile.changePage( $("#techthree"), { transition: "slide",reverse:true} );
	docs=namez;
	return null;
}
function tosnext(){
				if($("#alarmnicet").val()!==''){
									$.mobile.changePage( $("#techthree"), { transition: "slide",reverse:true} );
												}
				return null;								
}
function gotouploads(){
	var ht=$( document ).height()-95;
	$("#insuploaddiv").html('<iframe padding="0px" border="0px" width="100%" height="'+ht+'" src="http://webapp1.ci.bremerton.wa.us/fire/mobile2/fileupload.php?pk='+ t + '" />');
	$.mobile.changePage( $("#insupload"), { transition: "slide"} );	
	return null;
}

function tospick(pick){
	
	switch(pick){
		case 1:typeos="fire Alarm";
		$( "#popup2" ).popup( "open" );
		$("#tospic").attr("src","img/buttonAlg.png");
			break;
		case 2:typeos="co2 system";
		$.mobile.changePage( $("#techthree"), { transition: "slide",reverse:true} );
		$("#tospic").attr("src","img/buttonCog.png");
			break;
		case 3:typeos="Fire Extinguisher";
		$.mobile.changePage( $("#techthree"), { transition: "slide",reverse:true} );
		$("#tospic").attr("src","img/buttonExg.png");
			break;
		case 4:typeos="FM 200 System";
		$.mobile.changePage( $("#techthree"), { transition: "slide",reverse:true} );
		$("#tospic").attr("src","img/buttonFmg.png");
			break;
		case 5:typeos="Hood System";
		$( "#popup3" ).popup( "open" );
		$("#tospic").attr("src","img/buttonHog.png");
			break;
		case 6:typeos="Fire Pump";
		$.mobile.changePage( $("#techthree"), { transition: "slide",reverse:true} );
		$("#tospic").attr("src","img/buttonPug.png");
			break;
		case 7:typeos="Spray Booth";
		$.mobile.changePage( $("#techthree"), { transition: "slide",reverse:true} );
		$("#tospic").attr("src","img/buttonSbg.png");
			break;
		case 8:typeos=" Fire Sprinklers";
		$( "#popup2" ).popup( "open" );
		$("#tospic").attr("src","img/buttonSpg.png");
			break;
		case 9:typeos="Standpipe System";
		$.mobile.changePage( $("#techthree"), { transition: "slide",reverse:true} );
		$("#tospic").attr("src","img/buttonStg.png");
			break;
		default:return null;
	}
	return null;	
}
function insta(){
	if ($("#tacomments").val().length>0){////text area has text
										$("#instapic").attr("src","img/commenton.png");
										}
	$.mobile.changePage( $("#techthree"), { transition: "slide",reverse:true} );
	return null;
}
function insdate(){
	$("#insdatepic").attr("src","img/dateon.png");
	$.mobile.changePage( $("#techthree"), { transition: "slide",reverse:true} );
	return null;
}
function green(){
	statuscolor="green";
	$("#insstatuspic").attr("src","img/statusgreen.png");
	$.mobile.changePage( $("#techthree"), { transition: "slide",reverse:true} );
	return null;
}
function yellow(){
	statuscolor="yellow";
	$("#insstatuspic").attr("src","img/statusyellow.png");
	$.mobile.changePage( $("#techthree"), { transition: "slide",reverse:true} );
}
function red(){
	statuscolor="red";
	$("#insstatuspic").attr("src","img/statusred.png");
	$.mobile.changePage( $("#techthree"), { transition: "slide",reverse:true} );
}

//call this function to center the map to devices gis location
function recenter(){
	if(navigator.geolocation){ navigator.geolocation.getCurrentPosition(showPosition);}
}

function insmap(){

	var hite=$( document ).height();
	var widt=$( document ).width();
	$("#map_canvas").css("width",widt);
	$("#map_canvas").css("height",hite);
	$("#markerdiv").css("top",(hite/2)-25 + "px");
	$("#markerdiv").css("left",(widt/2)-25 + "px");
	$.mobile.changePage( $("#insmap"), { transition: "slide"} );
  drawmap();
}

function drawmap(){  

   var map = new google.maps.Map(document.getElementById('map_canvas'), {
      zoom: 18,
      center: new google.maps.LatLng(lt, lg),
      mapTypeId: google.maps.MapTypeId.ROADMAP
   });

	google.maps.event.trigger(map, 'resize');
	google.maps.event.addListener(map, 'center_changed', function() {
							ll=map.getCenter();
							lt=ll.nb;
							lg=ll.ob;
							
							});
	
  
   
}
function mapback(){
	$("#insmappic").attr("src","img/slon.png");
	$.mobile.changePage( $("#techthree"), { transition: "slide",reverse:true} );
}
function reset(){

		$('input').val('');
		$(":checkbox:checked").each(function () {
												this.click(); 
		});
		if(navigator.geolocation){ navigator.geolocation.getCurrentPosition(showPosition);}else{
																								lt = "47.56693806524162";
																								lg = "-122.62597756958007";
																								}
		 typeos = "NA";
		 t = new Date().getTime();
		t=Math.round(t/1000);
		 docs = "NA";
		 statuscolor = "NA";
		 fwsendcheck = "0";
		 fdcheck = "0";
		 alcheck = "0";
		 cccheck = "0";
		 fdscenario = null; 
		 uploadnames = "none";//this is for corrected code violation uploads
		 uploadpk = "0";//this is for corrected code violation uploads																						}
		ll = 0;
		t=new Date().getTime();
		t=Math.round(t/1000);
		map = null;
		$("#insmappic").attr("src","img/sloff.png");
		$("#insstatuspic").attr("src","img/statusoff.png");
		$("#insdatepic").attr("src","img/dateoff.png");
		$("#tospic").attr("src","img/typeoff.png");
		$("#insuploadpic").attr("src","img/uploadoff.png");
		$("#instapic").attr("src","img/commentoff.png");
		$("#popupmappic1").attr("src","img/sloffsmall2.png");
		$("#popupuploadpic1").attr("src","img/uploadoffsmall2.png");
		$.mobile.changePage( $("#pageone"), { transition: "flip",reverse:true} );

}
function send(){
if(typeos=="NA"){$( "#popup" ).popup( "open" );return null;}
		$.mobile.changePage( $("#jsonresults"), { transition: "flip"} );
		var bname=$("#bname").val();
		var bphone=$("#bphone").val();
		var baddress=$("#baddress").val();
		var bcontact=$("#bcontact").val();
		var iname=$("#iname").val();
		var iphone=$("#iphone").val();
		var iemail=$("#iemail").val();
		var icompany=$("#icompany").val();
		var comments=$("#tacomments").val();
		var indate=$("#insdateinput").val();
		var nicet=$("#alarmnicet").val();
		//tos,docs,statuscolor,lt,lg
		
		var qry="?bname="+encodeURIComponent(bname)+"&bphone="+encodeURIComponent(bphone)+"&baddress="+encodeURIComponent(baddress)+"&bcontact="+encodeURIComponent(bcontact)+"&lat="+lt+"&lng="+lg+"&pk="+t+"&recipientAddr="+recipientAddr;
		qry=qry+"&typeos="+typeos+"&status="+statuscolor+"&comments="+encodeURIComponent(comments)+"&docs="+encodeURIComponent(docs);
		qry=qry+"&indate="+indate+"&iname="+encodeURIComponent(iname)+"&iphone="+encodeURIComponent(iphone)+"&iemail="+encodeURIComponent(iemail)+"&icompany="+encodeURIComponent(icompany)+"&nicet="+nicet;
		$.getJSON("http://webapp1.ci.bremerton.wa.us/fire/mobile2/email.php"+qry,function(result1){$("#jsonresult").html('<center><h1>'+result1+'</h1></center>');});
		$.getJSON("http://webapp1.ci.bremerton.wa.us/fire/mobile2/inspectioninput.php"+qry,function(result2){$("#jsonresult2").html('<center><h2>'+result2+'</h2><img src="img/new.png" onclick="reset()" /></center>');});
		return null;
		}
function send2(theword){
		$.mobile.changePage( $("#jsonresults"), { transition: "flip"} );
		var bname=$("#bname").val();
		var bphone=$("#bphone").val();
		var baddress=$("#baddress").val();
		var bcontact=$("#bcontact").val();
		var iname=$("#iname").val();
		var iphone=$("#iphone").val();
		var iemail=$("#iemail").val();
		var icompany=$("#icompany").val();
		var comments=$("#reportta").val();
		var indate=$("#reportdate").val();
		statuscolor=theword;
		var nicet="";
		//tos,docs,statuscolor,lt,lg
		var qry="?bname="+encodeURIComponent(bname)+"&bphone="+encodeURIComponent(bphone)+"&baddress="+encodeURIComponent(baddress)+"&bcontact="+encodeURIComponent(bcontact)+"&lat="+lt+"&lng="+lg+"&pk="+t+"&recipientAddr="+recipientAddr;
		qry=qry+"&typeos="+typeos+"&status="+statuscolor+"&comments="+encodeURIComponent(comments)+"&docs="+encodeURIComponent(uploadnames);
		qry=qry+"&indate="+indate+"&iname="+encodeURIComponent(iname)+"&iphone="+encodeURIComponent(iphone)+"&iemail="+encodeURIComponent(iemail)+"&icompany="+encodeURIComponent(icompany)+"&nicet="+nicet;
		$.getJSON("http://webapp1.ci.bremerton.wa.us/fire/mobile2/email.php"+qry,function(result1){$("#jsonresult").html('<center><h1>'+result1+'</h1></center>');});
		$.getJSON("http://webapp1.ci.bremerton.wa.us/fire/mobile2/inspectioninput.php"+qry,function(result2){$("#jsonresult2").html('<center><h2>'+result2+'</h2><img src="img/new.png" onclick="reset()" /></center>');});
		}