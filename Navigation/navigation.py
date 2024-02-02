# Import necessary libraries
import pyttsx3  # Text-to-speech library
import speech_recognition as sr  # Speech recognition library
import pyaudio

# Function to convert text to speech
def speak(text):
    engine = pyttsx3.init()
    engine.say(text)
    engine.runAndWait()

# Function to recognize speech
def listen():
    recognizer = sr.Recognizer()
    with sr.Microphone() as source:
        print("Listening...")
        recognizer.adjust_for_ambient_noise(source, duration=3)
        audio = recognizer.listen(source, timeout=20)
        try:
            command = recognizer.recognize_google(audio).lower()
            print("You said:", command)
            return command
        except sr.UnknownValueError:
            print("Sorry, could not understand audio.")
            return None


# Function to provide indoor navigation guidance
def navigate():
    speak("Welcome to the indoor navigation system.")
    speak("Please specify your destination.")

    mapped_layout = {
        "entrance": {"description": "Entrance", "directions": {"straight": "hallway"}},
        "hallway": {"description": "Hallway", "directions": {"left": "room_a", "right": "room_b"}},
        "room_a": {"description": "Room A", "directions": {"back": "hallway"}},
        "room_b": {"description": "Room B", "directions": {"back": "hallway"}},
    }

    while True:
        destination = listen()

        if destination and destination in mapped_layout:
            speak(f"Navigating to {mapped_layout[destination]['description']}.")
            current_location = "entrance"  # Assuming the user starts at the entrance

            # Calculate the route (simplified, direct path for illustration purposes)
            route = ["entrance", "hallway", destination]

            # Provide step-by-step directions
            for location in route[1:]:
                speak(f"Proceed to {mapped_layout[location]['description']}.")
                current_location = location

            speak(f"You have reached {mapped_layout[destination]['description']}.")
            break
        else:
            speak("Sorry, I did not hear your destination. Please try again.")


if __name__ == "__main__":
    navigate()
