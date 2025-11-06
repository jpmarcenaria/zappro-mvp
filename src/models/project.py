"""Project model and status enumeration."""

import enum

from sqlalchemy import Column, DateTime, Enum, ForeignKey, Integer, String
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func

from src.database import Base


class ProjectStatus(str, enum.Enum):
    planning = "planning"
    active = "active"
    completed = "completed"
    paused = "paused"


class Project(Base):
    __tablename__ = "projects"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False, index=True)
    description = Column(String)
    status = Column(Enum(ProjectStatus), default=ProjectStatus.planning, nullable=False)
    owner_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    owner = relationship("User", back_populates="projects")
    tasks = relationship("Task", back_populates="project", cascade="all,delete-orphan")
