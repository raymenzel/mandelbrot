#!/bin/bash

# Default plot.
node mandelbrot.js -x -0.7 -y 0. -w 3.0769 -h 3.0769 -s 0.005 -n 250 | \
  mandelbrot-plotter default

# Seahorse tail.
node mandelbrot.js -x -0.7435669 -y 0.1314023 -w 0.0022878 -h 0.0022878 -s 0.005 -n 750 | \
  mandelbrot-plotter seahorse_tail

# Seahorse valley.
node mandelbrot.js -x -0.74364409961 -y 0.13182604688 -w 0.00000066208 -h 0.00000066208 \
  -s 0.005 -n 2000 | \
  mandelbrot-plotter seahorse_valley
