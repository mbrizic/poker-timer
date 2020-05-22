var ui = new Ui()
var timer = null

ui.update()
onStartTimerPressed()

console.log(gameModel)

function onStartTimerPressed() {
    clearInterval(timer)
    timer = setInterval(onTimerTick, 1000)
}

function onPauseTimerPressed() {
    clearInterval(timer)
}

function onTimerTick() {
    gameModel.onTimeDecrement()
    ui.update()
}

function onNextLevelPressed() {
    gameModel.onNextLevel()
    ui.update()
    announceLevel()
}

function onPrevLevelPressed() {
    gameModel.onPrevLevel()
    ui.update()
    announceLevel()
}

function announceLevel() {
    var activeLevel = gameModel.activeLevel()
    var textToSpeak = new SpeechSynthesisUtterance(
        `Level ${gameModel.activeLevelStep}, the blinds are ${activeLevel.smallBlind} ${activeLevel.bigBlind}`
    );
    speechSynthesis.speak(textToSpeak);
}

function ConsoleGenerator() {
    this.fromBigBlinds = (blinds) => {
        gameModel.levels = generateLevelsFromBigBlinds(blinds)
        gameModel.activeLevelStep = 1
        ui.update()
    }

    this.fromSmallBlinds = (blinds) => {
        gameModel.levels = generateLevelsFromSmallBlinds(blinds)
        gameModel.activeLevelStep = 1
        ui.update()
    }
    
}

var consoleGenerator = new ConsoleGenerator()

function Ui() {
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