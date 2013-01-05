#!/bin/sh

SERVER="foo@localhost"
PLACE="/path/to/sites"
EXCLUDE="\
 deploy.sh\
"

for e in $EXCLUDE; do
    EXD_OPT="$EXD_OPT --exclude $e"
done
tar -c $EXD_OPT -f - ./ | ssh $SERVER "cd $PLACE; tar xvf -"
