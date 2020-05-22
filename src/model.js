var DEFAULT_LEVEL_TIME = 10;
var STARTING_TIME_MINUTES = DEFAULT_LEVEL_TIME;
var STARTING_TIME_SECONDS = 00;

function GameModel(
    sounds
) {
    this.minutes = STARTING_TIME_MINUTES;
    this.seconds = STARTING_TIME_SECONDS;
    this.levelTime = DEFAULT_LEVEL_TIME;
    this.activeLevelStep = 1;
    this.levels = generateLevelsFromBigBlinds([20, 30, 40, 60, 100, 150, 200, 300, 400, 600, 800, 1000]);

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
            throw new Error("No further steps");
        }

        this.activeLevelStep = this.activeLevelStep + 1;
        this.minutes = STARTING_TIME_MINUTES;
        this.seconds = 00;
        announceLevel();
    }

    this.goToPrevLevel = () => {
        if (this.activeLevelStep == 1) {
            throw new Error("This is the first step.");
        }

        this.activeLevelStep = this.activeLevelStep - 1;
        announceLevel();
    }

    this.restart = () => {
        this.minutes = STARTING_TIME_MINUTES;
        this.seconds = STARTING_TIME_SECONDS;
        this.levelTime = DEFAULT_LEVEL_TIME;
        this.activeLevelStep = 1;
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

function generateLevelsFromSmallBlinds(smallBlinds) {
    return smallBlinds.map(sb =>
        new Level(sb, sb * 2)
    )
}

function generateLevelsFromBigBlinds(bigBlinds) {
    return bigBlinds.map(bb =>
        new Level(Math.floor(bb / 2), bb)
    )
}