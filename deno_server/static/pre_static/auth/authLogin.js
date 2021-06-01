
const logout = document.querySelector('#logout');
logout.addEventListener('click', (e) => {
  e.preventDefault();
  auth.signOut();
});

// login
const loginForm = document.querySelector('#login-form');
loginForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  // get user info
  const email = loginForm['login-email'].value;
  const password = loginForm['login-password'].value;

  // log the user in
  auth.signInWithEmailAndPassword(email, password).then((cred) => {
    cred.auth
    // close the signup modal & reset form
    const modal = document.querySelector('#modal-login');
    loginForm.reset();
    
    if (!auth.currentUser.emailVerified) {
      loginForm.querySelector('.error').innerHTML = 'Please verify your account by clicking the link sent by us to your email.';
    } else {
      db.collection('users').doc(auth.currentUser.uid).get().then((d)=>{
        if ( d.data().signupComplete) {
          window.location.href="./dashboard";
        } else {
          window.location.href = "./accSetup.html";
        }
      });
      
    }
  }).catch(err => {
    loginForm.querySelector('.error').innerHTML = err.message;
  });

});
