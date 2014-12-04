var player = {
	items: [],
	pLocation : map.locations[0],	
	pickup : function(item){
		//check if item is in the current Location
		//if so, add the item to do player's items
		//be sure to remove it from the current location
		//if not display message informing the user 		
		if(checkItem(item) === true){	
			this.items.push(item.toLowerCase());
			this.pLocation.removeItem(item);
		} else {
			alert('Item is not in the room');
		}	
	},
	drop : function(item){
	var x = this.items.indexOf(item.toLowerCase());
                if(x >= 0){
                        this.items.splice(x,1);
			this.pLocation.items.push(item);
                } else {
			alert('You do not have that item in your inventory');
		}	
	},
	
	goto : function(locName){
		var moveLocNum = map.getLocNumber(locName);
		var fromLocNum = map.getLocNumber(this.pLocation.name);
		if(map.getLocNumber(locName) == -1){
			alert('Location does not exist');
		} else {			
			if(map.isConnected(fromLocNum, moveLocNum)){
				this.pLocation = map.locations[moveLocNum];
				displayScene(player.pLocation.description);
			}		
		}
	}
	//check if locName even exists in my map
	//Has to check if the location is adjacent to the current location FUCNTION		
	//if so, check if player has the prerequisites
	//If not tell the user so
	//Then must update the current location which would change the pLocation
};

var checkItem = function(itemName){
	return player.pLocation.has(itemName);
}


console.log(checkItem('blue key'));

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
	output.innerHTML = player.pLocation.description;
}

var gameStep = function(str){
	var obj = interpret(str);
	execute(obj);
	report();
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

window.onload = gameStart;

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

console.log(interpret("Pickup Blue Key"));


