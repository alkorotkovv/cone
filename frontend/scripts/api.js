class Api {
  constructor(options)
  {
    this._baseUrl = options.baseUrl;
    //this._headers = options.headers;
  };

  //Метод реакция на результат запроса
  _checkResult(res) {
    if (res.ok)
        return res.json()
      else
        return Promise.reject(`Что-то пошло не так: ${res.status}`);
  };

  //Метод получения массива вершин для конуса
  getCone(H, R, N) {
    return fetch(this._baseUrl + '/cone', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      height: `${H}`,
      radius: `${R}`,
      segments: `${N}`,
    })
    })
    .then(res => this._checkResult(res))
  }
}

const api = new Api({
  baseUrl: 'http://127.0.0.1:3000'
});

export default api;
