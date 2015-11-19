
function tell(){
//alert('test');
    if(document.getElementById("preorlogin").innerHTML == "Logga in" || document.getElementById("preorlogin-mobile").innerHTML == "Logga in"){
        document.getElementById("preorlogin").innerHTML = "Premium";
        document.getElementById("preorlogin-mobile").innerHTML = "Premium";
        document.getElementById("premium-banner-text").innerHTML = "2 för 1";
    }else{
        document.getElementById("preorlogin").innerHTML = "Logga in";
        document.getElementById("preorlogin-mobile").innerHTML = "Logga in";
        document.getElementById("premium-banner-text").innerHTML = "Premium";
    }
    
}


