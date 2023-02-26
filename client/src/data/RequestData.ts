import { RequestType } from "../constants/Constants";

export class RequestData {

    public requests: RD_Request[] = [];

    public reset() {
        this.requests = [];
    }

    public addRequest(request: RD_Request) {
        this.requests.push(request);
    }

    public removeRequest(request: RD_Request) {
        for (let i = 0; i < this.requests.length; i++)
            if (this.requests[i] == request)
                this.requests.splice(i, 1);
    }

    public getByRequestId(requestId: number) {
        for (let i = 0; i < this.requests.length; i++)
            if (this.requests[i].requestId == requestId)
                return this.requests[i];
        return null;
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

    public type: RequestType;
    public timestamp: number;
    public displayName: string;

    constructor(json: any) {
        this.requestId = json[0];
        this.markerId = json[1];

        this.type = json[2];
        this.timestamp = json[3];
        this.displayName = json[4];
    }

}
