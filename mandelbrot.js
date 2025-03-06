// Use the commander library for command line argument parsing.
const { program } = require('commander');
const math = require("mathjs")

// Define the command line arguments.
program
  .option('-x, --center-x <x>', 'x-coordinate of the center of the view (default: 0.).', 0.)
  .option('-y, --center-y <y>', 'y-coordinate of the center of the view (default: 0.).', 0.)
  .option('-w, --width <w>', 'width of the view (default: 5).', 5.)
  .option('-h, --height <h>', 'height of the view (default: 5).', 5.)
  .option('-s, --step <s>',
          'resolution of the view (size of a pixel scaled to view size; default: 0.01).', 0.01)
  .option('-n, --max-iterations <n>',
          'maximum number of iterations to perform at each pixel (default: 100).', 100)
  .option('-b, --bound <b>', 
          'divergence cutoff.  If the abs(z) >= bound, the iteration stops (default: 2).', 2)
  .option('-p, --power <p>', 'exponent used in the mandelbrot equation (default: 2).', 2);

// Parse the command line arguments and check for bad inputs.
program.parse();
const options = program.opts();

if (options.width < 0. || options.height < 0. || options.step < 0.)
{
  // Width, height, and pixel size all must be positive.
  throw new Error("View width, height, and resolution must be > 0.");
}

const numWidthPixels = Math.round(1. / options.step);
const numHeightPixels = Math.round(1. / options.step);
if (numWidthPixels < 1 || numHeightPixels < 1)
{
  // At least one complete pixel must fit inside the view.
  throw new Error("View resolution is too coarse.  At least one pixel must" +
                  " fit in the view.");
}

// Calculate the computational domain.
const x_domain = [];
x_domain.length = numWidthPixels;
for (let i = 0; i < x_domain.length; i++)
{
    x_domain[i] = options.centerX - options.width/2. + i*options.step*options.width;
}

const y_domain = [];
y_domain.length = numHeightPixels;
for (let i = 0; i < y_domain.length; i++)
{
    y_domain[i] = options.centerY - options.height/2. + i*options.step*options.height;
}
console.log(x_domain.length, y_domain.length);


// Compute the mandelbrot set and write the values to stdout.
for (let j = 0; j < y_domain.length; j++)
{
    for (let i = 0; i < x_domain.length; i++)
    {
        let z = math.complex(0, 0)
        let c = math.complex(x_domain[i], y_domain[j])
        let iter;
        for (iter = 0; iter < options.maxIterations; iter++)
        {
            if (math.abs(z) >= options.bound)
            {
                console.log(i, x_domain[i], j, y_domain[j], iter);
                break;
            }
            else
            {
                if (z.re == 0 && z.im == 0)
                {
                    z = c;
                }
                else
                {
                    z = math.add(math.pow(z, options.power), c);
                }
            }
        }
        if (iter == options.maxIterations)
        {
            console.log(i, x_domain[i], j, y_domain[j], 0);
        }
    }
}
