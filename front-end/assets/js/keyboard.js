const elements = document.getElementsByClassName("Key-module_key__kchQI");
let buttons = { };
for(let i=0;i<=31;i++){
    buttons[elements.item(i).getAttribute('data-key')] = elements.item(i);
}

const keys = {
    "a": "\u0430",
    "b": "\u0431",
    "v": "\u0432",
    "g": "\u0433",
    "d": "\u0434",
    "e": "\u0435",
    "zh": "\u0436",
    "z": "\u0437",
    "i": "\u0438",
    "j": "\u0439",
    "k": "\u043A",
    "l": "\u043B",
    "m": "\u043C",
    "n": "\u043D",
    "o": "\u043E",
    "p": "\u043F",
    "r": "\u0440",
    "s": "\u0441",
    "t": "\u0442",
    "u": "\u0443",
    "f": "\u0444",
    "h": "\u0445",
    "c": "\u0446",
    "ch": "\u0447",
    "sh": "\u0448",
    "sht": "\u0449",
    "y": "\u044A",
    "x": "\u044C",
    "ju": "\u044E",
    "q": "\u044F",
    "enter": "↲",
    "backspace": "⌫"
};

function printLetter(element){
    const row = getCurrentRow();
    const tiles = row.getElementsByClassName('Tile-module_tile');
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
    const word = "";
    for(let i = 4; i >= 0; i--){
        if(tiles.item(i).innerHTML){
            document.getElementById("error_label").innerHTML = "Непълна дума!";
            break;
        }
        word += tiles.item(i).getAttribute("data-key").toUpperCase();
    }
    if(words.includes(word)){
        checkEnteredLetters(Array.from(tiles));
        row.getAttribute("data-state") = "entered";
    }
}

function clickBackspaceKey(element){

}

function checkEnteredLetters(letters){

}