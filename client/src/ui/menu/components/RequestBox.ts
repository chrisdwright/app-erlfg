import { App } from "../../../App";
import { RequestType } from "../../../constants/Constants";
import { RD_Request } from "../../../data/RequestData";

export class RequestBox {

    private app: App;
    private div: HTMLDivElement;
    private data: RD_Request;

    public containerDiv: HTMLDivElement;
    public bodyDiv: HTMLDivElement;

    constructor(app: App, div: HTMLDivElement, data: RD_Request) {
        this.app = app;
        this.div = div;
        this.data = data;

        this.init();
    }

    private init() {
        this.containerDiv = document.createElement("div");
        this.containerDiv.style.width = "392px";
        this.containerDiv.style.marginTop = "10px";
        this.containerDiv.style.display = "flex";
        this.containerDiv.style.flexDirection = "column";
        this.div.appendChild(this.containerDiv);

        const top = document.createElement("img");
        top.src = "images/menu/frame-double-top.png";
        this.containerDiv.appendChild(top);

        this.bodyDiv = document.createElement("div");
        this.bodyDiv.style.padding = "5px";
        this.bodyDiv.style.paddingLeft = "45px";
        this.bodyDiv.style.display = "flex";
        //this.bodyDiv.style.flexDirection = "column";
        this.bodyDiv.style.backgroundImage = "url('images/menu/frame-double-middle.png')";
        this.containerDiv.appendChild(this.bodyDiv);

        const bottom = document.createElement("img");
        bottom.src = "images/menu/frame-double-bottom.png";
        this.containerDiv.appendChild(bottom);

        // === Body Contents ===

        // icon div
        const iconDiv = document.createElement("div");
        iconDiv.style.width = "50px";
        iconDiv.style.height = "50px";
        iconDiv.style.fontSize = "18px";
        iconDiv.style.color = "white";
        this.bodyDiv.appendChild(iconDiv);

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
        this.bodyDiv.appendChild(infoDiv);

        const infoTopDiv = document.createElement("div");
        //infoTopDiv.style.backgroundColor = "orange";
        infoTopDiv.style.fontSize = "18px";
        infoTopDiv.style.color = "white";
        infoTopDiv.style.display = "flex";
        infoDiv.appendChild(infoTopDiv);

        const infoTopNameDiv = document.createElement("div");
        //infoTopNameDiv.style.backgroundColor = "aqua";
        infoTopNameDiv.style.fontSize = "18px";
        infoTopNameDiv.style.textShadow = "1px 1px #000000";
        infoTopNameDiv.style.color = "white";
        infoTopNameDiv.style.flexGrow = "1";
        infoTopNameDiv.innerText = this.data.displayName;
        infoTopDiv.appendChild(infoTopNameDiv);

        const infoTopTimeDiv = document.createElement("div");
        infoTopTimeDiv.style.paddingRight = "50px";
        infoTopTimeDiv.style.fontSize = "16px";
        infoTopTimeDiv.style.color = "white";
        infoTopTimeDiv.innerHTML = "3m27s";
        infoTopDiv.appendChild(infoTopTimeDiv);

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
        infoBottomGraceDiv.innerText = this.app.data.getMarkerById(this.data.markerId).name;
        infoBottomDiv.appendChild(infoBottomGraceDiv);

        const infoBottomTypeDiv = document.createElement("div");
        infoBottomTypeDiv.style.fontSize = "12px";
        infoBottomTypeDiv.style.textShadow = "1px 1px #000000";
        infoBottomTypeDiv.style.color = "white";
        infoBottomTypeDiv.innerText = "Area";
        infoBottomDiv.appendChild(infoBottomTypeDiv);

        if (this.data.type == RequestType.DUEL) infoBottomTypeDiv.innerText = "Duel";
        if (this.data.bossId != 0) {
            const bossData = this.app.data.getBossById(this.data.bossId);
            switch (this.data.type) {
                case RequestType.BOSS: infoBottomTypeDiv.innerText = bossData.name; break;
                case RequestType.AREA_AND_BOSS: infoBottomTypeDiv.innerText = "Area + " + bossData.name; break;
            }
        }

    }

}