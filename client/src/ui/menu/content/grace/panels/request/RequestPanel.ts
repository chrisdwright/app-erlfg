import { App } from "../../../../../../App";
import { GraceContent } from "../../GraceContent";
import { BasePanel, PanelType } from "../BasePanel";

export class RequestPanel extends BasePanel {

  constructor(app: App, content: GraceContent) {
    super(app, content, PanelType.REQUEST);

    this.init();
  }

  private init() {
  }

}