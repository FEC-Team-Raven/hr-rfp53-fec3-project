import React, { useEffect } from 'react';

const SocialMedia = () => {
  useEffect(() => {
    const TwitterScript = document.createElement('script');
    const FacebookScript = document.createElement('script');
    const PinterestScript = document.createElement('script');

    TwitterScript.src = 'https://platform.twitter.com/widgets.js';
    TwitterScript.async = true;

    FacebookScript.src = 'https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v11.0';
    FacebookScript.async = true;
    FacebookScript.defer = true;
    FacebookScript.crossorigin = 'anonymous';
    FacebookScript.nonce = 'qUrHun0D';

    PinterestScript.src = '//assets.pinterest.com/js/pinit.js';
    PinterestScript.async = true;
    PinterestScript.defer = true;

    document.body.appendChild(TwitterScript);
    document.body.appendChild(FacebookScript);
    document.body.appendChild(PinterestScript);

    return () => {
      document.body.removeChild(TwitterScript);
      document.body.removeChild(FacebookScript);
      document.body.removeChild(PinterestScript);
    };
  }, []);

  return (
    <div id="social-media">
      <span className="social-media-button">
        <a href="https://twitter.com/share?ref_src=twsrc%5Etfw" className="twitter-share-button" data-show-count="false"></a>
      </span>
      <span className="social-media-button">
        <div className="fb-share-button" data-href="http://localhost:3000/" data-layout="button" data-size="small"><a target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=http%3A%2F%2Flocalhost%3A3000%2F&amp;src=sdkpreparse" className="fb-xfbml-parse-ignore">Share</a></div>
      </span>
      <span className="social-media-button">
        <a data-pin-do="buttonBookmark" href="https://www.pinterest.com/pin/create/button/"></a>
      </span>
    </div>
  );
};

export default SocialMedia;