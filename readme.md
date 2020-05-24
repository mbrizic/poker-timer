# Simple poker timer

Simple poker timer, check it out: http://pokertimer.supercollider.hr/

## Customizing blind structure

The timer is using a blind structure fit for a 2.5h 5 player game with a 8000 chip set, with minimum chip denomination of 5. You probably want to customize that. To do so, open the browser console (F12) and enter the following:

`consoleInterface.generateGameFromBigBlinds(levelTime, blinds)`

Arguments:
- `level` - number in minutes for how long each level should last
- `blinds` - an array of big blind values you want to use, like `[10, 20, 40, 60, 80]`. Small blinds are calculated by halving big blind values.

If for some reason you want to set it up using small blind values, you can use `generateGameFromSmallBlinds` instead. Method signature is the same.


