printOutfunction Location(name, descrip){
	this.name = name,
	this.description = descrip,
	this.items = [];	
}

var locations = [];

var Forest = new Location('Forest', 'The location you are in now is a forest that is scattered with dark entities and horrifying creatures');

var Asylum = new Location('Asylum', 'The location you are in now is an asylum with dead courpses everywhere and different pieces of equipment that were used back in the past');

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
	connections : connections
};

var printOut = function(LocNum){
	for(i = 0; i < map.locations.length; i++){
		if(map.connections[LocNum][i] == 1){
			console.log(map.locations[LocNum].name + ' is connected to ' + map.locations[i].name); 
		}
	}	
}

printOut(0);
