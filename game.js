var player = {
	items: [],
	pickup : function(item){
		this.items.push(item.toLowerCase());	
	},
	drop : function(item){
	var x = this.items.indexOf(item.toLowerCase());
                if(x >= 0){
                        this.items.splice(x,1);
                }	
	}
};

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
        var item = document.createElement('li');
        var itemList = player.items;
	for(i = 0; i < itemList.length; i++){
		var input = itemList[i];
		var itemText = document.createTextNode(input);
       		item.appendChild(itemText);
	}
        listElement.appendChild(item);	
}

var gameStep = function(str){
	var obj = interpret(str);
	execute(obj);
	report();
}

var gameStart = function() {
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


