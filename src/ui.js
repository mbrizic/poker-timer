function Ui(
    gameModel
) {
    this.timer = document.getElementById("clock")
    this.level = document.getElementById("level")
    this.blinds = document.getElementById("blinds")
    this.structure = document.getElementById("structure")

    this.update = () => {
        var activeLevel = gameModel.activeLevel()

        ui.level.innerText = gameModel.activeLevelStep
        ui.timer.innerText = pad(gameModel.minutes) + ":" + pad(gameModel.seconds)
        ui.blinds.innerText = activeLevel.smallBlind + "/" + activeLevel.bigBlind

        ui.structure.innerText = ''
        gameModel.levels.map((level, index) => {
            var textContent = level.smallBlind + "/" + level.bigBlind
            var div = document.createElement("div")
            var text = document.createTextNode(textContent)
            div.classList = ["structure-item"]
            if (index == gameModel.activeLevelStep - 1) {
                div.classList.add("structure-item--active")
            }
            div.appendChild(text);   
            ui.structure.appendChild(div);
        })
    }

    function pad(number) {
        if (number.toString().length == 1) {
            return "0" + number
        } else {
            return number
        }
    }
}