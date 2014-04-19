#!/usr/bin/env bash

usage() {
    echo "USAGE:"
    echo -e "\t$0 [ -b | --build ]"
}

build=0
output="pinosterrorzone.js"
src="src"
tmp="tmp.js"
sources=("$src/jaws.js" \
    "$src/bullet.js" \
    "$src/enemy.js" \
    "$src/bullets.js" \
    "$src/player.js" \
    "$src/outro.js" \
    "$src/menu.js" \
    "$src/game.js" \
    "$src/main.js")


for i in $*; do
    case $i in
        ("-h" | "--help")
            usage
            exit
            ;;
        ("-b")
            echo "Build mode!"
            build=1
    esac
done


echo "Creating $output"
echo '' > $output
for i in ${sources[*]}; do
    echo "Adding $i to $output"
    cat $i >> $output
done

if [[ $build -ge 1 ]]; then
    echo "Moving $output to $tmp"
    mv $output $tmp
    echo "Compiling $tmp to $output"
    curl http://closure-compiler.appspot.com/compile \
        --data-urlencode "js_code=$(cat $tmp)" \
        -d "compilation_level=SIMPLE_OPTIMIZATIONS" \
        -d "output_format=text" \
        -d "output_info=compiled_code" > $output
    echo "Removing $tmp"
    rm $tmp
fi
