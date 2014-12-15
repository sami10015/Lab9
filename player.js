var Monster = function(name, itemToKill, item, image){
	this.name = name,
	this.itemToKill = itemToKill,
	this.item = item,
	this.image = image;
}

var getMonster = function(monsterName, monsters){
	for(var i = 0; i < monstersArray; i++){
		if(monsterName.toLowerCase() === monstersArray[i].name.toLowerCase()){
			return monstersArray[i];
		} else {
			alert('That is not a monster!');
		}
	}
}

var Goblin = new Monster('Goblin', 'axe', '', 'Outside.jpg')
var monsters = [];
monsters.push(Goblin);
map.locations[3].monster = Goblin;


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
			this.pLocation = map.locations[8];
			var monsterImage = map.locations[moveLocNum].monster.image;
			console.log(monsterImage);
			document.body.style.backgroundImage = "url('"+monsterImage+"')";
			document.body.style.backgroundSize = 'cover';
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
	}
	//check if locName even exists in my map
	//Has to check if the location is adjacent to the current location FUCNTION		
	//if so, check if player has the prerequisites
	//If not tell the user so
	//Then must update the current location which would change the pLocation
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
