+++
title = 'Binary Search'
draft = false
+++

# Conditionals
Let's review conditionals from the pset.


The `if` statement in python has a simple syntax structure.
```python
if CONDITION:
    CODE_TO_RUN_IF_CONDITION_IS_TRUE


CODE_AFTER_IF_STATEMENT
```
`CONDITION` is a boolean expression. A boolean expression is a piece of code that returns `True` or `False` when it is executed. Below are a couple of boolean expressions with numbers.




```python
>>> 3 == 3
True
>>> 3 == 4
False
>>> 3 < 4
True
>>> 3 > 4
False
```




For `a` and `b` numbers, Python gives us these Boolean operators to make Boolean expressions:
* Equals: `a == b` returns `True` if `a` and `b` have the same value
* Not Equals: `a != b`
* Less than: `a < b` returns `True` if a is strictly less than b
* Less than or equal to: `a <= b` returns `True` if `a` is less than `b` or `a` equals `b`
* Greater than: `a > b` returns `True` if a is strictly greater than `b`
* Greater than or equal to: `a >= b` returns `True` is `a` is greater than `b` or `a` equals `b`




If `CONDITION` returns `True` then `CODE_TO_RUN_IF_CONDITION_IS_TRUE` is executed. Othersie `CODE_TO_RUN` is skipped. Note that regardless of if `CONDITION` is `True` or `False`, the `CODE_AFTER_IF_STATEMENT` still runs.
```python
x = 10


if x == 10: #check if x is equal to 10
    print("x has value 10")
   
print("DONE")
```
When you run this, both print statements indeed get executed. However, the program below only prints "DONE".
```python
x = 11


if x == 10: #check if x is equal to 10
    print("x has value 10")
   
print("DONE")
```
This is because the boolean expression `x == 10` returned `False`.




If we want to execute another block of code in the case that our boolean expression returns `False`, we can use the `else` keyword.
```python
if CONDITION:
    CODE_TO_RUN_IF_CONDITION_IS_TRUE
else:
    CODE_TO_RUN_IF_CONDITION_IS_FALSE




CODE_AFTER_IF_STATEMENT
```
For example,




```python
x = 10




if x == 10: #check if x is equal to 10
    print("x has value 10")
else:
    print("x does not have value 10")


print("DONE")
```
We can check for more conditions with the `elif` keyword (short for else-if).


```python
x = 10


if x > 10:
    print("x has value more than 10")
elif x == 10:
    print("x has value 10")
else:
    print("x has value less than 10")


print("DONE")
```
Note that once a boolean expression evaluates to `True` in a long list of `if` and `elif` statements, the rest of the `elif` statements are ignored. Take this code for example.
```python
x = 50


if x >= 100:
    print("x has value at least 100")
elif x >= 75:
    print("x has value at least 75")
elif x >= 50:
    print("x has value at least 50")
elif x >= 25:
    print("x has value at least 25")
else:
    print("x has value less than 25")




print("DONE")
```
When you run it only "x has value at least 50" is printed and "x has value at least 25" is not printed!


One useful Boolean operator to keep in your toolbelt is the `in` keyword. We can use it with lists to return `True` if an element is in the list or with strings to check if another string is a substring.


```python
>>> 1 in [1, 2, 3]
True
>>> 4 in [1, 2, 3]
False
>>> "car" in "racecar"
True
>>> "horse" in "racecar"
False
```


# The for loop
`for` loops are very versatile. In their most basic use case, they allow you to repeat a block of code multiple times.


Suppose you wanted to print "hello" to the terminal 5 times. You could naively run the python script
```python
print('hello')
print('hello')
print('hello')
print('hello')
print('hello')
```
However, any time you see idential blocks of code one after another alarm bells should go off in your head screaming 'use a for loop!' The following code does the exact same thing:
```python
for _ in range(5):
    print('hello')
```
We can then change that '5' to any other number we want for our for loop to repeat as many times as possible! Try this for other numbers. What happens if you put in 0, negative numbers, or nonintegers?


The power of the for loop does not stop at only saving you some keystrokes. It can also act as a counter!
```python
for i in range(5):
    print("i = " + str(i))
```
This is what gets printed out to the terminal
```
i = 0
i = 1
i = 2
i = 3
i = 4
```
The for loop can be even more powerful and versatile, but we will explore these powers in future readings and psets.


