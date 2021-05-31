const signupForm = document.querySelector('#signup-form');
signupForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  // get user info
  const email = signupForm['signup-email'].value;
  const password = signupForm['signup-password'].value;

  // sign up the user & add firestore data
  auth.createUserWithEmailAndPassword(email, password).then(() => {
    // close the signup modal & reset form
    signupForm.reset();
    auth.currentUser.sendEmailVerification().then(() => {
      db.collection('users').doc(auth.currentUser.uid).set({signupComplete: false}).then(()=>{
        auth.signOut().then(()=>{
          window.location.href="./login.html";
        })
      })
    });
   
    
    signupForm.querySelector('.error').innerHTML = 'Signup Email Sent'
  }).catch(err => {
    signupForm.querySelector('.error').innerHTML = err.message;
  });
});

auth.onAuthStateChanged(user => {
  if (user) {
    user.getIdTokenResult().then(idTokenResult => {

    });
    db.collection('guides').onSnapshot(snapshot => {

    }, err => console.log(err.message));
  } else {

  }
});

