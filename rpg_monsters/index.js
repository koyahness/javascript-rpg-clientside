let xp = 0; //var allows the most changing and opens code to bugs
let health = 100; 
let gold = 50;
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
const monsterNameText = document.querySelector("#monsterName"); //value of variable will not change
const monsterHealthText = document.querySelector("#monsterHealth"); //value of variable will not change

const weapons = [
    {name: "stick", power: 5},
    {name: "dagger", power: 30},
    {name: "claw hammer", power: 50},
    {name: "sword", power: 100}
]; //


const monsters = [
     {name: "slime", level: 2, health: 15},
     {name: "fanged beast", level: 8, health: 60},
     {name: "dragon", level: 20, health: 300}
]

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
        text:  "You are in the cave, fight the monsters"
    },
    {
        name: "fight", //this is a key
        "button text": ["Attack", "Dodge", "Run"],
        "button functions": [attack, dodge, goTown],
        text:  "You are fighting the monster"
    },
    {
        name: "kill monster", //this is a key
        "button text": ["Go to town square", "Go to town square", "Go to town square"],
        "button functions": [goTown, goTown, goTown],
        text:  "The monster screams Arg! you gain expereince and find gold"
    },
    {
        name: "lose", //this is a key
        "button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
        "button functions": [restart, restart, restart],
        text:  "You die"
    },
    {
        name: "win", //this is a key
        "button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
        "button functions": [restart, restart, restart],
        text:  "You defeat the dragon and win the game"
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
    monsterStats.style.display = "none"; //when going to new location monster stats doesnt show up
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

    // create function buyHealth
function buyHealth() {
    console.log("Buying 10 health....")
    if (gold >= 10) {
    gold -= 10; //long way is gold = gold - 10 //short way is compound assignment 
    health += 10;
    goldText.innerText = gold;
    healthText.innerText = health;
    } else{text.innerText = "you dont have enough gold to buy health"}
}

    // create function buyWeapon
function buyWeapon() {
    console.log("Buying Weapon....")
    if (currentWeapon < (weapons.length-1)){
    if (gold >= 30){
        gold -= 30;
        currentWeapon++; //currentWeapon += 1
        goldText.innerText = gold;
        let newWeapon = weapons[currentWeapon].name;
        text.innerText = "you have a" + newWeapon + "as new weapon. ";
        inventory.push(newWeapon);
        text.innerText = "in your inventory you have: " + inventory;
    } else{text.innerText = "you dont have enough gold to buy weapon";}
}else{text.innerText = "you already have the most powerful weapon";
    button2.innerText = "Sell weapon for 15 gold";
    button2.onclick = sellWeapon;
}
}

   // create function sellweapon
function sellWeapon() {
    console.log("Selling....")
     if (inventory.length > 1){
        gold += 15;
        goldText.innerText = gold;
        let currentWeapon = inventory.shift();
         text.innerText = "you sold a" + currentWeapon + ".";
          text.innerText = "in your inventory you have: " + inventory;
     } else { text.innerText = "cant sell your only weapon"}
}

   // create function fight slime
function fightSlime() {
    console.log("Fighting slime....");
    fighting = 0;
    goFight();
}

   // create function fight beast
function fightBeast() {
    console.log("Fighting beast....");
    fighting = 1;
    goFight();
}

// create function fighting dragon
function fightDragon() {
    console.log("Fighting dragon....");
    fighting = 2;
    goFight();
}

   // create function goFight
function goFight() {
    console.log("Going to fight....");
    update(locations[3]);
    monsterHealth = monsters[fighting].health;
    monsterStats.style.display = "block"; //update CSS styles through java script element.style. is how to update the css styles
    monsterNameText.innerText = monsters[fighting].name
    monsterHealthText.innerText = monsterHealth;
}

//  create function attack
function attack() {
    console.log("Attacking....");
    text.innerText = "The " + monsters[fighting].name + " attacks.";
    text.innerText += " You attack it with your " + weapons[currentWeapon].name + ".";
    health -= monsters[fighting].level;
    monsterHealth -= weapons[currentWeapon].power + Math.floor(Math.random()*xp) + 1 ; //math.random creates a random number between 0 and 1 //math.floor will round up the number
    healthText.innerText = health;
    monsterHealthText.innerText = monsterHealth;
    if ( health <= 0) {
        lose();
    } else if ( monsterHealth <= 0) {
        if (fighting === 2) {
            winGame();
        } else {defeatMonster();}
    }
}

//  create function dodge
function dodge() {
    console.log("Dodging....");
    text.innerText = "You dodge the" + monsters[fighting].name + " attacks.";
}
//  create function defeat monster
function defeatMonster() {
    console.log("monster losing....");
    gold += Math.floor(monsters[fighting].level * 6.7);
    xp += monsters[fighting].level;
    goldText.innerText = gold;
    xpText.innerText = xp;
    update(locations[4]);
}

//  create function lose
function lose() {
    console.log("Lose....");
    update(locations[5]);
}


//  create function lose
function  winGame() {
    console.log("Win....");
    update(locations[6]);
}

//  create function restart
function restart() {
    console.log("Lose....");
    xp = 0; //var allows the most changing and opens code to bugs
    health = 100;
    gold = 50;
    currentWeapon=0;
    inventory = ["stick"];
    goldText.innerText = gold;
    healthText.innerText = health;
    xpText.innerText = xp;
    goTown();
}

