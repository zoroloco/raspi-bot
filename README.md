Requirements:

- Raspberry Pi Zero v1.3 (camera version)
- Raspberry Pi Zero camera cable
- Camera module
- 2.1 amp 5v power wall wart
- Lots of actobotics

Tested with node 7.2.1 and npm 3.10.10

npm install serialport
npm install johnny-five raspi-io
npm install express --save

- touch /usr/local/src/shell/raspy-clean-build.sh
- copy contents of raspy-clean-build.sh by using nano
- chmod +x /usr/local/src/shell/raspy-clean-build.sh
- /usr/local/src/shell/raspy-clean-build.sh

To run:  systemctl start|restart|stop raspy.service
