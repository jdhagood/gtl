+++
title = 'Cellular Automata'
draft = false
+++


# Nested for loops
If you put a for loop inside of a for loop, we call this a nested for loop.
```python
for i in range(5):
    for j in range(5):
        print("i = " + str(i) + ", j = " + str(j))
```
Which prints to the terminal 25 lines. (why 25?)
```
i = 0, j = 0
i = 0, j = 1
i = 0, j = 2
i = 0, j = 3
i = 0, j = 4
i = 1, j = 0
i = 1, j = 1
i = 1, j = 2
i = 1, j = 3
i = 1, j = 4
i = 2, j = 0
i = 2, j = 1
i = 2, j = 2
i = 2, j = 3
i = 2, j = 4
i = 3, j = 0
i = 3, j = 1
i = 3, j = 2
i = 3, j = 3
i = 3, j = 4
i = 4, j = 0
i = 4, j = 1
i = 4, j = 2
i = 4, j = 3
i = 4, j = 4
```
Notice how I changed the name of the iteration variable on the inner for loop to 'j'. What happens if I still named it 'i'?


This is a powerful technique and will require some practice to master. Try to figure out how this code works that prints off a multiplication table in the terminal.
```python
for i in range(1, 11):
    current_line = ""
    for j in range(1, 11):
        current_line += str(i).zfill(2) + "x" + str(j).zfill(2) + " = " + str(i*j).zfill(3) + "  "
    print(current_line)
```
Play around with this code. Even though we have not discussed it, can you figure out what the string method .zfill() does? Can you make it such that we avoid redundantly printing out multiplication facts that are actually the same under commutativity (i.e. after printing "02x07 = 014" we do not want to print "07x02 = 014")


# For loops with lists and strings
You will oftentimes find yourself needing to loop over the elements of a list. One way to do this is iterating over the indexes of the list using range:
```python
countries = ["Italy", "USA", "Angola", "China", "Australia", "Brazil"]
for i in range(len(countries)):
    print(countries[i])
```
While this works, python offers us a much more elegant way to do this:
```python
countries = ["Italy", "USA", "Angola", "China", "Australia", "Brazil"]
for country in countries:
    print(country)
```
This helps reduce both the number of keystrokes and improve readability of your code (literally, the code does exactly what it says!).


This trick also works for the letters in a string. If we wanted to print "Italy" character by character we could use this code:
```python
for letter in "Italy":
    print(letter)
```
and indeed we get
```
I
t
a
l
y
```
You may find yourself wanting to iterate over a list also keeping track of the index. It may seem like you need to again use 'for i in range(len(my_list))' but python comes in to save the syntactical day with 'enumerate'. We can use it like so
```python
countries = ["Italy", "USA", "Angola", "China", "Australia", "Brazil"]
for i, country in enumerate(countries):
    print(str(i) + ". " + country)
```
which prints out to the terminal:
```
0. Italy
1. USA
2. Angola
3. China
4. Australia
5. Brazil
```
To understand why we can do this we can convert our enumerate object into a list.
```python
>>> countries = ["Italy", "USA", "Angola", "China", "Australia", "Brazil"]
>>> enum_countries = enumerate(countries)
>>> enum_countries
<enumerate object at 0x000002B762EB5670>
>>> list(enum_countries)
[(0, 'Italy'), (1, 'USA'), (2, 'Angola'), (3, 'China'), (4, 'Australia'), (5, 'Brazil')]
```
So enumerate basically puts each element in a list in a tuple with its index. When we call our for loop we can unpack these tuples to two variables representing the index and element for each element in our list.


