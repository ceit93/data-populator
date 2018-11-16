#!/bin/bash
#!/usr/bin/env node

for i in `seq 0 20`;
    do
        node populator.js $((i*10)) $(((i+1)*10))
    done
