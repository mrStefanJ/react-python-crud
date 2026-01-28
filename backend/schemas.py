from pydantic import BaseModel, Field

class ItemBase(BaseModel):
    name: str = Field(..., min_length=2)
    description: str = Field(..., min_length=5)

class ItemCreate(ItemBase):
    pass

class Item(ItemBase):
    id: int

    class Config:
        orm_mode = True
