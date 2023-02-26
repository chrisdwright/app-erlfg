import { App } from "../../../../App";
import { ContentType } from "../../../../constants/Constants";
import { BaseContent } from "../BaseContent";
import { Content } from "../Content";

export class AboutContent extends BaseContent {

    constructor(app: App, parent: Content) {
        super(app, parent, ContentType.ABOUT);

        this.init();
    }

    private init() {
        this.containerDiv.style.backgroundColor = "red";
    }

}