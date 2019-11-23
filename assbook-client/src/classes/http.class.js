export class Http {
    static ajax(method, url, headers = {}, body = null) {
        const token = localStorage.getItem('token');
        if (token)
            headers.Authorization = 'Bearer ' + token;
        return fetch(url, { method, headers, body })
            .then(resp => {
            if (!resp.ok)
                throw resp;
            return resp.json(); // Promise
        });
    }
    static get(url) {
        return Http.ajax('GET', url);
    }
    static post(url, data) {
        return Http.ajax('POST', url, { 'Content-Type': 'application/json' }, JSON.stringify(data));
    }
    static put(url, data) {
        return Http.ajax('PUT', url, { 'Content-Type': 'application/json' }, JSON.stringify(data));
    }
    static delete(url) {
        return Http.ajax('DELETE', url);
    }
}
//# sourceMappingURL=http.class.js.map