+++
title = 'Minesweeper'
date = 2025-01-02T19:19:33-06:00
draft = false
+++
# Humble Beginnings
{{< soft src="/img/minesweeper/minesweeper.jpg" alt="Soft-styled image" caption="Windows XP is before even my time..." >}}
Minesweeper is a puzzle game that came out around the 1990s as a game for personal computers. If you are not familiar with the game I invite you to Google 'minesweeper' and play Google's version of the game. 

# Implementing Minesweeper
Your goal for this class will be to implement many of the functions required for a game of minesweeper. After you have these functions, you can then go and make your own version of the game. 

* `dimensions`: A tuple containing the baords dimensions `(nrows, ncolums)`
* `board`: a 2-dimensional array (implemented using nested lists) of integers and strings. game['board'][r][c] is '.' if square contains a mine, and it is a number indicating the number of neighboring mines otherwise.
* `state`: a string containing the state of the game ('ongoing' if the game is in-progress, 'victory' if the game has been won, and 'defeat' if the game has been lost). The state of a new game is always 'ongoing'.
* `visible`: a 2-dimensional array (implemented using nested lists) of Booleans. game['visible'][r][c] indicates whether the contents of square are visible to the player.
```python
{
    'dimensions': (4, 3),
    'board': [[1,  '.',  2],
              [1,   2,  '.'],
              [1,   2,   1],
              ['.', 1,   0]],
    'state': 'ongoing',
    'visible': [[True, False, False],
                [False, True, False],
                [False, True, True],
                [False, True, True]],
}
```