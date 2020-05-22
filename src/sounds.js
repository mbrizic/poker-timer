function Sounds() {
    this.TIMER_STOP_COMMAND = 'timer stop'
    this.TIMER_START_COMMAND = 'timer play'
    this.TIMER_NEXT_COMMAND = 'timer next'
    this.TIMER_PREV_COMMAND = 'timer previous'

    var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
    var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList
    var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent

    this.readText = (text) => {
        var audio = new Audio('files/blip.mp3');
        audio.play();

        var textToSpeak = new SpeechSynthesisUtterance(text);
        speechSynthesis.speak(textToSpeak);
    }

    this.listenForCommands = (onCommandDetected) => {
        var commands = [ this.TIMER_START_COMMAND, this.TIMER_STOP_COMMAND, this.TIMER_NEXT_COMMAND, this.TIMER_PREV_COMMAND ];
        var grammar = '#JSGF V1.0; grammar commands; public <command> = ' + commands.join(' | ') + ' ;'

        var recognition = new SpeechRecognition();
        var speechRecognitionList = new SpeechGrammarList();

        speechRecognitionList.addFromString(grammar, 1);

        recognition.grammars = speechRecognitionList;
        recognition.continuous = true;
        recognition.lang = 'en-US';
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;

        recognition.onresult = event => {
            console.log(event.results)
            var command = event.results[0][0].transcript;
            this.readText(command + "? Ok")
            onCommandDetected(command)
        }

        recognition.start();
    }
  
}