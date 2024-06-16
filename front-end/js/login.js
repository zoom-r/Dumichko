document.getElementById('loginEmail').onchange = function() {
    axios.post('/login/check-email', {
        email: this.value
    })
}