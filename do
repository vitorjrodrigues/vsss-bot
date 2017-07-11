#! /bin/bash
set -e
(cd fsdata && ./makefsdata)
#make clean
make -j 8
make test
