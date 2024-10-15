import uuid
from datetime import datetime

def generateUUID():
    salt = datetime.now().strftime("%Y%m%d%H%M%S")
    return str(uuid.uuid4()) + salt