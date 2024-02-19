//Variables

let xp = 0;
let health = 100;
let gold = 50;
let currentWeapon = 0;

//Declaered variables, not initialised, global scope
let fighting;
let monsterHealth;
let inventory = ["stick"];

/* DOM is a tree of objects that represents the HTML. 
You can access the HTML using the document object, 
which represents your entire HTML document. */

/*One method for finding specific elements in your HTML 
is using the querySelector() method. The querySelector() method 
takes a CSS selector as an argument and returns the first element that matches that selector.  */

/* As using id which is a css selector it is prefixed with a # 
This is a variable that is not going to be reassigned - 
This will tell JS to throw an error if accidently reassign it */
const button1 = document.querySelector("#button1");
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");

/* querySelector vs getElementByID
getElementById() only works with ID attributes, 
while querySelector() can work with any CSS selector. 
getElementById() is faster than querySelector() because it
 only needs to search for one element, 
 whereas querySelector() may need to search for multiple elements before returning the first match.  */

const text = document.querySelector("#text");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const monsterStats = document.querySelector("#monsterStats");
const monsterName = document.querySelector("#monsterName");
const monsterHealthText = document.querySelector("#monsterHealth");

const weapons = [
  {
    name: "stick",
    power: 5,
  },

  {
    name: "dagger",
    power: 30,
  },

  {
    name: "claw hammer",
    power: 50,
  },

  {
    name: "sword",
    power: 100,
  },
];

const monsters = [
  {
    name: "Slime",
    level: 2,
    health: 15,
  },

  {
    name: "Fanged beast",
    level: 8,
    health: 60,
  },

  {
    name: "Dragon",
    level: 20,
    health: 300,
  },
];

//loaction array
const locations = [
  {
    name: "town square",
    "button text": ["Go to store", "Go to cave", "Fight dragon"],
    "button functions": [goStore, goCave, fightDragon],
    text: 'You are in the town square. You see a sign that says "Store".',
  },

  {
    name: "store",
    "button text": [
      "Buy 10 health (10 gold)",
      "Buy weapon (30 gold)",
      "Go to town square",
    ],
    "button functions": [buyHealth, buyWeapon, goTown],
    text: "You enter the store.",
  },

  {
    name: "cave",
    "button text": ["Fight slime", "Fight fanged beast", "Go to town square"],
    "button functions": [fightSlime, fightBeast, goTown],
    text: "You enter the cave. You see some monsters.",
  },

  {
    name: "fight",
    "button text": ["Attack", "Dodge", "Run"],
    "button functions": [attack, dodge, goTown],
    text: "You are fighting a monster.",
  },

  {
    name: "kill monster",
    "button text": [
      "Go to town sqaure",
      "Go to town sqaure",
      "Go to town sqaure",
    ],
    "button functions": [goTown, goTown, easterEgg],
    text: 'The monster screams "Arg!" as it dies. You gain experience points and find gold.',
  },

  {
    name: "lose",
    "button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
    "button functions": [restart, restart, restart],
    text: "You die. &#x2620;",
  },

  {
    name: "win",
    "button text": ["REPLAY?", "REPLAY?", "REPLAY?"],
    "button functions": [restart, restart, restart],
    text: "You defeat the dragon! YOU WIN THE GAME! &#x1F389;",
  },

  {
    name: "easter egg",
    "button text": ["2", "8", "Go to town sqaure?"],
    "button functions": [pickTwo, pickEight, goTown],
    text: "You find a secret game. Pick a number above. Ten numbers will be randomly chosen between 0 and 10. If the number you choose matches one of the random numbers, you win!",
  },
];

// initialize buttons... When clicked the following function is called
button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;

function update(location) {
  monsterStats.style.display = "none";
  button1.innerText = location["button text"][0];
  button2.innerText = location["button text"][1];
  button3.innerText = location["button text"][2];
  button1.onclick = location["button functions"][0];
  button2.onclick = location["button functions"][1];
  button3.onclick = location["button functions"][2];
  text.innerHTML = location.text;
}

function goTown() {
  update(locations[0]);
}
function goStore() {
  update(locations[1]);
}

function goCave() {
  update(locations[2]);
}

//buy and sell funtcitons
function buyHealth() {
  //runs code block if gold availble is more than or equal to 10.
  if (gold >= 10) {
    gold -= 10;
    health += 10;
    goldText.innerText = gold;
    healthText.innerText = health;
  } else {
    text.innerText = "You do not have enough gold to buy health.";
  }
}
/* 
inner text vs innerHtml innerText returns all text contained by an element and all its child elements. 
innerHtml returns all text, including html tags, that is contained by an element.
The innerHTML property allows you to access or modify the content inside an HTML element using JavaScript. */

