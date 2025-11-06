"""create projects table

Revision ID: 20251106_000002
Revises: 20251106_000001_create_users_table
Create Date: 2025-11-06 00:30:00
"""

from __future__ import annotations

from alembic import op
import sqlalchemy as sa


revision = "20251106_000002"
down_revision = "20251106_000001"
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.create_table(
        "projects",
        sa.Column("id", sa.Integer(), primary_key=True),
        sa.Column("name", sa.String(), nullable=False),
        sa.Column("description", sa.String(), nullable=True),
        sa.Column(
            "status",
            sa.Enum("planning", "active", "completed", "paused", name="projectstatus"),
            nullable=False,
            server_default="planning",
        ),
        sa.Column("owner_id", sa.Integer(), sa.ForeignKey("users.id", ondelete="CASCADE"), nullable=False),
        sa.Column("created_at", sa.DateTime(timezone=True), server_default=sa.func.now(), nullable=False),
        sa.Column("updated_at", sa.DateTime(timezone=True), nullable=True),
    )
    op.create_index("ix_projects_id", "projects", ["id"])
    op.create_index("ix_projects_name", "projects", ["name"])


def downgrade() -> None:
    op.drop_index("ix_projects_name", table_name="projects")
    op.drop_index("ix_projects_id", table_name="projects")
    op.drop_table("projects")
