# mandelbrot_plotter
Reads mandelbrot data from `stdin` and produces JPEG images.

### How to install
To install this package in a virutal environment, run:

```
$ python3 -m venv env
$ source env/bin/activate # if in bash
$ pip install .
```

This will install the package and provide a script `mandelbrot-plotter`

### How to run the application.
The `mandelbrot-plotter` script takes an image filename as its only argument
and creates a JPEG file in the directory in which it is run.  It reads
mandelbrot set data from `stdin`, and is intended to be used with the
provided `mandelbrot.js` script.

```
$ mandelbrot-plotter --help
usage: mandelbrot-plotter [-h] image_filename

Plot mandelbrot_set.

positional arguments:
  image_filename  Filename of the output image.

optional arguments:
  -h, --help      show this help message and exit
```
