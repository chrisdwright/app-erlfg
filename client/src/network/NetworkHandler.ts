import { App } from "../App";
import { AccountType, PlatformType } from "../constants/Constants";
import { C2S } from "../constants/Routes";
import { BaseHandler } from "./BaseHandler";

export class NetworkHandler extends BaseHandler {

    constructor(app: App) {
        super(app);
    }

    //#region === Outgoing ===

    public signIn(accountType: AccountType, platform: PlatformType) {
        if (this.isBusy()) return;
        this.addTransaction(C2S.NETWORK_SIGN_IN);

        // TODO: don't i have to add credentials here?
        this.send({
            r: C2S.NETWORK_SIGN_IN,
            t: accountType,
            p: platform
        });
    }

    public selectPlatform(platform: PlatformType) {
        if (this.isBusy()) return;
        this.addTransaction(C2S.NETWORK_SELECT_PLATFORM);

        this.send({
            r: C2S.NETWORK_SELECT_PLATFORM,
            p: platform
        });
    }

    //#endregion

    //#region === Incoming ===

    public signedIn(message: any) {
        var platformType = message.p;
        this.app.data.setPlatform(platformType);

        this.removeTransaction(C2S.NETWORK_SIGN_IN);
    }

    public changedPlatform(message: any) {
        var platformType = message.p;
        this.app.data.setPlatform(platformType);

        this.removeTransaction(C2S.NETWORK_SELECT_PLATFORM);
    }

    //#endregion

}