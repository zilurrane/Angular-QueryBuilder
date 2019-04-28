const myQuery = {
    'condition': 'and',
    'rules': [
        {
            'field': 'age',
            'operator': '<=',
            'entity': 'physical',
            'value': 9898989898
        },
        {
            'field': 'birthday',
            'operator': '=',
            'value': '2019-04-04',
            'entity': 'nonphysical'
        },
        {
            'condition': 'or',
            'rules': [
                {
                    'field': 'gender',
                    'operator': '=',
                    'entity': 'physical',
                    'value': 'f'
                },
                {
                    'field': 'occupation',
                    'operator': 'in',
                    'entity': 'nonphysical',
                    'value': [
                        'teacher',
                        'scientist'
                    ]
                },
                {
                    'field': 'school',
                    'operator': 'is null',
                    'entity': 'nonphysical'
                },
                {
                    'field': 'notes',
                    'operator': '=',
                    'entity': 'nonphysical',
                    'value': 'CS'
                }
            ]
        }
    ]
};

const getExpressionString = (query: any, expressionString: any) => {
    if (query.condition) {
        const expressionArray = query.rules.map(rule => {
            return getExpressionString(rule, expressionString);
        });
        return `( ${expressionArray.join(` ${query.condition} `)} )`;
    } else {
        return expressionString + preparePredicate(query.field, query.operator, query.value);
    }
};

const preparePredicate = (field, operator, value) => {
    switch (operator) {
        case 'is null':
        case 'is not null':
            return `( ${field} ${operator} )`;
        default:
            return `( ${field} ${operator} ${value} )`;
    }
};

console.log(myQuery);
console.log(getExpressionString(myQuery, ''));

