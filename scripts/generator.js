document.getElementById("btn1").addEventListener("click", gen_pwd);
var alphabet_lc = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
var alphabet_uc = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
var numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
var symbols = ["~", "`", "!", "@", "#", "$", "%", "^", "&", "*", "(", ")", "-", "_", "+", "=", "{", "}", "[", "]", "|", ";", ":", ",", ".", "/", "?"];
var char_list = [];
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
        
        // TODO: if it picks a case, next turn cant have that case
        switch(rand) {

            case 0:
                console.log("LowerCase");
                var ran1 = Math.floor(Math.random() * alphabet_lc.length);
                console.log(">rand* ", ran1);
                pwd_array.push(alphabet_lc[ran1]);
                break;

            case 1:
                console.log("UpperCase");
                var ran2 = Math.floor(Math.random() * alphabet_uc.length);
                console.log(">rand* ", ran2);
                pwd_array.push(alphabet_uc[ran2]);
                break;

            case 2:
                console.log("Numbers", rand);
                var ran3 = Math.floor(Math.random() * numbers.length);
                console.log(">rand* ", ran3, numbers.length);
                pwd_array.push(numbers[ran3]);
                break;

            case 3:
                console.log("Symbols", rand);
                var ran4 = Math.floor(Math.random() * symbols.length);
                console.log(">rand* ", ran4);
                pwd_array.push(symbols[ran4]);
                break;
        }        
    }
    
    password = pwd_array.join('');
    console.log("Password >>>>", password, "<<<<");
    document.getElementById("pwd").innerHTML = password;
}

function gen_rand() {

    // TODO: Implement better secure randomness
    // var random_num = new Uint8Array(1); // 2048 = number length in bits    2048 / 8
    // var test = window.crypto.getRandomValues(random_num);

    var rand = Math.floor(Math.random() * 4); // Range 0-3

    // TODO: if it picks a case, next turn cant have that case
    // if (rand == compare_rand) { // Not first time generating, there is a number to compare rand to
    //     console.log("Cant be same number", compare_rand, rand);
    // } else {
    //     console.log("Not the same?", rand, compare_rand);
    // }
    
    var compare_rand = rand;
    return rand;
}