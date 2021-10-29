from fastapi import FastAPI
from pydantic import BaseModel
from tortoise import fields
from tortoise.contrib.fastapi import register_tortoise
from tortoise.contrib.pydantic import pydantic_model_creator
from tortoise.models import Model
from typing import Dict

app = FastAPI()


class Task(BaseModel):
    id: str
    content: str


class Tasks(BaseModel):
    __root__: Dict[str, Task]


class Column(BaseModel):
    id: str
    title: str
    taskIds: list


class Columns(BaseModel):
    __root__: Dict[str, Column]


class Board(BaseModel):
    tasks: Tasks
    columns: Columns
    columnOrder: list


class User(Model):
    id = fields.IntField(pk=True)
    username = fields.CharField(max_length=50, unique=True)
    password = fields.CharField(max_length=200)
    board = fields.JSONField(default={"tasks": {}, "columns": {}, "columnOrder": []})


User_Pydantic = pydantic_model_creator(User, name='User')
UserIn_Pydantic = pydantic_model_creator(User, name='UserIn', exclude_readonly=True, exclude=('board',))


@app.get('/board')
async def get_board():
    user = await User.get(id=1)
    return {'board': user.board}


@app.post('/board')
async def save_board(board: Board):
    user = await User.get(id=1)
    user.board = board.json()
    await user.save()
    return {"status": 201, "message": "created"}


register_tortoise(
    app,
    db_url='postgres://thekiharani:pass_12345@localhost:5432/task_manager',
    modules={'models': ['main']},
    generate_schemas=True,
    add_exception_handlers=True
)
