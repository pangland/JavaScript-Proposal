# Exploding Numbers
--------------------
[Live](https://pangland.github.io/Exploding-Numbers/)
## How To Play ##
The game is as follows: numbered blocks fall to the bottom of the screen, stacking toward the top. A row of number blocks starts out on the bottom. If any column reaches the top of the screen the player loses. A mathematical expression is visible on screen, and the user must number blocks whose digits form the number that equals the expression. Speed of each block is random within some range, and the game ends either when the user runs out of space or when he clears out the bottom row. The problems get harder as the game continues.

## Implementation ##

The critical features for the user is that block can be selected, that it is clear what blocks are selected, and that selecting the right blocks clears those blocks. There are no special block objects on screen, since all blocks are rendered with canvas. Instead, the canvas has a click handler that checks a clicked square to see if any of the blocks stored in `game` occupy that space. If so, that block toggles its color and either adds or removes that number block from the list of selected number blocks:

```javascript
handleNumber(number) {
  number.toggleColor();
  const indexOfNumber = this.selectedNumbers.indexOf(number);

  if (indexOfNumber === -1) {
    this.selectedNumbers.push(number);
  } else {
    this.selectedNumbers.splice(indexOfNumber, 1);
  }
}
```

If the selected numbers form the solution, the blocks are terminated and a new expression is generated:

```javascript
generateNewEquation(numberArray) {
  this.equationCount++;
  let solution;

  if (numberArray.length > 1) {
    solution = parseInt(numberArray.join(''));
  } else {
    solution = numberArray[0];
  }

  const operation = this.operations[Math.floor(Math.random() * 4)];
  switch (operation) {
    case '+':
      this.add(solution);
      break;
    case '-':
      this.subtract(solution);
      break;
    case '*':
      this.multiply(solution);
      break;
    case '/':
      this.divide(solution);
      break;
  }
}
```
With each new equation, `this.equationCount` is incremented. The division and subtraction methods can generate harder equations as `this.equationCount` gets larger. Addition and multiplication get harder because the likelihood of selecting a large number to solve for increases with the equation count.

## To Do ##

In the future I intend to:

- Allow a player to select which operators he wants to play with
- Incorporate music
