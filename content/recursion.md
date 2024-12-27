+++
title = 'Recursion'
draft = false
math = true
+++


Recursion is one of the most useful tools that a programmer can have in their toolbelt. It can lead to very elegant solutions to problems that seem large or complicated at first by breaking it down into smaller pieces that can be more easily computed. Once you get the hang of it, you will also likely agree that the recursive programs are easier to understand. Let's learn how to harness this power in python.


# To understand recursion you must understand recursion
You probably already use recursion in your everyday life and you do not know it. Imagine that you want to cook a yummy cake for your friend's birthday, Bobby B (the B stands for Bobby B).
{{< soft src="/img/recursion/cake.jpg" alt="Soft-styled image" caption="Yummy!" >}}


Imagine that we had a function called "do_action" which represents what you do. We would like to execute
```python
do_action("make your friend's cake")
```
This function would do some very complex tasks. The execution would require you to acquire the ingredients, combine the ingredients, bake the cake, and decorate the cake to name a few. However, we could step down a layer of abstraction and realize that we could just call "do_action" on all these smaller subtasks that we think of. We could then just call
```python
do_action("get cake ingredients")
do_action("combine cake ingredients")
do_action("bake cake")
do_action("decorate cake")
```
We could again just look at the task "get cake ingredients" and break it up into smaller actions as well
```python
do_action("go to store")
do_aciton("find cake ingredients")
do_action("pay for cake ingredients")
do_action("bring cake ingredients home")
```
As you can see we can break up the very complicated task of making Bobby B's cake into many smaller tasks. You will eventually get to a task so basic that it cannot be broken up into simpler tasks. This is where our recursive approach to breaking up the "do_action" function can end and we can successfully bake our cake! (side note: it is fun to think about how deep the recursion could go for "do_action". This is dependent on what we consider a "basic" action. It could get to the level of "open door", "move left leg forward", or even "fire this neuron". I will leave it as an exercise to philosophers to define what a basic action is!)


 We could take this analogy one step further and define the "do_action" function. Suppose that an "action" may be basic or composed of other actions. If we have a function called "is_basic(action)" that returns True or False depending on if the action is basic, and a function, "do_basic_action(action)", that can execute a basic action, then we can define "do_action" as follows:
```python
def do_action(action):
    if is_basic(action):
        do_basic_action(action)
        return
    for sub_action in action:
        do_action(sub_action)
```
 This is a recursive function. (Side note: this function ignores the noncommutativity of some actions like putting on socks and shoes (you have to put on your socks before you put on your shoes!) but it is just a toy example!) It is a function that calls itself during its execution on more basic versions of the problem until it reaches more basic versions of the problem it can solve.


# Fibonacci Numbers
The Fibonacci sequence is one of the most famous sequences of numbers in math and is forced upon countless CS students when they are learning about recursion. You will be no different!
They are defined recursively as follows:
{{< katex id="block-math-0" >}}
$$
F_{n} = \begin{cases}
0 \quad &\text{if } n = 0\\
1 \quad &\text{if } n = 1\\
F_{n-1} + F_{n-2} \quad &\text{otherwise}\\
\end{cases}
$$
{{< /katex >}}


So, for example


{{< katex id="block-math-1" >}}
$$
\begin{align*}
F_0 &= 0\\
F_1 &= 1\\
F_2 &= F_1 + F_0 = 1 + 0 = 1\\
F_3 &= F_2 + F_1 = 1 + 1 = 2\\
F_4 &= F_3 + F_2 = 3 + 2 = 3\\
&\quad\vdots
\end{align*}
$$
{{< /katex >}}


Let's write a function to calculate these numbers. In my haste I typed this into my IDE and pressed run:
```python
def fib(n):
    return fib(n-2) + fib(n-1)


if __name__ == "__main__":
    print(fib(10))
```
Oh no, I got an error!
```bash
return fib(n-2) + fib(n-1)
           ^^^^^^^^
  [Previous line repeated 996 more times]
RecursionError: maximum recursion depth exceeded
```
It looks like fib was called over 900 times and I reached the maximum recursion depth! This error helps to contain runaway recursion, like what I just did.


