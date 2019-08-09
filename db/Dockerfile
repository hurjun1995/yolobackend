FROM mysql:8.0.13

WORKDIR .

COPY init_db.sql .

RUN chmod +x ./init_db.sql

CMD ["mysql", "-h", "127.0.0.1", "-P", "3316", "-u", "root", "--protocol=tcp", "./init_db.sql"]