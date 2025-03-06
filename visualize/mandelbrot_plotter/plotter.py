from argparse import ArgumentParser
from sys import stdin

import matplotlib.pyplot as plt
from numpy import zeros


def mandelbrot_set():
    parser = ArgumentParser(description="Plot mandelbrot_set.")
    parser.add_argument("image_filename", help="Filename of the output image.")
    args = parser.parse_args()

    # Read in the data array size.
    nx, ny = [int(x) for x in input().split()]
    data = zeros((ny, nx), dtype=int)
    x_domain = zeros(nx)
    y_domain = zeros(ny)

    # Read in the data from stdin.
    for line in stdin:
        x_index, x, y_index, y, value = line.split()
        x_index = int(x_index)
        y_index = int(y_index)
        data[y_index, x_index] = int(value)
        x_domain[x_index] = float(x)
        y_domain[y_index] = float(y)

    # Plot the data.
    ax = plt.axes()
    ax.set_aspect("equal")
    plot = ax.pcolormesh(x_domain, y_domain, data, cmap="coolwarm")
    plt.xlabel("Real")
    plt.ylabel("Imaginary")
    plt.savefig(f"{args.image_filename}.jpeg", format="jpeg")
