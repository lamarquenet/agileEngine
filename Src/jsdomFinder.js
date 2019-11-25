const fs = require('fs');
const { JSDOM } = require('jsdom');

const {elementDataFormater , findMostSimilarElement } = require('./helpers/compareHelper');

module.exports = async (originPath, samplePath, selector) => {
  if(selector === undefined){
    selector = "make-everything-ok-button";
  }
  try {
    const originFile = fs.readFileSync(originPath);
    const sampleFile = fs.readFileSync(samplePath);
    const domOrigin = new JSDOM(originFile);
    const domSample = new JSDOM(sampleFile);
    const originelement = domOrigin.window.document.getElementById(selector);
    const OriginElementData = elementDataFormater(originelement);
    const elementsInSampleWithSameTagName = [...domSample.window.document.getElementsByTagName(OriginElementData.tagName)];
    const mostSimilarElementInSample = findMostSimilarElement(OriginElementData, elementsInSampleWithSameTagName);

    //after finding the most similar element look for the path on the domSample
    const nodePath = ((element) => {
      let pathToElement = '',
          i, innerText, tag, selector, classes;

      for (i = 0; element && element.nodeType == 1; element = element.parentNode, i++) {
        innerText = element.childNodes.length === 0 ? element.innerHTML : '';
        tag = element.tagName.toLowerCase();
        classes = element.className;

        if (element.id !== '') {
          selector = '#' + element.id;
        } else if (classes.length > 0) {
          selector = tag + '.' + classes.replace(/ /g , ".");
        } else if((innerText.length > 0)) {
          selector = tag + ":contains('" + innerText + "')";
        }
        pathToElement = ' --> ' + selector + pathToElement;
      }
      return pathToElement;
    })(mostSimilarElementInSample.sampleElement);

    if(mostSimilarElementInSample) {
      console.log(`Matching Level: ${mostSimilarElementInSample.MatchingContent}`);
      console.log(`Path to similar Element: body ${nodePath}\n`);
    } else {
      console.log('No similar items.');
    }

  } catch(err) {
    console.error('Error trying to find element by id', err);
  }
};