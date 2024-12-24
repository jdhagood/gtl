+++
title = 'hello, world'
draft = false
+++
# Downloading python
Before we can jump into programing, everyone needs to download python. Download the latest version for your operating system from [python.org](https://www.python.org/downloads/) (3.13.1 when I wrote this). 

{{< soft src="/img/why_python/path.jpg" alt="Soft-styled image" >}}

To test that your instilation was successful and you now have python on your PATH system variable, open your terminal and run the following command.
```
C:\Users\jdhag>python --version
Python 3.12.3
```
You will get an error if you do not have python downloaded properly.

# Your first python program
Belive it or not, you are ready to run your first python program. If you type 'python' into your command prompt (or 'py' if you're cool) then you will end up inside the python shell.

```
C:\Users\jdhag>python
Python 3.12.3 (tags/v3.12.3:f6650f9, Apr  9 2024, 14:05:25) [MSC v.1938 64 bit (AMD64)] on win32
Type "help", "copyright", "credits" or "license" for more information.
>>> print("hello, world")
hello, world
>>>
```
You may have seen the "hello, world" example while learning other programing languages. It has become the prototypical first program that everyone should write when starting a new programming language. It is likely that this comes from 1974 Bell Laboratories internal memorandum by Brian Dernighan _Programming in C: A Tutorial_. He said that the inspiration for the phrase came from a cartoon he watched as a kid with a small chick hatching and then saying "hello, world."

to exit simply type 'quit()'
```
>>> quit()

C:\Users\jdhag>
```

# Why Python?
This is a good question to ask when starting to learn any programming language. I think that the best way to answer this is to listen to what the original inventor of Python, Guido van Rossum, said in an interview when asked why he made python.

```python
print("Hello World")
for i in range(10):
    print(f"num = {i}")
```