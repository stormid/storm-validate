export const isSelect = field => field.nodeName.toLowerCase() === 'select';

export const isCheckable = field => (/radio|checkbox/i).test(field.type);

export const isFile = field => field.getAttribute('type') === 'file';

export const isRequired = group => group.validators.filter(validator => validator.type === 'required').length > 0;

export const getName = group => group.fields[0].getAttribute('name');

export const resolveGetParams = nodeArrays => nodeArrays.map((nodes) => {
    return `${nodes[0].getAttribute('name')}=${extractValueFromGroup(nodes)}`;
}).join('&');

export const DOMNodesFromCommaList = list => list.split(',')
                                                .map(item => [].slice.call(document.querySelectorAll(`[name=${item.substr(2)}]`)));

const hasValue = input => (input.value !== undefined && input.value !== null && input.value.length > 0);

export const groupValueReducer = (acc, input) => {
    if(!isCheckable(input) && hasValue(input)) acc = input.value;
    if(isCheckable(input) && input.checked) {
        if(Array.isArray(acc)) acc.push(input.value)
        else acc = [input.value];
    }
    return acc;
}

export const extractValueFromGroup = group => group.hasOwnProperty('fields') 
                                            ? group.fields.reduce(groupValueReducer, '')
                                            : group.reduce(groupValueReducer, '')

export const chooseRealTimeEvent = input => ['input', 'change'][Number(isCheckable(input) || isSelect(input) || isFile(input))];

// const composer = (f, g) => (...args) => f(g(...args));
// export const compose = (...fns) => fns.reduce(composer);
// export const pipe = (...fns) => fns.reduceRight(composer);

export const pipe = (...fns) => fns.reduce((acc, fn) => fn(acc));