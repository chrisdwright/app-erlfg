export class RequestData {

    public requests: RD_Request[] = [];

    public parseList() {

    }

    public addRequest() {

    }

    public removeRequest() {

    }

    public getByMarkerId(markerId: number) {
        const requests = [];
        for (let i = 0; i < this.requests.length; i++)
            if (this.requests[i].markerId == markerId)
                requests.push(this.requests[i]);
        return requests;
    }

}

export class RD_Request {

    public requestId: number;
    public markerId: number;

    constructor(json: any) {
        //this.id = json.i;
        //this.name = json.n;
    }

}