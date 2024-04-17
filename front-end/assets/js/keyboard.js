const elements = document.getElementsByClassName("Key-module_key__kchQI");
let buttons = { };
for(let i=0;i<=31;i++){
    if(i==22||i==31){
        continue;
    }
    buttons[elements.item(i).getAttribute('data-key')] = elements.item(i);
}

const alphabet = {
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
    "q": "\u044F"
};

function printBukva(element){
    console.log(element.getAttribute('data-key'));
}