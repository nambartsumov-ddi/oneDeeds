import React from 'react';
import YouTube from 'react-youtube';
import classNames from 'classnames';

import styles from './MainVideo.module.scss';

// Because we use css-modules we need to bind styles to classNames utilities
const stylesCtx = classNames.bind(styles);

class MainVideo extends React.Component {
  render() {
    const playerContainerClasses = stylesCtx(styles.PlayerContainer);
    const videoClasses = stylesCtx(styles.MainVideo);

    const opts = {
      playerVars: {
        autoplay: 1,
        showinfo: 0,
        color: 'white',
        origin: window.location.protocol + '//' + window.location.host,
      },
    };

    return (
      <div className={playerContainerClasses}>
        <YouTube className={videoClasses} videoId="BzIeweg9sB0" opts={opts} />
      </div>
    );
  }
}

MainVideo.propTypes = {};

export default MainVideo;
