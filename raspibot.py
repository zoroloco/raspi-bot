import maestro
import sys
from sys import stdin
from gpiozero import LED

servo = maestro.Controller()
servo.setAccel(0,4)      #set servo 0 acceleration to 4
servo.setAccel(1,4)
servo.setAccel(3,4)
servo.setAccel(4,4)
servo.setAccel(5,4)
servo.setAccel(6,4)
servo.setAccel(7,4)

yellowLed = LED(21)
greenLed = LED(16)
blueLed = LED(20)
redLed = LED(18)

sys.stdout.write('CONNECTED')
sys.stdout.flush()

while True:
    cmd = stdin.readline()
    if cmd is not None:
        if cmd == 'REMOTE_CONNECT':
            blueLed.on()
            sys.stdout.flush()
        elif:
            splitStr = cmd.split(',')
            servo.setTarget(int(splitStr[0]),int(splitStr[1]))
            sys.stdout.write("Moving servo:"+splitStr[0]+" to position:"+splitStr[1])
            sys.stdout.flush()

servo.close