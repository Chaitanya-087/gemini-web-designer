import uuid
from datetime import datetime

def create_chat_id():
    salt = datetime.now().strftime("%Y%m%d%H%M%S")
    return str(uuid.uuid4()) + salt

#driver code
if __name__ == '__main__':
    id = create_chat_id()
    print(id)