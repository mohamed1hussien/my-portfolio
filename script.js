// TYPE EFFECT
let text = "Mohamed Hussien";
let i = 0;
let speed = 100;
let el = document.getElementById("type");

function type(){
    if(i < text.length){
        el.innerHTML += text.charAt(i);
        i++;
        setTimeout(type, speed);
    }
}
type();

// MOBILE MENU
function toggleMenu(){
    document.getElementById("menu").classList.toggle("active");
}