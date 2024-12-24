import time
from datetime import datetime
import winsound

# def timer(repetition, numberOfReps):
#     target = time.time() + repetition
#     i = 0
#     while True:
#         if i >= numberOfReps:
#             break
#         if time.time() >= target:
#             print("Hello it has been 5 sec")
#             target = time.time() + repetition
#             i += 1
        

def alarm(targetTime, isRepeat):
    while True:
        if datetime.now() >= targetTime:
            print("WAKE UP", targetTime)
            winsound.Beep(2500, 2000)
            break
        else:
            time.sleep(1)
                
          
    
alarm(datetime.now().replace(minute=20), True)
