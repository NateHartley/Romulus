document.getElementById("btn1").addEventListener("click", gen_pwd);
document.getElementById("btn2").addEventListener("click", copyText);

var alphabet_lc = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
var alphabet_uc = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
var numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
var symbols = ["~", "`", "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "-", "_", "+", "=", "{", "}", "[", "]", "|", ";", ":", ",", ".", "/", "?"];
var char_list = [];
var rand = undefined;
var compare_rand = undefined;
var i = 0;
var j = 0;

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
    
    // FIXME: Password is sometimes more that 16 characters (?)
    password = pwd_array.join('');
    document.getElementById("pwd").innerHTML = password;
    console.log("Password >>>>", password, "<<<<");
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

function copyText() {
    var copyText = document.getElementById("pwd").innerHTML;
    navigator.clipboard.writeText(copyText);
}