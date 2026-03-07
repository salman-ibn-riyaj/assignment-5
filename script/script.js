document.getElementById('sign-in-btn').addEventListener('click', () => {

    const usernameInput = document.getElementById('username-input');
    console.log(usernameInput);

    const usernameInputValue = usernameInput.value;
    console.log(usernameInputValue); 

    const passwordInput = document.getElementById('password-input');
    console.log(passwordInput);

    const passwordInputValue = passwordInput.value;
    console.log(passwordInputValue);

    if(usernameInputValue === 'admin' && passwordInputValue === 'admin123'){
        alert("sign in success");

        window.location.assign('/home.html');

    }else{
        console.log('sign in failed');
        return;
    }
    
})