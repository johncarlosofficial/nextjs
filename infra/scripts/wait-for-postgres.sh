#!/bin/bash

RETRIES=50
while ! docker exec postgres-container pg_isready --host localhost; do
    if [ $RETRIES -le 0 ]; then
        echo "🔴 Postgres did not start in time."
        exit 1
    fi
    echo -n "."
    RETRIES=$((RETRIES - 1))
    sleep 1
done

echo -e "\n🟢 Postgres is ready!"
