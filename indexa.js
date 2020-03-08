randNum = Math.floor(Math.random()*90000) + 10000; // rand for uid of invent
var isSendClicked = false;
//this is only for the uploading pic
var uploader = document.getElementById('uploader');
var fileButton = document.getElementById('fileButton');
const file = document.querySelector('#fileButton');
window.picture;
var downloadUr; 
fileButton.addEventListener('change',function(e){
	var file = e.target.files[0];
	var storageRef = firebase.storage().ref('inventpics/' + randNum);
	var task = storageRef.put(file);
	task.on('state_changed',
			function progress(snapshot){
		var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
		uploader.value = percentage;
		
	},
			function error(err){
		
		
	},
			
			function complete(){
		task.snapshot.ref.getDownloadURL().then(function(downloadURL) {
			window.picture = downloadURL;
			downloadUr = downloadURL;
	}
		
	);
} ) ; 
} );
// ening uploading pic
function send(){
	//GET DATE
	var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = dd + '/' + mm + '/' + yyyy;
	/////////////////////////////////////////////////// start of person
	var counter = 0;
	var first1 = document.getElementById("first1").value;
	var schoolName = document.getElementById("schoolName").value;
	var Class = document.getElementById("Class").value;
	var teacherName = document.getElementById("teacherName").value;
	var address = document.getElementById("address").value;
	var phone = document.getElementById("phone").value;
	var last1 = document.getElementById("last1").value;
	var first2 = document.getElementById("first2").value;
	var last2 = document.getElementById("last2").value;
	var first3 = document.getElementById("first3").value;
	var last3 = document.getElementById("last3").value;
	var email = document.getElementById("email").value;
	/////////////////////////////////////////////////// end of person, start of invent
	var inventName = document.getElementById("inventName").value;
	var littleDesc = document.getElementById("littleDesc").value;
	var wideDesc = document.getElementById("wideDesc").value;
	var idea = document.getElementById("idea").value;
	var sources = document.getElementById("sources").value;
	var listMaterials = document.getElementById("listMaterials").value;
	/////////////////////////////////////////////////// end of invent
	var firebaseRef = firebase.database().ref('students').child(randNum);
	var names = [first1, last1, first2 , last2 , first3 , last3 ];
	if(isSendClicked === false & check_email(email) & check_phone(phone) & check_write(first1,'first1s') & check_write(inventName,'invents') & check_write(littleDesc,'inventds') & check_write(wideDesc,'wideds') & check_write(schoolName,'schools') & check_write(Class,'classs')  ){
		isSendClicked = true;
		document.getElementById("bad_phone").style.visibility = "hidden";
	    document.getElementById("bad_email").style.visibility = "hidden";
		document.getElementById("sikum").style.visibility = "visible";
		document.getElementById("sendButton").innerHTML = '!נרשמת בהצלחה';
		document.getElementById("sendButton").style.background='#d6d6d6';
	for (var i=0; i<names.length;i++){
		if (names[i] != "" && counter == 0 || counter == 1){
			firebaseRef.child("ג_שם1").set(first1);
			firebaseRef.child("ד_משפחה1").set(last1);
			counter++;
		}
		else if (names[i] != "" && counter == 2 || counter == 3){
			firebaseRef.child("ה_שם2").set(first2);
			firebaseRef.child("ו_משפחה2").set(last2);
			counter++;
		}
         else if (names[i] != "" && counter == 4 || counter == 5){
			firebaseRef.child("ז_שם3").set(first3);
			firebaseRef.child("ח_משפחה3").set(last3);
			counter++;
		}
}
    firebaseRef.child("0_תאריך רישום").set(today);
	firebaseRef.child("א_מספר המצאה").set(randNum);
	firebaseRef.child("ט_אימייל").set(email);
	firebaseRef.child("י_טלפון").set(phone);
	firebaseRef.child("ע_כתובת").set(address);
	firebaseRef.child("מ_בית ספר").set(schoolName);
	firebaseRef.child("נ_כיתה").set(Class);
	firebaseRef.child("ס_שם המורה").set(teacherName);
	///////////////////////////////////////// end of person, start of invent
	firebaseRef.child("ב_שם ההמצאה").set(inventName);
	firebaseRef.child("כ_תיאור בקצרה").set(littleDesc);
	firebaseRef.child("ל_תיאור בהרחבה").set(wideDesc);
	firebaseRef.child("פ_מהיכן הרעיון").set(idea);
	firebaseRef.child("צ_מקורות").set(sources);
	firebaseRef.child("ק_רשימת חומרים").set(listMaterials);
	firebaseRef.child("ש_אישור הגשה").set("0");
	localStorage.setItem("randNum",randNum);
	sendEmail(email);
	firebaseRef.child("ר_תמונה").set(downloadUr);
		    window.setTimeout(function(){

        // Move to a new location or you can do something else
        window.location.href = 'print.html';

    }, 5000);

}
		if(!check_email(email)){
		
			document.getElementById("bad_email").style.visibility = "visible";
	}
	if(!check_phone(phone)){
		
		document.getElementById("bad_phone").style.visibility = "visible";
}
}
function check_email(val){
    if(!val.match(/\S+@\S+\.\S+/)){
        // Do something
        return false;
    }
    if( val.indexOf(' ')!=-1 || val.indexOf('..')!=-1){
        // Do something
        return false;
    }
	document.getElementById("bad_email").style.visibility = "hidden";
    return true;
}
function check_phone(val){
    if (/^\d{10}$/.test(val)) {
		document.getElementById("bad_phone").style.visibility = "hidden";
  return true
  } else {
  return false
}
}
function check_write (val,flag){
	if (val == ""){
		if(flag == 'first1s'){
			document.getElementById("first1s").innerHTML = '*חובה להזין לפחות שם אחד';
			
		}
		else if (flag == 'invents'){
				 document.getElementById("invents").innerHTML = '*חובה להזין שם להמצאה';
			
				 }
		else if (flag == 'inventds'){
				 document.getElementById("inventds").innerHTML = '*חובה להזין תיאור קצר להמצאה';
			
				 }
		else if (flag == 'wideds'){
				 document.getElementById("wideds").innerHTML = '*חובה להזין תיאור מורחב להמצאה';
			
				 }
		else if (flag == 'schools'){
				 document.getElementById("schools").innerHTML = '*חובה להזין שם בית ספר';
			
				 }
		else if (flag == 'classs'){
				 document.getElementById("classs").innerHTML = '*חובה להזין כיתה';
			
				 }
		return false
	}
		else {
			document.getElementById(flag).style.visibility = "hidden";
			return true
		}
	}
function sendEmail(email) {
	Email.send({
    SecureToken : "c961b58d-209b-4864-a9f4-3c1c9e970d95",
    To : email,
    From : "technodainvertor@gmail.com",
    Subject : "רישום המצאה מספר " +randNum+ " לתחרות הממציא הצעיר 2020",
    Body : "היי, אנחנו שמחים לעדכן שתהליך ההרשמה הצליח! מספר ההמצאה הוא: "+randNum+'<br/>'+"יש לשמור מספר זה ולצרף אותו בהגשת ההמצאה, בהצלחה!" +'<br/>'
		+ " " + '<br/>' + " " + '<br/>' +  "בואו להתעדכן בדף הפייסבוק: www.facebook.com/Technoda" + '<br/>' + 'אתר האינטרנט של הטכנודע: www.technoda.org.il' 
		,
	 Attachments : [
  	{
  		name : "younginventor.png",
  		path:"https://firebasestorage.googleapis.com/v0/b/mamtzi-202c6.appspot.com/o/mamzi.png?alt=media&token=d5e36d0e-dbf9-4e59-9b92-5f9ceb2a667d"
  	}]
})
		}