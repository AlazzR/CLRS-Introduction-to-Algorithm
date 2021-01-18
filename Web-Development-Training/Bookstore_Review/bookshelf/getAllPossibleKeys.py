def getAllKeyValuePairs(item):
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
        keyValue['_authors'] = item['volumeInfo']["authors"]
    except KeyError:
        keyValue["_authors"] = None

    try:
        keyValue['publisher'] = item['volumeInfo']["publisher"]
    except KeyError:
        keyValue["publisher"] = None

    try:
        keyValue['publishedDate'] = item['volumeInfo']["publishedDate"]
    except KeyError:
        keyValue["publishedDate"] = None

    try:
        keyValue['description'] = item['volumeInfo']["description"]
    except KeyError:
        keyValue["description"] = None
    try:
        keyValue['pageCount'] = item['volumeInfo']["pageCount"]
    except KeyError:
        keyValue["pageCount"] = None
    try:
        keyValue['categories'] = item['volumeInfo']["categories"]
    except KeyError:
        keyValue["categories"] = None

    try:
        keyValue['saleInfoCountry'] = item['saleInfo']["country"]
    except KeyError:
        keyValue["saleInfoCountry"] = None

    try:
        keyValue['thumbnail'] = item['volumeInfo']["imageLinks"]['thumbnail']
    except KeyError:
        keyValue["thumbnail"] = None

    return keyValue