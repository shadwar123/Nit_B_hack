        recognizer.adjust_for_ambient_noise(source, duration=3)
        audio = recognizer.listen(source, timeout=20)