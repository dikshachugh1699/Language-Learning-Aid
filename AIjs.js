const main = document.querySelector("main");
const textarea = document.getElementById("text");
const readBtn = document.getElementById("read");
const playbtn=document.getElementById("play");
const inputText=document.getElementById("word");
const message = new SpeechSynthesisUtterance();

const element=document.getElementById("loc");

var speed=document.getElementById("slider");
var speed2=document.getElementById("slider2");

function show(){
	document.getElementById("loc").innerHTML=document.getElementById("usertext").value;
}

//set text
function setTextMessage(text) {
  message.text = text;
  message.rate=(speed.value/100);

}

//speak text
function speakText() {
  speechSynthesis.speak(message);

}

playbtn.addEventListener("click", () => {

	setTextMessage(inputText.value);
	speakText();
});

//read text btn
readBtn.addEventListener("click", () => {
//setTextMessage(textarea.value);
//speakText();
var u = new SpeechSynthesisUtterance();
var str=element.innerHTML;
for(i=0;i<str.length;i++){
	if(str.charAt(i)===',' || str.charAt(i)===';' || str.charAt(i)=='.'){
		str[i]=" ";
	}
}
var words = str.split(" ");
//var val=element.innerHTML.split('');

var a = 0;
 u.text = str /*element.innerHTML*/ ;
 u.lang = 'en-UK';
 u.rate = (speed2.value/100);
 u.onboundary= function(event) {

 console.log(words);
 var re=new RegExp(words[a],'g');
 if(a<words.length){
 //element.innerHTML = element.innerHTML.replace(re, '<strong>' + words[a] + '</strong>');
 element.innerHTML=words.slice(0,a).join(' ') + ' ' + '<strong>' + words[a] + '</strong>' + ' ' + words.slice(a+1,words.length).join(' ');
 }
  a+=1;       
  }
 speechSynthesis.speak(u);  
  
});

function runSpeechRecognition(){
	var output=document.getElementById("output");
	var action=document.getElementById("action");
	var SpeechRecognition=SpeechRecognition || webkitSpeechRecognition;
	var recognition=new SpeechRecognition();

	recognition.onstart=function(){
		action.innerHTML="<small> Listening, please speak</small>";
	}
	recognition.onspeechend=function(){
		action.innerHTML="<small> Stopped Listening </small>";
		recognition.stop();
	}

	recognition.onresult=function(event){
		var transcript=event.results[0][0].transcript;
		var confidence=event.results[0][0].confidence;
		// output.innerHTML="<b>Text: </b>" + transcript + "<br/> <b> Confidence: </b>" + confidence*100 + "%";
		output.innerHTML="<b>Text: </b>" + transcript;
		output.classList.remove("hide");
	}
	recognition.start();
}
function changeFont(){
	var fon=document.getElementById("readout");
	if(fon.className=="nonDysFont"){
		fon.className="dysFont";
	}
	else{
		fon.className="nonDysFont";
	}
}

function changeFontSpeech(){
	var fon=document.getElementById("output");
	if(fon.className=="nonDysFont"){
		fon.className="dysFont";
	}
	else{
		fon.className="nonDysFont";
	}
}

