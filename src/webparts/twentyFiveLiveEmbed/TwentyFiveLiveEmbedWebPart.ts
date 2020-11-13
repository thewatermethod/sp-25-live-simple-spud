import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'TwentyFiveLiveEmbedWebPartStrings';
import TwentyFiveLiveEmbed from './components/TwentyFiveLiveEmbed';
import { ITwentyFiveLiveEmbedProps } from './components/ITwentyFiveLiveEmbedProps';

export interface ITwentyFiveLiveEmbedWebPartProps {
  webName: string;
  spudType: string;
}

export default class TwentyFiveLiveEmbedWebPart extends BaseClientSideWebPart<ITwentyFiveLiveEmbedWebPartProps> {

  public render(): void {
    const element: React.ReactElement<ITwentyFiveLiveEmbedProps> = React.createElement(
      TwentyFiveLiveEmbed,
      {
        // description: this.properties.description
        webName: this.properties.webName,
        spudType: this.properties.spudType
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  // protected get dataVersion(): Version {
  //   return Version.parse('1.0');
  // }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('webName', {
                  label: strings.WebNameFieldLabel
                }),
                PropertyPaneTextField('spudType', {
                  label: strings.SpudTypeFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
