+++
title = 'hello, world'
draft = false
+++
# Why Python
Short intro on python and why it is used.


# Downloading python
Before we can jump into programming, everyone needs to download python. Download the latest version for your operating system from [python.org](https://www.python.org/downloads/) (3.13.1 when I wrote this).


{{< soft src="/img/hello_world/path.jpg" alt="Soft-styled image" >}}


To test that your installation was successful and you now have python on your PATH system variable, open your terminal and run the following command.
```
C:\Users\jdhag>python --version
Python 3.12.3
```
You will get an error if you do not have python downloaded properly.


# Your first python program
Believe it or not, you are ready to run your first python program. If you type 'python' into your command prompt (or 'py' if you're cool) then you will end up inside the python shell.


```vim
C:\Users\jdhag>python
Python 3.12.3 (tags/v3.12.3:f6650f9, Apr  9 2024, 14:05:25) [MSC v.1938 64 bit (AMD64)] on win32
Type "help", "copyright", "credits" or "license" for more information.
>>> print("hello, world")
hello, world
>>>
```
You may have seen the "hello, world" example while learning other programming languages. It has become the prototypical first program that everyone should write when starting a new programming language. It is likely that this comes from a 1974 Bell Laboratories internal memorandum by Brian Dernighan _Programming in C: A Tutorial_. He said that the inspiration for the phrase came from a cartoon he watched as a kid with a small chick hatching and then saying "hello, world."


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


C:\Users\jdhag>
```


# Variables
Let's continue to work in the python shell as we explore some of the basic functionalities of python. Like in most programming languages, we have variables. You assign a variable by simply using the "=" sign


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


This is different from languages like C or Java which are _statically typed_. Once you declare a variable with a certain type, it cannot change!


With great power comes great responsibility (and sometimes drawbacks)! Dynamically typed languages make implementing some programs very easy and quick, but they can also make some bugs harder to find and squash. They can also lead to the program running slower because the type of each variable is determined at runtime rather than at compile time!


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
```
Note that exponentiation is not '4^5'. This is the bitwise xor operation that we will discuss later in the course.


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
If we want some more advanced math functions we can import the math module. We will talk about imports later in the course.


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
>>> math.log(math.e)
1.0
>>> math.pi
3.141592653589793
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
If you try to reference an element in a list that is outside of the range of the list, you will get an IndexError.


Notice that lists are zero indexed, meaning that in order to access the first element I had to call 'my_list[0]' as opposed to 'my_list[1]' which would actually return the second item.


Lists have a lot of wonderful properties that we will explore next lecture.


# Compiled vs Interpreted Languages
Python's dynamic types are thanks to the fact that it is an _interperted language_. This is in contrast to a _compiled language_ like C.


In C, before you can run a program, it must first be translated into binary machine code specific to the hardware it is running on (1s and 0s that are completely unreadable to most everyone on earth).


Contrast this with python. When you run a python program it is first compiled to a lower level language (like bytecode). This lower level language is not hardware specific so it will not be able to run on your computer. Instead it is read line by line by a virtual machine called the Python Virtual Machine (PVM). This is why we had to download python. Part of the installation was setting up this PMV to be able to read your code on the fly. (this technically means that python is not fully an interpreted language because it first needs to be compiled to bytecode for the PVM, but this is pedantic!)


The main difference you need to worry about for compiled vs interpreted languages is that compiled languages generally run a lot faster than interpreted languages. Python can be very slow if you give it a lot to compute. However, the development time in a language like Python is generally much faster and more enjoyable due to all the neat tricks you can do with a compiled language, like dynamically typed variables.


{{< soft src="/img/hello_world/python_bytecode.jpg" alt="Soft-styled image" >}}


Note that we can usually get the best of both worlds by letting python control statically typed programs. This is what many python libraries, like NumPy, do and act as wrappers around C and C++ functions, but I am getting ahead of myself.


# The Environment Diagram
When you are programming in any language, it is important to have a mental model of what you are doing. If you are blindly executing code and run into a bug, it can be nearly impossible to figure out how to fix it on your own if you are not aware of what exactly you are writing. Environment diagrams help demystify many confusing aspects of python and shine light on why many of the things in python are done the way they are. This will be a topic that we come back to many times throughout the course as we develop more advanced skills.


Environment diagrams help us keep track of the objects at play in our python program, and how they evolve over the course of the program. We will keep track of two different places in memory where objects are stored: the __heap__ and the __stack__. Names of objects are stored in the stack and the actual object is stored in the heap. We also keep track of __frames__ in environment diagrams. Frames are where code is executed (this gives rise to local variables if you are familiar with these).


Let's see how to construct an environment diagram. [Pythontutor.com](https://pythontutor.com/) has a really nice interactive environment diagram generator that I will use throughout the course. Let's start with a very basic program
```python
x = 10
x = 20
```


{{< rawhtml >}}
<iframe width="800" height="500" frameborder="0" src="https://pythontutor.com/iframe-embed.html#code=x%20%3D%2010%0Ax%20%3D%2020&codeDivHeight=400&codeDivWidth=350&cumulative=true&curInstr=2&heapPrimitives=true&origin=opt-frontend.js&py=3&rawInputLstJSON=%5B%5D&textReferences=false"> </iframe>
{{< /rawhtml >}}


In this interactive environment diagram the stack is represented under the frames and the heap is represented under the objects. When we execute 'x = 10', x is added to the stack as a __variable__ which is __bound__ to the object on the heap representing the integer 10. We call the arrow connecting the two the __refrence__.


On the next line of code, 'x = 20', we change our mind and instead bound x to the integer 20.


There is a secret intermediate step not shown. What happened to the integer representing 10 on the heap? It got garbage collected. Because python is an interpreted language, it can manage its memory during runtime automatically. This means that we can free up the memory on the heap being taken up by objects which are not bound to anything through a process called garbage collection. This means that you do not have to manage memory explicitly like in C or C++!


Let's look at how lists are represented on the heap.
{{< rawhtml >}}
<iframe width="800" height="500" frameborder="0" src="https://pythontutor.com/iframe-embed.html#code=l%20%3D%20%5B1,%202,%203,%20%22python%20is%20fun%22%5D%0Ax%20%3D%20l%5B0%5D&codeDivHeight=400&codeDivWidth=350&cumulative=true&curInstr=2&heapPrimitives=true&origin=opt-frontend.js&py=311&rawInputLstJSON=%5B%5D&textReferences=false"> </iframe>
{{< /rawhtml >}}


Lists are represented as a sequence of references to the objects in them. This leads to some unexpected consequences. Take this code for example.
{{< rawhtml >}}
<iframe width="800" height="500" frameborder="0" src="https://pythontutor.com/iframe-embed.html#code=list_1%20%3D%20%5B1,%202,%203,%204%5D%0Alist_2%20%3D%20list_1%0Alist_2%5B0%5D%20%3D%2010%0Aprint%28list_1%5B0%5D%29%0Aprint%28list_2%5B0%5D%29&codeDivHeight=400&codeDivWidth=350&cumulative=true&curInstr=0&heapPrimitives=true&origin=opt-frontend.js&py=311&rawInputLstJSON=%5B%5D&textReferences=false"> </iframe>
{{< /rawhtml >}}


We would expect the line 'print(list_1[0])' to print the integer 1. However, it prints 10 instead! The reason for this behavior is shown in the environment diagram. Whenever we call 'list_2 = list_1' we create the list_2 variable and reference it to the same object. Because list_1 and list_2 refer to the same object, changing the object associated with list_2 also changes the object associated with list_1!


This is called aliasing, and it is a common pitfall for many new programmers in python. With the environment diagram we can see why it happens and next lecture we will discuss how to avoid it!


# IDE
Unless you already have a strongly preferred IDE with an integrated terminal, I highly recommend using Visual Code Studio. It is my IDE of choice and will make following along with what I do a lot easier. The installation is straightforward


# Black and Pylint
It is just as important to write readable code as it is to write working code! If you want to collaborate with other people, or find yourself looking back at a piece of code you wrote many months ago, documentation and consistent formatting go a long way.


# Pytest
In order to test if our python functions are working correctly, we will use pytest. To download it simply use pip.

```bash
C:\Users\jdhag> pip install pytest
```

# More Practice
{{< soft src="/img/why_python/leetcode.png" alt="Soft-styled image" >}}
If you ever find yourself wanting more practice with python, I highly recommend checking out [leetcode](https://leetcode.com/problemset/). This website is supposed to help you study for technical interviews, but I also used it to help me learn python. Change the language to python and start out with the easy questions which should be plenty challenging enough for someone just starting out in python. If you get better you can go for the medium or hard questions. Even after you solve a question, it is helpful to look at how your submission fared against other submissions. Where can you improve your code? Have fun, and maybe this will even help you score a tech job one day when you crush the technical interview.
