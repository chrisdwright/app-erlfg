import { App } from "../App";
import { RequestType } from "../constants/Constants";
import { C2S } from "../constants/Routes";
import { RD_Request } from "../data/RequestData";
import { BaseHandler } from "./BaseHandler";

export class RequestHandler extends BaseHandler {

    constructor(app: App) {
        super(app);
    }

    //#region === Outgoing ===

    public create(markerId: number, type: RequestType, bossId: number) {
        if (this.isBusy()) return;
        this.addTransaction(C2S.REQUEST_CREATE_NEW);

        this.send({
            r: C2S.REQUEST_CREATE_NEW,
            i: markerId,
            t: type,
            b: bossId
        });
    }

    //#endregion

    //#region === Incoming ===

    public created(message: any) {
    }

    public declined(message: any) {

    }

    public list(message: any) {
        const list = message.l;

        this.app.data.requests.reset();
        for (let i = 0; i < list.length; i++)
            this.app.data.requests.addRequest(new RD_Request(list[i]));

        this.app.event.request_receivedList.emit();
    }

    public added(message: any) {
        const data = message.d;

        const newRequest = new RD_Request(data);
        this.app.data.requests.addRequest(newRequest);

        this.app.event.request_addedRequest.emit(newRequest);
    }

    public removed(message: any) {
        const requestId = message.i;

        const request = this.app.data.requests.getByRequestId(requestId);
        this.app.data.requests.removeRequest(request);

        this.app.event.request_removedRequest.emit(requestId);
    }

    //#endregion

}