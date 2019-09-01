#!/bin/bash
until mysql -h ${DB_HOST} -u ${DB_USER} -p${DB_PASSWORD} -e 'select 1';
do echo "still waiting for mysql"; sleep 1;
done

npx sequelize db:migrate
exec yarn dev
