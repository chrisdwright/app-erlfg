import { App } from "../../../../App";
import { ContentType } from "../../../../constants/ContentType";
import { BaseContent } from "../BaseContent";
import { Content } from "../Content";

export class FeedbackContent extends BaseContent {

  constructor(app: App, parent: Content) {
    super(app, parent, ContentType.FEEDBACK);

    this.init();
  }

  private init() {
    //this.containerDiv.style.backgroundColor = "yellow";
  }

}