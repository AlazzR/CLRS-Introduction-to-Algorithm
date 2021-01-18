def getKeysPage(item):
    keyValue = {}
    try:
        keyValue['id'] = item["id"]
    except KeyError:
        keyValue["id"] = None
    
    try:
        keyValue['selfLink'] = item["selfLink"]
    except KeyError:
        keyValue["selfLink"] = None
    
    try:
        keyValue['title'] = item["volumeInfo"]["title"]
    except KeyError:
        keyValue["title"] = None
    
    try:
        keyValue['authors'] = item['volumeInfo']["authors"]
    except KeyError:
        keyValue["authors"] = None

    try:
        keyValue['publisher'] = item['volumeInfo']["publisher"]
    except KeyError:
        keyValue["publisher"] = None

    try:
        keyValue['description'] = item['volumeInfo']["description"]
    except KeyError:
        keyValue["description"] = None

    try:
        keyValue['language'] = item['volumeInfo']["language"]
    except KeyError:
        keyValue["language"] = None

    try:
        keyValue['small'] = item['volumeInfo']['imageLinks']["small"]
    except KeyError:
        keyValue["small"] = None
    
    try:
        keyValue['medium'] = item['volumeInfo']['imageLinks']["medium"]
    except KeyError:
        keyValue["medium"] = None

    try:
        keyValue['pageCount'] = item['volumeInfo']["pageCount"]
    except KeyError:
        keyValue["pageCount"] = None
    try:
        keyValue['categories'] = item['volumeInfo']["categories"]
    except KeyError:
        keyValue["categories"] = None

    try:
        keyValue['country'] = item['saleInfo']["country"]
    except KeyError:
        keyValue["country"] = None
    try:
        keyValue['date'] = item['volumeInfo']["publishedDate"]
    except KeyError:
        keyValue["date"] = None
    try:
        keyValue['thumbnail'] = item['volumeInfo']["imageLinks"]['thumbnail']
    except KeyError:
        keyValue["thumbnail"] = None

    return keyValue