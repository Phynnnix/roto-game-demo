class APICallData{
    constructor(api, getParams = {}, postBody = null){
        this.api = api;
        this.params = getParams;
        this.body = postBody;
        let resource = api+="?";
        for (let param in getParams){
            resource+=param+"="+getParams[param]+"&";
        }
        this.request = new Request(resource);
        this.promise = null;
        this.response = null;
        this.json = null;
    }

    resetWith(getParams = {}, postBody = null){
        this.params = getParams;
        this.body = postBody;
        let resource = api+="?";
        for (let param in getParams){
            resource+=param+"="+getParams[param]+"&";
        }
        this.request = new Request(resource);
        this.promise = null;
        this.response = null;
        this.json = null;
    }

    get(){
        let req = new Request(this.request);
        this.promise = fetch(req);
        return this.promise;
    }

    post(){
        let data = {
            "method": "POST",
            "headers": {
                "Content-Type":"application/json"
            },
            "body":JSON.stringify(this.body)
        }
        let req = new Request(this.request, data);
        this.promise = fetch(req);
        return this.promise;
    }
}

class APICall{
    constructor(){
        this.calls = [];
        this.all = null;
    }

    callTo(callData){
        this.calls.push(callData);
        return this;
    }

    multiCalls(callDatas){
        this.calls = this.calls.concat(callDatas);
        return this;
    }

    getAll(){
        this.all = Promise.all(this.calls.map(call => {return call.get()}));
        return this;
    }

    postAll(){
        this.all = Promise.all(this.calls.map(call => {return call.post()}));
        return this;
    }

    then(callback){
        let that = this;
        this.all.then(function (responses) {
            return Promise.all(responses.map(function (response) {
                return response.json();
            }));
        }).then(jsonArray => {
            for (let index = 0; index < jsonArray.length; index++) {
                that.calls[index].json = jsonArray[index];
            }
            return jsonArray;
        }).then(callback);
    }


}