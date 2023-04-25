# run pnpm run in ./frontend and uvicorn main:app --reload in ./backend

# Run frontend
cd ./frontend
pnpm run dev --host &
cd ..
cd ./backend
uvicorn main:app --reload