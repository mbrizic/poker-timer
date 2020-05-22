var timer = null

var sounds = new Sounds()
var gameModel = new GameModel(sounds)
var ui = new Ui(gameModel)
var consoleInterface = new ConsoleInterface(gameModel, ui);

ui.update()
sounds.listenForCommands(command => {
    switch (command) {
        case sounds.TIMER_STOP_COMMAND:
            onPauseTimerPressed()
            break;
        case sounds.TIMER_START_COMMAND:
            onStartTimerPressed()
            break;
        case sounds.TIMER_NEXT_COMMAND:
            onNextLevelPressed()
            break;
        case sounds.TIMER_PREV_COMMAND:
            onPrevLevelPressed()
            break;
        default:
            break;
    }
});

function onStartTimerPressed() {
    clearInterval(timer)
    timer = setInterval(onTimerTick, 1000)
}

function onPauseTimerPressed() {
    clearInterval(timer)
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