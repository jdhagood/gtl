+++
title = 'Generators'
draft = false
math = true
+++

# Reimplementing range
Suppose we wanted to reimplement python's range function. To do so we may naïvely implement a function that retuns a list of numbers in our desired range like this:
```python
def list_range(start, stop, step=1):
    assert step >= 1
    out = []
    current = start
    while current < stop:
        out.append(current)
        current += step
    return out
```
However, let's try to use this function in the following program.
```python
for i in list_range(0, 1_000_000_000_000_000, 1):
    if i > 100:
        break
    print(i)
```
You will eventually see the numbers 0-99 printed on the screen, but not after a considerable pause! Whats worse is that our program will now consume a relativly large amount of memory just to print out the first 100 values in our range. Python's native range function will not do this, so how can we imitate that?

The answer only requires a small refactoring of our list_range function into a generator. This way, we can avoid having to preprocess the out list.
```python
def gen_range(start, stop, step=1):
    assert step >= 1
    current = start
    while current < stop:
        yield current
        current += step
```
We can now make our generator object.
```python
>>> g = gen_range(0, 1_000_000_000_000_000, 1)
>>> g
<generator object gen_range at 0x0000021C8D035B40>
```
When we created g, the shell resolved it right away. There was no wait because all that python does is create the generator object and execute the program up to the keyword 'yield'. In order to get past the 'yield' keywork in the generator we can ask for the next item in the generator

```python
>>> next(g)
0
>>> next(g)
1
>>> next(g)
3
```
Each time we call 'next' the generator picks up from where it last yeilded from and runs until it yeilds the next number. It only does the miniumum computation requested from it. We can now use this generator in place of our list.

```python
for i in gen_range(0, 1_000_000_000_000_000, 1):
    if i > 100:
        break
    print(i)
```
If you run this then we avoid the annoying delay that was present with the list_range implementation. 
# StopIteration Error
Some generators do not allow you to ask for the next element an infinite amount of times. For instance, consider this generator
```python
>>> def gen1():
...     yield 1
...     yield 2
...     yield 3
...
>>> g = gen1()
>>> next(g)
1
>>> next(g)
2
>>> next(g)
3
>>> next(g)
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
StopIteration
```
As we can see, once the generator runs out of values the StopIteration error is raised. Without proper error handeling this can hault the entire program!

# The 'yield from' keyword
Suppose that we have two generators and we want to make a generator from the two. A way that we could do this is as follows:

```python
def gen1():
    yield 1
    yield 2

def gen2():
    yield 3
    yield 4

def gen3():
    for val in gen1():
        yield val
    
    for val in gen2():
        yield val
```
However the 'yield from' keyword makes the implementation much simplier
```python
def gen3():
    yield from gen1()
    yield from gen2()
```

# The Fibonacci Numbers
No programing couse worth its salt would be complete without mentioning the Fibonacci sequence at least once (or 10 times...). As a refresher, the Fibonacci sequence is defined recusrivly as follows:

{{< katex id="block-math-0" >}}
$$
F_{n} = F_{n-1} + F_{n-2} \quad F_0=0 \quad F_1=1
$$
{{< /katex >}}

Therefore

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

You can calculate small Fibonacci numbers by hand, but if you were asked to calculate The 500th Fibonacci number by hand using this simple approach, it would be rather tedious {{< katex id="inline-math" >}}
(\( F_{500}\approx 2.26\times 10^{104}\) ).
{{< /katex >}}

Lets instead make a generator for the Fibonacci numbers. 
```python
def fib():
    a, b = 0, 1
    while True:
        yield a
        a, b = a, a+b
```
Which works as expected
```python
>>> f = fib()
>>> next(f)
0
>>> next(f)
1
>>> next(f)
1
>>> next(f)
2
>>> next(f)
3
>>> next(f)
5
```
Lets take a moment to unpack what is going on here. We first initialize a and b to the 0th and 1st Fibonacci number. As we go through the infinite loop, we will always yield a. After yielding a we then set a to be the next Fibonacci number, which is stored in b, and set b to be the next next Fibonacci number which is a+b.

