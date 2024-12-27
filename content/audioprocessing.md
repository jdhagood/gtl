+++
title = 'Audio Processing'
draft = false
mathb = true
+++
# Introduction
In this lab we will perform manipulations on audio files to produce some cool effects. Before we can start let's talk about how sound is stored on a computer. 

When you use a microphone to record a sound, it measures the electrical signal from a transducer which is proportial to the pressure at the transducer many times a second. This produces a list of numbers, called samples (both positive, zero, and negative), corresponding to the pressue at a certain time. 

When you play the sound back an electrical signal is applied to the speaker accoring to the samples to recreate the sound.

Sound can be recorded in _mono_ or in _stero_. In _mono_ each sample is a single value while in _stero_ each sample is two values representing the left and right channels. 

# Representation of sounds
The file we are working with are in the WAV format, but you do not need to worry about the nitty-gritty of how this format stores wave files. Throughout this lab we will represent sounds as a dictonary. For instance, a mono sound can be represnted as:
```python
s = {
    'rate': 8000,
    'samples': [1.00, 0.91, 0.67, 0.31, -0.10, -0.50, -0.81, -0.98, -0.98, -0.81],
}
```
for 'rate' (an int) the sampling rate in samples per second and 'samples' a list of floating point values. 

# Backwards Audio
With this breif exposition we are ready to implement our first audio effect. Let's reverse some audio. Implement the 'backward' function in your 'lab.py'. If you do this correctly you should pass some test cases. Here is how you could, for example, reverse a cat's meow:
```python
if __name__ == "__main__":
    # code in this block will only be run when you explicitly run your script,
    # and not when the tests are being run.  this is a good place to put your
    # code for generating and saving sounds, or any other code you write for
    # testing, etc.

    meow = load_wav(r"audio_processing\sounds\meow.wav")
    reversed_meow = backwards(meow)
    write_wav(reversed_meow, "reversed_meow.wav")
```

# Mixing Audio
Now we will mix two different audio sources with a function called "mix". This function will take in two differnt mono sounds and mix them according to a parameter _p_. The function should take _p_ times the first song and add it to _1-p_ times the second sound. 

If the two sounds have differenet sampling rates, the function should retun None, and if the two sounds have different lengths, then the output should should be the maximum of the lengths of the two input sounds.

After you implement this you should pass some more test cases.

# Convolutional Filters
Let us now make a very powerful audio effect called a convolution. Our function will take in 