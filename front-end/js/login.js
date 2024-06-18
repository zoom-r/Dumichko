async function checkEmail (form) {
    if(form.value == '') {
        form.dataset.state = '';
        return;
    }

    axios.post('/login/check-email', {
        email: form.value, 
        type: form.id
    }).then(function(response){
        if(response.data == false)
            form.dataset.state = 'invalid';
        else
            form.dataset.state = 'valid';
    }).catch(function(error){
        console.log(error);
    });
}

async function checkPassword (form){
    if(form.id == 'signupPassword'){
        if(form.value.length < 8 || form.value.length > 40 || /\d/.test(form.value) == false){
            form.dataset.state = 'invalid';
            document.getElementById('signupInfoPassword').innerHTML = '⚠ Паролата трябва да бъде 8-40 символа и да съдържа поне една цифра!';
            document.getElementById('signupInfoPassword').style.color = 'red';
            document.getElementById('signupRepeatPassword').disabled = true;
            document.getElementById('signupRepeatPassword').value = '';
            document.getElementById('signupInfoRepeatPassword').innerHTML = '';
        }else{
            form.dataset.state = 'valid';
            document.getElementById('signupInfoPassword').innerHTML = '';
            document.getElementById('signupRepeatPassword').disabled = false;
        }
    }else if(form.id == 'signupRepeatPassword'){
        if(form.value !== document.getElementById('signupPassword').value){
            form.dataset.state = 'invalid';
            document.getElementById('signupInfoRepeatPassword').innerHTML = '⚠ Паролите не съвпадат!';
            document.getElementById('signupInfoRepeatPassword').style.color = 'red';
        }else{
            form.dataset.state = 'valid';
            document.getElementById('signupInfoRepeatPassword').innerHTML = '';
        }
    }
}