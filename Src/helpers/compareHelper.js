function elementDataFormater({ tagName, attributes, classList, textContent }) {
    const data = { tagName, classList: [...classList], textContent };
    data.attributes = [...attributes].reduce((obj, item) => {
        if(item.name !== 'class') {
            obj[item.name] = item.value;
        }
        return obj;
    }, {});

    return data;
}

function findMostSimilarElement(originElement, sampleElementsToCompare) {
    let result = null;
    let mostSimilarElement = 0;

    sampleElementsToCompare.forEach((sampleElement) => {
        const elem = SimilarElementCount(originElement, sampleElement);

        if(elem.MatchingContent > mostSimilarElement) {
            mostSimilarElement = elem.MatchingContent
            result = elem;
        }
    });

    return result? result : null;
}

function SimilarElementCount(originElement, sampleElement) {
    function checkClassMatches(originElement, sampleElement) {
        let similarityLevel = 0;
        originElement.classList.forEach((className) => {
            similarityLevel += sampleElement.classList.includes(className)? 1: 0;
        });

        return similarityLevel;
    }

    function SimilarAttributesCount(origin, sample) {
        let similarityLevel = 0;
        const originAttributes = origin.attributes;
        const sampleAttributes = sample.attributes;

        Object.keys(originAttributes).forEach((key) => {
            similarityLevel += originAttributes[key] === sampleAttributes[key] ? 1: 0;
        });

        return similarityLevel;
    }

    let MatchingContent = 0;
    const sampleContent = elementDataFormater(sampleElement);

    MatchingContent += SimilarAttributesCount(originElement, sampleContent);
    MatchingContent += checkClassMatches(originElement, sampleContent);
    MatchingContent += originElement.textContent.trim() === sampleContent.textContent.trim()? 1:0;
    return {
        MatchingContent ,
        originElement,
        sampleElement
    };
}

module.exports = {
    elementDataFormater,
    findMostSimilarElement
};