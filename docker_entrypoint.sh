#!/bin/bash
until mysql -h db -u joon_admin -pDevUser123!# -e 'select 1'; do echo "still waiting for mysql"; sleep 1; done

# MYSQL=`which mysql`
# Q1="CREATE DATABASE IF NOT EXISTS $1"

exec yarn dev
