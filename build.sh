#!/usr/bin/env bash

output="pinosterrorzone.js"
src="src"
list=("$src/jaws.js" \
    "$src/bullet.js" \
    "$src/enemy.js" \
    "$src/bullets.js" \
    "$src/player.js" \
    "$src/outro.js" \
    "$src/menu.js" \
    "$src/game.js" \
    "$src/main.js")

echo '' > $output
for i in ${list[*]}; do
    cat $i >> $output
done
