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
    FacebookScript.nonce = 'fa0zn1LF';

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
    <div className="social-media">
      <a key="twitter-button" href="https://twitter.com/share?ref_src=twsrc%5Etfw" className="twitter-share-button" data-show-count="false">Tweet</a>
      <div class="fb-share-button" data-href="https://developers.facebook.com/docs/plugins/" data-layout="button_count" data-size="large"><a target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fdevelopers.facebook.com%2Fdocs%2Fplugins%2F&amp;src=sdkpreparse" class="fb-xfbml-parse-ignore">Share</a></div>
      <a data-pin-do="buttonBookmark" href="https://www.pinterest.com/pin/create/button/"></a>
    </div>
  );
};

export default SocialMedia;