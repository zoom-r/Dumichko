
function checkLetters(row){
    const letters = row.getElementsByClassName('Tile-module_tile');
    let word = "";
    for(let i = 4; i >= 0; i--){
        if(!letters.item(i).innerHTML){
            toggleErrorLabel("Непълна дума!");
            break;
        }else{
            word += letters.item(i).innerHTML.toUpperCase();
        }
    }

    word = word.split("").reverse().join("");

    if(wordOfTheDay == word){
        checkEnteredLetters(letters);
        row.dataset.state = "entered";
        // if(loggedIn){
        //     saveRow(row.id, row);
        // }
        toggleErrorLabel("Поздравления! Познахте думата!");
        disableKeyboard('keyboard-module');
    }else{
        checkEnteredLetters(letters);
    }
}

function disableKeyboard(id) {
    var div = document.getElementById(id);
    div.style.pointerEvents = 'none';
    //div.style.opacity = '0.4';
}
  

function checkEnteredLetters(letters){
    for(let i = 0; i < 5; i++){
        if(letters.item(i).innerHTML.toUpperCase() != wordOfTheDay[i]){
            if(wordOfTheDay.includes(letters.item(i).innerHTML.toUpperCase())){
                letters.item(i).dataset.state = "present";
            }else{
                letters.item(i).dataset.state = "absent";
            }
        }else{
            letters.item(i).dataset.state = "correct";
        }
    }
}