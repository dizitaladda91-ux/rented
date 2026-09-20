import os
from typing import List, Union
from pydantic import field_validator, model_validator
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    PROJECT_NAME: str = "RENTED.IN - Rental Marketplace Platform"
    VERSION: str = "1.0.0"
    API_V1_STR: str = "/api"
    
    # Environment
    ENVIRONMENT: str = "development"
    DEBUG: bool = True
    
    # Security
    # Security
    SECRET_KEY: str = "rented-jwt-secret-key-32-chars-minimum-secure-production"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 7  # 7 days
    ALGORITHM: str = "HS256"
    
    # Database
    DATABASE_URL: str = "sqlite+aiosqlite:///./farmhouse.db"
    
    # CORS: Union[str, List[str]] prevents pydantic-settings from crashing with JSONDecodeError on plain/empty env vars
    BACKEND_CORS_ORIGINS: Union[str, List[str]] = [
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "http://localhost:8000",
        "*",
    ]
    
    # Media Storage
    UPLOAD_DIR: str = "uploads"
    MAX_UPLOAD_SIZE_MB: int = 50
    
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=True,
        extra="ignore"
    )

    @field_validator("BACKEND_CORS_ORIGINS", mode="before")
    @classmethod
    def parse_cors_origins(cls, value):
        if value is None:
            return ["*"]
        if isinstance(value, str):
            value = value.strip()
            if not value or value in {"*", "null", "None", "\"\""}:
                return ["*"]
            if value.startswith("[") and value.endswith("]"):
                try:
                    import json
                    parsed = json.loads(value)
                    if isinstance(parsed, list):
                        return [str(item).strip() for item in parsed if str(item).strip()]
                except Exception:
                    pass
            # Comma-separated strings or single origin
            origins = [origin.strip() for origin in value.split(",") if origin.strip()]
            return origins if origins else ["*"]
        if isinstance(value, list):
            return [str(item).strip() for item in value if str(item).strip()]
        return ["*"]

    @field_validator("DEBUG", mode="before")
    @classmethod
    def normalize_debug(cls, value):
        # Some hosts export DEBUG=release; treat it as the safe, disabled state.
        if isinstance(value, str) and value.lower() in {"release", "production", "false", "0"}:
            return False
        return value

    @model_validator(mode="after")
    def validate_production_settings(self):
        if isinstance(self.BACKEND_CORS_ORIGINS, str):
            self.BACKEND_CORS_ORIGINS = [self.BACKEND_CORS_ORIGINS]
        if self.ENVIRONMENT.lower() == "production":
            if not self.SECRET_KEY or len(self.SECRET_KEY) < 32:
                self.SECRET_KEY = "rented-jwt-secret-key-32-chars-minimum-secure-production"
        return self


settings = Settings()
