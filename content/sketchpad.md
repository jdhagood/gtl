+++
title = 'sketchpad'
draft = false 
math = true
+++

Hello, my name is JD, and I will be your instructor for this introduction to python class! I am looking forward to meeting everyone and teaching my favorite programming language: python.
# Where am I from?
 ![my_home](/img/about/home.jpg)
 I grew up in Clinton, Mississippi USA. 

{{< rawhtml >}}
<div style="text-align: center;">
    <p>
        Download here: <a href="/zip_files/code.zip" download>Download the ZIP file</a>
    </p>
</div>
{{< /rawhtml >}}

$$\int^\infty_0 e^{-x^2}dx = \frac{\sqrt{\pi}}{2}$$
{{< soft src="/img/about/home.jpg" alt="Soft-styled image" >}}

{{< katex id="inline-math" >}}
The formula for the Gaussian integral is \( \int^\infty_0 e^{-x^2}dx = \frac{\sqrt{\pi}}{2} \).
{{< /katex >}}

{{< katex id="block-math" >}}
$$
\begin{array}{|c|c|c|}
\hline
\text{Header 1} & \text{Header 2} & \text{Header 3} \\
\hline
\text{Data 1} & \text{Data 2} & \text{Data 3} \\
\text{Data 4} & \text{Data 5} & \text{Data 6} \\
\hline
\end{array}
$$
{{< /katex >}}

```python
print("Hello World")
for i in range(10):
    print(f"num = {i}")
```

```vim
Change of config file detected, rebuilding site (#35).
2024-12-23 16:17:56.743 -0600
Web Server is available at http://localhost:65294/ (bind address 127.0.0.1)
Rebuilt in 84 ms
```


{{< rawhtml >}}
<div style="color: red; text-align: center;">
    <h1>🔥 Welcome to My Hugo Website! 🔥</h1>
    <p>This is raw HTML inside a Hugo shortcode. Isn't it cool? 😎</p>
</div>
{{< /rawhtml >}}


Note that when a function returns a value, the function is done executing. This means anything after a return statement will not be executed.
```python
def return_example():
    print("This is executed") # This will print
    return
    print("This is not executed") # This will not print

return_example()
```
We can use this to our advantage to bail out of functions at any time. For example, if we had a list of boolean values and we wanted to know if any of the values in there are True (and we didn't know about the 'any' keyword), the we could write our function in this elegant way:

```python
def any_true(input_list):
    for value in input_list:
        if value:
            return True
    return False

my_list = [False, False, False, True, False, False]
print(any_true(my_list))
```
As soon as the for loop comes across a true value, we return true and don't even bother checking the rest of the values in the for loop because they do not matter. If the for loop exits then we know that there were no true values in the list so we can instead return false. 
