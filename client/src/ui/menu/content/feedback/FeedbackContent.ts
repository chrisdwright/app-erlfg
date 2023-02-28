import { App } from "../../../../App";
import { ContentType } from "../../../../constants/Constants";
import { TitleBox } from "../../components/TitleBox";
import { BaseContent } from "../BaseContent";
import { Content } from "../Content";

export class FeedbackContent extends BaseContent {

  constructor(app: App, parent: Content) {
    super(app, parent, ContentType.FEEDBACK);

    this.init();
  }

  private init() {
    new TitleBox(this.app, this.containerDiv, "Feedback");
  }

}