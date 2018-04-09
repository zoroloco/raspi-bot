import maestro
import sys
from sys import stdin

servo = maestro.Controller()
servo.setAccel(0,4)      #set servo 0 acceleration to 4
servo.setAccel(1,4)

sys.stdout.write('starting raspibot.py')
while True:
    cmd = stdin.readline()
    if(cmd is not None):
        splitStr = cmd.split(',')
        servo.setTarget(int(splitStr[0]),int(splitStr[1]))  #set servo to move to position
        sys.stdout.write("Moving servo:"+splitStr[0]+" to position:"+splitStr[1])
        sys.stdout.flush()

servo.close