function GameStateStorage() {
    var key = "gameState"

    this.save = (state) => 
        localStorage.setItem(key, state)
    
    this.get = () => 
        localStorage.getItem(key)
}