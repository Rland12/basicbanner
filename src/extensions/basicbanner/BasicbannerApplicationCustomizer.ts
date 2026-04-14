import { override } from '@microsoft/decorators';
import {
  BaseApplicationCustomizer,
  PlaceholderContent,
  PlaceholderName
} from '@microsoft/sp-application-base';
import * as React from 'react';
import * as ReactDom from 'react-dom';
import Banner from './components/Banner';

export default class BasicBannerApplicationCustomizer
  extends BaseApplicationCustomizer<{
    message: string;
    backgroundColor?: string;
    textColor?: string;
    fontSize?: number;
    visibleStartDate?: string;
  }> {

  private _topPlaceholder: PlaceholderContent | undefined;

  @override
  public onInit(): Promise<void> {
    console.log("MINIMAL BANNER LOADED");

    this.context.placeholderProvider.changedEvent.add(this, this._renderBanner);

    return Promise.resolve();
  }

  private _renderBanner = (): void => {
    if (!this._topPlaceholder) {
      this._topPlaceholder =
        this.context.placeholderProvider.tryCreateContent(PlaceholderName.Top);

      if (!this._topPlaceholder) {
        return;
      }
    }

    const element = React.createElement(Banner, {
      message: this.properties.message,
      backgroundColor: this.properties.backgroundColor,
      textColor: this.properties.textColor,
      fontSize: this.properties.fontSize,
      visibleStartDate: this.properties.visibleStartDate
    });

    ReactDom.render(element, this._topPlaceholder.domElement);

  };
}