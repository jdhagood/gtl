+++
title = 'Hangman'
+++


Let's implement a simple game of hangman. If you are not familiar with this game, it is a word guessing game. A starting word is chosen, generally by another person, but in our case from a random list. You always know how many letters are in this word and you take turns guessing letters in the word. If the letter you guessed is in the word, then the letter position(s) in the word are revealed to you. If the letter you guessed is not in the word, then you lose a life. You have a limited number of lives.


If you guess all the letters in the word before you lose all your lives, then you win. Otherwise you lose (and a guy gets hung for some reason. Seems like high stakes for a silly little guessing game).


For example, if the word was `'python'` then gameplay could look something like this;
```
_ _ _ _ _ _
Lives: 3
Enter guess: a


_ _ _ _ _ _
Lives: 2
Enter guess: o


_ _ _ _ o _
Lives: 2
Enter guess: t


_ _ t _ o _
Lives: 2
Enter guess: i


_ _ t _ o _
Lives: 1
Enter guess: n


_ _ t _ o n
Lives: 1
Enter guess: p


p _ t _ o n
Lives: 1
Enter guess: y


p y t _ o n
Lives: 1
Enter guess: h


You Win!
The word was python.
```


If you guessed `"b"` on the last guess rather than `"h"` then the output would be


```
p y t _ o n
Lives: 1
Enter guess: b


You Lose!
The word was python
```
# Starting words
We will store our list of starting words in a filed called `words.txt`. You can download that file <a href="/helper_files/words.txt" download>here</a>.


We will get a random word from this list with this function.


```python
import random


def get_random_word(file_path):
    """
    Get a random word form
    args:
        file_path (str): relative or absolute file path to words.txt
    returns:
        word (str): a random word from words.txt
    """
    # Open our file in python and store it in f. type(f) = <class '_io.TextIOWrapper'>
    words_file = open(file_path, "r")
    # Convert the text file to list; words_list = ["able\n" "about\n" "account\n", ...]
    words_list = list(words_file)
    # Use random.choice to choose a random word from our words_list
    word =  random.choice(words_list)
    # Get rid of the "\n" character at the end of each word
    word = word.strip("\n")
    # Close the
    words_file.close()
    # return our word
    return word


word = get_random_word("./words.txt")
print(word)
```
Understanding exactly how this function gets a random word is not critical, but if you are curious I tried to explain it through the comments in the code.


Make sure that your file path to `word.txt` is correct. The `"./"` tells python to look for the file in the directory you are running your python script from. If it is not there you will get an error. If you cannot get the relative file location to work you can just put the absolute file location as a fail-safe. The code is no longer portable but at least it will work on your machine. Let me know if you are having trouble with this.


We will work with this word string for the rest of the reading.


# Getting input
Python provides us with a really nice way to get user input from the terminal using the `input` function.


```python
user_input = input("Please provide input: ") # Wait to get input


print("You entered: " + user_input)
```


The `input` function will print whatever string you pass as an argument (in our case it is `"Please provide input: "`) and then wait for the user to type something. You can type whatever string you want and press the 'enter' key to submit your string.


Note that if you are trying to run this in Visual Studio, you cannot just simply click the run button because you will only have access to the output of the program and will not be able to provide input. You will need to run it in the terminal.


I put my program in a file called `'hangman.py'` in the directory `'python_sketchbook'`. I set my working directory to `'python_sketchbook'` and then ran this command.


```
C:\Users\jdhag\python_sketchbook>python hangman.py
```


If you have Python on your PATH variable (like I recommended in lecture 0), then this should run the `hangman.py` file in the terminal where you can provide input.


```
Please provide input: I love Python!
You entered: I love Python!


```
Note that the user can put WHATEVER they want into this input. If we are making a hang man game, we only want the user to input a single letter. In the next section we will deal with this problem.


# Filtering Input
Any time you are designing a program that humans will use, you need to consider how they will interact with that program and if their interactions can lead to crashes or bugs. (Some people intentionally try to do this, so watch out! SQL injections are a prime example of this if you are familiar with these attacks.)


One simple approach we can use to filter input is to check if it is valid or not. If it is valid we can proceed. If it is invalid we can provide the user with a short message about the correct input and ask again. Because we do not know how many times we need to keep asking the user to retry, this is a job for a `while` loop!


Let's first make a function to check if the user input is valid. Our function could look something like this:


```Python
def is_valid_input(user_input):
    """
    A function to check if the provided input is valid for our hangman game
    args:
        user_input (str): the string from the user input
    return:
        Boolean (bool): if the input was valid or not
    """
    # Only accept single characters
    if len(user_input) == 1:
        return True
    else:
        return False
```
If we wanted to save on some lines of code, we could refactor the function.


```Python
def is_valid_input(user_input):
    """
    A function to check if the provided input is valid for our hangman game
    args:
        user_input (str): the string from the user input
    return:
        Boolean (bool): if the input was valid or not
    """
    # Only accept single characters
    return len(user_input) == 1
```
Make sure you understand why these functions are the same.


