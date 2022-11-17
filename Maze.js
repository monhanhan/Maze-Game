/**
 * This class procedurally generates a maze by recursively drawing walls.
 *
 * The level attribute represents a 2d array representation of the maze and where
 * the walls are located.
 *
 * The visited attribute tracks if a given maze position has been visited by a minotaur.
 */
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
    this.ICON_WALL = "*";
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

    // Add exterior walls to the maze
    this.createBlankLevel();

    // recursively draw the inside of the maze.
    this.makeMazeRecursive(1, 1, this.LEVEL_WIDTH - 2, this.LEVEL_HEIGHT - 2);
  }

  /**
   * This method makes an empty blank maze with four solid walls.
   */
  createBlankLevel() {
    // TODO: Make a change here so that there is an exit generated somewhere along the exterior wall. Save the position somewhere.

    // Make all the spaces blank. We will overwrite this later where walls need to be.
    for (let y = 0; y < this.LEVEL_HEIGHT; y++) {
      for (let x = 0; x < this.LEVEL_WIDTH; x++) {
        this.level[y][x] = " ";
        this.visited[y][x] = false;
      }
    }

    // top barrier
    for (let x = 0; x < this.LEVEL_WIDTH; x++) {
      this.level[0][x] = this.ICON_WALL;
      this.visited[0][x] = true;
    }

    // bottom barrier
    for (let x = 0; x < this.LEVEL_WIDTH; x++) {
      this.level[this.LEVEL_HEIGHT - 1][x] = this.ICON_WALL;
      this.visited[this.LEVEL_HEIGHT - 1][x] = true;
    }

    // left barrier
    for (let y = 0; y < this.LEVEL_HEIGHT; y++) {
      this.level[y][0] = this.ICON_WALL;
      this.visited[y][0] = true;
    }

    // Right barrier
    for (let y = 0; y < this.LEVEL_HEIGHT; y++) {
      this.level[y][this.LEVEL_WIDTH - 1] = this.ICON_WALL;
      this.visited[y][this.LEVEL_WIDTH - 1] = true;
    }
  }

  makeMazeRecursive(startX, startY, endX, endY) {
    //If the section into which we are adding walls is smaller than 3 units in any direction, do not add walls. Return instead. This is the base case.
    if (endX - startX <= 3 || endY - startY <= 3) {
      return;
    } else {
      // TODO: some of the walls are doubling up. find out why and fix it.
      // TODO: Find a way to prevent inaccessable cells.

      // randomly generate the wall locations
      var xWallLoc = this.randBetween(startY + 2, endY - 2);
      var yWallLoc = this.randBetween(startX + 2, endX - 2);

      // Modify maze so that the walls are actually drawn
      for (let x = startX; x <= endX; x++) {
        this.level[xWallLoc][x] = this.ICON_WALL;
        this.visited[xWallLoc][x] = true;
      }

      for (let y = startY; y <= endY; y++) {
        this.level[y][yWallLoc] = this.ICON_WALL;
        this.visited[y][yWallLoc] = true;
      }

      // Generates where the openings in the walls should go
      var xOpenLoc = this.randBetween(startX + 1, endX - 1);

      // Check to ensure the openings don't go in cross sections of the
      // walls.
      while (xOpenLoc == yWallLoc) {
        xOpenLoc = this.randBetween(startX + 1, endX - 1);
      }

      // Put the empty spot in the horizontal wall
      this.level[xWallLoc][xOpenLoc] = this.ICON_BLANK;
      this.visited[xWallLoc][xOpenLoc] = this.ICON_BLANK;

      // Generate the opening in the vertical wall
      var yOpenLoc = this.randBetween(startY + 1, endY - 1);

      // If the opening would fall in a cross section generate a new opening instead.
      while (yOpenLoc == xWallLoc) {
        yOpenLoc = this.randBetween(startY + 1, endY - 1);
      }

      // Put the opening in the vertical wall
      this.level[yOpenLoc][yWallLoc] = this.ICON_BLANK;
      this.visited[yOpenLoc][yWallLoc] = false;

      // recurse using the dimensions of our new mini-maze to make a smaller set of walls inside the ones we just made.

      // Upper-left corner
      this.makeMazeRecursive(startX, startY, yWallLoc, xWallLoc);

      // upper-right corner
      this.makeMazeRecursive(yWallLoc, startY, endX, xWallLoc);

      // lower-left corner
      this.makeMazeRecursive(startX, xWallLoc, yWallLoc, endY);

      // lower-right corner
      this.makeMazeRecursive(yWallLoc, xWallLoc, endX, endY);
    }
  }

  randBetween(start, end) {
    var range = end - start;
    return Math.floor(Math.random() * range) + 1 + start;
  }
}

// Below is debug code that will print the maze to the console. Consider repurposing it later to represent the maze.

const myMaze = new Maze();

var mazePrint = "";

for (let i = 0; i < myMaze.level.length; i++) {
  for (let j = 0; j < myMaze.level[0].length; j++) {
    mazePrint += myMaze.level[i][j];
  }
  mazePrint += "\n";
}

console.log(mazePrint);