# Fibonacci Generalizations
There are three main generalizations of the Fibonacci numbers.  
1. Start with different initial values. For example the Lucas numbers are defined as {{< katex id="block-math-2" >}}
$$
L_{n} = L_{n-1} + L_{n-2} \quad L_0= 2 \quad L_1=1
$$
{{< /katex >}}

2. Weight the numbers differently in the recurrance relation sum. For example the Pell numbers are defined by
{{< katex id="block-math--2" >}}
$$
P_{n} = 2P_{n-1} + P_{n-2} \quad P_0= 0 \quad P_1=1
$$
{{< /katex >}}

3. Sum more numbers in the recurrance relation. For instance we can define the Tribonaci sequence as
{{< katex id="block-math-4" >}}
$$
T_{n} = T_{n-1} + T_{n-2} + T_{n-3} \quad T_0=T_1= 0 \quad T_2=1
$$
{{< /katex >}}

We will now use our newfound skills with generators to explore some of these generalizations!

Our original Fibonacci generating function can easily be modified to start from differnt initial values.

```python
def fib(a, b):
    while True:
        yield a
        a, b = a, a+b
```
Which allows us to now make a generator for some of the Lucas numbers.
```python
>>> f = fib(2, 1)
>>> next(f)
2
>>> next(f)
1
>>> next(f)
3
>>> next(f)
4
>>> next(f)
7
>>> next(f)
11
```
If we define the k-nacci numbers as 
{{< katex id="block-math-5" >}}
$$
F^k_{n} = F^k_{n-1} + F^k_{n-2} + \dots + F^k_{n-k}\quad F^k_0=F^k_1= \dots = F^k_{k-2} = 0 \quad F^k_{k-1}=1
$$
{{< /katex >}}
can you make a generator for all of these? For example
```python
>>> f = nfib(10)
```
would make a generator for the 10-nacci numbers and assign it to the variable f. 

You can use python to explore the other generalizations.

# Primes
Your next task will be to make a generators for the prime numbers for the prime numbers. Recall that a prime number is a positive integer that is only divisible by 1 and itself. 1 is not a prime number (for those who are interested it is also not a composite number and it is called a 'unit'. This is because any other definition would break the fundamental theorem of arithmetic). Therefore the first prime number is 2. Your generator should behave like this:
```python
>>> p = prime_gen()
>>> next(p)
2
>>> next(p)
3
>>> next(p)
5
>>> next(p)
7
```
When you are programming this you want to be mindful of efficient resource management.

# Pseudo Random Number Generator
We will now use generators to make a pseudo random number generator (PRNG)! We call it 'pseudo random' because we will algorithmically generate the random numbers, and so the numbers are determinisitc. However, if you did not know how the numbers were calculated, then they would appear pretty random!

My favorite PRNG is the Wichman-Hill PRNG (we all have a favorite PRNG, right?). It is very simple yet effective at producing PRNs and is defined by three starting values, (s1, s2, s3), called the seed. A different seed will cause the PRNG to output a different sequence of PRNs. Upon each call to the PRNG we update the values s1, s2, and s3 accoring to these formulas:
{{< katex id="block-math-6" >}}
$$
\begin{align*}
s1 &:= 171\times s1 \mod 30269\\
s2 &:= 172\times s1 \mod 30307\\
s3 &:= 170\times s1 \mod 30323\\
\end{align*}
$$
{{< /katex >}}
30269, 30307, and 30323 were chosen because they are three prime number that are relativly close together and will lead to a peroid that is their LCM. 

We then output the value
{{< katex id="block-math-7" >}}
$$
r := (s1/30269 + s2/30307 + s3/30323) \mod 1
$$
{{< /katex >}}

Implement this as a generator. 
```python
>>> rand = wichmann_hill(1, 2, 3)
>>> next(rand)
0.03381877363047378
>>> next(rand)
0.7775418875596665
>>> next(rand)
0.05273524613909042
>>> next(rand)
0.7446240744053352
>>> next(rand)
0.49036219114966934
>>> next(rand)
0.9828543730370005
>>> next(rand)
0.809150988177624
```