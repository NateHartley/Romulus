document.getElementById("btn1").addEventListener("click", gen_pwd_secure);
document.getElementById("btn2").addEventListener("click", copy_text);
document.getElementById("chkbx1").addEventListener("click", checkbox_upper_only);
document.getElementById("chkbx2").addEventListener("click", checkbox_lower_only);

var rand = undefined;
var compare_rand = undefined;
var group = undefined;
var upper_only = false;
var lower_only = false;
const checkBoxes = document.querySelectorAll('input[type="checkbox"]');


/*  
    ==============================================
    gen_pwd_secure(), gen_rand_secure()
    Higher level generation of a cryptographically
    strong random password.
    ==============================================
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
    rand = int8[0]; // Return first val of int8 array which is the random val
    var repeat = false;

    // Uppercase
    if ((rand > 64 && rand < 91) && (lower_only == false)) {
        group = 1;

    // Lowercase
    } else if ((rand > 96 && rand < 123) && (upper_only == false)) {
        group = 2;

    // Number
    } else if (rand > 47 && rand < 58) {
        group = 3;

    // Symbol
    } else if (
        (rand > 32 && rand < 48) || 
        ((rand > 57 && rand < 65) && 
        (rand != 60 && rand != 62)) || 
        (rand > 90 && rand < 97) || 
        (rand > 122 && rand < 127)) {
        group = 4;

    // Out of bounds
    } else if ((rand < 33 || rand > 126) || 
        (rand == 60 || rand == 62)) {
        repeat = true;
    }

    // Stops back to back same type of characters
    if (compare_rand == group && compare_rand != undefined){
        repeat = true;
    }

    // Unfixable loop occurs when calling more than one instance of gen_rand_sec() within itself
    // Having only one instance of a callback seems to fix it
    if (repeat) {
        gen_rand_secure();
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
    if (lower_only) {
        lower_only = false;
    }
    console.log("Upper status", upper_only);
}

function checkbox_lower_only() {
    var checkbox = document.getElementById("chkbx2");
    checkbox.checked ? lower_only = true : lower_only = false;
    if (upper_only) {
        upper_only = false;
    }
    console.log("Lower status", lower_only);
}

function handleCheckboxClick(event) {
  checkBoxes.forEach((checkBox) => {
    var upper_only_chkbx = checkBoxes[0];
    var lower_only_chkbx = checkBoxes[1];

    if (event.target == upper_only_chkbx) {
        lower_only_chkbx.checked = false;
    } else if (event.target == lower_only_chkbx) {
        upper_only_chkbx.checked = false;
    }
    
  });
}

checkBoxes.forEach((checkBox) => {
  checkBox.addEventListener('click', handleCheckboxClick);
});
