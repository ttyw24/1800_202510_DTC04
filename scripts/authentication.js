// Listen for the submit event
document.getElementById('login-form').addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent default form submission

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Account creation successful
            console.log('Account created:', userCredential.user);

            // Redirect to main.html
            window.location.href = "main.html";
        })
        .catch((error) => {
            if (error.code === 'auth/email-already-in-use') {
                // If account already exists, try to log in
                firebase.auth().signInWithEmailAndPassword(email, password)
                    .then((userCredential) => {
                        console.log('Logged in:', userCredential.user);
                        window.location.href = "main.html";
                    })
                    .catch((loginError) => {
                        console.error('Login failed:', loginError.code, loginError.message);
                        alert('Login failed: ' + loginError.message);
                    });
            } else {
                // Other errors (like weak password)
                console.error('Account creation failed:', error.code, error.message);
                alert('Account creation failed: ' + error.message);
            }
        });
});