The reason this did not work is because I forgot to include the base case. While this is an easy problem to spot on a simple program like this, it can be more difficult as your functions become more complicated!


```python
def fib(n):
    if n == 0:
        return 0
    elif n == 1:
        return 1
    return fib(n-2) + fib(n-1)


if __name__ == "__main__":
    print(fib(10))
```
And with this I get the number 55 printed into my terminal. Note that we had two base cases. Recursive functions can have any positive integer of base cases. (can you come up with a recursive function that would have 1000 base cases?)


# Factorials!
In math class we define the factorial of a non-negative integer, _n_!, as the product of _n_ and all the positive integers less than _n_. For example
{{< katex id="block-math-2" >}}
$$
5! = 5\times4\times3\times2\times1 = 120
$$
{{< /katex >}}
More precisely
{{< katex id="block-math-3" >}}
$$
n! = \begin{cases}
0 \quad &\text{if } n = 0\\
n(n-1) \quad &\text{otherwise}
\end{cases}
$$
{{< /katex >}}
Or if you are feeling rather notationally inclined today
{{< katex id="block-math-4" >}}
$$
n! = \prod^n_{k=0}k\quad n\in \mathbb{Z}^{+}
$$
{{< /katex >}}
Note that we have 0!=1 because
{{< katex id="block-math-5" >}}
$$
1! = 1\times 0! = 1 \implies 0! = 1
$$
{{< /katex >}}
Please implement this as a recursive function using the same approach we used to calculate the Fibonacci numbers
```python
def factorial(n):
    pass #Please Implement


if __name__ == "__main__":
    n = 10
    result = factorial(10)
    print(f"{n}! = {result}")
```


# Flatten a list
Let's say that we have a deeply nested list of integers like this one:
```python
l = [1, [2, [[3]]], 4, [[5, 6], 7]]
```
and we want to make a function called "flatten" that extracts the numbers from the list in order and returns a flattened list. For example
```python
>>> flatten(l)
[1, 2, 3, 4, 5, 6, 7]
>>> flatten([])
[]
>>> flatten([2, 4, [5]])
[2, 4, 5]
>>> flatten([[[[[[[0]]]]]]])
[0]
```
Let's reason through how we could implement this function. This is a difficult problem until you realize that the elements of our nested list are either other nested lists or integers. This means we can solve the problem recursively on the elements of our input list treating integers as our base case
```python
def flatten(input_list):
    output = []
    #fill in the logic to get the output
    return output


```
# Memoization
Consider how we initially calculated the Fibonacci numbers
```python
def fib(n):
    if n == 0:
        return 0
    elif n == 1:
        return 1
    return fib(n-2) + fib(n-1)
```
If you try to run this function for a large number, like n = 100, it will take a very long time. This is because our function secretly sucks!


Lets see how many times our function is being called when we calculate a Fibonacci number.
```python
def count_recursive_calls(func):
    """
    A decorator to count the number of times a recursive function is called.
    """
    call_count = {"count": 0}  # Use a mutable object to store count


    def wrapper(*args, **kwargs):
        # Increment the call count each time the function is called
        call_count["count"] += 1
        return func(*args, **kwargs)


    # Attach the call count to the wrapper for easy access
    wrapper.call_count = call_count
    return wrapper


@count_recursive_calls
def fib(n):
    if n == 0:
        return 0
    elif n == 1:
        return 1
    return fib(n-2) + fib(n-1)


if __name__ == "__main__":
    n = 30
    result = fib(n)
    print(f"For n = {n} we called fib {fib.call_count['count']} times!")
```
If you are curious how this works, google "python decorators" (This is a more niche topic in python that we will not discuss much. Think of a decorator as an effect you can apply to a function on the fly.) Upon running this the terminal tells us:


For n = 30 we called fib 2692537 times!


We called the function over 2 million times! To see why, consider this tree diagram representing our function calls. Each node in the tree is one function call.


