function Ui(
    gameModel
) {
    this.timer = document.getElementById("clock")
    this.level = document.getElementById("level")
    this.blinds = document.getElementById("blinds")
    this.structure = document.getElementById("structure")
    this.playPauseButtonImage = document.getElementById("playPauseButtonImage")

    this.update = () => {
        var activeLevel = gameModel.activeLevel()
     
        this.level.innerText = gameModel.activeLevelStep
        this.timer.innerText = pad(gameModel.minutes) + ":" + pad(gameModel.seconds)
        this.blinds.innerText = activeLevel.smallBlind + "/" + activeLevel.bigBlind
        this.playPauseButtonImage.src = gameModel.isGameRunning 
            ? "assets/pause.svg"
            : "assets/play.svg"

        this.structure.innerText = ''
        gameModel.levels.map((level, index) => {
            var textContent = level.smallBlind + "/" + level.bigBlind
            var div = document.createElement("div")
            var text = document.createTextNode(textContent)
            div.classList = ["structure-item"]
            if (index == gameModel.activeLevelStep - 1) {
                div.classList.add("structure-item--active")
            }
            div.appendChild(text);   
            this.structure.appendChild(div);
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