# The while loop
The `while` loop allows us to repeat a block of code just like the for loop, but it does so based on a boolean expression. Take this program for example.
```python
counter = 0
while counter < 10:
    print(counter)
    counter = counter + 1
```
```
0
1
2
3
4
5
6
7
8
9
```
Before each iteration of the while loop, the boolean expression `counter < 10` is evaluated. If it is `True` then the contents of the loop are repeated and if it is `False` then the loop exits. We will see an example of where this behavior is useful in lecture today, but one immediate use case is to make an infinite loop.


```python
while True:
    print("This will run forever!")
```


To stop this loop we would have to kill our program (Ctrl + C on Windows or Command + . on Mac).


# Where did we leave the keys?
Last summer my friends and I rented a Chrysler Pacifica that we endearingly named "Chrissy".


{{< soft src="/img/binarysearch/chrissy.jpg" alt="Soft-styled image" caption="Chrissy!" >}}


One day we realized that we lost Chrissy's keys. We were fairly certain that the keys ended up in one of our bags, but there were quite a few of us with many different bags. It would take all day to go through them. Thankfully, the car had electronic ignition system, so you could start the car if the keys were anywhere inside the car.


As a bunch of MIT students, we thought back to our intro CS classes and knew this problem could be solved most efficiently with a binary search! We put half of our luggage in Chrissy and pressed the ignition. The car did not start, so we immediatly know that half of the luggage did not have the keys cutting our search space in half.


Next we put half of the remaing luggage into the car and pressed the ignition. It started up so we knew the keys were in that half of the luggage. We then took out half the luggage we put in the car and tried the ignition again.


We repeated this process of narrowing down which bags could possible have the keys in them based on if the car started up until we were left with only one possible bag for the keys to be in. After a quick search in this bag we found the keys!


## A pythonic implementation
Let's see if we can implement this algorithm in python. We could write something like this:
```python
def find_bag_with_keys(number_of_bags, car_start):
    """
    Finds the bag with the keys using a binary search approach.


    Parameters:
    - number_of_bags (int): Total number of bags.
    - car_start (function): A function that takes a list of bag indices and returns
      True if the keys are in one of those bags (the car starts), False otherwise.


    Returns:
    - int: The index of the bag containing the keys.
    """
    # Define the initial search range
    left = 0
    right = number_of_bags - 1


    while left < right:
        # Calculate the midpoint of the current search range
        mid = (left + right) // 2 # //2 rounds down in the case left + right is odd


        # Test the car with the first half of the current range
        bags_to_test = list(range(left, mid + 1))
        if car_start(bags_to_test):
            # Keys are in the left half inside the car
            right = mid
        else:
            # Keys are in the right half outside the car
            left = mid + 1


    # Return the index of the bag containing the keys
    return left
```
In this function, we initialize two pointers, `left` and `right`, to keep track of our search window. All the bags are numbered and those that fall at or between `left` and `right` could have the keys in them. We then put all the bags between `left` and `mid` in the car to test it out. If the car starts up we can set `right = mid` to lower our upper bound and otherwise set `left = mid` to raise our lower bound. The falling upper bound and rising lower bound are going to meet at some point and `left < right` will no longer hold because `left == right`. At this point we have found our bag!


We can test our function in this program
```python
from random import randint


def make_car_start_function(number_of_bags):
    """
    Creates a car_start function that determines whether the car starts
    based on the presence of the keys in a subset of bags.


    Parameters:
    - number_of_bags (int): Total number of bags.


    Returns:
    - function: A function that takes a list of bag indices and returns True
      if the keys are in one of those bags, False otherwise.
    """
    # Randomly select the index of the bag containing the keys
    bag_with_keys = randint(0, number_of_bags - 1)


    def car_start(bags_to_test):
        """
        Checks if the keys are in the provided subset of bags.


        Parameters:
        - bags_to_test (list of int): Indices of bags to test.


        Returns:
        - bool: True if the keys are in one of the tested bags, False otherwise.
        """
        return bag_with_keys in bags_to_test


    return car_start


# Set up the car_start function for 20 bags
car_start = make_car_start_function(20)


# Use the binary search function to find the bag with the keys
bag_with_keys = find_bag_with_keys(20, car_start)


# Print the index of the bag containing the keys
print(f"The bag with the keys is: {bag_with_keys}")
```
## Performance Analysis
This program works great, and in the graph below we can see the true power of binary search
{{< soft src="/img/binarysearch/calls_to_car_start.jpg" alt="Soft-styled image" >}}


