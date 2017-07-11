vsss-bot
=============

Very Small Socket Size robot firmware for the ESP8266.

Setup
-----

1. Linux OS strongly suggested, just cause.
2. Get a working toolchain from one of the methods:
 * Compile from sources:
  1. Get sources by cloning [esp-open-sdk](https://github.com/pfalcon/esp-open-sdk).
  2. Follow compilation instructions, making sure that C++ is enabled.
  3. Copy `xtensa-lx106-elf` and `esptool` folders to `/opt/espressif/`.
 * Get a copy of my binearies, tested on Ubuntu 16.04 and Fedora 25.
  1. Download from [here](https://app.cear.ufpb.br/owncloud/index.php/s/LrvHW9WsqGsF3k1), nevermind the bad SSL certificate.
  2. Extract under /opt/espressif/.
4. Get the SDK working:
 1. Clone the [esp-open-rtos](https://github.com/SuperHouse/esp-open-rtos) under /opt/espressif/.
 2. Enter the folder `/opt/espressif/esp-open-rtos`.
 3. Run run `cppchk.sh` (from this projec't `other_tools` folder) to see what files need patching for C++.
 3. If it seems right then run `cppchk.sh --fix` to apply the patches.
