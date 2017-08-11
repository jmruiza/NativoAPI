#!/usr/bin/python

import sys

server = sys.argv[1]
fpath = sys.argv[2]

with open(fpath, 'r') as f:
    text = f.read()

text = text.replace('/graphql', server)

with open(fpath, 'w') as f:
    f.write(text)