import { App } from "../../../../../../App";
import { GraceContent } from "../../GraceContent";
import { BasePanel, PanelType } from "../BasePanel";

export class AssistPanel extends BasePanel {

  constructor(app: App, parent: GraceContent) {
    super(app, parent, PanelType.ASSIST);

    this.init();
  }

  private init() {
  }

}