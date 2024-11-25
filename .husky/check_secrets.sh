#!/bin/bash
export LC_ALL=C.UTF-8

# Define the regex pattern for secrets
SECRET_PATTERN='[a-z]*_(secret|Secret|SECRET)\s*=\s*(?![''"]?\$|(os.getenv))[0-9A-Za-z"'']+'

SECRETS_FOUND=0
WHITELIST_ENV_VARS=(NODE_ENV TEST_ENV POSTGRES_DB POSTGRES_USER KEYCLOAK_REALM_URL ELASTIC_NODE ELASTIC_USERNAME PEOPLESOFT_URL CRM_APPLICATION_CONTEXT CRM_URL SSO_ENVIRONMENT SSO_INTEGRATION_ID KEYCLOAK_API_URL KEYCLOAK_API_TOKEN_URL KEYCLOAK_API_ENVIRONMENT KEYCLOAK_API_INTEGRATION_ID)
SKIP_FOLDERS=(.changeset .git .husky .vscode .turbo assets node_modules dist @generated)

# Get the list of staged files
STAGED_FILES=$(git diff --cached --name-only)

# Extract environment variable values from .env file
declare -A APP_ENV_VARS
if [ -f ../apps/app/.env ]; then
  while IFS='=' read -r key value; do
    if [ -z "$value" ]; then
      continue
    fi
    if [[ " ${WHITELIST_ENV_VARS[*]} " == *" $key "* ]]; then
      continue
    fi
    # Remove surrounding quotes if present
    value=$(echo "$value" | sed -e 's/^"//' -e 's/"$//')
    APP_ENV_VARS[$key]=$value
  done < ../apps/app/.env
fi

declare -A API_ENV_VARS
if [ -f ../apps/api/.env ]; then
  while IFS='=' read -r key value; do
    if [ -z "$value" ]; then
      continue
    fi
    if [[ " ${WHITELIST_ENV_VARS[*]} " == *" $key "* ]]; then
      continue
    fi
    # Remove surrounding quotes if present
    value=$(echo "$value" | sed -e 's/^"//' -e 's/"$//')
    API_ENV_VARS[$key]=$value
  done < ../apps/api/.env
fi

# Process each staged file
while read -r file; do
  # Skip empty lines
  if [ -z "$file" ]; then
    continue
  fi

  # Skip files in specified folders
  for folder in "${SKIP_FOLDERS[@]}"; do
    if [[ "$file" == "$folder/"* || "$file" == *"/$folder/"* ]]; then
      continue 2
    fi
  done

  # Search for secrets in the staged file
  if grep -P "$SECRET_PATTERN" ./"$file" > /dev/null; then
    echo "Secret found in: $file"
    grep -P "$SECRET_PATTERN" ./"$file"
    echo "----------------------------------------"
    SECRETS_FOUND=$((SECRETS_FOUND + 1))
  fi

  for key in "${!API_ENV_VARS[@]}"; do
    value=${API_ENV_VARS[$key]}
    if grep -F "$value" "../$file" > /dev/null; then
      echo "Environment variable $key=$value used as literal in: $file"
      echo "----------------------------------------"
      SECRETS_FOUND=$((SECRETS_FOUND + 1))
    fi
  done

  for key in "${!APP_ENV_VARS[@]}"; do
    value=${APP_ENV_VARS[$key]}
    if grep -F "$value" "../$file" > /dev/null; then
      echo "Environment variable $key=$value used as literal in: $file"
      echo "----------------------------------------"
      SECRETS_FOUND=$((SECRETS_FOUND + 1))
    fi
  done
done <<< "$STAGED_FILES"

exit $SECRETS_FOUND

##Use this if you want to check all files

#!/bin/bash

# Define the regex pattern for secrets
# SECRET_PATTERN='[a-z]*_(secret|Secret|SECRET)\s*=\s*(?![''"]?\$)[0-9A-Za-z"'']+'

# # Define folders to skip
# SKIP_FOLDERS=(.changeset .git .husky .vscode .turbo docs assets node_modules dist @generated)

# # Build the find command with exclusions
# FIND_CMD="find ../ -type f"
# for folder in "${SKIP_FOLDERS[@]}"; do
#   FIND_CMD="$FIND_CMD -not -path '*/$folder/*'"
# done

# SECRETS_FOUND=0

# # Execute the find command and search for secrets
# eval "$FIND_CMD" | while read -r file; do

#   if grep -P "$SECRET_PATTERN" "$file" > /dev/null; then
#     # Check if the file is ignored by .gitignore
#   if git check-ignore -q "$file"; then
#     continue
#   fi
#     echo "Secret found in: $file"
#     grep -P "$SECRET_PATTERN" "$file"
#     echo "----------------------------------------"
#     SECRETS_FOUND=$((SECRETS_FOUND+1))
#   fi
# done

# exit $SECRETS_FOUND

