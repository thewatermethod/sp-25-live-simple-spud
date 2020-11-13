import * as React from 'react';
// import styles from './TwentyFiveLiveEmbed.module.scss';
import { ITwentyFiveLiveEmbedProps } from './ITwentyFiveLiveEmbedProps';
import { escape } from '@microsoft/sp-lodash-subset';
import Script from 'react-load-script'

export default class TwentyFiveLiveEmbed extends React.Component<ITwentyFiveLiveEmbedProps, { spudRendered: Boolean}> {

  constructor(props) { 
    super(props);

    this.state = {
        spudRendered: false
    };

  }
  /**
   * a little helper to make us an id
   * @param {string} webName  
   */

  public createElId(webName: string | undefined) { 

    if (!webName || webName == "") { 
      return "spud-container"
    }

    let elId = webName.toLowerCase();
    return `${escape(elId)}-spud-container`

  }

  
  public renderSpud() {
    /**
     * 
     * we have to check to make sure the $Trumba object exists on the window global
     * && that the state has not been updated to say that the spud has been rendered
     */

    if ((window as any).$Trumba && !this.state.spudRendered) {


    /**
     * 
     * if a web name is not set, we can't render a spud
     * 
     */
    if (!this.props.webName || this.props.webName == "") {
      return;
    }

    /**
     * 
     * if there is no spud type set, we default to main
     */

    let spudType = "main";

    if (this.props.spudType || this.props.spudType != "") { 
      spudType = this.props.spudType;
    }
      console.log('Spud rendering...');

      (window as any).$Trumba.addSpud({ webName: escape(this.props.webName), spudType: escape(spudType), spudId: this.createElId(this.props.webName) });
      this.setState({ spudRendered: true });
    }
  }

  /**
  * lifecycle hooks
  */

  public componentDidUpdate(prevProps: ITwentyFiveLiveEmbedProps) {

    const PROPS_ARE_NEW = prevProps != this.props;

    if (!this.state.spudRendered || PROPS_ARE_NEW) { 
      this.renderSpud();
    }
  }

  public render(): React.ReactElement<ITwentyFiveLiveEmbedProps> {
    return (
      <div id={this.createElId(this.props.webName)}>
         <Script
          url="https://25livepub.collegenet.com/scripts/spuds.js"         
          onLoad={this.renderSpud.bind(this)}
        />
      </div>
    );
  }
}
