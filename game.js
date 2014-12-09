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
	//var listElement2 = document.querySelector('#help > ul');
	displayInventory();
	displayActions();
	displayScene(player.pLocation.description);
	//var actions = displayActions(player);
        //listElement.appendChild(item);	
	//listElement2.appendChild(actions);
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

var gameStep = function(str){
	var obj = interpret(str);
	execute(obj);
	report();	
}

function gameIntro() {
    var inputBox = document.querySelector("input");
	var output = document.getElementById('scene');
	output.innerHTML = "What would you like your name to be?";
    var listener = function(event) {
        if (event.keyCode === 13) {
            // remove this listener before continuing so it only runs once
            event.target.removeEventListener("keyup", listener);
            customizePlayer(this.value);
            gameStart();
        }
    };
    inputBox.addEventListener ("keyup", listener);
}

var gameStart = function() {
	//var listElement2 = document.querySelector('#help > ul');
	displayActions(player);
	displayScene(player.pLocation.description);
	//listElement2.appendChild(actions);
	var inputBox = document.querySelector("input");
	inputBox.addEventListener("keyup", function(event){
		if (event.keyCode === 13) {
			gameStep(this.value);
		}
	});
}

function customizePlayer(input) {
    // here we should set the player's name and/or other properties
	var playerName = input;
}

window.onload = gameIntro;

var tests = function(){
	//Get element for the action
	var action = document.getElementById('action');
	
	//Change the scene
	var output = document.getElementById('scene');
	output.innerHTML = ('You find yourself in a linux lab learning how to program and make the next best adventure game');

	//Change the title using querySelectorAll function
	var headings = document.querySelectorAll('header > h1');
	for(i = 0; i < headings.length; i++){
		console.log(headings[i].innerHTML);
		headings[i].innerHTML = ('My Video Game');
	}

	//Change the list of Items
	var listElement = document.querySelector('#inventory > ul');
	var item = document.createElement('li');
	var itemText = document.createTextNode('Box');
	item.appendChild(itemText);
	listElement.appendChild(item);

	//Change the list of actions
	var listElement2 = document.querySelector('#help > ul');
	var item2 = document.createElement('li');
	var itemText2 = document.createTextNode('Left');
	var itemText3 = document.createTextNode('\nRight');
	var itemText4 = document.createTextNode('\nUpward');
	item2.appendChild(itemText2);
	item2.appendChild(itemText3);
	item2.appendChild(itemText4);
	listElement2.appendChild(item2);
}




