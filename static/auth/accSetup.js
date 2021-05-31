function setup() {
    // Get the checkbox
    var checkBox = document.getElementById("role2");
    // Get the output text
    var text = document.getElementById("docForm");
  
    // If the checkbox is checked, display the output text
    if (checkBox.checked == true){
      text.style.display = "block";
    } else {
      text.style.display = "none";
    }
  }

document.getElementById("submit").addEventListener("click", function(e) {
    e.preventDefault();
    console.log("button clicked");
    if (signupForm['optradio'].value === "Doctor") {
      db.collection('users').doc(auth.currentUser.uid).set({
        signupComplete: true,
        firstName: signupForm['firstName'].value,
        lastName: signupForm['lastName'].value,
        role: signupForm['optradio'].value,
        patients: "none",
        address: {
          Street: signupForm['Street'].value, Unit: signupForm['Unit'].value, 
          City:  signupForm['City'].value, State_Provice: signupForm['State_Province'].value,
          Country: signupForm['Country'].value, Zip: signupForm['Zip'].value,
        },
      }).then(() => {
        window.location.href="./dashboard";
      });
    } else if (signupForm['optradio'].value === "Patient") {
      db.collection('users').doc(auth.currentUser.uid).set({
        signupComplete: true,
        firstName: signupForm['firstName'].value,
        lastName: signupForm['lastName'].value,
        role: signupForm['optradio'].value,
      }).then(() => {
        window.location.href="./dashboard";
      });
    }
    
    
})