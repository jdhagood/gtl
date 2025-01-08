+++
title = 'hello, world'
draft = false
+++


# Translation
Everything on this website is written in English, which may make learning Python harder than it has to be. If you would rather not read English and are using Google Chrome, I recommend the extension "Immersive Translate" that will translate webpages for you.
{{< soft src="/img/hello_world/translate.jpg" alt="Soft-styled image">}}


Once you install the extension, you can configure the settings to translate from English to Italian
{{< soft src="/img/hello_world/translated.jpg" alt="Soft-styled image" caption= "The translated webpage">}}


# Downloading Python
Before we can jump into programming, everyone needs to download Python. Download the latest version for your operating system from [python.org](https://www.python.org/downloads/) (3.13.1 when I wrote this).


{{< soft src="/img/hello_world/path.jpg" alt="Soft-styled image" caption= "Add python.exe to PATH">}}


If you have a Windows machine and want to work with Python in the system terminal, you should add Python to your PATH variable (HIGHLY RECOMMENDED). This just makes sure you can call the python.exe from any directory.


To test that your installation was successful, open your terminal and run the following command.
```
C:\Users\user>python --version
Python 3.12.3
```
You will get an error if you do not have python downloaded properly.


If your installation was unsuccessful you can still follow along with [this online python IDE](https://www.online-python.com/), but this should not be a long term solution. Talk to me after class if you are still having difficulties.


# Your first Python program
Believe it or not, you are ready to run your first python program. If you type 'python' into your command prompt (or 'py' if you're cool) then you will end up inside the python shell.


```python
C:\Users\user>python
Python 3.12.3 (tags/v3.12.3:f6650f9, Apr  9 2024, 14:05:25) [MSC v.1938 64 bit (AMD64)] on win32
Type "help", "copyright", "credits" or "license" for more information.
>>> print("hello, world")
hello, world
>>>
```
You may have seen the "hello, world" example while learning other programming languages. It has become the prototypical first program that everyone should write when starting a new programming language. THe history behind this is a little fuzzy, but it likely comes from a 1974 Bell Laboratories internal memorandum by Brian Dernighan _Programming in C: A Tutorial_. He said that the inspiration for the phrase came from a cartoon he watched as a kid with a small chick hatching and then saying "hello, world."




You can try printing other stuff by changing the arguments of the print function.
```python
>>> print("i love python")
i love python
>>> print(123)
123
```




To exit simply type 'quit()'
```python
>>> quit()




C:\Users\user>
```


# IDE
{{< soft src="/img/hello_world/vs.png" alt="Soft-styled image" >}}


You do not want to do all your Python coding in the shell. Unless you already have a strongly preferred IDE (integrated development environment), I highly recommend using Visual Studio Code. It is my IDE of choice, and will make following along with what I do a lot easier. The installation is straightforward. You can download the installer for your OS [here](https://code.visualstudio.com/download).


To start writing a python program just open a folder in Visual Studio and make a file inside that ends with the ".py" extension (this tells your computer to read the file as a python program file just like .png or .jpg tells your computer to read the file as an image file). Make sure to save it and press run to run the file.
{{< soft src="/img/hello_world/vs_example.jpg" alt="Soft-styled image" caption= "Don't forget to save :)">}}


# Jupyter Notebooks
In this course you will turn assignments in using Jupyter notebooks that you download from this course's Moodle or this website on the homepage under each lecture. In order to edit these notebooks to get credit, you can use Visual Studio Code, but you will need to install an extension. To do this, open Visual Studio, go to the extensions tab on the left side of the screen (4 boxes), search for "jupyter" and install the first result.


{{< soft src="/img/hello_world/jupyter_install.jpg" alt="Soft-styled image" caption= "It should look like this.">}}


If you are confused you can watch [this tutorial](https://code.visualstudio.com/docs/datascience/jupyter-notebooks) to get everything configured.


If you are having trouble getting your environment setup in time for an impending problem set, you can always edit these notebooks in the [online Jupyter Notebook demo editor](https://jupyter.org/try-jupyter/lab/). Just remember to download your pset after you are done because I am pretty sure it does not save your work. This is why I do not recommend this approach long term.


After you open a notebook you will be greeted with a series of coding questions like the one below.


{{< soft src="/img/hello_world/jupyter_question.png" alt="Soft-styled image" >}}


Below the questions will be a place for you to implement your code. You will fill out the body of functions. These functions will be run against test cases. Test cases just check that the function provides the correct output for a given input. You receive credit for a question if you pass all the test cases.


{{< soft src="/img/hello_world/jupyter_ans.png" alt="Soft-styled image" >}}


Please do not try to hard-code the test cases into your function (a big if-else mess that outputs the correct value for each test case). The functions will be graded with additional hidden test cases so you will not receive credit for this approach.


# Variables
Let's continue to work in the python shell as we explore some of the basic functionalities of python (run the command 'py' again to reenter the shell if you exited). Like in most programming languages, we have variables. You assign a variable by simply using the "=" sign


```python
>>> x = 10
>>> x
10
```
Whenever we called 'x' python knew it wasn't part of its keywords, so it instead looked if 'x' had a value assigned to it. It indeed did, so it returned the value of '10'.


If you have experience in some other languages, it may seem strange at first that we can just simply assign the number 10 to x before declaring that x is an integer type and will hold integers. This is because python is _dynamically typed_. This means that any variable can have any type. We can even change the variable types on the fly just by assigning different types to the variable.
```python
>>> x = 10
>>> type(x)
<class 'int'>
>>> x = 3.1415
>>> type(x)
<class 'float'>
>>> x = "hello, world"
>>> type(x)
<class 'str'>
>>> print(x)
hello, world
```
Note that whenever you call the variable it returns the last thing that was stored in it.




This is different from languages like C which are _statically typed_. Once you declare a variable with a certain type, it cannot change!




With great power comes great responsibility (and sometimes drawbacks)! Dynamically typed languages make implementing some programs very easy and quick, but they can also make some bugs harder to find and squash. They can also lead to the program running slower because the type of each variable is determined at runtime rather than at compile time!


# Python Types
Python has many different types of objects that a variable can hold. I will present some of the basic ones here and as the course continues you will be introduced to more types. Lets start with the numeric types.


The 'int' type represents integers (numbers without a decimal part like -32, 0, and 40).
```python
>>> x = 10
>>> type(x)
<class 'int'>
```
The 'float' type represents numbers with decimal parts.
```python
>>> x = 3.1415926
>>> type(x)
<class 'float'>
```
Python even has a 'complex' type for storing complex numbers (this probably won't be helpful to most people but as a math nerd I find it cool).
```python
>>> x = 3+4j
>>> type(x)
<class 'complex'>
```
Python strings are a type used to hold text. You can create strings with either single or double quotes.
```python
>>> x = "Hello World"
>>> type(x)
<class 'str'>
>>> x = 'Hello World'
>>> type(x)
<class 'str'>
```
# Comments
It is important that your code is readalbe so that other people can understand what you were trying to do. Code comments allow us to write notes in our code that will be ignored when the program is running. There are two main ways to do this. We can use the '#' character for inline comments.
```python
# This is an inline comment
```
We can use '"""' to make a multiline comment.
```python
"""
This is a multiline comment.
Nothing between
the quotation marks
will run
"""
```
# Math
At the end of the day, programming a computer really is just a bunch of math (like actually, there is a [direct correspondance](https://en.wikipedia.org/wiki/Curry%E2%80%93Howard_correspondence)!), so let's see how to do some simple math on the shell.
```python
>>> 4 + 5 # addition
9
>>> 4 + 5#addition
9
>>> 4 + 5 #addition
9
>>> 4 - 5 #subtraction
-1
>>> 4*5 #multiplication
20
>>> 4/5 #division
0.8
>>> 4**5 #exponentiation
1024
>>> 31 % 2 #remainder/mod (31 ÷ 2 = 15 remainder 1)
1
```
Note that exponentiation is not '4^5'. This is the bitwise xor operation and will not return what you expect.




This works just as well on variables
```python
>>> x = 3
>>> y = 6
>>> x + y
9
>>> x - y
-3
>>> x*y
18
>>> x/y
0.5
>>> x**y
729
```
If we want some more advanced math functions we can import the math module. We will talk about imports later in the course, but for now think of imports as a way for us to bring even more functionality and keywords into python. Python comes with a standard library that you can import from (like the math module) and you can download thousands of other modules for your specific needs. This is the power of python!




```python
>>> import math
>>> math.sin(1)
0.8414709848078965
>>> math.cos(1)
0.5403023058681398
>>> math.tan(1)
1.5574077246549023
>>> math.asin(1)
1.5707963267948966
>>> math.acos(1)
0.0
>>> math.atan(1)
0.7853981633974483
>>> math.log(100, 10)
2.0
>>> math.log(math.e) # default is the natural log
1.0
>>> math.pi
3.141592653589793
>>> math.e
2.718281828459045
>>> math.sinh(1) # we've even got hyperbolic trig! fancy!
1.1752011936438014
```


# Lists
Lists are a very convenient data type in python and will come in handy throughout the course. A mastery of lists is vital for a mastery of python.


Lists do exactly what their name implies, they hold a list of objects. You create them with square brackets, '[ ]'.
```python
>>> my_list = [1, 2, 3, 4]
>>> type(my_list)
<class 'list'>
```
You can access the elements inside of the list like so:
```python
>>> my_list[0]
1
>>> my_list[1]
2
>>> my_list[2]
3
>>> my_list[3]
4
>>> my_list[4]
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
IndexError: list index out of range
```
Notice that lists are zero indexed, meaning that in order to access the first element I had to call 'my_list[0]' as opposed to 'my_list[1]' which would actually return the second item.


If you try to reference an element in a list that is outside of the range of the list, you will get an IndexError.


We can get elements from the back of the list by using negative indexing numbers.


```python
>>> my_list = [1, 2, 3, 4]
>>> my_list[-1] # Last element
4
>>> my_list[-2] # Second to last element
3
```


We can also reassign specific entries in a list like so
```python
>>> my_list[0] = 10
>>> my_list
[10, 2, 3, 4] # Notice how the element at index 0 changed
```
Just make sure you are trying to change a valid index in the list else Python will throw an error.


```python
>>> my_list[5] = 10
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
IndexError: list assignment index out of range
```
Lists have a lot of wonderful properties and associated methods that we will explore in future lectures. A couple of good ones to keep in your tool belt for now is how you can get the length of a list
```python
>>> my_list = [1, 2, 3, 4]
>>> len(my_list)
4
```
and how you can add elements to the end of a list.
```python
>>> my_list
[1, 2, 3, 4]
>>> my_list.append(5)
>>> my_list
[1, 2, 3, 4, 5]
```
You can also add two lists together to return a new list that is their concatenation (fancy word for 'glue together').
```python
>>> a = [1, 2, 3]
>>> b = [4, 5, 6]
>>> c = a + b
>>> c
[1, 2, 3, 4, 5, 6]
```
There are many ways to shorten a list. One way to to delete items by index like so:
```python
>>> my_list = [1, 2, 3, 4]
>>> del my_list[1] # provide index for the element you want to delete
>>> my_list
[1, 3, 4]
```


One thing that trips up all new python programmers is list alising. Take this code for example
```python
>>> a = [1, 2, 3]
>>> b = a
>>> b[0] = 12
>>> b
[12, 2, 3]
>>> a
[12, 2, 3]
```
Even though we only wanted to change the list associated with variable `b`, we ended up also changing the list associated with `a`! This is because `a` and `b` actually refer to the same list in memory (look at the page on the [environment model](/enviroment_model) to see why this is the case). Mutating either `a` or `b` mutates the same list in memory leading to both variables changing! To fix this we can use the `.copy()` method which will return a copy of your list and avoid the aliasing problem (assuming that your list is filled with immutable objects)


```python
>>> a = [1, 2, 3]
>>> b = a.copy()
>>> b[0] = 12
>>> b
[12, 2, 3]
>>> a
[1, 2, 3]
```


# Tuples: The immutable lists
Sometimes you want to make a list that does not change. For this you can use a `tuple`. You make a tuple using `()` parentheses.
```python
>>> a = ()
>>> b = (1,)
>>> c = (1, 2)
>>> type(a)
<class 'tuple'>
```
You can get the length of a tuple the same way you get the length of a list.
```python
>>> len(a)
0
>>> len(b)
1
>>> len(c)
2
```
And you access elements the same way as lists too.
```python
>>> c[0]
1
>>> c[1]
2
```
The only difference between a list and a tuple is that a tuple is immutable. We cannot change it. Trying to do so will throw an error.
```python
>>> c[0] = 1
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
TypeError: 'tuple' object does not support item assignment
```
We can also convert any list to a tuple using the `tuple` function.
```python
>>> my_list = ["Welcome", "to", "Python", 1, 0, 1]
>>> my_tuple = tuple(my_list)
>>> type(my_list_
... )
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
NameError: name 'my_list_' is not defined. Did you mean: 'my_list'?
>>> type(my_list)
<class 'list'>
>>> type(my_tuple)
<class 'tuple'>
```
So, when should you use a tuple vs a list. If you know that you will not need to change your list of values, you should use a tuple, but if you need to mutate or change your variable then you should use a list.


# An introduction to functions
You have likely encountered functions in other programming languages and seen their power. In their most basic interpretation, you can think of functions like a macro that you can copy and paste anywhere in your code to make it shorter and more readable. In the example below we make a function called 'greeting' that will print 'ciao' whenever it is called.


```python
def greeting():
    print("Ciao")


greeting()
```


This is the copy and paste functionality of functions and is rather boring. We can make it more interesting by adding some arguments


```python
def greeting(name):
    print("Ciao " + name)


greeting("JD")
```
Now I get a nice greeting in the terminal! You can use this function to greet other people as well by changing the name argument when you call the function. You can easily add more arguments to the function by separating them with commas.
```python
def greeting(name, ending):
    print("Ciao " + name + ending)


greeting("JD", "!")
```
Notice if we call the function as it is now without any arguments then we get an error. This is because we did not supply the values for the 'name' and 'ending' variable.
```python
>>> greeting()
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
TypeError: greeting() missing 2 required positional arguments: 'name' and 'ending'
```
We can fix this by assigning default values to the arguments in our function. These are values that the function will use if the argument is not supplied.
```python
>>> def greeting(name = "", ending = ""):
...     print("Ciao " + name + ending)
...
>>> greeting()
Ciao
>>> greeting("JD", "!")
Ciao JD!
```
Now we have the best of both worlds!


This is great, but what if we wanted to be able to make a function that could be used to calculate? For that we need to use the 'return' keyword.
```python
def circle_area(radius):
    area = 3.14 * radius ** 2
    return area


circle_radius = 2
area = circle_area(circle_radius)
print(f"A circle with radius {circle_radius} units has an area of {area} units")
```
Even if you do not include a return statement in your function, like we did for the 'greeting' function, there is a secret 'return None' at the end.
```python
>>> x = greeting()
Ciao
>>> print(x)
None
```
You may be wondering how to return multiple values from a function. The 'return' keyword makes this easy by comma separating the values.


```python
def circle_circumference_and_area(radius):
    area = 3.14 * radius ** 2
    circumference = 2 * 3.14 * radius
    return circumference, area


circle_radius = 2
circumference, area = circle_circumference_and_area(circle_radius)
print(f"A circle with radius {circle_radius} units has an area of {area} units and circumference of {circumference} units")
```
Notice how long my function name is becoming. It is worth pausing to note that good, descriptive function and variable names go a long way in helping your code maintain readability. Also note that I am using snake case to name my variables by putting underscores between words (this_is_snake_case) rather than using camel case and capitalizing new words (thisIsCamelCase). While either one is fine, stick with one and go with it. I use snake case in python (a python is a snake after all) and camel case in most other languages like C.


# Getting help
If you are in the Python shell, the `help` function can be very, well, helpful! If there is ever any python keyword that you are unsure of, just type call `help(<keyword>)`. For instance, if we wanted to know about the `print` function, this is what we would see:
```python
>>> help(print)
Help on built-in function print in module builtins:


print(*args, sep=' ', end='\n', file=None, flush=False)
    Prints the values to a stream, or to sys.stdout by default.


    sep
      string inserted between values, default a space.
    end
      string appended after the last value, default a newline.
    file
      a file-like object (stream); defaults to the current sys.stdout.
    flush
      whether to forcibly flush the stream.


>>>
```
Wow, that is a lot of information, but it tells us some cool things. We now see that the print function can take in a bunch of arguments, and it prints them out with a separator. We can, for instance, change that separator to do some cool stuff. 
```python
>>> print(1, 2, 3, 4, sep=" | ")
1 | 2 | 3 | 4
>>>
```
We would have never known about the ability to change the separator if we didn't call `help(print)`!


Google is a programmer's best friend, and being good at using search engines and reading stack overflow answers to solve problems as a programmer is a must. If you are working as a programmer, it is ok not to know how to do something, but you are fired if you do not know how to Google it! If you are curious about how to work with functions in Python, your answers are only one Google search for "How to define functions in Python" away. To be honest I learned pretty much everything I know in python from Google searches and youTube videos!


[The Python Docs](https://docs.python.org/3/) are the holy scripture of Python. They can be dense, but you can't get help much closer to the source of pythonic Truth other than a technical call with Guido van Rossum himself!


# More Practice
{{< soft src="/img/why_python/leetcode.png" alt="Soft-styled image" >}}
If you ever find yourself wanting more practice with Python, I highly recommend checking out [leetcode](https://leetcode.com/problemset/) if you haven't before. This website is supposed to help you study for technical interviews, but I also used it to help me learn Python. Change the language to Python and start out with the easy questions which should be plenty challenging enough for someone just starting out in Python. If you get better you can go for the medium or hard questions. Even after you solve a question, it is helpful to look at how your submission fared against other submissions. Where can you improve your code? Have fun, and maybe this will even help you score a tech job one day when you crush the technical interview. (I am morally obligated to interject here and mention that leetcode is not a holistic test of a programmer's skill! Personal projects are a way better learning tool but leetcode can be part of a balanced programming diet!)


# Why learn python when Chat GPT exists?
You may be asking why you need to learn python programming at all when LLMs like Chat GPT, Claude, and Github Copilot could do everything that I will ask you to do in this course, probably better than you can.


I found a reddit thread discussing this on r/learnprogramming. Under the replies that complained about "this question...again" and recommendations for programmers to go ahead and throw in the towel and start an OF, one user compared AI to a washing machine. A washing machine can do laundry faster and better than you can, but you still have to put the clothes in, know what settings to select, take the clothes out, and verify that the clothes actually got cleaned unless you want to higher someone else to do this. Maybe this analogy breaks down when the washing machine becomes sentient and exterminates the human race because they are the real culprits behind dirty clothes, but the point still stands. Just as you need to understand and interact effectively with the washing machine, you need to understand python to be able to effectively interact with an AI coding tool.


AI is a statistical model, and only being able to program through the output of an LLM means that you are not truly in control of what you can program. To implement _your_ (emphasis on _your own_) solutions or code your personal projects, you need to be able to roll up your sleeves and do the coding yourself!
