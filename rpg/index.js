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

const locations = [
    {
        name: "town sqaure", //this is a key
        "button text": ["Go to store", "Go to cave", "Fight dragon"],
        "button functions": [goStore, goCave, fightDragon],
        text:  "You are in Townsqaure.... you see a sign \"store\" or \"cave\""
    },
    {
        name: "store", //this is a key
        "button text": ["Buy 10 health (for 10 gold)", "Buy Weapon (for 30 gold)", "Got to town square"],
        "button functions": [buyHealth, buyWeapon, goTown],
        text:  "You are in the store.... lets shop for health and weapons. Go to town when you are done"
    },
    {
        name: "cave", //this is a key
        "button text": ["Fight slime", "Fight fanged beast", "Got to town square"],
        "button functions": [fightSlime, fightBeast, goTown],
        text:  "You are in the store.... lets shop for health and weapons. Go to town when you are done"
    }
];

//initialise the buttons when clicked
button1.onclick = goStore; //when button one is clicked it will call the function which is go to the store
button2.onclick = goCave; //when button one is clicked it will call the function which is go to the cave
button3.onclick = fightDragon; //when button one is clicked it will call the function which is fight the dragon


//To avoid code duplication... create additional functions to trim the code
//There is code repitition in go town and in initialise buttons

function update(location) {
    console.log("Going to town....")
    button1.innerText = location["button text"][0];
    button2.innerText = location["button text"][1];;
    button3.innerText = location["button text"][2];;

    //initialise the buttons when clicked
    button1.onclick = location["button functions"][0];
    button2.onclick = location["button functions"][1];
    button3.onclick = location["button functions"][2];
    text.innerText =  location["text"]; 
}

// create function goTown
function goTown() {
    console.log("Going to town....")
    update(locations[0]);   
}

// create function goStore
function goStore() {
     console.log("Going to the store....");
     update(locations[1]);    
}

// create function goCave
function goCave() {
    console.log("Going to the cave....");
     update(locations[2]);
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

   // create function fight slime
function fightSlime() {
    console.log("Fighting slime....")
}

   // create function fight beast
function fightBeast() {
    console.log("Fighting beast....")
}