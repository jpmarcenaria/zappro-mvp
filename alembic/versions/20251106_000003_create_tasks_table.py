"""create tasks table

Revision ID: 20251106_000003
Revises: 20251106_000002
Create Date: 2025-11-06 01:00:00
"""

from __future__ import annotations

from alembic import op
import sqlalchemy as sa


revision = "20251106_000003"
down_revision = "20251106_000002"
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.create_table(
        "tasks",
        sa.Column("id", sa.Integer(), primary_key=True),
        sa.Column("title", sa.String(), nullable=False),
        sa.Column("description", sa.Text(), nullable=True),
        sa.Column(
            "status",
            sa.Enum("todo", "in_progress", "done", name="taskstatus"),
            nullable=False,
            server_default="todo",
        ),
        sa.Column("project_id", sa.Integer(), sa.ForeignKey("projects.id", ondelete="CASCADE"), nullable=False),
        sa.Column("assignee_id", sa.Integer(), sa.ForeignKey("users.id"), nullable=True),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
        sa.Column("updated_at", sa.DateTime(timezone=True), nullable=True),
        sa.Column("due_date", sa.DateTime(timezone=True), nullable=True),
    )
    op.create_index("ix_tasks_id", "tasks", ["id"])


def downgrade() -> None:
    op.drop_index("ix_tasks_id", table_name="tasks")
    op.drop_table("tasks")

