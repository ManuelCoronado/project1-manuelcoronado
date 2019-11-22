export class Http {
    static ajax(method: string, url: string , headers: any = {}, body: any = null) {
        const token = localStorage.getItem('token');
        if(token) headers.Authorization = 'Bearer ' + token;

        return fetch(url, { method, headers, body})
            .then(resp => {
                if(!resp.ok) throw resp;
                return resp.json(); // Promise
            });
    }

    static get(url: string) {
        return Http.ajax('GET', url);
    }

    static post(url: string, data: any) {
        return Http.ajax('POST', url, {'Content-Type': 'application/json'}, JSON.stringify(data));
    }

    static put(url: string, data: any) {
        return Http.ajax('PUT', url, {'Content-Type': 'application/json'}, JSON.stringify(data));
    }

    static delete(url: string) {
        return Http.ajax('DELETE', url);
    }
}