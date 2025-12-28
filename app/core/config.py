from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    project_name: str = ""

    db_host: str
    db_port: int
    db_user: str
    db_password: str
    db_name: str
    db_echo: bool = False
    db_pool_size: int = 20
    db_max_overflow: int = 40

    model_config = SettingsConfigDict(env_file='.env')

    @property
    def database_url(self) -> str:
        return f'postgresql+asyncpg://{self.db_user}:{self.db_password}@{self.db_host}:{self.db_port}/{self.db_name}'


# @lru_cache
# def get_settings() -> Settings:
#     return Settings()


settings = Settings()
