#!/bin/bash
# until mysql -h ${DB_HOST} -u ${DB_USER} -p${DB_PASSWORD} -e 'select 1';
until mysql -h db -u joon_admin -pDevUser123!# -e 'select 1';
do echo "still waiting for mysql"; sleep 1;
done

exec yarn dev
