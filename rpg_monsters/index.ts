//conversion of the index.js file to .ts file for comparison purposes

/**
 * 
 * Converting this to TypeScript is a great way to make your RPG code more robust. The main changes involve defining Interfaces for your data structures (like Weapons and Locations) and adding Type Assertions for your HTML elements to ensure TypeScript knows they have properties like innerText or onclick.
 */

/**
 * 
 * Key Changes Made:
Strict Typing for HTML: In JS, querySelector returns a generic element. In TS, we use as HTMLButtonElement so you can use .onclick and .innerText without the compiler complaining.

Interfaces: I created Weapon, Monster, and GameLocation interfaces. This ensures that every object in your arrays has exactly the right keys (e.g., preventing you from accidentally typing "button-text" instead of "button text").

Explicit Types: Variables like gold and health are marked as : number, and functions are marked as : void (since they don't return anything).

String Conversion: TS is strict about types. You can't assign a number directly to innerText. I added .toString() to variables like gold and xp when updating the UI.

Fixed a Bug: In your pick function, the loop was for (let i = 0; i < 0; i++), which meant it would never run. I changed it to i < 10.

Would you like me to explain how to set up a tsconfig.json file to compile this code into working JavaScript for your browser?
 */

// --- Interfaces & Types ---
interface Weapon {
    name: string;
    power: number;
}

interface Monster {
    name: string;
    level: number;
    health: number;
}

interface GameLocation {
    name: string;
    "button text": string[];
    "button functions": Function[];
    text: string;
}

// --- Variables ---
let xp: number = 0;
let health: number = 100;
let gold: number = 50;
let currentWeapon: number = 0;
let fighting: number;
let monsterHealth: number;
let inventory: string[] = ["stick"];

// --- HTML Element References ---
// Using 'as' to tell TS exactly what kind of HTMLElement these are
const button1 = document.querySelector("#button1") as HTMLButtonElement;
const button2 = document.querySelector("#button2") as HTMLButtonElement;
const button3 = document.querySelector("#button3") as HTMLButtonElement;
const text = document.querySelector("#text") as HTMLElement;
const xpText = document.querySelector("#xpText") as HTMLElement;
const healthText = document.querySelector("#healthText") as HTMLElement;
const goldText = document.querySelector("#goldText") as HTMLElement;
const monsterStats = document.querySelector("#monsterStats") as HTMLElement;
const monsterNameText = document.querySelector("#MonsterName") as HTMLElement;
const monsterHealthText = document.querySelector("#MonsterHealth") as HTMLElement;

// --- Data Arrays ---
const weapons: Weapon[] = [
    { name: "stick", power: 5 },
    { name: " dagger", power: 30 },
    { name: " claw hammer", power: 50 },
    { name: " sword", power: 100 }
];

const monsters: Monster[] = [
    { name: "slime", level: 2, health: 15 },
    { name: "fanged beast", level: 8, health: 60 },
    { name: "dragon", level: 20, health: 300 }
];

const locations: GameLocation[] = [
    {
        name: "town square",
        "button text": ["Go to store", "Go to cave", "Fight dragon"],
        "button functions": [goStore, goCave, fightDragon],
        text: "You are in town square.... you see a sign \"store\" or \"cave\". Otherwise fight the dragon!"
    },
    {
        name: "store",
        "button text": ["Buy 10 health (for 10 gold)", "Buy a weapon (for 30 gold)", "Go to Town square"],
        "button functions": [buyHealth, buyWeapon, goTown],
        text: "You are in the store.... Lets shop for health and weapons. Go to town square when you are done."
    },
    {
        name: "cave",
        "button text": ["Fight slime", "Fight fanged beast", "Go to town square"],
        "button functions": [fightSlime, fightBeast, goTown],
        text: "You are in the cave, fight the monsters (slime or fanged beast)."
    },
    {
        name: "fight",
        "button text": ["Attack", "Dodge", "Run"],
        "button functions": [attack, dodge, goTown],
        text: "You are fighting the monster. Give your best!"
    },
    {
        name: "kill monster",
        "button text": ["Go to town square", "Go to town square", "Go to town square"],
        "button functions": [goTown, goTown, easterEgg],
        text: "The monster screams Arg! You gain experience and find gold, buy health or weapons."
    },
    {
        name: "lose",
        "button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
        "button functions": [restart, restart, restart],
        text: "You die!"
    },
    {
        name: "win",
        "button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
        "button functions": [restart, restart, restart],
        text: "Sick! You defeat the dragon and win the game."
    },
    {
        name: "easter egg",
        "button text": ["2", "8", "Go to town square"],
        "button functions": [pickTwo, pickEight, goTown],
        text: "You find a secret game. Pick a number above. Ten numbers will be randomly chosen between 0 and 10. If the number you choose matches one of the random numbers, you win!"
    }
];

// --- Initialization ---
button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;

