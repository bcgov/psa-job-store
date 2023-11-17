

# Get current directory, without special '.' character
VOLUME=$(subst .,,$(shell basename $(PWD)))

APP_DIR=$(PWD)

TIMESTAMP=$(shell date "+%Y_%m_%d_%H_%M_%S")
RED=\033[0;31m
YELLOW=\033[1;31m
BLUE=\033[1;34m
NOCOLOUR=\033[0m

# To avoid console output of environment var with local credentials
.SILENT: db.gui

.PHONY: develop clean build run db.reset db.seed db.data-delete
# db.export db.start  
	db.root-shell db.psql be.shell db.gui echo.params

develop: clean build run

clean:
		docker compose down
		docker compose rm -vf
		rm -rf ./node_modules

build:
		docker-compose build --no-cache

run: 
		@printf "open ${RED}http://localhost:5173${NOCOLOUR}\n"
		docker compose up -d
		docker compose logs -f		

db.reset: 
		docker-compose exec -u root -w /usr/src/apps/api nestjs-app /usr/bin/bash -c \
			'npx prisma db push --force-reset'

db.seed: 
		docker-compose exec -u root -w /usr/src/apps/api nestjs-app /usr/bin/bash -c \
			'npx -w api prisma db push --force-reset && npx -w api prisma db seed'

db.data-delete: clean
		docker compose down
		docker volume rm $(VOLUME)_postgres

db.root-shell:
		@printf "Logging in as ${RED}root${NOCOLOUR}\n"
		docker-compose exec db /usr/bin/bash

db.psql:
		docker-compose exec db /usr/bin/bash -c 'psql -U $${POSTGRES_USER} $${POSTGRES_DB}'

be.shell:
		docker-compose exec -u root -w /usr/src/apps/api nestjs-app /usr/bin/bash

db.gui: 
		DATABASE_URL=${STUDIO_DATABASE_URL} npx -w api prisma studio

echo.params: 
		@printf "$(filter-out $@,$(MAKECMDGOALS))\n"

# ref: https://stackoverflow.com/questions/6273608/how-to-pass-argument-to-makefile-from-command-line
%:
	@: