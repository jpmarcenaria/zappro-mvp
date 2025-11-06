from __future__ import annotations

import enum

from sqlalchemy import Column, DateTime, Enum, Integer, String
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship

from src.database import Base


class UserRole(str, enum.Enum):
    admin = "admin"
    gestor = "gestor"
    operador = "operador"


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    name = Column(String, nullable=False)
    hashed_password = Column(String, nullable=False)
    role = Column(Enum(UserRole), default=UserRole.operador, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    projects = relationship("Project", back_populates="owner", cascade="all,delete-orphan")
    assigned_tasks = relationship("Task", back_populates="assignee")