// --- Core Functions ---
function update(location: GameLocation): void {
    monsterStats.style.display = "none";
    button1.innerText = location["button text"][0];
    button2.innerText = location["button text"][1];
    button3.innerText = location["button text"][2];

    button1.onclick = location["button functions"][0] as any;
    button2.onclick = location["button functions"][1] as any;
    button3.onclick = location["button functions"][2] as any;
    text.innerText = location.text;
}

function goTown(): void {
    update(locations[0]);
}

function goStore(): void {
    update(locations[1]);
}

function goCave(): void {
    update(locations[2]);
}

function buyHealth(): void {
    if (gold >= 10) {
        gold -= 10;
        health += 10;
        goldText.innerText = gold.toString();
        healthText.innerText = health.toString();
    } else {
        text.innerText = "You dont have enough gold to buy health!";
    }
}

function buyWeapon(): void {
    if (currentWeapon < weapons.length - 1) {
        if (gold >= 30) {
            gold -= 30;
            currentWeapon++;
            goldText.innerText = gold.toString();
            let newWeapon = weapons[currentWeapon].name;
            text.innerText = "You have a" + newWeapon + "as new weapon. ";
            inventory.push(newWeapon);
            text.innerText = "In your weapon inventory you have: " + inventory;
        } else {
            text.innerText = "You dont have enough gold to buy weapon!";
        }
    } else {
        text.innerText = "You already have the most powerful weapon!";
        button2.innerText = "Sell weapon for 15 gold!";
        button2.onclick = sellWeapon as any;
    }
}

function sellWeapon(): void {
    if (inventory.length > 1) {
        gold += 15;
        goldText.innerText = gold.toString();
        let weaponSold = inventory.shift();
        text.innerText = "you sold a" + weaponSold + ".";
        text.innerText = "In your weapon inventory you have: " + inventory;
    } else {
        text.innerText = "Cant sell your only weapon!";
    }
}

function goFight(): void {
    update(locations[3]);
    monsterHealth = monsters[fighting].health;
    monsterStats.style.display = "block";
    monsterNameText.innerText = monsters[fighting].name;
    monsterHealthText.innerText = monsterHealth.toString();
}

function fightSlime(): void {
    fighting = 0;
    goFight();
}

function fightBeast(): void {
    fighting = 1;
    goFight();
}

function fightDragon(): void {
    fighting = 2;
    goFight();
}

function attack(): void {
    text.innerText = "The " + monsters[fighting].name + " attacks.";
    text.innerText += " You attack it with your " + weapons[currentWeapon].name + ".";

    if (isMonsterHit()) {
        health -= getMonsterAttackValue(monsters[fighting].level);
    } else {
        text.innerText += "You miss!";
    }

    monsterHealth -= weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1;
    healthText.innerText = health.toString();
    monsterHealthText.innerText = monsterHealth.toString();

    if (health <= 0) {
        lose();
    } else if (monsterHealth <= 0) {
        if (fighting === 2) {
            winGame();
        } else {
            defeatMonster();
        }

        if (Math.random() <= .1 && inventory.length !== 1) {
            text.innerText += "...... But,your" + inventory.pop() + " breaks";
            currentWeapon--;
        }
    }
}

function getMonsterAttackValue(level: number): number {
    let hit = (level * 5) - (Math.floor(Math.random() * xp));
    return hit > 0 ? hit : 0;
}

function isMonsterHit(): boolean {
    return Math.random() > .2 || health < 20;
}

function dodge(): void {
    text.innerText = "You dodge the " + monsters[fighting].name + " attacks.";
}

function defeatMonster(): void {
    gold += Math.floor(monsters[fighting].level * 6.7);
    xp += monsters[fighting].level;
    goldText.innerText = gold.toString();
    xpText.innerText = xp.toString();
    update(locations[4]);
}

function lose(): void {
    update(locations[5]);
}

function winGame(): void {
    update(locations[6]);
}

function restart(): void {
    xp = 0;
    health = 100;
    gold = 50;
    currentWeapon = 0;
    inventory = ["stick"];
    goldText.innerText = gold.toString();
    healthText.innerText = health.toString();
    xpText.innerText = xp.toString();
    goTown();
}

function easterEgg(): void {
    update(locations[7]);
}

function pickTwo(): void {
    pick(2);
}

function pickEight(): void {
    pick(8);
}

function pick(guess: number): void {
    let numbers: number[] = [];
    while (numbers.length < 10) {
        numbers.push(Math.floor(Math.random() * 11));
    }

    text.innerText = "You picked " + guess + ". Here are the random numbers: \n";

    for (let i = 0; i < 10; i++) { // Fixed your loop: i < 10 instead of i < 0
        text.innerText += numbers[i] + "\n";
    }

    if (numbers.indexOf(guess) !== -1) {
        text.innerText += "Right You win 20 gold";
        gold += 20;
        goldText.innerText = gold.toString();
    } else {
        text.innerText += "Wrong! you lose 10 health";
        health -= 10;
        healthText.innerText = health.toString();
        if (health <= 0) {
            lose();
        }
    }
}