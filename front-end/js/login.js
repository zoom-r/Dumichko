async function checkEmail (form) {
    if(form.value == '') {
        form.dataset.state = '';
        return;
    }

    axios.post('/login/check-email', {
        email: form.value, 
        type: form.id
    }).then(function(response){
        if(response.data == false){
            form.dataset.state = 'invalid';
            if(form.id == 'loginEmail')
                document.getElementById('loginButton').disabled = true;
        }else{
            form.dataset.state = 'valid';
            if(form.id == 'loginEmail')
                document.getElementById('loginButton').disabled = false;
        }

    }).catch(function(error){
        console.log(error);
    });
}

async function checkPassword (form){
    if(form.id == 'signupPassword'){
        if(form.value.length < 8 || form.value.length > 40 || /\d/.test(form.value) == false){
            form.dataset.state = 'invalid';
            document.getElementById('signupInfoPassword').innerHTML = 'Паролата трябва да бъде 8-40 символа и да съдържа поне една цифра!';
            document.getElementById('signupInfoPassword').style.color = 'red';
            document.getElementById('signupRepeatPassword').disabled = true;
            document.getElementById('signupRepeatPassword').value = '';
            document.getElementById('signupInfoRepeatPassword').innerHTML = '';
            document.getElementById('signupButton').disabled = true;
        }else{
            form.dataset.state = 'valid';
            document.getElementById('signupInfoPassword').innerHTML = '';
            document.getElementById('signupRepeatPassword').disabled = false;
        }
    }else if(form.id == 'signupRepeatPassword'){
        if(form.value !== document.getElementById('signupPassword').value){
            form.dataset.state = 'invalid';
            document.getElementById('signupInfoRepeatPassword').innerHTML = 'Паролите не съвпадат!';
            document.getElementById('signupInfoRepeatPassword').style.color = 'red';
            document.getElementById('signupButton').disabled = true;
        }else{
            form.dataset.state = 'valid';
            document.getElementById('signupInfoRepeatPassword').innerHTML = '';
            document.getElementById('signupButton').disabled = false;
        }
    }
}

//⚠ 

async function SignUp(){
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    const repeatPassword = document.getElementById('signupRepeatPassword').value;
    document.getElementById('signupInfoButton').style.color = 'red';

    if(email == '' || password == '' || repeatPassword == ''){
        document.getElementById('signupInfoButton').innerHTML = 'Моля попълнете всички полета!';
        return;
    }
    if(document.getElementById('signupEmail').dataset.state == 'invalid' || document.getElementById('signupPassword').dataset.state == 'invalid' || document.getElementById('signupRepeatPassword').dataset.state == 'invalid'){
        document.getElementById('signupInfoButton').innerHTML = 'Моля попълнете всички полета правилно!';
        return;
    }
    if(document.getElementById('signupEmail').dataset.state == '' || document.getElementById('signupPassword').dataset.state == '' || document.getElementById('signupRepeatPassword').dataset.state == ''){
        document.getElementById('signupInfoButton').innerHTML = 'Моля попълнете всички полета!';
        return;
    }

    axios.post('/login/signup', {
        email: email,
        password: password
    }).then(function(response){
        if(response.data == true){
            alert('Успешна регистрация!');
            window.location.href = '/login';
        }else{
            alert('Неуспешна регистрация!');
        }
    }).catch(function(error){
        alert('Неуспешна регистрация!');
        console.log(error);
    });
}

async function LogIn(){
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    document.getElementById('loginInfoButton').style.color = 'red';

    if(email == '' || password == ''){
        document.getElementById('loginInfoButton').innerHTML = 'Моля попълнете всички полета!';
        return;
    }
    if(document.getElementById('loginEmail').dataset.state == 'invalid'){
        document.getElementById('loginInfoButton').innerHTML = 'Моля попълнете всички полета правилно!';
        return;
    }
    if(document.getElementById('loginEmail').dataset.state == ''){
        document.getElementById('loginInfoButton').innerHTML = 'Моля попълнете всички полета!';
        return;
    }

    axios.post('/login/login', {
        email: email,
        password: password
    }).then(function(response){
        if(response.data == true){
            alert('Успешно влизане!');
            //window.location.href = '/game';
        }else{
            document.getElementById('loginInfoButton').innerHTML = 'Грешна парола!';
        }
    }).catch(function(error){
        alert('Грешка!');
        console.log(error);
    });
}