function buyWeapon() {
  /* Once a player has the best weapon, they cannot buy another one.
condition  checks if currentWeapon is less than 3 - the index of the last weapon. */

  /* currentWeapon variable is the index of the weapons array */

  if (currentWeapon < weapons.length - 1) {
    if (gold >= 30) {
      gold -= 30;
      //Incrementing operator `++`
      currentWeapon++;
      goldText.innerText = gold;
      let newWeapon = weapons[currentWeapon].name;

      inventory.push(newWeapon);
      //a string with the concatenation operator +.
      text.innerText = "You now have a " + newWeapon + ".";
      text.innerText += " In your inventory you have: " + inventory;
    } else {
      text.innerText = "You do not have enough gold to buy a weapon.";
    }
  } else {
    text.innerText = "You already have the most powerful weapon!";
    button2.innerText = "Sell weapon for 15 gold";
    button2.onclick = sellWeapon;
  }
}

function sellWeapon() {
  if (inventory.length > 1) {
    gold += 15;
    goldText.innerText = gold;

    //new currentWeapon variable scoped within if statement
    let currentWeapon = inventory.shift();
    text.innerText = "You sold a " + currentWeapon + ".";
    text.innerText += " In your inventory you have: " + inventory;
  } else {
    text.innerText = "Don't sell your only weapon!";
  }
}

// fight functions
function fightSlime() {
  fighting = 0;
  goFight();
}

function fightBeast() {
  fighting = 1;
  goFight();
}

function fightDragon() {
  //fighting is assigned to obejct within array
  fighting = 2;
  goFight();
}

//fighting each type of monster will use a similar logic
function goFight() {
  update(locations[3]);
  //global unassigned variables
  monsterHealth = monsters[fighting].health;

  /* by default this html element is hidded. needs to be displayed when the player clicks "Fight dragon" button
  the monster's stats should be displayed.The style property is used to access the inline style of an element 
  and the display property is used to set the visibility of an element. */
  monsterStats.style.display = "block";
  monsterName.innerText = monsters[fighting].name;
  monsterHealthText.innerText = monsterHealth;
}

function attack() {
  text.innerText = "The " + monsters[fighting].name + " attacks.";
  text.innerText +=
    " You attack it with your " + weapons[currentWeapon].name + ".";
  health -= getMonsterAttackValue(monsters[fighting].level);
  if (isMonsterHit()) {
    monsterHealth -=
      weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1;
  } else {
    text.innerText += " You miss.";
  }

  healthText.innerText = health;
  monsterHealthText.innerText = monsterHealth;

  if (health <= 0) {
    lose();
  } else if (monsterHealth <= 0) {
    if (fighting === 2) {
      winGame();
    } else {
      defeatMonster();
    }
  }
  // we don't want a player's only weapon to break.
  if (Math.random() <= 0.1 && inventory.length !== 1) {
    // .pop(), which will remove the last item in the array AND return it so it appears in your string
    text.innerText += " Your " + inventory.pop() + " breaks.";
    currentWeapon--;
  }
}

function getMonsterAttackValue(level) {
  const hit = level * 5 - Math.floor(Math.random() * xp);
  return hit > 0 ? hit : 0;
}

function isMonsterHit() {
  return Math.random() > 0.2 || health < 20;
}

function dodge() {
  text.innerText = "You dodge the attack from the " + monsters[fighting].name;
}

function defeatMonster() {
  gold += Math.floor(monsters[fighting].level * 6.7);
  xp += monsters[fighting].level;

  goldText.innerText = gold;
  xpText.innerText = xp;
  update(locations[4]);
}

function lose() {
  update(locations[5]);
}

function winGame() {
  update(locations[6]);
}

function restart() {
  xp = 0;
  health = 100;
  gold = 50;
  currentWeapon = 0;
  inventory = ["stick"];

  goldText.innerText = gold;
  healthText.innerText = health;
  xpText.innerText = xp;

  goTown();
}

function easterEgg() {
  update(locations[7]);
}

function pick(guess) {
    const numbers = [];

    while (numbers.length < 10){

        /*push a random number between 0 and 10 to the end of the numbers array. */

        numbers.push(Math.floor(Math.random() * 11))

    }

    text.innerText = "You picked " + guess + ". Here are the random numbers:\n"

    for (let i = 0; i < 10; i++) {
        text.innerText += numbers[i] + "\n"

    }

    if (numbers.includes(guess)){

        text.innerText += "Right! You win 20 gold!"
        gold += 20;
        goldText.innerText = gold;

    } else{
        text.innerText += "Wrong! You lose 10 health!";
        health -= 10;
        healthText.innerText = health;
    } 
    
    if (health <= 0){
        lose()
    }

}

function pickTwo() {
  pick(2);
}

function pickEight() {
  pick(8);
}
