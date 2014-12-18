var clearContent = function(node) {
    while (node.hasChildNodes()) {
        node.removeChild(node.firstChild);
    }
}

var interpret = function(str){
	var objects = {};
	var firstStr = str;
	var trimStr = firstStr.trim();
	var newStr = trimStr.split(" ");
	var action = newStr.shift();
	objects.action = action;
	var item = newStr.join(" ");
	objects.object = item;
	return objects;
}

var execute = function(obj){
	var action = obj.action;
	var newAction = action.toLowerCase();
	player[newAction](obj.object);
}

var report = function(){
	var listElement = document.querySelector('#inventory > ul');
	displayInventory();
	displayActions();
	displayScene(player.pLocation.description);
	displayLocation();
	customizeBackground(player.pLocation.image, player.pLocation.color);
}

function displayInventory() {
    var i, item, inventory;

    inventory = document.querySelector("#inventory > ul");
    clearContent(inventory);

    for (i in player.items) {
        item = document.createElement("li");
        item.textContent = player.items[i];
        inventory.appendChild(item);
    }
}

var displayActions = function() {
    var field, action, actionList;

    actionList = document.querySelector("#help > ul");
    clearContent(actionList);

    for (field in player) {
        if (player[field] instanceof Function) {
            action = document.createElement("li");
            action.textContent = field;
            actionList.appendChild(action);
        }
    }
}

function displayScene(description) {
	var output = document.getElementById('scene');
	clearContent(output);
	output.innerHTML = player.pLocation.description + buildDescription(player.pLocation.items);
}

function displayLocation(){
	var locList = document.querySelector('#location > ul');
	clearContent(locList);
	var loc = document.createElement('li');
	loc.textContent = player.pLocation.name;
	locList.appendChild(loc);
}

var gameStep = function(str){
	var obj = interpret(str);
	execute(obj);
	report();	
}

function gameIntro() {
    var inputBox = document.querySelector("input");
	var output = document.getElementById('scene');
	output.innerHTML = "Welcome to The Dream!  This is a Text-Based Adventure Game so to play you have to enter an action on the left, and then enter whatever you would like on the right depending on what the description is!  Be sure to look in rooms, that way you don't run into a monster without an item and end up losing! Be sure to read the books and memos! Every item has importance! What would you like your name to be?";
    var listener = function(event) {
        if (event.keyCode === 13) {
            event.target.removeEventListener("keyup", listener);
            customizePlayer(this.value);
			inputBox.value = '';
            gameStart();
        }
    };
    inputBox.addEventListener ("keyup", listener);
}

var gameStart = function() {
	displayActions(player);
	displayScene(player.pLocation.description);
	customizeBackground(player.pLocation.image, player.pLocation.color);
	displayLocation();
	var inputBox = document.querySelector("input");
	inputBox.addEventListener("keyup", function(event){
		if (event.keyCode === 13) {
			gameStep(this.value);
			inputBox.value = '';
		}
	});
}

function customizePlayer(input) {
	var playerName = input;
	var name = document.getElementById('name');
	name.textContent = playerName;
}

function customizeBackground(locImage, locColor){	
	document.body.style.backgroundImage = "url('"+locImage+"')";
	document.body.style.backgroundSize = 'cover';
	document.body.style.color=locColor;
}

window.onload = gameIntro;


