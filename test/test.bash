#!/bin/bash -e

test_directory=$(realpath "$(dirname "${BASH_SOURCE[0]}")")

# Run the example.
bash $test_directory/../example.bash
if [ "$?" -ne "0" ]; then
  echo "square-wave failed."
  exit 1
fi

# Make sure the images where created.
for image in default.jpeg seahorse_tail.jpeg seahorse_valley.jpeg; do
  if [ ! -f "$image" ]; then
    echo "failed to make $image"
    exit 1
  fi
done

echo "All tests passed."
