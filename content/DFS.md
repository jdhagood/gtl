+++
title = 'DFS'
draft = false
+++
# Sets
If you have have so much as dipped your toes in higher level math, you have likely heard about sets. All of modern math is built on top of sets.
In math a set is an unordered collection of objects. Sets can be constructed to hold _almost_ anything anything from numbers to functions to cats and dogs to other sets ([Russel](https://en.wikipedia.org/wiki/Russell%27s_paradox) has entered the chat). 

In python we can create a set using curly braces.
```python
>>> a = {1, 2, 3}
>>> type(a)
<class 'set'>
>>> print(a)
{1, 2, 3}
```
The superpower of sets comes from our ability to check if an element is in the set.
```python
>>> 1 in a
True
>>> 2 in a
True
>>> 3 in a
True
>>> 4 in a
False
```
Notice that this is the same syntax we used to check if an element was in a list. However, checking if an element is in a set is much faster than checking if an element is in a list for very large collections of items. This is because checking membership in a list requires itterating over the list, which runs in O(n) time for n elements in the list. However, sets use a clever hash function to check membership, so they run in O(1) time. The amount of time to check if an element is in a very large set vs a very small set is the same! Note that this hasing method to access set elements means that we can't store mutalbe objects inside. 

```python
>>> my_set = {[1, 2, 3]}
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
TypeError: unhashable type: 'list'
>>> my_set = {(1, 2, 3)} # must use the immutable cousin of the list, the tuple
>>>
```
Sets also have quite a few more nifty tricks up their sleves. You can add elements to sets like so
```python
>>> a = {1, 2, 3}
>>> a.add(4)
>>> a
{1, 2, 3, 4}
>>> a.add(4)
>>> a
{1, 2, 3, 4}
```
The fact that we can do this means that sets, like lists, are mutable and will alise together if you are not careful! (if you are curious, just how the existence of mutable lists implies the existence of inmutable tuples, the existence of mutable sets implies the existence of immutalbe [frozensets](https://www.programiz.com/python-programming/methods/built-in/frozenset))

Notice how the set did not change when we tried to add 4 for the second time. This is because sets will hold only one instance of an object. We can use this to our advantage to get rid of duplicate objects in other data structures. If we have a list and only care about the unique elements in the list, we could convert it to a set and iterate over the values in the set
```python
>>> duplicated_list = [1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 3, 3, 4, 5, 6] 
>>> for i in set(duplicated_list):
...     print(i)
...
1
2
3
4
5
6
```
As always, this is not a 100% comprehensive guide on sets (not even close!). I encourage you to [read the docs!](https://python-reference.readthedocs.io/en/latest/docs/sets/) (if I had a nickel for every time I heard that in CS...) There are some pretty nifty things you can do with sets that allow you to increase code readiblity and keystrokes. 

# Breadth First Search
Before we talk about breadth first search, lets see it in action. 

A slime mold is a type of eukaryoitic protist. My favorite slime mold is the [physarium polycephalum](https://en.wikipedia.org/wiki/Physarum_polycephalum), a yellow blob that loves to munch on decomposing matter in its plasmodium stage (the biology of these guys is so interesting! They are acellular, meaning that they are essentially one giant macroscopoic cell with multiple nuclei in them).

{{< soft src="/img/DFS/mold.jpg" alt="Soft-styled image" caption="P. Polycephalum" >}}

Whats interesting about these guys though is that they can solve mazes! 

{{< rawhtml >}}
<div style="display: flex; justify-content: center;">
  <iframe width="560" height="315" 
    src="https://www.youtube.com/embed/OBYqSr-c6Ks" 
    title="YouTube video player" 
    frameborder="0" 
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
    allowfullscreen>
  </iframe>
</div>
{{< /rawhtml >}}


How was the jerry able to do that despite having no brain? If you watch the video carefully you can notice that the slime mold was growing into many of the nooks and crannies of the maze until it found food. After it found food it killed off all the paths it explored that didn't find food. You can image why the slime mold evolved to do this. The bigger the slime mold grows, the more it has to eat. It wants to eat the maximum abount of food while having the smallest body to increase its chances of survival and reproduction. It sends out feelers in every direction until it finds something.

This is is what computer scientests would call a breadth first search (BFS) algorithm. This algorithm runs on graph structures and answers the question "how can I get from point A to point B in the shortest distance possible."

Let's make a BFS algorithm to mimick what jerry does. We will represent the maze as a 2d matrix. '#' represents a wall that the slime mode cannot grow into, 'O' represents an oat, the end goal of the slime mold. The following is a valid starting maze:
```python
[["#", "_", "_", "O",],
 ["#", "_", "#", "_",],
 ["_", "_", "#", "#",],
 ["_", "_", "_", "_",],
 ["_", "#", "_", "_",]]
```
This maze will be in a dictionary with other information about it, like the starting point of the slime mold dimensions of the maze. For our maze it could look something like this
```python
slime_mold_maze = {
    "maze": [["#", "_", "_", "O",],
             ["#", "_", "#", "_",],
             ["_", "_", "#", "#",],
             ["_", "_", "_", "_",],
             ["_", "#", "_", "_",]],
    "dimensions": (5, 4),
    "start": (5, 0)
}
```
In this eample, the start tuple would correspond to the slime mold starting at `slime_mold_maze["maze"][5][0]` which looks like

```python
[["#", "_", "_", "O",],
 ["#", "_", "#", "_",],
 ["_", "_", "#", "#",],
 ["_", "_", "_", "_",],
 ["*", "#", "_", "_",]]
 ```

We want to write a function to figure out how the slime mold can get from its starting position and make it to the oat in the shortest path possible
We can try to solve the maze with a function that looks something like this:
```python
>>> solve_slime_mold_maze(slime_mold_maze)
[["#", "*", "*", "O",],
 ["#", "*", "#", "_",],
 ["_", "*", "#", "#",],
 ["*", "*", "_", "_",],
 ["*", "#", "_", "_",]]
```
Note that there may be multiple shortest paths. We are only concerned with returning the shortest one. Lets try to make this function:
```python
def solve_maze(slime_mold_maze):
    """
    Solves a maze represented as a dictionary and returns the path to the goal (oat) or -1 if unsolvable.

    Parameters:
        slime_mold_maze (dict): A dictionary containing the maze's dimensions, start position, and oat position.

    Returns:
        list: The path to the oat as a list of positions.
        int: Returns -1 if no solution exists.
    """

    def get_neighbors(position):
        """
        Returns open neighboring squares adjacent to the given position and a flag indicating if the oat is found.

        Parameters:
            position (tuple): Current position in the maze.

        Returns:
            list: A list of valid neighboring positions.
            bool: True if the oat is found in the neighbors, False otherwise.
        """
        # Placeholder implementation; this should be replaced with the actual logic.
        return [], False

    # Unpack maze start position
    start_position = slime_mold_maze["start"]

    # Initialize the queue with the starting position
    queue = [[start_position]]

    # Perform Breadth-First Search (BFS) to find the oat
    while queue:
        # Get the current path from the queue
        current_path = queue.pop(0)
        current_position = current_path[-1]

        # Get neighbors and check if the oat is found
        neighbors, found_oat = get_neighbors(current_position)
        if found_oat:
            return current_path

        # Add valid neighbors to the queue
        for neighbor in neighbors:
            # Create a new path to avoid aliasing
            new_path = current_path + [neighbor]
            queue.append(new_path)

    # Return None if no solution exists
    return None

```
The code above is a lot to take in! You may need to read it a couple of times before it makes sense. The intuition is that we represent potential paths that the slime mold can take as lists of tuples. Every time the while loop cycles, we pop off the first path in the queue. We then consider all the places we can go from from the end of the path using the `get_neighbors` function that we are yet to implement. This function also checks if we have found the oat at the end of the path. If we found the oat we can go ahead and return the path! Otherwise we itterate through the neighbors and make each of them the end to a new path in the queue.

One very import thing to notice is how we are popping and adding paths to the queue. Notice how we pop __from the front of the queue__ and add our paths __to the back of the queue__. This ensures that all the paths in the queue grow at the same rate. If you instead both popped and added to the back of the queue this would be a depth first search algorithm (DFS). We will not cover DFS algorithms, but after you understand BFS, it is not hard to understand DFS with a quick Google search.


## get_neighbors
The algorithm above is very generic and does not fully encode the problem we are trying to solve. The real differentiating factor in DFS algorithms is how you get your neighbors at the end of a path. For us we can use something like this:
```python
def get_neighbors(position, slime_mold_maze):
    """
    Returns valid neighboring squares adjacent to the given position and a flag indicating if the oat is found.

    Parameters:
        position (tuple): Current position in the maze (row, column).
        slime_mold_maze (dict): A dictionary representing the maze, containing dimensions and other properties.

    Returns:
        tuple:
            - list: A list of valid neighboring positions (tuples).
            - bool: True if the oat is found in the neighbors, False otherwise.
    """
    # Define the four possible directions of movement: up, down, left, right
    directions = [
        (1, 0),   # Up
        (-1, 0),  # Down
        (0, 1),   # Right
        (0, -1)   # Left
    ]

    # Get the maze dimensions
    height, width = slime_mold_maze["dimensions"]

    # List to store valid neighbors
    neighbors = []
    found_oat = False

    # Iterate over all possible directions
    for direction in directions:
        new_position = (position[0] + direction[0], position[1] + direction[1])
        y, x = new_position
        # Check if the new position is within the maze bounds
        if 0 <= y < height and 0 <= x < width:
            maze_square = slime_mold_maze["maze"][y][x]
            # Check if the new position is not a wall
            if maze_square != "#":
                # Check if the new position is the oat
                if maze_square == "O":
                    found_oat = True
                
                # Add to the list of neighbors
                neighbors.append(new_position)

    return neighbors, found_oat
```


We can now substitue this back in our function `solve_maze` and test our function out! I made a quick function to print out the solution and let the algorithm run.

```python
def print_solution(slime_mold_maze, sol):
    for y in range(slime_mold_maze["dimensions"][0]):
        row = []
        for x in range(slime_mold_maze["dimensions"][1]):
            if (y, x) in sol:
                row.append("*")
            else:
                row.append(slime_mold_maze["maze"][y][x])
        print(row)

slime_mold_maze = {
    "maze": [["#", "_", "_", "O",],
             ["#", "_", "#", "_",],
             ["_", "_", "#", "#",],
             ["_", "_", "_", "_",],
             ["_", "#", "_", "_",]],
    "dimensions": (5, 4),
    "start": (5, 0)
}

sol = solve_maze(slime_mold_maze)
print_solution(slime_mold_maze, sol)
```
```python
['#', '*', '*', 'O']
['#', '*', '#', '_']
['*', '*', '#', '#']
['*', '_', '_', '_']
['*', '#', '_', '_']
```
As you can see the slime mold made a beeline for the oat just as we wanted. Everything seems to be working, but there is a slight problem. 
## Redundant paths
Consider the following slime mold maze.
```python
slime_mold_maze = {
    "maze": [["_", "_", "_", "O",],
             ["_", "_", "_", "_",],
             ["#", "#", "#", "#",],
             ["_", "_", "_", "_",],
             ["_", "_", "_", "_",]],
    "dimensions": (5, 4),
    "start": (5, 0)
}

sol = solve_maze(slime_mold_maze)
print_solution(slime_mold_maze, sol)
```
If you try to run it you will probably be dissapointed that the program will run forever and just consume a lot of memory. 

The culprate is the while loop that checks if we have anything in the queue. Because it is impossible to get to the oat, the queue will keep growing with paths wantering around in the lower part of the maze and the queue never becomes empty.

The slime mold in nature also has to deal with this problem, and we can use its solution. The slime mold does not grow on top of where it has previously been because it leaves behind a trail of mucus that stops growth. We can implement a similar stratgy in our BFS by keeping track of where the slime mold has explored. It is redundant to explore the same square twice because any path that does that would necessarily be longer than it needs to be.

```python
def solve_maze(slime_mold_maze):
    """
    Solves a maze represented as a dictionary and returns the path to the goal (oat) or -1 if unsolvable.

    Parameters:
        slime_mold_maze (dict): A dictionary containing the maze's dimensions, start position, and oat position.

    Returns:
        list: The path to the oat as a list of positions.
        int: Returns -1 if no solution exists.
    """

    def get_neighbors(position):
        """
        Returns valid neighboring squares adjacent to the given position and a flag indicating if the oat is found.

        Parameters:
            position (tuple): Current position in the maze (row, column).
            slime_mold_maze (dict): A dictionary representing the maze, containing dimensions and other properties.

        Returns:
            tuple:
                - list: A list of valid neighboring positions (tuples).
                - bool: True if the oat is found in the neighbors, False otherwise.
        """
        # Define the four possible directions of movement: up, down, left, right
        directions = [
            (1, 0),   # Up
            (-1, 0),  # Down
            (0, 1),   # Right
            (0, -1)   # Left
        ]

        # Get the maze dimensions
        height, width = slime_mold_maze["dimensions"]

        # List to store valid neighbors
        neighbors = []
        found_oat = False

        # Iterate over all possible directions
        for direction in directions:
            new_position = (position[0] + direction[0], position[1] + direction[1])
            y, x = new_position
            # Check if the new position is within the maze bounds
            if 0 <= y < height and 0 <= x < width:
                maze_square = slime_mold_maze["maze"][y][x]
                # Check if the new position is not a wall
                if maze_square != "#":
                    # Check if the new position is the oat
                    if maze_square == "O":
                        found_oat = True
                    
                    # Add to the list of neighbors
                    neighbors.append(new_position)

        return neighbors, found_oat

    # Unpack maze start position
    start_position = slime_mold_maze["start"]

    # Initialize the queue with the starting position
    queue = [[start_position]]
    # Initilize the visited set with the starting postion
    visited = {start_position}

    # Perform Breadth-First Search (BFS) to find the oat
    while queue:
        # Get the current path from the queue
        current_path = queue.pop(0)
        current_position = current_path[-1]

        # Get neighbors and check if the oat is found
        neighbors, found_oat = get_neighbors(current_position)
        if found_oat:
            return current_path

        # Add valid neighbors to the queue
        for neighbor in neighbors:
            # Check if we have not explored this square yet
            if neighbor not in visited:
                visited.add(neighbor)
                # Create a new path to avoid aliasing
                new_path = current_path + [neighbor]
                queue.append(new_path)

    # Return None if no solution exists
    return []
```
This is where sets really shine. If our maze was very big, then we would visit a lot of differnt places in our BFS algorithm. If we stored all of our visited spaces in a list, then it would take a long time to evaluage `neighbor not in visited` because it runs in O(n) time. However, with a set this line only runs in O(1) time!

## Main Takeaways
As we implemented this BFS algorithm, we saw how many of the differnt data structures in python came together to solve a nontrival problem. However, more importantly, we saw the basic compoents of a BFS search algorithm that can be used to solve a varity of other problems. 

We started with a queue list to hold our paths that we explore and a visited set to hold all the locations we have explored. While the queue is not empty, we pop the first path off the queue and explore all the valid neighbors at the end of the path that we have not visited yet, adding these to the visited set. If none of them are the target, we add the paths back to the end of the queue and repeat the process over and over until we either find what we are looking for, or run out of places to explore and can return that there is not a solution. 