Now we can filter the input with this approach.


```Python
user_input = ""


while not is_valid_input(user_input):
    user_input = input("Please guess a letter: ")


print("You guessed: " + user_input)
```


This now works as expected:
```Python
C:\Users\jdhag\python_sketchbook>python hangman.py
Please guess a letter: hello
Please guess a letter: 123
Please guess a letter: a
You guessed: a
```


If we wanted to provide the user with a short message about why their input was invalid we can refactor our code to the following.
```Python
user_input = ""


while True:
    user_input = input("Please guess a letter: ")
    if is_valid_input(user_input):
        break
    print("Please guess one letter at a time!")


print("You guessed: " + user_input)
```
While it may look like we introduced an infinite loop into our program that will prevent any future execution, the `break` keyword saves us. Whenever `break` is executed, it breaks us out of the current loop that we are in (this works for both `while` loops and `for` loops). We can see that the user is stuck in this infinite while loop until they eventually provide a valid input. We implemented the code this way so that the user is not yelled at every time it is their turn to guess. They are only yelled at after they guess wrong.


Let's wrap this up into a handy function.


```Python
def get_user_guess():
    """
    A function to return a valid guess from the user
    args:
        none
    return:
        user_input (str): the valid guess from the user
    """
    def is_valid_input(user_input):
        """
        A function to check if the provided input is valid for our hangman game
        args:
            user_input (str): the string from the user input
        return:
            Boolean (bool): if the input was valid or not
        """
        # Only accept single characters
        return len(user_input) == 1


    user_input = ""


    while True:
        user_input = input("Please guess a letter: ")
        if is_valid_input(user_input):
            break
        print("Please guess one letter at a time!")


    return user_input
```
We could have also exited the infite while loop like so. Recall that when we return a value from a function we exit from that function.
```
while True:
    user_input = input("Please guess a letter: ")
    if is_valid_input(user_input):
        return user_input
    print("Please guess one letter at a time!")
```
Both of these are valid and do the same thing.

Notice how we define `is_valid_input` inside of `get_user_guess`. We call functions defined inside of other functions _"helper functions"_, because they help us to cleanly implement our main function. We can call `is_valid_input` anywhere inside of `get_user_guess`, but it will not be accessible outside of `get_user_guess`. This helps with organization and preventing us from accidentally redefining functions in other places. (and yes, you can have helper functions inside of helper functions inside of helper functions inside of... well, you get the point).


On the pset you will be asked to make a better input filter. Right now we are only checking that a single character was entered. Therefore, `'1'`, `'@'`, `'/'`, and `'{'` are all considered valid inputs even though they would never be in a hangman word (unless the person making the hangman game was really, really evil. I am not that evil).


We also are also accepting `'a'` and `'A'` as different inputs. In our hangman game we do not want the case of the letter to affect gameplay. We could either enforce all lowercase letters or all upper case letters in our input filter, or we could just convert all upper case letters to lower case letters for some input post processing. On the pset we will implement the latter approach because it leads to a better user experience in my opinion.


Take some time now to answer the first question on the pset.


# Determining if a guess is correct or not
Now that we have a user's guess, how can we determine if it is correct or not? Remember when I mentioned how you can use the keyword `in` as a boolean operator with strings and lists? This is the perfect use case! On the problem set go ahead and implement the `is_guess_correct` function. It should return true when the guess is correct (meaning the letter is in the word) and false when the guess is incorrect (meaning the letter is not in the word).


```
>>> is_guess_correct("a", "cat")
True
>>> is_guess_correct("b", "cat")
False
>>> is_guess_correct("n", "python")
True
>>> is_guess_correct("q", "python")
False
```


# Keeping track of guesses and lives
In order to know what letters to display in the word we need a way of tracking what the user has guessed. To do this we will use the aptly named list `correct_user_guesses`.


```Python
word = get_random_word("./words.txt")


correct_user_guesses = [] # Start with no correct guesses


print("Shhh, the word is: " + word) # For demonstration


user_guess = get_user_guess()


if is_guess_correct(user_guess, word):
    print("Correct Guess!")
    if user_guess not in correct_user_guesses: # avoid duplicate guesses
        correct_user_guesses.append(user_guess)
else:
    print("Incorrect Guess!")
```
We may also keep track of lives.


```Python
word = get_random_word("./words.txt")


correct_user_guesses = [] # Start with no correct guesses
lives = 5 # Changing this changes the difficulty of the game


print("Shhh, the word is: " + word) # For demonstration


user_guess = get_user_guess()


if is_guess_correct(user_guess, word):
    print("Correct Guess!")
    if user_guess not in correct_user_guesses: # avoid duplicate guesses
        correct_user_guesses.append(user_guess)
else:
    print("Incorrect Guess!")
    lives -= 1
```
We can also be nice and keep track of the incorrect user guesses. If the user guesses the same incorrect letter twice, they will only lose a life for the first time. Let's also remind the user when they guess a letter they have guessed before too.


