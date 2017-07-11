#! /bin/bash
if [ -n -w "/opt/espressif" ]; then
	echo "Please run as root or grant write permissions to /opt/espressif/ directory."
fi

SCRIPT=$(realpath "$0")
SCRIPTDIR=$(dirname "$SCRIPT")

mkdir -p /opt/espressif
cd /opt/espressif

# Download and extract toolchain
curl 'https://app.cear.ufpb.br/owncloud/index.php/s/LrvHW9WsqGsF3k1/download' \
xzcat | tar -xv

# Download the SDK
git clone --recursive 'https://github.com/SuperHouse/esp-open-rtos'
cd esp-open-rtos

# Patch headers for C++ compatibility
"$SCRIPTDIR/cppchk.sh" --fix
