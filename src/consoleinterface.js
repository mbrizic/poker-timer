function ConsoleInterface(
    blindsCalculator,
    gameModel,
    ui
) {
    this.generateGameFromBigBlinds = (levelTime, blinds) => {
        gameModel.levelTime = levelTime
        gameModel.levels = blindsCalculator.generateLevelsFromBigBlinds(blinds)
        gameModel.restart()
        ui.update()
    }

    this.generateGameFromSmallBlinds = (levelTime, blinds) => {
        gameModel.levelTime = levelTime
        gameModel.levels = blindsCalculator.generateLevelsFromSmallBlinds(blinds)
        gameModel.restart()
        ui.update()
    }

}