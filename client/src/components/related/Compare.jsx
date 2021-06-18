import React from 'react';

const Compare = ({ currFeats, compareFeats }) => {
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
        <div className="modal-row">
          <div>&#10003;</div>
          <div className="feat">{feature}</div>
          <div className="compared-product">&#10003;</div>
        </div>
      );
    });
  };

  // Render remaining features that aren't included in the array of mutual feats
  const renderCurrFeats = () => {
    if (mutual.length === 0) {
      return currFeats.map(feature => {
        return (
          <div className="modal-row">
            <div>&#10003;</div>
            <div className="feat">{feature}</div>
          </div>
        );
      });
    } else {
      let uniqueFeats = currFeats.filter(feat => mutual.indexOf(feat) === -1);
      return uniqueFeats.map(feature => {
        return (
          <div className="modal-row">
            <div>&#10003;</div>
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
          <div className="modal-row">
            <div>{null}</div>
            <div className="feat">{feature}</div>
            <div className="compared-product">&#10003;</div>
          </div>
        );
      });
    } else {
      let uniqueFeats = compareFeats.filter(feat => mutual.indexOf(feat) === -1);
      return uniqueFeats.map(feature => {
        return (
          <div className="modal-row">
            <div>{null}</div>
            <div className="feat">{feature}</div>
            <div className="compared-product">&#10003;</div>
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

export default Compare;
