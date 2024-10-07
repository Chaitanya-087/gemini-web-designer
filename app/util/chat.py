import uuid
from datetime import datetime

def generateUUID():
    salt = datetime.now().strftime("%Y%m%d%H%M%S")
    return str(uuid.uuid4()) + salt

#driver code
if __name__ == '__main__':
    id = generateUUID()
    print(id)