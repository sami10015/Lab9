var Monster = function(name, itemToKill, item, image, color){
	this.name = name,
	this.itemToKill = itemToKill,
	this.item = item,
	this.image = image,
	this.color = color;
}

var Goblin = new Monster('Goblin', 'axe', '', 'Goblin.jpg', 'Green');
var Ghoul = new Monster('Ghoul', 'coat', '', 'Ghoul.jpg', 'Red');
var monsters = [];
monsters.push(Goblin);
map.locations[3].monster = Goblin;
map.locations[5].monster = Ghoul;


var Book = function(name, descrip){
	this.name = name,
	this.description = descrip;
}
var Books = [];
var GoblinBook = new Book('Goblin Book', 'The Goblin is a tricky creature, but in all honesty if you have an item such as an axe to kill it.  If not, you might experience a horrible death due to beating.');
Books.push(GoblinBook);
var Letter = new Book('Letter', 'There is no escape from what you have done.  Not even in your sleep can you run away.');
var memoOne = new Book('Memo#1', 'How could you have done this? Why would you do this to your family?');
var GhoulBook = new Book('Ghoul Book', 'The Ghoul is one of the most horrifying creatures in this building.  However, if you can hide yourself with a coat, he will not see you.');
var memoTwo = new Book('Memo#2', 'Your family will never forgive you.  You left them there burning.  Unforgivable.');
var memoThree = new Book('Memo#3', 'You should take a second and look yourself in the mirror.  To the point where you can enter it.');
var memoFour = new Book('Memo#4', 'You finally forgave yourself.  Leave this nightmare.');
Books.push(Letter);
Books.push(memoOne);
Books.push(GhoulBook);
Books.push(memoTwo);
Books.push(memoThree);
Books.push(memoFour);

var checkBook = function(itemName, bookArray){
	for(var i = 0; i < bookArray.length; i++){
		if(itemName.toLowerCase() === bookArray[i].name.toLowerCase()){
			return alert(bookArray[i].description); 
			break;
		}
	}
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
			var monster = 'a ' + locationMonster;
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

