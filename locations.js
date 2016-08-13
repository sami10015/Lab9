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
			if(item.toLowerCase() === itemName.toLowerCase()){
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
}

var buildDescription = function(itemList){
    
    var result = ' Room has ';
    if(itemList.length == 0 || itemList[0] == ''){
        return result += 'nothing';
    } else {
      for(i in itemList){
          result += bolden(itemList[i]) + ', ';
      }
		  result = result.substring(0,result.length-2);
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

var Forest = new Location('Forest', 'You don\'t know how you ended up here but you are in a Forest that is scattered with dark entities and horrifying creatures. After walking your way through, you see an ' + bolden('Asylum') + ' in front of you with an awkward blue door.  You look around for items.  What would you like to do?', ['blue key', 'letter'], '', 'Forest.jpg', 'DarkGoldenRod');

var Asylum = new Location('Asylum', 'You opened up the door with the key. You are in now an Asylum with corpses everywhere and different pieces of equipment that were used in the past.  The ' + bolden('Forest') + ' disappeared.  You look around and see a door leading to a ' + bolden('Kitchen') + ' and a ' + bolden('Bedroom') + '.  The kitchen has a red lock on it, but the bedroom looks somewhat suspicious.  What would you like to do?', ['red key', 'goblin book'], 'blue key', 'Asylum.jpg', 'Crimson');

var Kitchen = new Location('Kitchen', 'You slowly walk into the kitchen.  You see dirty pans and plates everywhere and smell the stench of rotten food.  There is a ' + bolden('Dining Hall') + ' in front of you, and a ' + bolden('Closet') + ' to your left.  The ' + bolden('Asylum') + ' is behind you.  What would you like to do?', '', 'red key', 'Kitchen.jpg', 'Crimson');

var Bedroom = new Location('Bedroom', 'The Goblin is on the ground dead from the impact of your axe.  You look around and notice that there is a ' + bolden('Cloak Room') + ' in the back and a ' + bolden('Bathroom') + ' to your right with a green door.  The ' + bolden('Asylum') + ' is behind you.', ['memo#1'], '', 'Bedroom.png', 'MediumOrchid');

var diningHall = new Location('Dining Hall', 'You entered the Dining Hall and feel as if you have been here before.  You see the purple ' + bolden('Parlour') + ' door in front of you, and notice a door leading to an ' + bolden('Office') + ' to your right.  The ' + bolden('Kitchen') + ' is behind you.', ['green key'], '', 'Dining Hall.jpg', 'GhostWhite');

var Closet = new Location('Closet', 'You are terrified as you enter and notice the ghoul just sitting there.  He thankfully can\'t see you because of your coat. The ' + bolden('Kitchen') + ' is behind you.', ['memo#2', 'purple key'], '', 'Closet.jpg', 'DarkOliveGreen');

var Parlour = new Location('Parlour', 'You entered the parlour and see a door that leads to the ' + bolden('Outside') + '.  However, the door is locked.  This is your chance to leave but it requires a key.  The ' + bolden('Dining Hall') + ' is behind you.', ['memo#3'], 'purple key', 'Parlour.jpg', 'Blue');

var Outside = new Location('Outside', 'You have suddenly woken up and you are in your room.  You look over and see your family portrait to your right.  You then remember that dreadful day when the house burned down.  You remember the horrible times in the psychiatric hospital, but you breathe and realize that you are better now.  It is all in your past and there is nothing you can do about it.  It was not your fault.  You go back to sleep.  Congratulations you completed the dream!', '', 'gold key', 'Heaven.png', 'White');

var Death = new Location('Death', 'You got killed by a monster.  You need to look in the room before you enter.  Also, you must make sure you have to correct item to kill the monster.  HINT: Look around for books and read them.', '', '');

var cloakRoom = new Location('Cloak Room', 'You enter the cloak room and see coats hanging everywhere.  Nothing too interesting in the room besides some coats.  The ' + bolden('Bedroom') + ' is behind you.', ['coat'], '', 'CloakRoom.jpg', 'White');

var Bathroom = new Location('Bathroom', 'You enter the bathroom, there is water running in the sink under the mirror.  The ' + bolden('Bedroom') + ' is behind you.', '', 'green key', 'Bathroom.jpg', 'DarkCyan');

var Mirror = new Location('Mirror', 'You delved into the mirror and find yourself in some other sort of dimension.  You see the ' + bolden('Bathroom') + ' in the distance.', ['gold key' , 'memo#4'], '', 'Mirror.jpg', 'Fuchsia');

var Office = new Location('Office', 'You enter that an office that you feel was yours at one point.  The ' + bolden('Dining Hall') + ' is behind you.', ['axe', 'ghoul book'], '', 'Office.jpg', 'BlueViolet');

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
locations.push(Office);

var connections = [
[0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], //Forest, Asylum, Kitchen, Bedroom, Dining Hall, Closet, Parlour, Outside, Death, Cloak Room, Bathroom, Mirror, Office
[0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0], 
[0, 1, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0],
[0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0],
[0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
[0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0],
[0], //One way to win game
[0], //Death by monster
[0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
[0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0],
[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
[0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0]
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