{{< katex id="block-math-0" >}}
As you can see, the number of calls to car_start is, on average, \(log_2(n)\). This means that even if we had an absurd amount of bags like \(n = 300\), we would only need to try to start the car \(log_2(300) \approx 8\) times. If we naïvely wanted to find our bag by tring to start the car one bag at a time, this would take, on average \(\frac{n}{2}\) calls to start_car. For our case \(n = 300\), \(8\) is much better than \(150\)! Our function runs in \(O(log(n))\) time.
{{< /katex >}}


# Square Roots
Let's use binary search to tackle a problem that must have been exhausted before electronic calculators: root extraction.


{{< katex id="block-math-1" >}}
Recall that for a non-negative real number, \(n\), we define the square root of \(n\), \(\sqrt{n}\), as the non-negative real number such that \((\sqrt{n})^2 = n\).


Unlike squaring a number, taking the square root of a number is not straightforward for most all real numbers. In fact, we cannot fully find the square root of most all numbers because the result is irrational and its decimal expansion is an infinite sequence of non-repeating numbers (much to Pythagors's chagrin, \(\sqrt{2}\) is irrational)!  That's a bummer, but we can still find some good approximations of square roots.
{{< /katex >}}


## General Approach
{{< soft src="/img/binarysearch/sqrt.jpg" alt="Soft-styled image" caption= "[Desmos](https://www.desmos.com/) is great!">}}
{{< katex id="block-math-2" >}}
We want to make a function that takes in a positive real number, \(n\), and returns its square root. One thing that we can be certain of is that \(\sqrt{n}\) falls somewhere between 0 and \(n\) for \(n > 1\) and somewhere between 0 and 1 for \(n < 1\) (\(\sqrt{n} = 1\) in the case \(n=1\)).
{{< /katex >}}


```python
def square_root(n, iterations):
    """
    Approximates the square root of a number using binary search.


    Parameters:
    - n (float): The number to find the square root of.
    - iterations (int): The number of iterations to perform for refinement.


    Returns:
    - float: The approximate square root of the number.
    """
    # Define the search range
    lower_bound, upper_bound = 0, max(1, n)


    # Perform binary search for the specified number of iterations
    for _ in range(iterations):
        midpoint = (lower_bound + upper_bound) / 2
        if midpoint ** 2 > n:
            upper_bound = midpoint  # Narrow search to lower half
        else:
            lower_bound = midpoint  # Narrow search to upper half


    return lower_bound
```
The first 16 digits of the square root of 2 are [1.414213562373095](https://nerdparadise.com/math/reference/2sqrt10000). We can calculate this with 51 iterations on our function.
```python
>>> square_root(2, 51)
1.414213562373095
```
We are now running up against the precision of the float in python, so our current implementation cannot calculate the square root of 2 past this. To get past this would require either a more clever way to hold floating point numbers across multiple variables or modules that give you floating point numbers with more digits like [mpmath](https://mpmath.org/).


Note that every iteration, our range of values that our root can fall within is cut in half, so our error halves at each iteration! Because the place value represented by digits follows an exponential and our error is exponentially decreasing with `iterations`, a linear increase in iterations leads to a linear increase in the number of correct digits.


This approach for finding the inverse of a function with binary search is not unique to square roots. Can you think of other functions that this will work on? What about functions that it would not work on?


{{< katex id="block-math-3" >}}
For those of you with a calculus background, you may know of an even better way to approximate the inverse of functions via Newton's Method. As an extra challenge try to implement the square_root function with Newton's Method. Compare the convergence to our binary search approach. Which is better? Hint: \(\sqrt{n}\) is a root of the function \(x^2-n\).
{{< /katex >}}


# Main Takeaways
We looked at binary search in both a discrete case (finding which bag had the car keys) and in a continuous case (finding the square root of a number). I hope that you have seen that binary search can be a very efficient algorithm compared to naïve guess and check, especially when we have a large number of items. Binary search is a very general algorithm to have in your toolbox and will come in handy during your CS career.




