import React from 'react';

// This helper function filters out irrelevant product data so that we only use the product's features for this comparison modal window

const CompareHelper = ({ currFeats, compareFeats }) => {

  // Converts to arrays containing only features
  currFeats = currFeats.map(feat => {
    return feat.feature;
  });
  compareFeats = compareFeats.map(feat => {
    return feat.feature;
  });

  // Create an array of mutual features, render those first
  const mutual = compareFeats.filter(feat => currFeats.includes(feat));
  const renderMutual = () => {
    return mutual.map(feature => {
      return (
        <div className="modal_row">
          <div id="check">&#10003;</div>
          <div className="feat">{feature}</div>
          <div id="check" className="compared_product">&#10003;</div>
        </div>
      );
    });
  };

  // Render remaining features that aren't included in the array of mutual feats
  const renderCurrFeats = () => {
    if (mutual.length === 0) {
      return currFeats.map(feature => {
        return (
          <div className="modal_row">
            <div id="check">&#10003;</div>
            <div className="feat">{feature}</div>
          </div>
        );
      });
    } else {
      let uniqueFeats = currFeats.filter(feat => mutual.indexOf(feat) === -1);
      return uniqueFeats.map(feature => {
        return (
          <div className="modal_row">
            <div id="check">&#10003;</div>
            <div className="feat">{feature}</div>
          </div>
        );
      });
    }
  };

  const renderComparedFeats = () => {
    if (mutual.length === 0) {
      return compareFeats.map(feature => {
        return (
          <div className="modal_row">
            <div>{null}</div>
            <div className="feat">{feature}</div>
            <div id="check" className="compared_product">&#10003;</div>
          </div>
        );
      });
    } else {
      let uniqueFeats = compareFeats.filter(feat => mutual.indexOf(feat) === -1);
      return uniqueFeats.map(feature => {
        return (
          <div className="modal_row">
            <div>{null}</div>
            <div className="feat">{feature}</div>
            <div id="check" className="compared_product">&#10003;</div>
          </div>
        );
      });
    }
  };

  return (
    <div>
      <div>{renderMutual()}</div>
      <div>{renderCurrFeats()}</div>
      <div>{renderComparedFeats()}</div>
    </div>
  );
};

export default CompareHelper;
