

interface HttpResponse <T> {
    successful: boolean;
    data: T
}

class HttpResponseSuccess<T> implements HttpResponse<T> {
    successful: boolean;
    data: T
    constructor(data: T) {
        this.successful = true;
        this.data = data;
    }
}


class HttpResponseError<T> implements HttpResponse<T> {
    successful: boolean;
    data: T
    constructor(data: T) {
        this.successful = false;
        this.data = data;
    }
}

export {
    HttpResponse,
    HttpResponseSuccess,
    HttpResponseError
}
