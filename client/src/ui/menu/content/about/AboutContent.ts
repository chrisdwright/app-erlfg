import { App } from "../../../../App";
import { ContentType } from "../../../../constants/Constants";
import { TitleBox } from "../../components/TitleBox";
import { BaseContent } from "../BaseContent";
import { Content } from "../Content";

export class AboutContent extends BaseContent {

    constructor(app: App, parent: Content) {
        super(app, parent, ContentType.ABOUT);

        this.init();
    }

    private init() {
        new TitleBox(this.app, this.containerDiv, "About");
        const attributions = document.createElement("div");
        attributions.style.padding = "30px";
        attributions.style.paddingTop = "10px";
        //attributions.style.color = "white";
        //attributions.style.textShadow = "1px 1px black";
        attributions.innerHTML = `
            <b>FromSoftware</a><br>
            <a href="https://en.bandainamcoent.eu/elden-ring/elden-ring">Elden Ring</a><br><br>

            PixiJS<br>
            <a href="https://pixijs.com/">HTML5 Creation Engine</a><br><br>

            LeafletJS<br>
            <a href="https://leafletjs.com/">Interactive Maps</a><br><br>

            Bramus<br>
            <a href="https://github.com/bramus/photoshop-google-maps-tile-cutter">PS_Bramus.GoogleMapsTileCutter</a><br><br>

            Lamoot<br>
            <a href="https://opengameart.org/content/rpg-gui-construction-kit-v10">RPG GUI Construction Kit (UI)</a><br><br>

            VGCartography<br>
            <a href="https://www.deviantart.com/vgcartography/art/Elden-Ring-Full-Extracted-Map-No-Markings-913531512">Map Files</a><br><br>
        `;
        this.containerDiv.appendChild(attributions);
    }

}