```Python
word = get_random_word("./words.txt")


correct_user_guesses = [] # Start with no correct guesses
incorrect_user_guesses = [] # Start with no incorrect guesses
lives = 5 # Changing this changes the difficulty of the game


print("Shhh, the word is: " + word) # For debugging


user_guess = get_user_guess()


if is_guess_correct(user_guess, word):
    print("Correct Guess!")
    if user_guess not in correct_user_guesses: # avoid duplicate guesses
        correct_user_guesses.append(user_guess)
    else:
        print("You have guessed that before.")
else:
    print("Incorrect Guess!")
    if user_guess not in incorrect_user_guesses:
        incorrect_user_guesses.append(user_guess)
        lives -= 1
    else:
        print("You have guessed that before")
```
# Determining win state.
It is easy to determine when the game is lost because `lives` will be at 0. However, determining when the game is won is more tricky. We need to check that we have guessed every letter in a word. Thankfully we are already keeping track of our correct guesses, so lets make a function to determine if we won or not called `is_game_won`. implement this on the problem set


```python
>>> is_game_won("cat", [])
False
>>> is_game_won("cat", ["c", "a"])
False  
>>> is_game_won("cat", ["c", "t", "a"])
True  
```


# The main game loop
So far we have only been able to make one guess, but we need to be able to make guesses until we either guess all the letters in the word or run out of lives. Whenever we need to repeat some code an undetermined number of times until something happens, a `while` loop is the tool we need.


```python
word = get_random_word("./words.txt")


correct_user_guesses = [] # Start with no correct guesses
incorrect_user_guesses = [] # Start with no incorrect guesses
lives = 5 # Changing this changes the difficulty of the game


print("Shhh, the word is: " + word) # For debugging


while lives > 0 and not is_game_won(word, correct_user_guesses):
    user_guess = get_user_guess()


    if is_guess_correct(user_guess, word):
        print("Correct Guess!")
        if user_guess not in correct_user_guesses: # avoid duplicate guesses
            correct_user_guesses.append(user_guess)
        else:
            print("You have guessed that before.")
    else:
        print("Incorrect Guess!")
        if user_guess not in incorrect_user_guesses:
            incorrect_user_guesses.append(user_guess)
            lives -= 1
        else:
            print("You have guessed that before")


if is_game_won(word, correct_user_guesses):
    print("You Win")
else:
    print("You Lose")
```


# Displaying our word
Hangman relies on the user being able to see where their guessed letters are in the word. We can make a function to display the current progress given `word` and `correct_user_guesses`. This function should not return anything and just print to the terminal. Implement this function on the problem set.


```python
>>> display_hangman_word("cat", ["c"]):
c _ _
>>> display_hangman_word("cat", ["c", "t"]):
c _ t
>>> display_hangman_word("cat", ["c", "t", "a"]):
c a t
>>> display_hangman_word("python", []):
_ _ _ _ _ _
>>> display_hangman_word("python", ["h", "y", "o"]):
_ y _ h o _
```


# Bringing it all together
We can now bring everything we have built so far together. Take some time to read though this code so you understand what it is doing.


```python
word = get_random_word("./words.txt")


correct_user_guesses = [] # Start with no correct guesses
incorrect_user_guesses = [] # Start with no incorrect guesses
lives = 5 # Changing this changes the difficulty of the game


print("Shhh, the word is: " + word) # For debugging


while lives > 0 and not is_game_won(word, correct_user_guesses):
    display_hangman_word(word, correct_user_guesses)
    print("Lives: ", lives)
    user_guess = get_user_guess()


    if is_guess_correct(user_guess, word):
        print("Correct Guess!")
        if user_guess not in correct_user_guesses: # avoid duplicate guesses
            correct_user_guesses.append(user_guess)
        else:
            print("You have guessed that before.")
    else:
        print("Incorrect Guess!")
        if user_guess not in incorrect_user_guesses:
            incorrect_user_guesses.append(user_guess)
            lives -= 1
        else:
            print("You have guessed that before")


if is_game_won(word, correct_user_guesses):
    print("You Win")
else:
    print("You Lose")


print("The word was: " + word)
```


# Take Aways
Other than giving you a cool little game to play in your freetime, this lab introduced some tools and coding structures that will be useful throughout your CS career.


`while` loops are powerful structures for when you do not know exactly how many times a piece of code should iterate. We can make some really slick functions by combining the `while True` infinite loop with the `break` keyword to bail out when we want to.


The power of `for` loops to iterate over lists and strings was explored. This will show up time and time again when programming in python, so it is worth committing this technique to memory.


However, by far the most important topic that was explored was the use of functions. When trying to implement something as complicated as hangman in python, it is not at all obvious at first how to do that! Throughout this reading we took that really hard task and split it up into easier tasks in the form of functions (`get_user_guess`, `is_game_won`, `display_hangman_word`). These smaller functions were much easier to think about, and once we wrote the function, we could essentially forget about how it worked under the hood and treat it like a keyword to build more complicated behavior. As your programs get larger and larger, managing complexity with functions is the key to a successful project!