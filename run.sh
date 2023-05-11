#!/bin/bash

# Prompt the user if they are in a web browser
read -p "Are you currently in a web browser? [y/n]: " isBrowser

if [ "$isBrowser" == "y" ]; then
  # If the user is in a web browser, export isWeb=true
  export VITE_isWeb=true
  echo "Make sure to set port visibility of port 8000 to public"
else
    # If the user is not in a web browser, export isWeb=false
    unset VITE_isWeb
fi

cd ./backend
uvicorn main:app --reload &

cd ..
# Navigate to frontend directory and start the development server
cd ./frontend
wget http://localhost:8000/openapi.json
npx openapi-typescript openapi.json --output src/lib/types/api.d.ts
rm openapi.json
pnpm run dev --host
# Navigate to backend directory and start the API server
