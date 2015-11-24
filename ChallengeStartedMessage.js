// ====================================================================================================
//
// Cloud Code for ChallengeStartedMessage, write your code here to customise the GameSparks platform.
//
// For details of the GameSparks Cloud Code API see https://portal.gamesparks.net/docs.htm			
//
// ====================================================================================================

//Get our challenge information so we can store ScriptData to it.
var challenge = Spark.getChallenge(Spark.data.challenge.challengeId);

//This is our TicTacToe board.
var gameBoard = ["","","", "","","", "","",""];

//We save our board to this challenge instance with a key value pair.
challenge.setScriptData("gameBoard", gameBoard);