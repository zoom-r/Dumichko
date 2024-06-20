
// Step 2: Fetch Data on Page Load
window.onload = function() { 
    fetch('../js/user.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Step 3: Store Data in Local Storage
            if(getUser().loggedIn == false || getUser() == null){
                localStorage.setItem('user', JSON.stringify(data));
            }
        })
        .catch(error => console.error('Error loading JSON:', error));
};

// Step 4: Retrieve Data When Needed
function getUser() {
    const data = localStorage.getItem('user');
    if (data) {
        return JSON.parse(data);
    }
    return null; // or a default value
}


// Function to update user data in local storage
function updateUser(updatedProperties) {
    // Step 1: Retrieve the data
    let userData = localStorage.getItem('user');
    
    // Step 2: Parse the data
    if (userData) {
        userData = JSON.parse(userData);
    } else {
        // If there's no existing data, initialize an empty object
        userData = {};
    }
    
    // Step 3: Update the object
    Object.assign(userData, updatedProperties);
    
    // Step 4: Stringify and store
    localStorage.setItem('user', JSON.stringify(userData));
}
