TextAdventure-Base
==================

An example that offers ideas on how to get started with a JavaScript-based HTML5 text adventure game.

Title:
  The Dark Forest

Opening of Game:
  Choices:
    You start off with the only option of waking up.  As soon as you type and enter wake up you will get the only the 
    option of looking around.  This option will be under the list of actions as "Look."

Setting/World:
  You will be in a forest during nighttime and will be moving through bushes, caves, etc.
  
Entities:
  There will be no other human being in the forest besides you.  The monsters will be dark ghouls that travel across 
  the forest.  They won't appear until the opening of the game is complete.
  
Actions:
  Look - Looks around room to see which directions you can go in and what items are available in the room
  Left
  Right
  Forward
  Backwards
  Pick Up - Only if you see an item in the room with the "Look" action
  Quit - Ends game
  Open - Used to open doors or cabinets in such you see in room with the look action.  Won't work if there
    is nothing to open.  Some things may only open if you have a key which is used with the "Pick Up" action
  Hide - If there is an enemy in the room you must use the hide action.  If you use any other action after you have
    used the look action and saw the enemy, you will die and the game will end.

End Game:
  The game can only end if you get through the game and make the right choices, such as knowing when to use the hide
  action.  Once you complete the game you wake up in your tree house and realize it was just a dream.