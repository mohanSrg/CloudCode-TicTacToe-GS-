// ====================================================================================================
//
// Cloud Code for takeTurn, write your code here to customise the GameSparks platform.
//
// For details of the GameSparks Cloud Code API see https://portal.gamesparks.net/docs.htm			
//
// ====================================================================================================

//Get our challenge information so we can store ScriptData to it.
var challenge = Spark.getChallenge(Spark.data.challengeInstanceId);

//We get the gameBoard we created in ChallengeStartedMessage
var gameBoard = challenge.getScriptData("gameBoard");

play();

function play()
{
   //We create a variable to accept the attributes we pass on to our event
   var pos = Spark.data.pos;
   var playerIcon = Spark.data.playerIcon;
   
   //We set the playerIcon (x or o) to a position on the gameBoard
   gameBoard[pos] = playerIcon;
   
   //We update our and save our gameBoard
   challenge.setScriptData("gameBoard", gameBoard);
   
   //Check to see if we've won
   if(checkWinner(playerIcon)){
       //If we have won, save the winner's name to ScriptData so we can easily reference 
       //it when searching for "COMPLETED" games
       Spark.sendRequest({"@class": ".LogEventRequest", "eventKey": "postScore", "score": 1});
       
       challenge.setScriptData("winner", Spark.player.displayName);
       
       //Set this challenge instance to won and which player won it.
       challenge.winChallenge(Spark.player);
   }
   
   //Check for a draw
   if(checkDraw())
   {
       //Save the "winner" as draw, so we can easily reference it when
       //search for "COMPLETED" games
       challenge.setScriptData("winner", "Draw");
       
       //En the challenge on a draw
       challenge.drawChallenge();
   }
}

//Check if we have three adjacent of our icon
function checkWinner(playerIcon)
{
  if (gameBoard[0] == playerIcon && gameBoard[1] == playerIcon && gameBoard[2] == playerIcon) return true;
                else if (gameBoard[3] == playerIcon && gameBoard[4] == playerIcon && gameBoard[5] == playerIcon) return true;
                else if (gameBoard[6] == playerIcon && gameBoard[7] == playerIcon && gameBoard[8] == playerIcon) return true;
                else if (gameBoard[0] == playerIcon && gameBoard[3] == playerIcon && gameBoard[6] == playerIcon) return true;
                else if (gameBoard[1] == playerIcon && gameBoard[4] == playerIcon && gameBoard[7] == playerIcon) return true;
                else if (gameBoard[2] == playerIcon && gameBoard[5] == playerIcon && gameBoard[8] == playerIcon) return true;
                else if (gameBoard[0] == playerIcon && gameBoard[4] == playerIcon && gameBoard[8] == playerIcon) return true;
                else if (gameBoard[2] == playerIcon && gameBoard[4] == playerIcon && gameBoard[6] == playerIcon) return true;
                else return false;
}

//Check if no space is empty
function checkDraw()
{
   for(i=0; i<8; i++)
   {
       if(gameBoard[i]=="")
       {
        return false;   
       }
   
   }
   
   return true;
}