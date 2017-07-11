#! /bin/bash
set -e
#make clean
make html
make -j 8
make test
