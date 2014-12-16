var Monster = function(name, itemToKill, item, image, color){
	this.name = name,
	this.itemToKill = itemToKill,
	this.item = item,
	this.image = image,
	this.color = color;
}

var Goblin = new Monster('Goblin', 'axe', '', 'Goblin.jpg', 'Green')
var monsters = [];
monsters.push(Goblin);
map.locations[3].monster = Goblin;


//New object called book
//For book to work it must be recognized as an item and could be picked up off the ground
//Must have a read action in the player that allows player to read message inside the book which will be an alert
//Must first check if player is trying to read a book and/or has the book
//Then the read function should check if it is a book by checking comparison of book name to the book lists of names 
//Then alert
var Book = function(name, descrip){
	this.name = name,
	this.description = descrip;
}
var Books = [];
var GoblinBook = new Book('Goblin Book', 'The Goblin is a tricky creature, but in all honesty if you have an item such as an ' + bolden('axe') + ' to kill it.  If not you might experience a horrible death due to beating.');
Books.push(GoblinBook);

var checkBook = function(itemName, bookArray){
	for(var i = 0; i < bookArray; i++){
		if(itemName.toLowerCase().indexOf(bookArray[i].name.toLowerCase()) >= 0){
			return true; 
			break;
		}
	}
	console.log(itemName.toLowerCase().indexOf(bookArray[i].name.toLowerCase())); //Equals 0? 
	return false;
}

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
		} else if(map.isConnected(fromLocNum, moveLocNum) === false){
			alert('Rooms are not connected');
		} else if(checkPreReq(moveLocNum, this.items) === false){
			alert('You may not have the required items to enter the room');
		} else if(kill(locName) === false){
			map.locations[8].image = map.locations[moveLocNum].monster.image;
			this.pLocation = map.locations[8];
		} else {
			this.pLocation = map.locations[moveLocNum];
		}
	},
	
	help : function() {
		alert('You must enter in an action from the list to the left to continue on with the game.  Be sure to enter in everything correctly!  \n EXAMPLE: goto Forest');
	},
	
	look : function(locName){
		var locationNumber = map.getLocNumber(locName);
		var fromLocNum = map.getLocNumber(this.pLocation.name);
		//var locationItem = location.items[0];
		var locationMonster = locations[locationNumber].monster.name;
		if(locations[locationNumber].monster === ''){
			var monster = 'no monsters';
		} else {
			var monster = 'a' + locationMonster;
		}
		if(locations[locationNumber].items.length === 0){
			var items = 'no items';
		} else {
			for(i = 0; i < locations[locationNumber].items.length; i++){
				var items = locations[locationNumber].items[i];
			}
		}
		if(locationNumber === -1){
			return alert('The room you are trying to look at does not exist!');
		} else if(map.isConnected(fromLocNum, locationNumber) === false){
			return alert('The room you are trying to look at is not connected with your room');
		} else {
			return alert('You look and see that the room has ' + monster + ' in it.  The room has ' + items + '.');
		}
	},
	
	read : function(itemName){
		if(playerHas(itemName) === false){
			alert('You do not have that item');
		} else if(checkBook(itemName, Books) === false){
			alert('That is not a book');
		} else {
			console.log(itemName.description);
			alert('That is a book');
		}
	}
};

var kill = function(locName){
	var moveLocNum = map.getLocNumber(locName);
	if(locations[moveLocNum].monster === ''){
		return true;
	} else {
		for(var i = 0; i < player.items.length; i++){
			if(player.items[i].toLowerCase() === locations[moveLocNum].monster.itemToKill.toLowerCase()){
				return true;
				break;
			}
		}
		return false;
	}
}

var checkItem = function(itemName){
	return player.pLocation.has(itemName);
}

var checkPreReq = function(moveLocNum, playerItems){
	var location = map.locations[moveLocNum];
	var prereq = location.prereq;
	if(prereq == 0){
		return true;
	}
	for(var i = 0; i < playerItems.length; i++){
		 if(prereq.indexOf(playerItems[i].toLowerCase()) >= 0){
			//player.drop(playerItems[i]);
			return true;
		}
	}
  return false;
}

var playerHas = function(itemName){
	if(player.items.indexOf(itemName.toLowerCase()) >= 0){
		return true;
		} else {
			return false;
		}
}

