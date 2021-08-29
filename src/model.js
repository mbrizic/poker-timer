var DEFAULT_LEVEL_TIME = 10;
var STARTING_TIME_MINUTES = DEFAULT_LEVEL_TIME;
var STARTING_TIME_SECONDS = 0;

function GameModel(
    sounds,
    blindsCalculator
) {
    this.minutes = STARTING_TIME_MINUTES;
    this.seconds = STARTING_TIME_SECONDS;
    this.levelTime = DEFAULT_LEVEL_TIME;
    this.activeLevelStep = 1;
    this.isGameRunning = false;
    this.levels = blindsCalculator.generateLevelsFromBigBlinds([10, 20, 30, 40, 60, 80, 100, 200, 250, 400, 600, 1000]);

    this.activeLevel = () => {
        return this.levels[this.activeLevelStep - 1];
    }

    this.decrementTime = () => {
        this.seconds = this.seconds - 1

        if (this.seconds < 0) {
            this.minutes = this.minutes - 1
            this.seconds = 59
        }

        if (this.minutes == 0 && this.seconds == 00) {
            this.goToNextLevel()
        }
    }

    this.goToNextLevel = () => {
        if (this.activeLevelStep == this.levels.length) {
            extrapolateAndAddNewLevel()
        }

        this.activeLevelStep = this.activeLevelStep + 1;
        this.minutes = this.levelTime;
        this.seconds = STARTING_TIME_SECONDS;
        announceLevel();
    }

    this.goToPrevLevel = () => {
        if (this.activeLevelStep == 1) {
            throw new Error("This is the first step.");
        }

        this.activeLevelStep = this.activeLevelStep - 1;
        this.minutes = this.levelTime;
        this.seconds = STARTING_TIME_SECONDS;
        announceLevel();
    }

    this.pauseGame = () => {
        this.isGameRunning = false;
    }

    this.startGame = () => {
        this.isGameRunning = true;
    }

    this.restart = () => {
        this.minutes = this.levelTime;
        this.seconds = STARTING_TIME_SECONDS;
        this.activeLevelStep = 1;
    }

    var extrapolateAndAddNewLevel = () => {
        var lastLevel = getLastElement(this.levels);
        var newLevel = copy(lastLevel);

        newLevel.smallBlind = lastLevel.smallBlind * 2;
        newLevel.bigBlind = lastLevel.bigBlind * 2;
        newLevel.ante = lastLevel.ante * 2;

        this.levels.push(newLevel)
    }

    var announceLevel = () => {
        var activeLevel = this.activeLevel();
        var textToSpeak = `Level ${this.activeLevelStep}, the blinds are ${activeLevel.smallBlind} ${activeLevel.bigBlind}`;
        sounds.readText(textToSpeak);
    }
}

function Level(sb, bb, ante, length) {
    this.smallBlind = sb
    this.bigBlind = bb || sb * 2
    this.ante = ante || 0
    this.length = length || DEFAULT_LEVEL_TIME
}

Level.fromBigBlind = function (bb) {
    return new Level(Math.floor(bb / 2), bb)
}

Level.fromSmallBlind = (sb) => {
    return new Level(sb, sb * 2)
}