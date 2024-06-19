//const words = require('../../back-end/modules/words')

function printLetter(element){
    const tiles = getCurrentRow().getElementsByClassName('Tile-module_tile');
    let tile;
    for(let i = 4; i >= 0; i--){
        if(tiles.item(i).innerHTML){
            continue;
        }
        tile = tiles.item(i);
    }
    tile.innerHTML = element.getAttribute('data-key');
}

function getCurrentRow(){
    const rows = document.getElementsByClassName("Row-module_row");
    let row;
    for(let i = 5; i >= 0; i--){
        if(rows.item(i).getAttribute('data-state') == 'entered'){
            continue;
        }
        row = rows.item(i);
    }
    return row;
}

function clickEnterKey(){
    const row = getCurrentRow();
    const tiles = row.getElementsByClassName('Tile-module_tile');
    let word = "";
    for(let i = 4; i >= 0; i--){
        if(!tiles.item(i).innerHTML){
            toggleErrorLabel("Непълна дума!");
            return;
        }else{
            word += tiles.item(i).innerHTML.toUpperCase();
        }
    }
    word = word.split("").reverse().join("");
    if(words.includes(word)){
        checkLetters(row);
        row.dataset.state = "entered";
        //TODO: Save row in the database
        if(user.loggedIn){
            saveRow(row.id, row);
        }
    }else{
        toggleErrorLabel("Невалидна дума!");
    }
}

function toggleErrorLabel(error){
    document.getElementById("error_label").innerHTML = error;
    document.getElementById("error_label").dataset.state = "show";
    setTimeout(() => {
        document.getElementById("error_label").dataset.state = "hide";
    }, 3000);
}

function clickBackspaceKey(element){
    const tiles = getCurrentRow().getElementsByClassName('Tile-module_tile');
    for(let i = 0; i < 5; i++){
        if(tiles.item(i).innerHTML){
            if(i == 4){
                tiles.item(i).innerHTML = "";
                break;
            }else{
                continue;
            }
        }
        tiles.item(i-1).innerHTML = "";
        break;
    }
}