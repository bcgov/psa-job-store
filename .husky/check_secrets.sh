#!/bin/bash

# Define the regex pattern for secrets
SECRET_PATTERN='[a-z]*_(secret|Secret|SECRET)\s*=\s*(?!\$)[0-9A-Za-z"'']+'

# Define folders to skip
SKIP_FOLDERS=(.changeset .git .husky .vscode .turbo docs assets node_modules app dist @generated)

# Build the find command with exclusions
FIND_CMD="find ./ -type f"
for folder in "${SKIP_FOLDERS[@]}"; do
  FIND_CMD="$FIND_CMD -not -path '*/$folder/*'"
done

SECRETS_FOUND=0

# Execute the find command and search for secrets
eval "$FIND_CMD" | while read -r file; do
  # Check if the file is ignored by .gitignore
  if git check-ignore -q "$file"; then
    continue
  fi
  
  if grep -P "$SECRET_PATTERN" "$file" > /dev/null; then
    echo "Secret found in: $file"
    grep -P "$SECRET_PATTERN" "$file"
    echo "----------------------------------------"
    SECRETS_FOUND=$((SECRETS_FOUND+1))
  fi
done

exit $SECRETS_FOUND
