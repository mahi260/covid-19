var firebaseConfig = {
    apiKey: "AIzaSyDzeoS3hfmCPmIX25LNYzH9om2O919R8WU",
    authDomain: "covid-19-25810.firebaseapp.com",
    databaseURL: "https://covid-19-25810-default-rtdb.firebaseio.com",
    projectId: "covid-19-25810",
    storageBucket: "covid-19-25810.appspot.com",
    messagingSenderId: "46911996954",
    appId: "1:46911996954:web:6bf2640aded0566f137da3"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
var UserInputsRef=firebase.database().ref('UserInputs')
  document.getElementById('testform').addEventListener('submit',submitForm);
function submitForm(){
  var fname=getInputVal("firstname");
  var lname=getInputVal("lastname");
  var email=getInputVal("email");
  var profession=getInputVal("profession");
  var num=getInputVal("number");
  var dob=getInputVal("date");
  var option=document.querySelector("input[name=option]:checked").value;
  var symptoms=getSelectedCheckboxValues("checkbox");
  var state=getInputVal("state");
  state=state.toLowerCase();
  readInfo(state)
  if (emailstatus()){
    saveInfo(fname+" "+lname,email,profession,num,dob,option,symptoms,state)
  }

}
function getSelectedCheckboxValues(name){
  const checkboxes=document.querySelectorAll('input[name="${name}"]:checked');
  let values=[];
  checkboxes.forEach((checkbox) => {
    values.push(checkbox.value);
  });
  return values;
}
function readInfo(state){
  var centers;
    var ref = firebase.database().ref(state);
    ref.on('value', (data) => {
     centers = data.val();
     document.getElementById("result").innerHTML ="<br>"+centers.toUpperCase();
})
}
function saveInfo(fname,lname,email,state){
  var newuserInputsRef = UserInputsRef.push();
    newuserInputsRef.set({
        fname:fname,
        lname:lname,
        email:email,
        profession:profession,
        num:num,
        dob:dob,
        option:option,
        symptoms:symptoms,
        state:state, 
        
    })

}
function emailstatus()
  {
    if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(testForm.email.value))
     {
       return (true)
     }
       alert("You have entered an invalid email address!")
       return (false)
   }
function getInputVal(a){
  return document.getElementById(a).value

}