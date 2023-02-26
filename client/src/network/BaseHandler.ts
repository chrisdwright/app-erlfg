import { App } from "../App";
import { C2S } from "../constants/Routes";

export class BaseHandler {

    protected app: App;

    constructor(app: App) {
        this.app = app;
    }

    protected send(data: any) {
        this.app.net.send(data);
    }

    protected addTransaction(route: C2S) {
        this.app.net.addTransaction(route);
    }

    protected removeTransaction(route: C2S) {
        this.app.net.removeTransaction(route);
    }

    protected isBusy() {
        return this.app.net.isBusy();
    }

}