let xp = 0; //var allows the most changing and opens code to bugs
let health =100; 
let gold =0;
let currentWeapon=0;
let fighting;
let monsterHealth;
let inventory = ["stick"];
// let inventory = ["stick", "dagger", "sword"];

// inorder to update html elements on a html   webpage, get reference to them in your js code file
const button1 = document.querySelector("#button1"); //value of variable will not change
const button2 = document.querySelector("#button2"); //value of variable will not change
const button3 = document.querySelector("#button3"); //value of variable will not change
const text = document.querySelector("#text"); //value of variable will not change
const xpText = document.querySelector("#xpText"); //value of variable will not change
const healthText = document.querySelector("#healthText"); //value of variable will not change
const goldText = document.querySelector("#goldText"); //value of variable will not change
const monsterStats = document.querySelector("#monsterStats"); //value of variable will not change
const monsterName = document.querySelector("#monsterName"); //value of variable will not change
const monsterHealthText = document.querySelector("#monsterHealth"); //value of variable will not change

//initialise the buttons when clicked
button1.onclick = goStore; //when button one is clicked it will call the function which is go to the store
button2.onclick = goCave; //when button one is clicked it will call the function which is go to the cave
button3.onclick = fightDragon; //when button one is clicked it will call the function which is fight the dragon

// create function goTown
function goTown() {
    console.log("Going to town....")
     button1.innerText = "Buy 10 health (for 10 gold)";
    button2.innerText = "Buy Weapon (for 30 gold)";
    button3.innerText = "Got to town square";

    button1.onclick = buyHealth;
    button2.onclick = buyWeapon;
    button3.onclick = goTown;
    text.innerText = "You are in the store.... lets shop for health and weapons. Go to town when you are done"
}

// create function goStore
function goStore() {
    console.log("Going to the store....")
    button1.innerText = "Buy 10 health (for 10 gold)";
    button2.innerText = "Buy Weapon (for 30 gold)";
    button3.innerText = "Got to town square";

    button1.onclick = buyHealth;
    button2.onclick = buyWeapon;
    button3.onclick = goTown;
    text.innerText = "You are in the store.... lets shop for health and weapons. Go to town when you are done"
}

// create function goCave
function goCave() {
    console.log("Going to the cave....")
}

// create function fighting dragon
function fightDragon() {
    console.log("Fighting dragon....")
} 

    // create function buyHealth
function buyHealth() {
    console.log("Buying 10 health....")
}

    // create function buyWeapon
function buyWeapon() {
    console.log("Buying Weapon....")
}