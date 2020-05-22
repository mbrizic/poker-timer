function ConsoleInterface(
    gameModel,
    ui
) {
    this.generateGameFromBigBlinds = (blinds) => {
        gameModel.levels = generateLevelsFromBigBlinds(blinds)
        gameModel.restart()
        ui.update()
    }

    this.generateGameFromSmallBlinds = (blinds) => {
        gameModel.levels = generateLevelsFromSmallBlinds(blinds)
        gameModel.restart()
        ui.update()
    }
}