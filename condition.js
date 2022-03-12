const { generateCallMethodFromModel } = require('./method-utils');

const symbols = {
    and: '&&',
    or: '||'
};

const types =  {
    "parameter": ({ prefix, name }) => `${prefix}${name}`, 
    "operator": ({ name }) => `${ symbols[name] }`, 
};

const conditionBodyTypes = {
    "actions": (actions) => {
        return actions.map(({ model }) => generateCallMethodFromModel(model)).join(';')
    },
}

const generateConditionBody = (conditionBody) => {
    const [ typeConditionBody ] = Object.keys(conditionBody);
    return conditionBodyTypes[typeConditionBody](conditionBody[typeConditionBody])
}

const generateCondition = ({ params, isTrue, isFalse = false }) => {
    const paramsString = params.map((param) => types[param.type](param)).join(' ');
    return `if(${paramsString}) {
        ${generateConditionBody(isTrue)}
    } ${isFalse ? `else {${generateConditionBody(isFalse)}}` : ''}`; 
}

module.exports = {
    generateCondition,
};