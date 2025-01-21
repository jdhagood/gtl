+++
title = 'Esp32 AP'
draft = false
+++
A simple example program to set up an ESP32 as an Access Point to server a webpage to control an LED on an local wireless network.
```python
import network  # Import the network module to set up Wi-Fi
import socket   # Import the socket module for handling HTTP requests
import machine  # Import the machine module for controlling hardware

led = machine.Pin(14, machine.Pin.OUT)  # Create a Pin object for the LED, set as output

# Configure the ESP32 as an Access Point (AP)
ssid = "ESP32-AP"          # Wi-Fi network name (SSID); Change this to something unique
password = "12345678"      # Password for the Wi-Fi network (must be at least 8 characters); Change this to something unique

# Create an Access Point instance
ap = network.WLAN(network.AP_IF)  # Create a WLAN object in AP mode
ap.active(True)                   # Activate the Access Point
ap.config(essid=ssid, password=password)  # Set the SSID and password for the AP

# Print the Access Point details
print(f"Access Point active. Connect to Wi-Fi: {ssid}, Password: {password}")
print(f"IP address: {ap.ifconfig()[0]}")  # Print the AP's IP address (default: 192.168.4.1)

# HTML content for the webpage
# This is the basic HTML page served by the ESP32, with buttons to control the LED
html = """<!DOCTYPE html>
<html>
<head>
    <title>LED Control</title>
    <style>
        body { font-family: Arial; text-align: center; }
        button { padding: 20px; margin: 10px; font-size: 20px; }
    </style>
</head>
<body>
    <h1>ESP32 LED Control</h1>
    <button onclick="toggleLED('on')">Turn LED ON</button>
    <button onclick="toggleLED('off')">Turn LED OFF</button>
    <script>
        // JavaScript function to send LED control requests
        function toggleLED(state) {
            fetch('/led?state=' + state);  // Send a GET request to the ESP32 with the LED state
        }
    </script>
</body>
</html>
"""

# This function returns the HTML content when the ESP32 receives a request
def web_page():
    return html

# Start a socket server to listen for incoming connections
addr = socket.getaddrinfo('0.0.0.0', 80)[0][-1]  # Get address info for the server
s = socket.socket()                              # Create a socket object
s.bind(addr)                                     # Bind the socket to the address and port
s.listen(1)                                      # Start listening for connections (max 1 client at a time)
print('Listening on', addr)

# Main loop to handle client requests
while True:
    # Accept a new connection from a client
    conn, addr = s.accept()  # Wait for a client to connect
    print('Connection from', addr)  # Print the client's address

    # Receive the client's HTTP request
    request = conn.recv(1024)  # Receive up to 1024 bytes of data
    request = str(request)     # Convert the request to a string
    print('Request:', request) # Print the HTTP request for debugging

    # Check the request for LED control commands
    if '/led?state=on' in request:  # If the request contains 'state=on'
        led.value(1)                # Turn the LED ON
        print("LED turned ON")      # Print confirmation
    if '/led?state=off' in request: # If the request contains 'state=off'
        led.value(0)                # Turn the LED OFF
        print("LED turned OFF")     # Print confirmation

    # Serve the webpage
    response = web_page()  # Get the HTML content
    # Send the HTTP response to the client
    conn.send("HTTP/1.1 200 OK\r\nContent-Type: text/html\r\n\r\n" + response)
    conn.close()           # Close the connection to the client
```
