// Verkefni 2

/*
    1.) ECMAScript er grunnur sem mörg scripting tungumál eins og javascript eru byggð á 
    2.) Þýðandinn hjálpar þér með ýmislegt, eins og til dæmis ef þú gleymir semi kommu, og hann reynir líka að giska svolítið á hvað þú ert að reyna að gera ef þú setur það ekki fram alveg rétt
    3.) bæði ' og " gegna sama hlutverki en ef þú ætlar að nota annað merkið inní streng er betra að hafa hitt utanum hann T.d. "It's a great day"
    4.) í rauninni eru þetta datatýpur sem eru notaðar sem "placeholder" áður en það koma gögn í breytuna
    5.) === er strict sem þýðir að það ber einnig saman gagna týpuna en ekki bara innihaldið en == gerir það ekki t.d. if(x == undefined) verður true en if(x === undefined) verður false
    6.) let virkar eins og local breytur og var eins og global
*/

if(true){
    var x = 5;//ég get ennþá kallað á þessa breytu hvar sem er
}
console.log(x);//verður 5

//hinsvegar með let

if(true){
    let x = 5;//ég get ekki kallað á þessa breytu fyrir utan þessa if setningu
}
console.log(x);//verður undefined

//  7.)
//standard function
function a(){}

//breyta sem er function
var b = function(){}

//örva fall
//hér tekur fallið allar tölurnar í fylkinu og margfaldar með 2
[1, 2, 3].map(x => x * 2);

//  8.) 'use strict' segjir þýðandanum að þetta forrit eigi að uppfylla strangar málfræði kröfur sem komu í ECMAScript 5
//  9.) af því að javascript notar hoist til þess að endur raða kóðanum í þýðandanum og setur breytur og föll efst
//  10.) 