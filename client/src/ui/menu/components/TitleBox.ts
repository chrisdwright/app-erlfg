import { App } from "../../../App";

export class TitleBox {

    private app: App;
    private div: HTMLDivElement;

    public containerDiv: HTMLDivElement;
    public titleDiv: HTMLDivElement;

    constructor(app: App, div: HTMLDivElement, text?: string) {
        this.app = app;
        this.div = div;

        this.init(text);
    }

    public setText(text: string) {
        this.titleDiv.innerText = text;
    }

    private init(text?: string) {
        this.containerDiv = document.createElement("div");
        this.containerDiv.style.display = "flex";
        this.containerDiv.style.flexDirection = "column";
        this.containerDiv.style.alignItems = "center";
        this.div.appendChild(this.containerDiv);

        const topBar = document.createElement("img");
        topBar.src = "images/menu/bar-horizontal.png";
        this.containerDiv.appendChild(topBar);

        this.titleDiv = document.createElement("div");
        this.titleDiv.style.width = "90%";
        this.titleDiv.style.color = "white";
        this.titleDiv.style.textAlign = "center";
        this.titleDiv.style.fontSize = "30px";
        this.titleDiv.style.paddingTop = "5px";
        this.titleDiv.style.paddingBottom = "5px";
        this.titleDiv.style.textShadow = "2px 2px #000000";
        this.containerDiv.appendChild(this.titleDiv);

        const bottomBar = document.createElement("img");
        bottomBar.src = "images/menu/bar-horizontal.png";
        this.containerDiv.appendChild(bottomBar);

        this.containerDiv = document.createElement("div");
        this.containerDiv.style.width = "392px";
        this.containerDiv.style.marginTop = "10px";
        this.containerDiv.style.display = "flex";
        this.containerDiv.style.flexDirection = "column";
        this.div.appendChild(this.containerDiv);

        if (text) this.setText(text);
    }

}