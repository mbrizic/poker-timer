var timer = null

var sounds = new Sounds()
var blindsCalculator = new BlindsCalculator()
var gameModel = new GameModel(sounds, blindsCalculator)
var ui = new Ui(gameModel)
var consoleInterface = new ConsoleInterface(blindsCalculator, gameModel, ui);

ui.update()
// sounds.listenForCommands(command => {
//     switch (command) {
//         case sounds.TIMER_STOP_COMMAND:
//             onPauseTimerPressed()
//             break;
//         case sounds.TIMER_START_COMMAND:
//             onStartTimerPressed()
//             break;
//         case sounds.TIMER_NEXT_COMMAND:
//             onNextLevelPressed()
//             break;
//         case sounds.TIMER_PREV_COMMAND:
//             onPrevLevelPressed()
//             break;
//         default:
//             break;
//     }
// });

function onPlayPauseButtonPressed() {
    if (gameModel.isGameRunning) {
        gameModel.pauseGame()
        clearInterval(timer)
    } else {
        gameModel.startGame()
        clearInterval(timer)
        timer = setInterval(onTimerTick, 1000)
    }

    sounds.playBlip()
    ui.update()
}

function onTimerTick() {
    gameModel.decrementTime()
    ui.update()
}

function onNextLevelPressed() {
    gameModel.goToNextLevel()
    ui.update()
}

function onPrevLevelPressed() {
    gameModel.goToPrevLevel()
    ui.update()
}