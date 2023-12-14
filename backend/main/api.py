from ninja import NinjaAPI
from auth.api import router as auth_router
from userdata.api import router as userdata_router
from main import dbfunctions


api = NinjaAPI()
# intitialize user database
conn = dbfunctions.init_databases()


api.add_router("/auth", auth_router)
api.add_router("/userdata", userdata_router)
