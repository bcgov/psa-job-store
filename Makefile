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

.PHONY: develop 
develop: clean build run

.PHONY: clean
clean:
		docker compose down
		docker compose rm -vf
		rm -rf ./node_modules

.PHONY: build
build:
		docker compose build --no-cache

.PHONY: run
run: 
		@printf "open ${RED} http://localhost:5173 \n${NOCOLOUR}"
		docker compose up -d db nestjs-app elasticsearch
		@printf "npm -w api run start:dev\n"
		@printf "npm -w app run dev\n"
		
.PHONY: db.reset
db.reset: 
		docker-compose exec -u root -w /usr/src/apps/api nestjs-app /usr/bin/bash -c \
			'npx prisma db push --force-reset'

.PHONY: db.seed
db.seed: 
		docker-compose exec -u root -w /usr/src/apps/api nestjs-app /usr/bin/bash -c \
			'npx -w api prisma db push --force-reset && npx -w api prisma db seed'

#  e2e seed
#  DATABASE_URL=${STUDIO_DATABASE_URL} npx -w api npm run migrate:reset:e2e-test

.PHONY: db.migate
db.migrate: 
		docker-compose exec -u root -w /usr/src/apps/api nestjs-app /bin/sh -c \
			'npx -w api prisma migrate dev'

.PHONY: db.data-delete
db.data-delete:
		docker compose down
		docker volume rm $(VOLUME)_postgres

.PHONY: db.root-shell
db.root-shell:
		@printf "Logging in as ${RED}root${NOCOLOUR}\n"
		docker-compose exec db /usr/bin/bash

.PHONY: db.psql
db.psql:
		docker-compose exec db /usr/bin/bash -c 'psql -U $${POSTGRES_USER} $${POSTGRES_DB}'

.PHONY: api.shell
api.shell:
		docker-compose exec -u root -w /usr/src nestjs-app /bin/sh

.PHONY: db.gui
db.gui: 
		DATABASE_URL=${STUDIO_DATABASE_URL} npx -w api prisma studio

.PHONY: echo.params
echo.params: 
		@printf "$(filter-out $@,$(MAKECMDGOALS))\n"

# ref: https://stackoverflow.com/questions/6273608/how-to-pass-argument-to-makefile-from-command-line
%:
	@: