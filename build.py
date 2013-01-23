#!/usr/bin/env python
list = [
    'src/bullet.js',
    'src/enemy.js',
    'src/bullets.js',
    'src/player.js',
    'src/outro.js',
    'src/menu.js',
    'src/game.js',
    'src/main.js']

output = open('pinosterrorzone.js', "w")
for f in list:
  file = open(f, "r")
  for s in file.readlines():
    output.write(s,)
  output.write('\n')
