class POSTRequest {
  constructor(payload, url) {
    this.payload = payload;
    this.url = url;
    this.ok = false;
    this.resonse = null;
  }

  send = () => {
    const _this = this;

    fetch(this.url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
        'transfer-encoding': 'chunked',
      },
      body: this.payload,
    })
    .then(function(response) {
      if (response.ok) {
        // redirect
        _this.ok = true;

        response.json().then(json => {
          this.resonse = json;
        });

      } else {
        _this.ok = false;
      }      
    })
  }

  responseOk = () => {
    return this.ok;
  }

  getResponse = () => {
    return this.resonse;
  }
}

export default POSTRequest;