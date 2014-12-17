var Location = function(name, descrip, item, prereq, image, color){
	this.name = name,
	this.items = item,
	this.description = descrip,
	this.prereq = [prereq],
	this.image = image,
	this.color = color,
	this.monster = '',
	this.has = function(itemName){
		for(var i = 0; i < this.items.length; i++){
			var item = this.items[i];
			if(item.indexOf(itemName.toLowerCase()) >= 0){
				return true;
			} 
		}
		return false;
	},
	this.removeItem = function(itemName){
		var x = this.items.indexOf(itemName.toLowerCase());
		if(x >= 0){
			this.items.splice(x,1);
		}
	}
	//Check if monster is in the room by having a true of false
	//Then check if player has the required item to kill the monster
	//If he doesn't have the required item to kill the monster then change description and make it that the player died
	//Also change the background to a picture of a specific monster
	//Possibly make monster object so it has a property for its name and item to kill maybe items it drops and images
	//If player has item to kill the monster just display regular description
}

var buildDescription = function(itemList){
    
    var result = ' Room has ';
    if(itemList.length == 0 || itemList[0] == ''){
        return result += 'nothing';
    } else {
      for(i in itemList){
          result += itemList[i] + ', ';
      }
          return result;
    }
}



var connect = function(map, from, to) {
    map.connections[from][to] = 1;
    map.connections[to][from] = 1;
}

var disconnect = function(map, from, to) {
    map.connections[from][to] = 0;
    map.connections[to][from] = 0;
}
var bolden = function(word){
	return word.bold();
}


var locations = [];

var Forest = new Location('Forest', 'You don\'t know how you ended up here but you are in a Forest that is scattered with dark entities and horrifying creatures. They don\'t seem to harm you but they do recognize you are there.  After walking your way through them, you see an ' + bolden('Asylum') + ' in front of you with an awkward blue door.  You look around for items.  What would you like to do?', ['blue key', 'letter'], '', 'Forest.jpg', 'DarkGreen');

var Asylum = new Location('Asylum', 'You opened up the door with the key. You are in now an Asylum with dead courpses everywhere and different pieces of equipment that were used back in the past.  The ' + bolden('Forest') + ' disappeared.  You look around and see a door leading to a ' + bolden('Kitchen') + ' and a ' + bolden('Bedroom') + '.  The kitchen has a red lock on it, but the bedroom looks somewhat suspicious.  What would you like to do?', ['red key', 'goblin book'], 'blue key', 'Asylum.jpg', 'Crimson');

var Kitchen = new Location('Kitchen', 'You slowly walk into the kitchen.  You see dirty pans and plates everywhere and smell the stench of rotten food.  There is a ' + bolden('Dining Hall') + ' in front of you with a barricated door, and a ' + bolden('Closet') + '.  The ' + bolden('Asylum') + ' is behind you.  What would you like to do?', ['axe'], 'red key', 'Kitchen.jpg', 'Crimson');

var Bedroom = new Location('Bedroom', 'The Goblin is on the ground dead from the impact of your axe.  You look around and notice that there is a ' + bolden('Cloak Room') + ' in the back and a ' + bolden('Bathroom') + ' to your right with a green door.  The ' + bolden('Asylum') + ' is behind you.', ['memo#1'], '', 'Bedroom.png', 'MediumOrchid');

var diningHall = new Location('Dining Hall', 'You entered the Dining Hall and you are fatigued due to breaking down the door with the axe.  You see the purple ' + bolden('Parlour') + ' door in front of you', ['green key'], 'axe', 'Dining Hall.jpg', 'GhostWhite');

var Closet = new Location('Closet', 'You are terrified as you enter and notice the ghoul just sitting there.  He thankfully can\'t see you cause of your coat. The ' + bolden('Kitchen') + ' is behind you.', ['memo#2', 'purple key'], '', 'Closet.jpg', 'DarkOliveGreen');

var Parlour = new Location('Parlour', 'You entered the parlour and see a door that leads to the ' + bolden('Outside') + '.  The door is however locked.  This is your chance to leave but it requires a key.', ['memo#3'], 'purple key', 'Parlour.jpg', 'Blue');

var Outside = new Location('Outside', 'You have suddenly woken up and you are in your room.  You wonder what that was all about but you suddenly just go back to sleep.  Congratulations you won!  There are other endings so look around!', '', 'gold key', 'Heaven.png', 'White');

var Death = new Location('Death', 'You got killed by a monster.  You need to look in the room before you enter.  Also, you must make sure you have to correct item to kill the monster.  HINT: Look around for books and read them.', '', '');

var cloakRoom = new Location('Cloak Room', 'You enter the cloak room and see coats hanging everywhere.  Nothing too interesting in the room besides some solid coats.  The ' + bolden('Bedroom') + ' is behind you.', ['coat'], '', 'CloakRoom.jpg', 'White');

var Bathroom = new Location('Bathroom', 'You enter the bathroom there is water running in the sink under the mirror.', ['ghoul book'], 'green key', 'Bathroom.jpg', 'Olive');

var Mirror = new Location('Mirror', 'You delved into the mirror and find yourself in some other sort of dimension.  You see the ' + bolden('Bathroom') + ' in the distance.', ['gold key' , 'memo#4'], '', 'Mirror.jpg', 'Fuchsia');

locations.push(Forest);
locations.push(Asylum);
locations.push(Kitchen);
locations.push(Bedroom);
locations.push(diningHall);
locations.push(Closet);
locations.push(Parlour);
locations.push(Outside);
locations.push(Death);
locations.push(cloakRoom);
locations.push(Bathroom);
locations.push(Mirror);

var connections = [
[0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //Forest, Asylum, Kitchen, Bedroom, Dining Hall, Closet, Parlour, Outside, Death, Cloak Room, Bathroom, Mirror
[0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0], 
[0, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0],
[0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0],
[0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0],
[0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0],
[0], //One way to win game
[0], //Death by monster
[0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0]
];

var map = {
	locations : locations,
	connections : connections,
	getLocNumber : function(locName){
		var locNum = -1;
		for(i in this.locations){
			if(locName.toLowerCase() == this.locations[i].name.toLowerCase()){
				locNum = i;
				break; 
			}
		}
	return locNum;
	},
	isConnected : function(from, to){ 
		if(this.connections[from][to] == 1){
			return true;
		} else {
			return false;}
	}
};

var printOut = function(LocNum){
	for(i = 0; i < map.locations.length; i++){
		if(map.connections[LocNum][i] == 1){
			console.log(map.locations[LocNum].name + ' is connected to ' + map.locations[i].name); 
		}
	}	
}


