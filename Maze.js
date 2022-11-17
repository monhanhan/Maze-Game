class Maze {
  /*
   * This class has the following attributes:
   *
   * ICON_WALL is the icon representing a wall space.
   * ICON_BLANK is the icon representing a blank space
   * ICON_KEY is the icon representing a key
   * ICON_EXIT  is the icon representing an exit
   * ICON_MINOTAUR is the icon representing a minotaur
   * ICON_PLAYER is the icon representing the player
   *
   * LEVEL_HEIGHT is the height of the maze
   * LEVEL_WIDTH is the width of the maze
   *
   */

  constructor() {
    //Set all my constants
    this.ICON_WALL = "#";
    this.ICON_BLANK = " ";
    this.ICON_KEY = "K";
    this.ICON_EXIT = "E";
    this.ICON_PLAYER = "P";
    this.ICON_MINOTAUR = "M";

    // These can be changed without breaking the program
    this.LEVEL_HEIGHT = 25;
    this.LEVEL_WIDTH = 80;

    // Make a new 2D array to hold the maze.
    this.level = new Array(this.LEVEL_HEIGHT);

    // Instantiating arrays in Javascript is kinda weird. This will help.
    // NOTE: from here on the coordinate system is y,x.
    for (let i = 0; i < this.LEVEL_HEIGHT; i++) {
      this.level[i] = new Array(this.LEVEL_WIDTH);
    }
  }
}
