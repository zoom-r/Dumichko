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

}