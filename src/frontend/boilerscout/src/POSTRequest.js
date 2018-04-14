class POSTRequest {
  constructor(payloads, urls) {
    this.state = {
      payload: payloads,
      url: urls,
      ok: false,
      resonse: null,
    }
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
        _this.setState({
          ok: true,
        })

        response.json().then(json => {
          _this.setState({
            resonse: json,
          })
        });

      } else {
        _this.setState({
          ok: false,
        })
      }      
    })
  }

  responseOk = () => {
    return this.state.ok;
  }

  getResponse = () => {
    return this.state.resonse;
  }
}

export default POSTRequest;