import os


class Settings:
    """Minimal settings loader via environment variables.

    Uses simple env lookups to avoid extra deps at bootstrap.
    """

    def __init__(self) -> None:
        self.APP_NAME = os.getenv("APP_NAME", "exemplo-repo")
        self.APP_ENV = os.getenv("APP_ENV", "dev")
        self.DEBUG = os.getenv("DEBUG", "true").lower() in {"1", "true", "yes"}


_settings: Settings | None = None


def get_settings() -> Settings:
    global _settings
    if _settings is None:
        _settings = Settings()
    return _settings

