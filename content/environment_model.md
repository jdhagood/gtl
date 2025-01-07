+++
title = 'Enviroment Model'
draft = false
+++
# The Environment Diagram
When you are programming in any language, it is important to have a mental model of what you are doing. If you are blindly executing code and run into a bug, it can be nearly impossible to figure out how to fix it on your own if you are not aware of what exactly you are writing. Environment diagrams help demystify many confusing aspects of Python and shine light on why many of the things in Python are done the way they are. This will be a topic that we come back to many times throughout the course as we develop more advanced skills.


Environment diagrams help us keep track of the objects at play in our Python program, and how they evolve over the course of the program. We will keep track of two different places in memory where objects are stored: the __heap__ and the __stack__. Names of objects are stored in the stack and the actual object is stored in the heap. We also keep track of __frames__ in environment diagrams. Frames are where code is executed (this gives rise to local variables if you are familiar with these).


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


There is a secret intermediate step not shown. What happened to the integer representing 10 on the heap? It got garbage collected. Because Python is an interpreted language, it can manage its memory during runtime automatically. This means that we can free up the memory on the heap being taken up by objects which are not bound to anything through a process called garbage collection. This means that you do not have to manage memory explicitly like in C or C++!


Let's look at how lists are represented on the heap.
{{< rawhtml >}}
<iframe width="800" height="500" frameborder="0" src="https://pythontutor.com/iframe-embed.html#code=l%20%3D%20%5B1,%202,%203,%20%22python%20is%20fun%22%5D%0Ax%20%3D%20l%5B0%5D&codeDivHeight=400&codeDivWidth=350&cumulative=true&curInstr=2&heapPrimitives=true&origin=opt-frontend.js&py=311&rawInputLstJSON=%5B%5D&textReferences=false"> </iframe>
{{< /rawhtml >}}


Lists are represented as a sequence of references to the objects in them. This leads to some unexpected consequences. Take this code for example.
{{< rawhtml >}}
<iframe width="800" height="500" frameborder="0" src="https://pythontutor.com/iframe-embed.html#code=list_1%20%3D%20%5B1,%202,%203,%204%5D%0Alist_2%20%3D%20list_1%0Alist_2%5B0%5D%20%3D%2010%0Aprint%28list_1%5B0%5D%29%0Aprint%28list_2%5B0%5D%29&codeDivHeight=400&codeDivWidth=350&cumulative=true&curInstr=0&heapPrimitives=true&origin=opt-frontend.js&py=311&rawInputLstJSON=%5B%5D&textReferences=false"> </iframe>
{{< /rawhtml >}}


We would expect the line 'print(list_1[0])' to print the integer 1. However, it prints 10 instead! The reason for this behavior is shown in the environment diagram. Whenever we call 'list_2 = list_1' we create the list_2 variable and reference it to the same object. Because list_1 and list_2 refer to the same object, changing the object associated with list_2 also changes the object associated with list_1!


This is called aliasing, and it is a common pitfall for many new programmers in Python. With the environment diagram we can see why it happens and next lecture we will discuss how to avoid it!

# Compiled vs Interpreted Languages
Python's dynamic types are thanks to the fact that it is an _interperted language_. This is in contrast to a _compiled language_ like C.


In C, before you can run a program, it must first be translated into binary machine code specific to the hardware it is running on (1s and 0s that are completely unreadable to most everyone on earth).


Contrast this with Python. When you run a Python program it is first compiled to a lower level language (like bytecode). This lower level language is not hardware specific so it will not be able to run on your computer. Instead it is read line by line by a virtual machine called the Python Virtual Machine (PVM). This is why we had to download python. Part of the installation was setting up this PMV to be able to read your code on the fly. (this technically means that python is not fully an interpreted language because it first needs to be compiled to bytecode for the PVM, but this is pedantic!)


The main difference you need to worry about for compiled vs interpreted languages is that compiled languages generally run a lot faster than interpreted languages. Python can be very slow if you give it a lot to compute. However, the development time in a language like Python is generally much faster and more enjoyable due to all the neat tricks you can do with a compiled language, like dynamically typed variables.


{{< soft src="/img/hello_world/python_bytecode.jpg" alt="Soft-styled image" >}}


Note that we can usually get the best of both worlds by letting Python control statically typed programs. This is what many Python libraries, like NumPy, do and act as wrappers around C and C++ functions.