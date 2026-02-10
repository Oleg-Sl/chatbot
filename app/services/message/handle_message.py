
def handle_message(data):
    message = data.get('data[PARAMS][MESSAGE]', '').strip().strip('/').lower()

    if message == 'hello':
        pass
    else:
        pass

    return False
