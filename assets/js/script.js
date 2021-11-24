var start = document.getElementById("start")
var reset = document.getElementById("reset")
var secondsLeft = 10;
var timer = document.getElementById("timer")
var textBox = document.getElementById("textbox")
var losses = document.getElementById("losses")
var loss = 0;
var win = 0;
var wins = document.getElementById ("wins")
var timerInterval;
var welcome = document.getElementById("welcome")
var gameWord ="";
var spaces= [];
var score = 0;
var wordCollection = [
  "Aardvark",
  "Albatross",
  "Alligator",
  "Alpaca",
  "Ant",
  "Anteater",
  "Antelope",
  "Ape",
  "Armadillo",
  "Donkey",
  "Baboon",
  "Badger",
  "Barracuda",
  "Bat",
  "Bear",
  "Beaver",
  "Bee",
  "Bison",
  "Boar",
  "Buffalo",
  "Butterfly",
  "Buzzard",
  "Camel",
  "Capybara",
  "Caribou",
  "Cassowary",
  "Cat",
  "Caterpillar",
  "Cattle",
  "Chamois",
  "Cheetah",
  "Chicken",
  "Chimpanzee",
  "Chinchilla",
  "Chough",
  "Clam",
  "Cobra",
  "Cockroach",
  "Cod",
  "Cormorant",
  "Coyote",
  "Crab",
  "Crane",
  "Crocodile",
  "Crow",
  "Curlew",
  "Deer",
  "Dinosaur",
  "Dog",
  "Dogfish",
  "Dolphin",
  "Dotterel",
  "Dove",
  "Dragonfly",
  "Duck",
  "Dugong",
  "Dunlin",
  "Eagle",
  "Echidna",
  "Eel",
  "Eland",
  "Elephant",
  "Elk",
  "Emu",
  "Falcon",
  "Ferret",
  "Finch",
  "Fish",
  "Flamingo",
  "Fly",
  "Fox",
  "Frog",
  "Gaur",
  "Gazelle",
  "Gerbil",
  "Giraffe",
  "Gnat",
  "Gnu",
  "Goat",
  "Goldfinch",
  "Goldfish",
  "Goose",
  "Gorilla",
  "Goshawk",
  "Grasshopper",
  "Grouse",
  "Guanaco",
  "Gull",
  "Hamster",
  "Hare",
  "Hawk",
  "Hedgehog",
  "Heron",
  "Herring",
  "Hippopotamus",
  "Hornet",
  "Horse",
  "Human",
  "Hummingbird",
  "Hyena",
  "Ibex",
  "Ibis",
  "Jackal",
  "Jaguar",
  "Jay",
  "Jellyfish",
  "Kangaroo",
  "Kingfisher",
  "Koala",
  "Kookabura",
  "Kouprey",
  "Kudu",
  "Lapwing",
  "Lark",
  "Lemur",
  "Leopard",
  "Lion",
  "Llama",
  "Lobster",
  "Locust",
  "Loris",
  "Louse",
  "Lyrebird",
  "Magpie",
  "Mallard",
  "Manatee",
  "Mandrill",
  "Mantis",
  "Marten",
  "Meerkat",
  "Mink",
  "Mole",
  "Mongoose",
  "Monkey",
  "Moose",
  "Mosquito",
  "Mouse",
  "Mule",
  "Narwhal",
  "Newt",
  "Nightingale",
  "Octopus",
  "Okapi",
  "Opossum",
  "Oryx",
  "Ostrich",
  "Otter",
  "Owl",
  "Oyster",
  "Panther",
  "Parrot",
  "Partridge",
  "Peafowl",
  "Pelican",
  "Penguin",
  "Pheasant",
  "Pig",
  "Pigeon",
  "Platypus",
  "Pony",
  "Porcupine",
  "Porpoise",
  "Quail",
  "Quelea",
  "Quetzal",
  "Rabbit",
  "Raccoon",
  "Rail",
  "Ram",
  "Rat",
  "Raven",
  "Red deer",
  "Red panda",
  "Reindeer",
  "Rhinoceros",
  "Rook",
  "Salamander",
  "Salmon",
  "Sand Dollar",
  "Sandpiper",
  "Sardine",
  "Scorpion",
  "Seahorse",
  "Seal",
  "Shark",
  "Sheep",
  "Shrew",
  "Skunk",
  "Snail",
  "Snake",
  "Sparrow",
  "Spider",
  "Spoonbill",
  "Squid",
  "Squirrel",
  "Starling",
  "Stingray",
  "Stinkbug",
  "Stork",
  "Swallow",
  "Swan",
  "Tapir",
  "Tarsier",
  "Termite",
  "Tiger",
  "Toad",
  "Trout",
  "Turkey",
  "Turtle",
  "Viper",
  "Vulture",
  "Wallaby",
  "Walrus",
  "Wasp",
  "Weasel",
  "Whale",
  "Wildcat",
  "Wolf",
  "Wolverine",
  "Wombat",
  "Woodcock",
  "Woodpecker",
  "Worm",
  "Wren",
  "Yak",
  "Zebra"
]
var words = wordCollection.map(function(change){
  return change.toLowerCase();
})

