import { override } from '@microsoft/decorators';
import {
  BaseApplicationCustomizer,
  PlaceholderContent,
  PlaceholderName
} from '@microsoft/sp-application-base';
import * as React from 'react';
import * as ReactDom from 'react-dom';
import Banner from './components/Banner';
import { SPHttpClient } from '@microsoft/sp-http';

export default class BasicBannerApplicationCustomizer
  extends BaseApplicationCustomizer<{
    message: string;
    fontSize?: number;
    visibleStartDate?: string;
    type?: string;
  }> {

  private _topPlaceholder: PlaceholderContent | undefined;

  @override
  public onInit(): Promise<void> {
    // Log to console to confirm the extension is loading
    console.log("MINIMAL BANNER LOADED");

    this.context.placeholderProvider.changedEvent.add(this, this._renderBanner);

    return Promise.resolve();
  }
  private _renderBanner = async (): Promise<void> => {
    if (!this._topPlaceholder) {
      this._topPlaceholder =
        this.context.placeholderProvider.tryCreateContent(PlaceholderName.Top);

      if (!this._topPlaceholder) return;
    }

    try {
      // Replace this tenant/site URL with your own SharePoint site URL.
      // Replace 'BannerConfig' with the name of your own SharePoint list.
      // The column names in $select must match your list columns exactly.
      const response = await this.context.spHttpClient.get(
        `https://24gz8f.sharepoint.com/_api/web/lists/getbytitle('BannerConfig')/items?$select=Message,FontSize,StartDate,BannerType&$orderby=Created desc`,
        SPHttpClient.configurations.v1
      );

      const data = await response.json();
      console.log("DATA:", data);

      if (!data.value || data.value.length === 0) {
        console.log("No banner items found");
        return;
      }

      const item = data.value[0];
      console.log("ITEM:", item);

      const element = React.createElement(Banner, {
        message: item.Message || "Default alert",
        fontSize: item.FontSize ? Number(item.FontSize) : 18,
        visibleStartDate: item.StartDate || undefined,
        type: item.BannerType
      });

      ReactDom.render(element, this._topPlaceholder.domElement);

    } catch (error) {
      console.error("Banner fetch error:", error);
    }
  };
}