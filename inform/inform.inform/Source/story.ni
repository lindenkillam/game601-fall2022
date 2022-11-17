"inform" by Linden Killam

Release along with the "Quixe" interpreter.



The player is in the Control Room. 

The timeToReachEngine is a number variable. The timeToReachEngine is 25.

Every turn:
	say "[if timeToReachEngine is greater than 19]You feel pretty good.[else if timeToReachEngine is greater than 14]You feel a slight, strange heaviness.[else if timeToReachEngine is greater than 9]Moving is becoming a struggle.[else if timeToReachEngine is greater than 4]You are in serious trouble, trying to put one foot in front of the other.[else]You can feel the dismbodied souls attaching themselves to you, interfering with your thoughts, as you stumble along.[end if]";
	now the timeToReachEngine is timeToReachEngine - 1;
	
Every turn when timeToReachEngine is less than 1:
	say "With your last breath, the thoughts of a thousand past living souls crowd out your own, and the darkness envelops you.";
	end the story;
	
Every turn when the player is in the Engine Room:
	say "You have reached the Engine Room. Now, this ship and its secrets will sink, and you will enter the next life knowing that you prevented a worldwide catastrophe.";
	end the story;
	
[ROOMS AND LAYOUT]

The Control Room is a room.

The Engine Room is a room.

The Central Files is a room.

The Locker Room is a room.

The Stairwell is a room.

The Engine Room Door is a locked door. The Engine Room Door is east of the Engine Room and north of Central Files.

The Stairwell is south of the Engine Room and west of Central Files.

[CONTROL ROOM]

The description of the Control Room is "This is your station, the control room, where you can see out across all sides of the ship."