start.addEventListener("click", function(event) {
  event.preventDefault();
    startTimer();
    beginGame();
}
)

reset.addEventListener("click", function(event){
  event.preventDefault();
  resetStats();
}
)

function startTimer(){
    clearInterval(timerInterval);
    timer.textContent = 10;
    secondsLeft = 10;
    timerInterval = setInterval(function() {
        secondsLeft--;
        timer.textContent = secondsLeft;
        if(secondsLeft === 0) {
          clearInterval(timerInterval);
          youLost();
        }
      }, 1000);
}

function youLost() {
    loss += 1;
    storeStats();
    restoreStats();
    textBox.textContent = "You lost";
    storeStats();
}

function beginGame() {
  textBox.setAttribute( "style", "display:block")
  welcome.setAttribute( "style", "display:none")
  textBox.textContent = ""
  score = 0;
  setWord();
  renderSpaces();
  keyBinding();
}

function setWord() {
    var random = Math.floor(Math.random() * words.length)
    var word = words[random]
    gameWord = word.split("")
    return gameWord
}

function renderSpaces() {
  console.log(gameWord)
  textBox.innerHTML ="";
  for (let i = 0; i < gameWord.length; i++) {
      var space = document.createElement("span")
      space.setAttribute("data-index", i)
      space.setAttribute("data-letter",gameWord[i])
      space.setAttribute("data-empty", " _ ")
      space.setAttribute("class", "space")
      space.dataset.state = "empty"
      space.textContent = space.dataset.empty;
      textBox.appendChild(space)
  }
}

function keyBinding() {
  spaces = document.getElementsByClassName("space");
  document.addEventListener('keydown', function (event) {
    for (let i = 0; i < spaces.length; i++){
        if (event.key.toLowerCase() == spaces[i].dataset.letter) {
          spaces[i].setAttribute("data-state", "letter")
          spaces[i].textContent=spaces[i].dataset.letter;
          checkWin();
         }
        }
    }
  )
}

function youWin() {
    clearInterval(timerInterval);
    win += 1;
    storeStats();
    restoreStats();
    winWord = textBox.textContent
    textBox.textContent = "The word " + winWord + " is correct. " + "You Win!";
    storeStats();
}

function checkWin() {   
    var wholeWord = textBox.textContent;
    if (words.includes(wholeWord))
      youWin();
  
}

function storeStats() {
  localStorage.setItem("wins", win);
  localStorage.setItem("losses", loss);
}

function restoreStats() {
  wins.textContent = localStorage.getItem("wins");
  losses.textContent = localStorage.getItem("losses");
}

function resetStats() {
  win = 0
  loss = 0
  storeStats();
  restoreStats();
}

function init() {
  restoreStats();
}

init();