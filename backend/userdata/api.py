from ninja import Router

from main import dbfunctions
from userdata.schemas import UserInfoSchema
router = Router()

@router.get(
    "/users/{user_id}", response={200: UserInfoSchema, 403: str, 404: str}
)
def get_user_info(request, user_id: int, requester_user_id: int, token: str):
    if user_id == requester_user_id:
        return dbfunctions.get_info_about_self(user_id, token)
    else:
        return dbfunctions.get_info_about_user(requester_user_id, token, user_id)





@router.post("/delete/{user_id}", response={200: bool, 409: str})
def delete_user_account(request, user_id, requester_user_id: int, token: str):
    return dbfunctions.delete_user(user_id, requester_user_id, token)


@router.get("/all", response={200: list[UserInfoSchema], 403: str, 404: str})
def get_all_users(request, requester_user_id: int, token: str):
    return dbfunctions.get_info_about_all_users(requester_user_id, token)