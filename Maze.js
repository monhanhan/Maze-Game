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

    //Actually make the maze.
    this.makeMaze();
  }

  makeMaze() {
    // TODO: consider adding ways to track the minotaur, key, exit and player.
    // TODO: add a boolean for visited spots. All Wall spaces and the exit should be considered visited.

    // Make a new 2D array to hold the maze.
    this.level = new Array(this.LEVEL_HEIGHT);

    // Make a second 2D array to track where the minotaur has visited.
    this.visited = new Array(this.LEVEL_HEIGHT);

    // Instantiating arrays in Javascript is kinda weird. This will help.
    // NOTE: from here on the coordinate system is y,x.
    for (let i = 0; i < this.LEVEL_HEIGHT; i++) {
      this.level[i] = new Array(this.LEVEL_WIDTH);
      this.visited[i] = new Array(this.LEVEL_WIDTH);
    }
  }

  /**
   * This method makes an empty blank maze with four solid walls.
   */
  createBlankLevel() {
    // TODO: Make a change here so that there is an exit generated somewhere along the exterior wall. Save the position somewhere.

    // Make all the spaces blank. We will overwrite this later where walls need to be.
    for (let y = 0; y < this.LEVEL_HEIGHT; y++) {
      for (let x = 0; x < this.LEVEL_WIDTH; x++) {
        level[y][x] = " ";
        visited[y][x] = false;
      }
    }

    // top barrier
    for (let x = 0; x < LEVEL_WIDTH; x++) {
      level[0][x] = ICON_WALL;
      visited[0][x] = true;
    }

    // bottom barrier
    for (let x = 0; x < LEVEL_WIDTH; x++) {
      level[LEVEL_HEIGHT - 1][x] = ICON_WALL;
      visited[LEVEL_HEIGHT - 1][x] = true;
    }

    // left barrier
    for (let y = 0; y < LEVEL_HEIGHT; y++) {
      level[y][0] = ICON_WALL;
      visited[y][0] = true;
    }

    // Right barrier
    for (let y = 0; y < LEVEL_HEIGHT; y++) {
      level[y][LEVEL_WIDTH - 1] = ICON_WALL;
      visited[y][LEVEL_WIDTH - 1] = true;
    }
  }
}
