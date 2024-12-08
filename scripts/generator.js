document.getElementById("btn1").addEventListener("click", gen_pwd_secure);
document.getElementById("btn2").addEventListener("click", copy_text);

var alphabet_lc = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
var alphabet_uc = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
var numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
var symbols = ["~", "`", "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "-", "_", "+", "=", "{", "}", "[", "]", "|", ";", ":", ",", ".", "/", "?"];
var char_list = [];
var rand = undefined;
var rand_sec = undefined;
var compare_rand = undefined;
var compare_rand_sec = undefined;
var group = undefined;
var i = 0;
var j = 0;

/*
gen_pwd(), gen_rand()
Standard generation of a 'random' password.
*/

function gen_pwd(){
    var password = undefined;
    var pwd_array = [];

    while (true) {

        if (pwd_array.length == 16) {
            break;
        }

        var rand = gen_rand();

        switch(rand) {
            case 0:
                var ran1 = Math.floor(Math.random() * alphabet_lc.length);
                pwd_array.push(alphabet_lc[ran1]);
                break;

            case 1:
                var ran2 = Math.floor(Math.random() * alphabet_uc.length);
                pwd_array.push(alphabet_uc[ran2]);
                break;

            case 2:
                var ran3 = Math.floor(Math.random() * numbers.length);
                pwd_array.push(numbers[ran3]);
                break;

            case 3:
                var ran4 = Math.floor(Math.random() * symbols.length);
                pwd_array.push(symbols[ran4]);
                break;
        }        
    }
    
    password = pwd_array.join('');
    document.getElementById("pwd").innerHTML = password;
    console.log("Debug: Password >>", password, "<<   Length:", password.length);
}

function gen_rand() {
    rand = Math.floor(Math.random() * 4); // Range 0-3

    // Stops back to back uppercase letters etc.
    if (rand == compare_rand && compare_rand != undefined) {
        gen_rand();
    }
    
    compare_rand = rand;
    return rand;
}


/*
gen_pwd_secure(), gen_rand_secure()
Higher level generation of a cryptographically strong random password.
*/

function gen_pwd_secure() {
    var password = undefined;
    var pwd_array = [];

    while (true) {
        if (pwd_array.length == 16) {
            break;
        }

        var char = gen_rand_secure();
        var text = String.fromCharCode(char); // Ascii code to text
        pwd_array.push(text);
    }

    password = pwd_array.join('');
    document.getElementById("pwd").innerHTML = password;
    console.log("Debug: Password >>", password, "<<   Length:", password.length);
}

function gen_rand_secure() {
    var int8 = new Int8Array(1);
    crypto.getRandomValues(int8);
    rand_sec = int8[0]; // Return first val of int8 array which is the random val
    var repeat = false;

    // Uppercase
    if (rand_sec > 64 && rand_sec < 91) {
        group = 1;

    // Lowercase
    } else if (rand_sec > 96 && rand_sec < 123) {
        group = 2;

    // Number
    } else if (rand_sec > 47 && rand_sec < 58) {
        group = 3;

    // Symbol
    } else if (
        (rand_sec > 32 && rand_sec < 48) || 
        ((rand_sec > 57 && rand_sec < 65) && 
        (rand_sec != 60 && rand_sec != 62)) || 
        (rand_sec > 90 && rand_sec < 97) || 
        (rand_sec > 122 && rand_sec < 127)) {
        group = 4;

    // Out of bounds
    } else if ((rand_sec < 33 || rand_sec > 126) || 
        (rand_sec == 60 || rand_sec == 62)) {
        repeat = true;
    }

    // Stops back to back same type of characters
    if (compare_rand_sec == group && compare_rand_sec != undefined){
        repeat = true;
    }

    // Unfixable loop occurs when calling more than one instance of gen_rand_sec() within itself
    // Having only one instance of a callback seems to fix it
    if (repeat) {
        gen_rand_secure();
    }

    compare_rand_sec = group;

    return rand_sec;
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