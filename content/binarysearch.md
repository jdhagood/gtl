+++
title = 'Binary Search'
draft = false
+++
# Conditionals
Because we want our python programs to be more than glorified calculators, we need a way to conditially executing code
# Where did we leave the keys?
Last summer my friends and I had a rented a Christler Pacifica that we endearingly named "Chrissy".

{{< soft src="/img/binarysearch/chrissy.jpg" alt="Soft-styled image" caption="Chrissy!">}}

One day we realized that we lost Chrissy's keys. We were fairly certain that the keys ended up in one of our bags, but there were quite a few of us with many differnt bags. It would take all day to go through them. Thankfully, the car had electroic ignition system, so you could start the car if the keys were anywhere inside the car. 

As a bunch of MIT students, we thought back to our intro CS classes and knew this problem could be solved most efficiently with a binary search! We put half of our luggage in Chrissy and pressed the ignition. The car did not start, so we immediatly know that half of the luggage did not have the keys cutting our search space in half.

Next we put half of the remaing luggage into the car and pressed the ignition. It started up so we knew the keys were in that half of the luggage. We then took out half the luggage we put in the car and tried the ignition again.

We repeated this process of narrowing down which bags could possible have the keys in them based on if the car started up until we were left with only one possible bag for the keys to be in. After a quick search in this bag we found the keys!

## A pythonic implementation
Lets see if we can implement this algorithm in python. We could write something like this:
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
Let's use binary search to tackel a problem that must have been exausting before electronic calculators: root extraction. 

{{< katex id="block-math-1" >}}
Recall that for a non-negative real number, \(n\), we define the square root of \(n\), \(\sqrt{n}\), as the non-negative real number such that \((\sqrt{n})^2 = n\).

Unlike squaring a number, taking the square root of a number is not straightforward for most all real numbers. In fact, we cannot fully find the square root of most all numbers because the result is irrational and its decimal expansion is an infinite sequence of non-repeating numbers (much to Pythagors's chagrin, \(\sqrt{2}\) is irrational)!  Thas a bummer, but we can find some good appromimations of square roots.
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
the first 16 digits of the square root of 2 are [1.414213562373095](https://nerdparadise.com/math/reference/2sqrt10000). We can calculate this with 51 itterations on our function.
```python
>>> square_root(2, 51)
1.414213562373095
```
We are now running up aginst the percision of the float in python, so our current implementation cannot calculate the square root of 2 past this. To get past this would require either a more clever way to hold floating point numbers across multiple variables or modules that give you floating point numbers with more digits like [mpmath](https://mpmath.org/). 

Note that every itteration, our range of values that our root can fall within is cut in half, so our error halves at each itteration! Because the place value represented by digits follows an exponential and our error is exponentially decreasing with `itterations`, a linear increase in itterations leads to a linear increas in the number of correct digits.

This approach for finding the inverse of a function with binary search is not unique to square roots. Can you think of other functions that this will work on? What about functions that it would not work on?

{{< katex id="block-math-3" >}}
For those of you with a calculus background, you may know of an even better way to approximate the inverse of functions via Newton's Method. As an extra challenge try to implement the square_root function with Newton's Method. Comapir the convergence to our binary search approach. Which is better? Hint: \(\sqrt{n}\) is a root of the function \(x^2-n\).
{{< /katex >}}

# Main Takeaways
We looked at binary search in both a descret case (finding which bag had the car keys) and in a continuous case (finding the square root of a number). I hope that you have seen that binary search can be a very efficient algorithm compaired to naïve guess and check, especially when we have a large number of items. Binary search is a very general algorithm to have in your toolbox and will come in handy during your CS career.