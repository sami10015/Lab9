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
		} else {			
			if(map.isConnected(fromLocNum, moveLocNum)){
				//Check if player items is same as prereq for location
				if(checkPreReq(moveLocNum,this.items)){
					this.pLocation = map.locations[moveLocNum];
				} else {
					alert('You do not have the required items to go to the next room');
				}
			}		
		}
	}
	//check if locName even exists in my map
	//Has to check if the location is adjacent to the current location FUCNTION		
	//if so, check if player has the prerequisites
	//If not tell the user so
	//Then must update the current location which would change the pLocation
};

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