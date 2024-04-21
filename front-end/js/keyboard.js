// const elements = document.getElementsByClassName("Key-module_key__kchQI");
// let buttons = { };
// for(let i=0;i<=31;i++){
//     buttons[elements.item(i).getAttribute('data-key')] = elements.item(i);
// }

// const keys = {
//     "a": "\u0430",
//     "b": "\u0431",
//     "v": "\u0432",
//     "g": "\u0433",
//     "d": "\u0434",
//     "e": "\u0435",
//     "zh": "\u0436",
//     "z": "\u0437",
//     "i": "\u0438",
//     "j": "\u0439",
//     "k": "\u043A",
//     "l": "\u043B",
//     "m": "\u043C",
//     "n": "\u043D",
//     "o": "\u043E",
//     "p": "\u043F",
//     "r": "\u0440",
//     "s": "\u0441",
//     "t": "\u0442",
//     "u": "\u0443",
//     "f": "\u0444",
//     "h": "\u0445",
//     "c": "\u0446",
//     "ch": "\u0447",
//     "sh": "\u0448",
//     "sht": "\u0449",
//     "y": "\u044A",
//     "x": "\u044C",
//     "ju": "\u044E",
//     "q": "\u044F",
//     "enter": "↲",
//     "backspace": "⌫"
// };

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

function clickEnterKey(element){
    const row = getCurrentRow();
    const tiles = row.getElementsByClassName('Tile-module_tile');
    let word = "";
    for(let i = 4; i >= 0; i--){
        if(!tiles.item(i).innerHTML){
            toggleErrorLabel("Непълна дума!");
            break;
        }else{
            word += tiles.item(i).innerHTML.toUpperCase();
        }
    }
    word = word.split("").reverse().join("");
    if(words.includes(word)){
        checkEnteredLetters(tiles);
        row.getAttribute("data-state") = "entered";
        //TODO: Save row in the database
        if(loggedIn){
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