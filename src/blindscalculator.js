function BlindsCalculator() {

    this.calculateBlindStructure = (totalTime, levelTime, numberOfPlayers, startingChipsPerPlayer, smallestChipDenomination) => {
        var totalTimeInMinutes = totalTime * 60
        var totalChipsInGame = numberOfPlayers * startingChipsPerPlayer
        var startingBigBlind = smallestChipDenomination * 2
        var bigBlindAtEndgamePoint = totalChipsInGame / 10 // approximated, 13 is more correct, but with 10 I'm avoiding rounding
        var numberOfLevelsUntilEndgame = Math.floor(totalTimeInMinutes / levelTime)

        // Figure out how to do this?
    }

    this.generateLevelsFromSmallBlinds = (smallBlinds) => {
        if (!isAscending(smallBlinds)) {
            throw new Error("Blinds should be increasing.")
        }

        return smallBlinds.map(sb =>
            new Level(sb, sb * 2)
        )
    }
    
    this.generateLevelsFromBigBlinds = (bigBlinds) => {
        if (!isAscending(bigBlinds)) {
            throw new Error("Blinds should be increasing.")
        }

        return bigBlinds.map(bb =>
            new Level(Math.floor(bb / 2), bb)
        )
    }
}