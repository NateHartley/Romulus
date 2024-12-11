document.getElementById("btn1").addEventListener("click", gen_pwd);
document.getElementById("btn2").addEventListener("click", copy_text);
document.getElementById("chkbx1").addEventListener("click", checkbox_upper_only);
document.getElementById("chkbx2").addEventListener("click", checkbox_lower_only);
document.getElementById("chkbx3").addEventListener("click", checkbox_no_numbers);
document.getElementById("chkbx4").addEventListener("click", checkbox_no_symbols);
document.getElementById("chkbx5").addEventListener("click", checkbox_simplified_symbols);

var rand = undefined;
var compare_rand = undefined;
var group = undefined;
var upper_only = false;
var lower_only = false;
var no_numbers = false;
var no_symbols = false;
var simplified_symbols = false;
const checkBoxes = document.querySelectorAll('input[type="checkbox"]');


/*  
    ==============================================
    gen_pwd(), gen_rand()
    Higher level generation of a cryptographically
    strong random password.
    ==============================================
*/

function gen_pwd() {
    var password = undefined;
    var pwd_array = [];
    var simplified_symbols_list_ascii = ["!", "#", "%", "+", ":", "=", "?", "@"];

    while (true) {
        if (pwd_array.length == 16) {
            break;
        }

        var char = gen_rand();
        var text = String.fromCharCode(char); // Ascii code to text
        pwd_array.push(text);
    }

    // If simplified symbols mode is on, but password doesn't contain any symbols, replace last char of password with symbol
    if (simplified_symbols) {
        var count = 0;
        for (let j = 0; j < simplified_symbols_list_ascii.length; j++) {
            if (pwd_array.includes(simplified_symbols_list_ascii[j]) == false) {
                count++;
            }
        }
        
        if (count == simplified_symbols_list_ascii.length) {
            let index = Math.floor(Math.random() * simplified_symbols_list_ascii.length);
            pwd_array.pop();
            pwd_array.push(simplified_symbols_list_ascii[index]);
        }
    }

    password = pwd_array.join('');
    document.getElementById("pwd").innerHTML = password;
    console.log("Debug: Password >>", password, "<<   Length:", password.length);
}

function gen_rand() {
    var int8 = new Int8Array(1);
    crypto.getRandomValues(int8);
    rand = int8[0]; // Return first val of int8 array which is the random val
    var repeat = false;
    var simplified_symbols_list_dec = [33, 35, 37, 43, 58, 61, 63, 64]; // ! # % + : = ? @

    // Uppercase
    if ((rand > 64 && rand < 91) && (lower_only == false)) {
        group = 1;

    // Lowercase
    } else if ((rand > 96 && rand < 123) && (upper_only == false)) {
        group = 2;

    // Number
    } else if ((rand > 47 && rand < 58) && (no_numbers == false)) {
        group = 3;

    // Symbol
    } else if ((
        (rand > 32 && rand < 48) || 
        ((rand > 57 && rand < 65) && 
        (rand != 60 && rand != 62)) || 
        (rand > 90 && rand < 97) || 
        (rand > 122 && rand < 127)) && (no_symbols == false) && (simplified_symbols == false)) {
        group = 4;
    
    // Simplified symbol
    } else if ((simplified_symbols_list_dec.includes(rand)) && (simplified_symbols) && (no_symbols == false)) {
        group = 5;
    
    // Out of bounds
    } else if ((rand < 33 || rand > 126) || 
        (rand == 60 || rand == 62)) {
        repeat = true;
    } else {
        repeat = true;
    }

    // Stops back to back same type of characters
    // Unless upper/lower case, no numbers, and no symbols is selected together
    if (compare_rand == group && compare_rand != undefined){
        if (!(no_numbers == true && no_symbols == true && 
            (upper_only == true || lower_only == true))) {
            repeat = true;
        }
    }

    // Unfixable loop occurs when calling more than one instance of gen_rand_sec() within itself
    // Having only one instance of a callback seems to fix it
    if (repeat) {
        gen_rand();
    }

    compare_rand = group;

    return rand;
}

function copy_text() {
    var copy_text = document.getElementById("pwd").innerHTML;

    // If copy_text contains "&" symbol, remove the "amp;" code after it
    for (let i = 0; i < copy_text.length; i++) {
        if (copy_text[i] == "&") {
            let j = 0;
            while (j < 4){
                copy_text = copy_text.replace(copy_text[i+1], "");
                j++;
            }
        }
    }

    navigator.clipboard.writeText(copy_text);
}

function checkbox_upper_only() {
    var checkbox = document.getElementById("chkbx1");
    checkbox.checked ? upper_only = true : upper_only = false;
    if (lower_only) { lower_only = false; }
}

function checkbox_lower_only() {
    var checkbox = document.getElementById("chkbx2");
    checkbox.checked ? lower_only = true : lower_only = false;
    if (upper_only) { upper_only = false; }
}

function checkbox_no_numbers() {
    var checkbox = document.getElementById("chkbx3");
    checkbox.checked ? no_numbers = true: no_numbers = false;
}

function checkbox_no_symbols() {
    var checkbox = document.getElementById("chkbx4");
    checkbox.checked ? no_symbols = true: no_symbols = false;
    if (simplified_symbols) { simplified_symbols = false; }
}

function checkbox_simplified_symbols() {
    var checkbox = document.getElementById("chkbx5");
    checkbox.checked ? simplified_symbols = true: simplified_symbols = false;
    if (no_symbols) { no_symbols = false; }
}

function handleCheckboxClick(event) {
  checkBoxes.forEach((checkBox) => {
    var upper_only_chkbx = checkBoxes[0];
    var lower_only_chkbx = checkBoxes[1];
    var no_symbols_chkbx = checkBoxes[3];
    var simplified_symbols_chkbx = checkBoxes[4];

    if (event.target == upper_only_chkbx) {
        lower_only_chkbx.checked = false;
    } else if (event.target == lower_only_chkbx) {
        upper_only_chkbx.checked = false;
    }

    if (event.target == no_symbols_chkbx) {
        simplified_symbols_chkbx.checked = false;
    } else if (event.target == simplified_symbols_chkbx) {
        no_symbols_chkbx.checked = false;
    }
  });
}

checkBoxes.forEach((checkBox) => {
  checkBox.addEventListener('click', handleCheckboxClick);
});
