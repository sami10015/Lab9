var Location = function(name, descrip, item, prereq, image, color){
	playerName = '';
	this.name = name,
	this.items = [item],
	this.description = descrip,
	this.prereq = [prereq],
	this.image = image,
	this.color = color,
	this.has = function(itemName){
		if(this.items.indexOf(itemName.toLowerCase()) >= 0){
			return true;
		} else {
			return false;
		}
	},
	this.removeItem = function(itemName){
		var x = this.items.indexOf(itemName.toLowerCase());
		if(x >= 0){
			this.items.splice(x,1);
		}
	};	
}

var buildDescription = function(itemList){
    
    var result = ' Room has ';
    if(itemList.length == 0 || itemList[0] == ''){
        return result += 'nothing';
    } else {
      for(i in itemList){
          result += itemList[i] + ' ';
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

var locations = [];

var Forest = new Location('Forest', 'You don\'t know how you ended up here but you are in a Forest that is scattered with dark entities and horrifying creatures. They don\'t seem to harm you but they do recognize you are there.  After walking your way through them, you see an Asylum in front of you with an awkward blue door.  You look around for items.  What would you like to do?', 'blue key', '', 'Forest.jpg', 'DarkGreen');

var Asylum = new Location('Asylum', 'You opened up the door with the key that you picked up. You are  in now an asylum with dead courpses everywhere and different pieces of equipment that were used back in the past.  The forest is behind you.  You look around and see a door leading to a kitchen and a bedroom.  The kitchen has a lock on it, but the bedroom looks somewhat suspicious.  What would you like to do?', 'red key', 'blue key', 'Asylum.jpg', 'Crimson');

var Kitchen = new Location('Kitchen', 'You are in a kitchen', 'axe', 'red key', 'Kitchen.jpg', 'Crimson');

var Bedroom = new Location('Bedroom', 'You are now dead', '', '');

var diningHall = new Location('Dining Hall', 'You are in a Dining Hall.  You see the outside', '', 'axe');

var Closet = new Location('Closet', 'You are now dead', '', '');

var Outside = new Location('Outside', 'You are outside', 'star', 'axe');

var Heaven = new Location('Heaven', 'You are in heaven', '', 'star');


locations.push(Forest);
locations.push(Asylum);
locations.push(Kitchen);
locations.push(Bedroom);
locations.push(diningHall);
locations.push(Closet);
locations.push(Outside);
locations.push(Heaven);

var connections = [
[0, 1, 0, 0, 0, 0, 0, 0], //Forest, Asylum, Kitchen, Bedroom, Dining Hall, Closet, Outside, Wake up
[1, 0, 1, 1, 0, 0, 0, 0],
[0, 1, 0, 0, 1, 1, 0, 0],
[0],
[0, 0, 1, 0, 0, 0, 1, 0],
[0],
[0, 0, 0, 0, 1, 0, 0, 1],
[0]
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


