from typing import Optional
from pydantic import BaseModel, ConfigDict, Field


class CredentialsInputSchema(BaseModel):
    model_config = ConfigDict(populate_by_name=True)

    auth_token: str = Field(..., validation_alias='AUTH_ID')
    refresh_token: str = Field(..., validation_alias='REFRESH_ID')
    # application_token: Optional[str] = Field(..., validation_alias="APP_SID")


# class BitrixClientSchema(BaseModel):
#     model_config = ConfigDict(populate_by_name=True)

#     client_id: str = Field(...)
#     client_secret: str = Field(...)


class CredentialSchema(BaseModel):
    model_config = ConfigDict(populate_by_name=True)
    
    domain: str = Field(...)
    auth_token: str = Field(...)
    refresh_token: str = Field(...)
    application_token: Optional[str] = Field(...)

