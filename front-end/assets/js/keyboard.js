const elements = document.getElementsByClassName("Key-module_key__kchQI");
let buttons = { };

for(let i = 0; i < elements.length; i++) {
    // switch(elements.item(i).getAttribute("data-key")) {
    //     case "а":
    //         buttons["а"] = "a";
    // }

}

console.log(elements);

for (let i = 1072; i <= 1103; i++) {
    if (i - 1072 == 22 || i - 1072 == 31) {
        continue;
    }
    let a;
    if (i == 1099 || i == 1101) {
        a = i + 1;
    } else {
        a = i;
    }
    buttons[String.fromCharCode(a)] = elements.item(i - 1072).getAttribute("data-key");
}

console.log(buttons);