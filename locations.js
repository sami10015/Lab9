var Location = function(name, descrip, item, prereq){
	this.name = name,
	this.items = [item],
	this.description = buildDescription(descrip,this.items),
	this.prereq = [prereq],
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

var buildDescription = function(descrip,itemList){
    
    var result = descrip + ' Room has ';
        console.log(itemList.length);
    if(itemList.length == 0){
        return result += 'nothing';
    } else {
      for(i in itemList){
          return result += itemList[i];
      }
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

var Forest = new Location('Forest', 'The location you are in now is a forest that is scattered with dark entities and horrifying creatures.', 'blue key');

var Asylum = new Location('Asylum', 'The location you are in now is an asylum with dead courpses everywhere and different pieces of equipment that were used back in the past.  The forest is behind you.', 'red key', 'blue key');

var Beach = new Location('Beach', 'You made it to the beach where fire is all over the sand');

locations.push(Forest);
locations.push(Asylum);
locations.push(Beach);

var connections = [
[0, 1, 1],
[1, 0, 1],
[1, 1, 0]
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

printOut(0);
