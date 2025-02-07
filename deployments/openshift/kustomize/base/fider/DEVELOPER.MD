When creating for the first time, run the following commands in the postgres container:

psql

CREATE DATABASE fiderdb;

CREATE EXTENSION IF NOT EXISTS pg_trgm;

There is a postgres init script that should do this but does not currently work.

---

The /fider route does not work. Most likely will need to set up a reverse proxy to have this route under jobstore.
