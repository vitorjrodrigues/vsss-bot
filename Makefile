PROGRAM=vsss-bot
PATH:=/opt/espressif/xtensa-lx106-elf/bin/:$(PATH)
ESPBAUD=500000
ESPIP?=192.168.1.98

EXTRA_CXXFLAGS+=--std=gnu++11

EXTRA_COMPONENTS+=nanopb
EXTRA_CFLAGS+=-I./nanopb
EXTRA_CXXFLAGS+=-I./nanopb

EXTRA_COMPONENTS+=extras/mbedtls extras/httpd 
EXTRA_CFLAGS+=-I./fsdata
EXTRA_CXXFLAGS+=-I./fsdata

EXTRA_COMPONENTS+=extras/rboot-ota

include SDK/common.mk

# HTTP data
fsdata/fsdata.c: html

html:
	@echo "Generating fsdata.."
	cd fsdata && ./makefsdata

# Program the ESP8266 OTA using TFTP.
wiflash:
	tftp -v -m octet ${ESPIP} -c put firmware/${PROGRAM}.bin firmware.bin
