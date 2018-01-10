function elephante() {
    var products = ["Blandari", "kavíar", "gulrót", "bílhurð", "gullfiskur"];
    var i = 0;
    var thing = "girafe", thang = "nah";
    for (i = 0; i < products.length; i++) {
        console.log("loop ",i);
        thing = "girafe" + i ;
        thang = products[i];
        document.getElementById(thing).innerHTML = thang;
    }
}