{{< soft src="/img/recursion/tree.jpg" alt="Soft-styled image" caption="so. many. branches. O_o" >}}


However, this tree also shows us our problem! We are duplicating a lot of work by recalculating Fibonacci numbers that we have seen before. For example, we call fib(27) 3 times! (Funny enough, we call fib(k) fib(30 - k + 1) times) Memoization (no, that is not a misspelling of memorization) solves this problem.


Memoization is the technique of caching values as you compute so that you only need to compute each value at most one time. For example, we could cache the Fibonacci numbers in a dictionary as we calculate them to avoid duplicated work.
```python
def memoized_fib(n):
    cache = {
        0: 0,
        1: 1
    }
    def recr_fib(n):
        if n not in cache:
            cache[n] = recr_fib(n-1) + recr_fib(n-2)
        return cache[n]
   
    return recr_fib(n)
```
With this we can now calculate Fibonacci numbers up to the maximum recursion depth rather quickly. We can check how many times we call the function with
```python
def memoized_fib(n):
    cache = {
        0: 0,
        1: 1
    }
    @count_recursive_calls
    def recr_fib(n):
        if n not in cache:
            cache[n] = recr_fib(n-1) + recr_fib(n-2)
        return cache[n]
   
    result =  recr_fib(n)
    print(f"For n = {n} we called fib {recr_fib.call_count['count']} times!")
    return result
```
and we get


For n = 30 we called recr_fib 59 times!


This is a huge improvement compared to 2.6 million!
# Recursion vs Iteration
You may look at many of the recursive examples we have done so far and think to yourself, I could have done these without recursion. For example, we could refactor our "do_action" function to an equivalent form:
```python
def do_action(action):
    stack = [action]


    while stack:
        current_action = stack.pop(0)


        if is_basic(current_action):
            do_basic_action(current_action)
        else:
            for sub_action in action:
                stack.append(sub_action)
```
We essentially replaced the different frames that our recursive function was being called in with a variable called "stack."


For a more realistic example consider how we could iteratively generate the Fibonacci numbers.
```python
def fib_itterative(n):
    if n == 0:
        return 0
    if n == 1:
        return 1
    a, b = 0, 1
    for _ in range(n-1):
        a, b = b, a+b
    return b
```


You may be wondering if we can do this for all recursive programs. The answer turns out to be "yes" due to one of the most important theorems in all of theoretical computer science.


Alan Turing, a name you may be familiar with, laid many of the foundations for the field of computer science in the 1930s. In a 1936 paper he introduced his namesake model of what "computation" is, the Turing Machine. This was essentially a fictional device that iteratively went along an infinitely long piece of tape with 1's and 0's on it, reading and writing to the tape as it went along. Turing showed that if you cleverly laid out the rules for the device, you could calculate almost anything (see [the halting problem](https://en.wikipedia.org/wiki/Halting_problem) for an example of something that you could not compute).


Turing was not alone in his investigations of computation in the 1930s. Alonzo Church also made a model of computation that he called the Lambda Calculus and also published on it in 1936. It relied on recursive computing with mathematical functions, and seemed to be just as valid a model of computation as Turing's. The question then became: who has the better model of computation, Church or Turing?


This question was resolved with the [Church Turing Thesis](https://en.wikipedia.org/wiki/Church%E2%80%93Turing_thesis). It essentially says that there is an isomorphism between Church's lambda calculus and Turing's machine; they are secretly the same thing (mathematically speaking). Because two really smart people independently came to the same conclusion with wildly different approaches, most all computer scientists agree to call something "computable" if it can be represented on a Turing machine.


The consequence of the Church Turing Thesis that we care about is that it implies that all recursive functions can be written iteratively, and vice versa. Python is Turing complete (any python program can be represented on a Turing machine, and visa versa. This is true of most all programming languages) so even if you write a really complicated recursive function you believe cannot be written any other way, you are wrong because it has a representation on a Turing machine which is necessarily iterative! Your iterative functions also have representations in the lambda calculus meaning they can be represented recursively as well!