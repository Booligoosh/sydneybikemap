# To identify which hashes are common, run:
# find . ! -empty -type f -exec md5sum {} + | sort | uniq -w32 -dD
# From https://unix.stackexchange.com/a/277707

# This gets a list of all common hashes:
# find . ! -empty -type f -exec md5sum {} + | cut -c1-32 | sort | uniq -w32 -dD | uniq -c | cut -c9-40
# And was used to generate water-hashes.txt by:
# (1) Generating without coastlines and running it to find duplicate hashes
# (2) Generating with coastlines and running it to find duplicate hashes
# (3) All hashes that showed up in (2) but not in (1) must be water tiles (so I just removed any that did in (1) from the file)

# Removes all files with hashes contained in water-hashes.txt
# See https://unix.stackexchange.com/a/390615
find output -type f -exec md5sum {} + | grep -f water-hashes.txt | awk '{$1 = "rm" ; print } ' | bash
