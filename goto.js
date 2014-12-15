goto : function(locName){
		var moveLocNum = map.getLocNumber(locName);
		var fromLocNum = map.getLocNumber(this.pLocation.name);
		if(map.getLocNumber(locName) == -1){
			alert('Location does not exist');
		} else if(map.isConnected(fromLocNum, moveLocNum)){
				//Check if player items is same as prereq for location
				if(checkPreReq(moveLocNum,this.items) ){  //Check if there is a monster and if you have the item to kill it
					this.pLocation = map.locations[moveLocNum];
				} else {
					alert('You might not have the required items to go into the next room.  There may be a monster in the room or you might not have the key to enter.  Look around!');
				}
			}		
		}
	}

	
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
	} else {
		this.pLocation = map.locations[moveLocNum];
	}
}

var kill = function(locName){
	var moveLocNum = map.getLocNumber(locName);
	if(locations[moveLocNum].monster === ''){
		return true;
	} else {
		for(var i = 0; i < player.items.length; i++){
			if(player.items[i].toLowerCase() === locations[moveLocNum].monster.itemToKill.toLowerCase()){
				return true;
				break;
			} else {
				return false;
			}
		}
	}
}