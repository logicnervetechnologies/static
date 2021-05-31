document.getElementById("logout").addEventListener("click", function(e) {
    e.preventDefault();
    auth.signOut().then(() => { window.location.href='./logout.html' });
})