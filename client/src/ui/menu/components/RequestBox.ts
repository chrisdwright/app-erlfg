import { App } from "../../../App";
import { RequestType } from "../../../constants/Constants";
import { RD_Request } from "../../../data/RequestData";

export class RequestBox {

    private app: App;
    private div: HTMLDivElement;
    private data: RD_Request;

    public containerDiv: HTMLDivElement;
    public timeDiv: HTMLDivElement;
    public timer: number;

    constructor(app: App, div: HTMLDivElement, data: RD_Request) {
        this.app = app;
        this.div = div;
        this.data = data;

        this.init();
        this.timer = setInterval(() => {
            const now = Date.now();
            let diff = Math.ceil((now - this.data.timestamp) / 1000);

            const hours = Math.floor(diff / 3600);
            diff -= (hours * 3600);
            const minutes = Math.floor(diff / 60);
            diff -= (minutes * 60);
            const seconds = diff;

            let time = "";
            if (hours > 0) time += hours.toString() + "h";
            if (minutes > 0) time += minutes.toString() + "m";
            if (seconds > 0) time += seconds.toString() + "s";

            this.timeDiv.innerText = time;
        }, 1000, null);
    }

    public isRequest(requestId: number) {
        return this.data.requestId == requestId;
    }

    public destroy() {
        clearInterval(this.timer);
        this.timer = null;

        this.div.removeChild(this.containerDiv);
    }

    private init() {
        this.containerDiv = document.createElement("div");
        this.containerDiv.style.width = "344px";
        this.containerDiv.style.marginTop = "5px";
        this.containerDiv.style.display = "flex";
        this.containerDiv.style.flexDirection = "column";
        this.div.appendChild(this.containerDiv);

        const top = document.createElement("img");
        top.src = "images/menu/frames/double-top.png";
        this.containerDiv.appendChild(top);

        const body = document.createElement("div");
        body.style.paddingLeft = "25px";
        body.style.display = "flex";
        body.style.backgroundImage = "url('images/menu/frames/double-middle.png')";
        this.containerDiv.appendChild(body);

        const bottom = document.createElement("img");
        bottom.src = "images/menu/frames/double-bottom.png";
        this.containerDiv.appendChild(bottom);

        // === Body Contents ===

        // icon div
        const iconDiv = document.createElement("div");
        iconDiv.style.width = "50px";
        iconDiv.style.height = "50px";
        iconDiv.style.fontSize = "18px";
        iconDiv.style.color = "white";
        body.appendChild(iconDiv);

        // set proper icon
        switch (this.data.type) {
            case RequestType.AREA:
            case RequestType.BOSS:
            case RequestType.AREA_AND_BOSS:
                iconDiv.style.backgroundImage = "url('images/map/markers/pve.png')";
                break;

            case RequestType.DUEL:
                iconDiv.style.backgroundImage = "url('images/map/markers/pvp.png')";
                break;
        }

        // info div
        const infoDiv = document.createElement("div");
        infoDiv.style.width = "250px";
        infoDiv.style.paddingLeft = "10px";
        infoDiv.style.fontSize = "18px";
        infoDiv.style.color = "white";
        infoDiv.style.flexGrow = "1";
        infoDiv.style.display = "flex";
        infoDiv.style.flexDirection = "column";
        body.appendChild(infoDiv);

        // info top div 

        const infoTopDiv = document.createElement("div");
        infoTopDiv.style.fontSize = "18px";
        infoTopDiv.style.color = "white";
        infoTopDiv.style.display = "flex";
        infoDiv.appendChild(infoTopDiv);

        const infoTopNameDiv = document.createElement("div");
        infoTopNameDiv.style.fontSize = "18px";
        infoTopNameDiv.style.textShadow = "1px 1px #000000";
        infoTopNameDiv.style.color = "white";
        infoTopNameDiv.style.flexGrow = "1";
        infoTopNameDiv.innerText = this.data.displayName;
        infoTopDiv.appendChild(infoTopNameDiv);

        this.timeDiv = document.createElement("div");
        this.timeDiv.style.paddingRight = "20px";
        this.timeDiv.style.fontSize = "14px";
        this.timeDiv.style.color = "white";
        infoTopDiv.appendChild(this.timeDiv);

        // info bottom div

        const infoBottomDiv = document.createElement("div");
        infoBottomDiv.style.paddingLeft = "20px";
        infoBottomDiv.style.color = "white";
        infoBottomDiv.style.display = "flex";
        infoBottomDiv.style.flexDirection = "column";
        infoDiv.appendChild(infoBottomDiv);

        const infoBottomGraceDiv = document.createElement("div");
        infoBottomGraceDiv.style.fontSize = "12px";
        infoBottomGraceDiv.style.textShadow = "1px 1px #000000";
        infoBottomGraceDiv.style.color = "gold";
        infoBottomGraceDiv.innerText = this.app.data.markers.getById(this.data.markerId).name;
        infoBottomDiv.appendChild(infoBottomGraceDiv);

        const infoBottomTypeDiv = document.createElement("div");
        infoBottomTypeDiv.style.fontSize = "12px";
        infoBottomTypeDiv.style.textShadow = "1px 1px #000000";
        infoBottomTypeDiv.style.color = "white";
        infoBottomTypeDiv.innerText = "Area";
        infoBottomDiv.appendChild(infoBottomTypeDiv);

        if (this.data.type == RequestType.DUEL) infoBottomTypeDiv.innerText = "Duel";
        if (this.data.bossId != 0) {
            const bossData = this.app.data.bosses.getById(this.data.bossId);
            switch (this.data.type) {
                case RequestType.BOSS: infoBottomTypeDiv.innerText = bossData.name; break;
                case RequestType.AREA_AND_BOSS: infoBottomTypeDiv.innerText = "Area + " + bossData.name; break;
            }
        }
    }

}