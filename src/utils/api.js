class Api {
    #baseurl;
    #headers;
    constructor({baseUrl, headers}) {
        this.#baseurl = baseUrl;
        this.#headers = headers;
    }

    #onResponse(res) {
        return res.ok ? res.json() : res.json().then(err => Promise.reject(err))
    }

    getAllInfo() {
        return Promise.all([this.getProducrsList(), this.getUserInfo()])
    }

    getProducrsList() {
        return fetch(`${this.#baseurl}/products`, {
            headers: this.#headers
        })
        .then(this.#onResponse)
    }


    getProducrsList() {
        return fetch(`${this.#baseurl}/products`, {
            headers: this.#headers
        })
        .then(this.#onResponse)
    }


    getUserInfo() {
        return fetch(`${this.#baseurl}/users/me`, {
            headers: this.#headers
        })
            .then(this.#onResponse)
    }

    search(searchQuery) {
        return fetch(`${this.#baseurl}/products/search?query=${searchQuery}`, {
            headers: this.#headers
        })
            .then(this.#onResponse)
    }


    setUserInfo(name, about) {
        return fetch(`${this.#baseurl}/users/me`, { 
            method: 'PATCH',
            headers: this.#headers,
            body: JSON.stringify({ name, about })
        })
            .then(this.#onResponse)
    }


    changeLikeProductStatus(productID, like) {
        return fetch(`${this.#baseurl}/products/likes/${productID}`, {
            method: like ? 'DELETE' : 'PUT',
            headers: this.#headers,
        })
            .then(this.#onResponse)
    }
}



const api = new Api ({
    baseUrl: 'https://api.react-learning.ru',
    headers: {
        'content-type': 'application/json',
        authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDEwN2UwOWFhMzk3MTIxODM4ZjI5MGUiLCJncm91cCI6Imdyb3VwLTExIiwiaWF0IjoxNjc4ODAyNDQ5LCJleHAiOjE3MTAzMzg0NDl9.T13H6UAqubCooWkprQEBb_qhsm8hfHe2YwPccGoBb_M'
    }
})

export default api;
