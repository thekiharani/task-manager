from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "http://localhost.3000",
    "http://localhost:3001",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/board")
def get_board():
    board_data = {
        "tasks": {
            "task-1": {"id": "task-1", "content": "Learn FastAPI"},
            "task-2": {"id": "task-2", "content": "Learn React"},
            "task-3": {"id": "task-3", "content": "Learn DevOps"},
        },
        "columns": {
            "column-1": {"id": "column-1", "title": "To do", "taskIds": ["task-2", "task-3"]},
            "column-2": {"id": "column-2", "title": "Done", "taskIds": []},
        },
        "columnOrder": ["column-1", "column-2"],
    }
    return {"board": {}}
