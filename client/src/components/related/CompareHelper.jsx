import React, { useState, useEffect } from 'react';

// This helper function filters out irrelevant product data so that we only use the product's features for this comparison modal window
const CompareHelper = ({ currFeats, compareFeats }) => {
  // If user hasn't clicked on the compare button, then don't render just yet...
  if (!compareFeats) {
    return <div>Loading...</div>;
  }

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
          <i id="check" className="fas fa-check"></i>
          <div className="feat">{feature}</div>
          <i id="check" className="fas fa-check compared-product"></i>
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
            <i id="check" className="fas fa-check"></i>
            <div className="feat">{feature}</div>
          </div>
        );
      });
    } else {
      let uniqueFeats = currFeats.filter(feat => mutual.indexOf(feat) === -1);
      return uniqueFeats.map(feature => {
        return (
          <div className="modal-row">
            <i id="check" className="fas fa-check"></i>
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
            <i id="check" className="fas fa-check compared-product"></i>
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
            <i id="check" className="fas fa-check compared-product"></i>
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
