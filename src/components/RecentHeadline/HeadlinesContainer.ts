import Component from "@components/common/Component.ts";
import RecentHeadline, { THeadlineData } from "./RecentHeadline.ts";

export type THeadlinesProps = {
  leftHeadlineProps: THeadlineData;
  rightHeadlineProps: THeadlineData;
};

export default class HeadlinesContainer extends Component {
  private leftHeadline: RecentHeadline;
  private rightHeadline: RecentHeadline;

  constructor() {
    const topElement = document.createElement("div");
    topElement.className = "headlines-container";

    const leftHeadline = document.createElement(
      "recent-headline"
    ) as RecentHeadline;

    const rightHeadline = document.createElement(
      "recent-headline"
    ) as RecentHeadline;

    const stylesheetLink = Component.createStylesheetLink(
      "src/components/RecentHeadline/HeadlinesContainer.scss"
    );

    topElement.append(leftHeadline, rightHeadline, stylesheetLink);

    super(topElement);
    this.leftHeadline = leftHeadline;
    this.rightHeadline = rightHeadline;
  }

  update({ leftHeadlineProps, rightHeadlineProps }: THeadlinesProps) {
    this.leftHeadline.setHeadlineData(leftHeadlineProps);
    this.rightHeadline.setHeadlineData(rightHeadlineProps);
  }

  setHeadlinesData(newProps: THeadlinesProps) {
    this.dataset.headlineContent = JSON.stringify(newProps);
  }

  static get observedAttributes() {
    return ["left-headline-content", "right-headline-content"];
  }

  attributeChangedCallback(name: string, _oldVal: string, newVal: string) {
    if (name === "left-headline-content" || name === "right-headline-content") {
      this.update(JSON.parse(newVal));
    }
  }
}

// TODO: timer

customElements.define("headlines-container", HeadlinesContainer);