# Cellular Automata
I invite you to google "Conway's Game of Life." You will be greeted with one of Google's easter eggs in the form of some little white squares on the side of your screen showing how much nerds love this little game.
{{< soft src="/img/cellular_atomata/Conway.gif" alt="Soft-styled image" caption="Conway's Game of Life" >}}
The pattern of squares you see is due to a simple ruleset
{{< soft src="/img/cellular_atomata/conway_rules.png" alt="Soft-styled image" caption="Conway's Game of Life" >}}
These rules were chosen by mathematician John Conway and colleagues while playing this game on a Go board because they produced the most interesting outputs. I invite you to play around with Conway's game of life [here](https://playgameoflife.com/)! (I also cannot help but bring up the fact that [Conway's game of life is turing complete](https://www.alanzucconi.com/2020/10/13/conways-game-of-life/) which means that we can represent the [game of life in the game of life](https://www.youtube.com/watch?v=xP5-iIeKXE8).)


We will explore Conway's game of life on the pset, but for now let's implement a simpler 1D cellular automata.


Steven Wolfram (computer scientist, physicist, businessman, fellow of the American Mathematical Society and all around smart guy) helped popularize [elementary cellular atomota](https://mathworld.wolfram.com/ElementaryCellularAutomaton.html). These are 1D cellular automata. Like in Conway's Game of Life, cells can either be alive or dead, but unlike Conway's game of life, each cell only has 2 neighbors instead of 8.


Because we only need to look at three cells to determine if a cell is alive or dead in the next generation (the left neighbor, the cell itself, and the right neighbor), there are only 2x2x2=8 cases to consider. Wolfram came up with a nifty way to represent these rules. If we let the dead state be a binary 0 and the alive state be a binary 1, then we can consider what number is represented by these cells (alive dead alive = 101 = 5). We then decide, for each number between 0 and 7, if it corresponds to an alive cell. This means that there are 2x2x2x2x2x2x2x2=256 possible rules for us to construct. The figure below demonstrates some of these rules


{{< soft src="/img/cellular_atomata/elementary_rules.jpg" alt="Soft-styled image" caption="Elementary Cellular Automata Rules" >}}


To visualize the evolution of these cellular automata we can print out sequential generations. Newer generations are printed below the older generations. Different rules lead to different printouts.


{{< soft src="/img/cellular_atomata/evolution.svg" alt="Soft-styled image" caption="Elementary Cellular Automata Evolutions" >}}


Let's implement this in python. First we need to figure out how to represent our cells and rules. Lists give us a very nifty way to do this. We represent an alive cell as 1 and a dead cell as 0.


```python
# Define the size of the cellular automaton
SIZE = 55


# Initialize a list of cells with all cells in the "dead" state (0)
cells = [0] * SIZE


# Set the middle cell to the "alive" state (1)
cells[SIZE // 2] = 1


# Define the rule set as a list of binary values (e.g., Rule 220)
rule = [1, 1, 0, 1, 1, 1, 0, 0]
```


We now want to be able to update our cell list based on our rules list. Let's make a function that takes in a list of cells and a rules list and outputs the next generation of cells. One small thing that we need to decide is how we handle the edges out of the cell list. I am choosing to always keep the edges in the dead state, but feel free to play around with other ways to handle the edge case like wrapping around (the first and last cell are neighbors).


```python
def get_next_generation(cells, rule):
    """
    Compute the next generation of cells based on the current generation
    and the given rule set.


    Parameters:
        cells (list[int]): The current generation of cells (0 or 1).
        rule (list[int]): The rule set for the automaton (8 binary values).


    Returns:
        list[int]: The next generation of cells.
    """
    # Start with the edges in the dead state (0)
    next_generation = [0]
   
    # Reverse the rule to match our indexing
    rule = rule[::-1]
   
    # Compute the state of each cell in the next generation
    for i in range(1, len(cells) - 1):
        left_cell = cells[i - 1]
        middle_cell = cells[i]
        right_cell = cells[i + 1]


        # Calculate the rule index using the binary representation of the neighbors
        rule_index = (2 ** 2) * left_cell + (2 ** 1) * middle_cell + (2 ** 0) * right_cell


        # Determine the new state of the cell based on the rule
        new_cell = rule[rule_index]
        next_generation.append(new_cell)


    # Add the rightmost edge in the dead state (0)
    next_generation.append(0)
    return next_generation
```


We are nearly ready to test this out. We will print our cells to the terminal to visualize them. Let's make a print method to make it easier to see what is going on


```python
def print_cells(cells):
    """
    Print the current state of the cells as a grid.


    Parameters:
        cells (list[int]): The list of cells (0 or 1).
    """
    cells_string = ""
    for cell in cells:
        if cell == 1:
            cells_string += "■"  # Alive cell
        else:
            cells_string += " "  # Dead cell
    print(cells_string)
```


Now let's put it all together. I invite you to play around with the rules and see what patterns can emerge. Some are boring, some are predictable, and some are very chaotic (like the famous rule 30).
{{< rawhtml >}}
<iframe src="https://trinket.io/embed/python/a3aeb9bfa223" width="100%" height="600" frameborder="0" marginwidth="0" marginheight="0" allowfullscreen></iframe>
{{< /rawhtml >}}


# Main Takeaways
In this lecture we covered a lot of ground. We discussed nested for loops to allow us to iterate over two or more values at once. Just as we can image one for loop iterating over a 1D list of numbers, n-nested for loops can iterate over an n-D array of numbers.


We saw how for loops can help us repeat blocks of code multiple times with an incrementing variable. We also saw how easy python makes it for us to iterate through a list or string with the 'in' keyword.


We ended the lecture by applying some of these concepts to cellular automata and exploring how simple rulesets can lead to complex behaviors. This idea of simplicity leading to complexity is a common thread throughout math, physics, and computer science and seems to be an underlying property of the universe. At least according to Steven Wolfram!