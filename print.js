var inventNum = localStorage.getItem("randNum");
document.getElementById("num").innerHTML = inventNum;
var names = [];
var jnames = [];
///getting data to arr//
var x = document.getElementById("myTable").rows[0].cells;
  x[0].innerHTML = inventNum;
		fireScreen = firebase.database().ref().child('students').child(inventNum);
	fireScreen.once('value', function(snapshot) {
	     fireScreen.on('value',function(datasnapshot){
			 var x = document.getElementById("myTable").rows[1].cells;
		x[0].innerHTML = snapshot.child('ב_שם ההמצאה').val();
	    //////////////strings for name
	    names[0] = snapshot.child('ג_שם1').val();
	    names[1] = snapshot.child('ד_משפחה1').val();	
		names[2] = snapshot.child('ה_שם2').val();
		names[3] = snapshot.child('ו_משפחה2').val();
	    names[4] = snapshot.child('ז_שם3').val();
		names[5] = snapshot.child('ח_משפחה3').val();
		jnames[0] = names.slice(0, 2).join(" ");
		jnames[1] = names.slice(2, 4).join(" ");
		jnames[2] = names.slice(4, 6).join(" ");
		var rdynames = jnames.join(", ");
		var x = document.getElementById("myTable").rows[2].cells;
		x[0].innerHTML = rdynames;
	    //////////////strings for name
		var x = document.getElementById("myTable").rows[3].cells;
		x[0].innerHTML = snapshot.child('ט_אימייל').val();
		var x = document.getElementById("myTable").rows[4].cells;
		x[0].innerHTML = snapshot.child('י_טלפון').val();
		var x = document.getElementById("myTable").rows[5].cells;
		x[0].innerHTML = snapshot.child('ע_כתובת').val();	 
		var x = document.getElementById("myTable").rows[6].cells;
		x[0].innerHTML = snapshot.child('מ_בית ספר').val();
		var x = document.getElementById("myTable").rows[7].cells;
		x[0].innerHTML = snapshot.child('נ_כיתה').val();
		var x = document.getElementById("myTable").rows[8].cells;
		x[0].innerHTML = snapshot.child('ס_שם המורה').val();
		var x = document.getElementById("myTable").rows[9].cells;
		x[0].innerHTML = snapshot.child('כ_תיאור בקצרה').val();
		var x = document.getElementById("myTable").rows[10].cells;
		x[0].innerHTML = snapshot.child('ל_תיאור בהרחבה').val();
		var picture = snapshot.child('ר_תמונה').val();
		document.getElementById("myImg").src = picture;
	})
  
})
  
function printp(){	
window.print();
}
		