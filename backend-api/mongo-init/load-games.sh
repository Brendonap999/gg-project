#!/bin/bash
set -e

mongoimport --host mongo --db GameLobby --collection Games --type json --file /data/init/games.json --jsonArray
