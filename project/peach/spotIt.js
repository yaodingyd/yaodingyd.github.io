'use strict';

function spotIt(input) {
    var i = 0;
    var j = 0;
    var k = 0;
    var p = 2;

    var len = input.length;

    for (i = 2; i < 10; i++) {
        var min = i * i + i + 1;
        var max = (i + 1) * (i + 1) + (i + 1) + 1;
        if (len > min && len <= max) {
            p = i + 1;
            break;
        }
    }

    var cards = [];
    var minFactor;

    for (minFactor = 2; minFactor < 1 + parseInt(Math.pow(p, 0.5)); minFactor++) {
        if (p % minFactor == 0) {
            break;
        }
    }

    if (2 >= 1 + parseInt(Math.pow(p, 0.5))) {
        minFactor = p;
    }

    for (i = 0; i < p; i++) {
        var temp = [];
        for (j = 0; j < p; j++) {
            temp.push(i * p + j);
        }
        temp.push(p * p);
        cards.push(temp);
    }
    for (i = 0; i < minFactor; i++) {
        for (j = 0; j < p; j++) {
            var temp = [];
            for (k = 0; k < p; k++) {
                temp.push(k * p + (j + i * k) % p);
            }
            temp.push(p * p + 1 + i);
            cards.push(temp);
        }
    }

    var temp = [];
    for (i = 0; i < minFactor + 1; i++) {
        temp.push(p * p + i);
    }
    cards.push(temp);

    var results = [];
    var refinedResults = [];

    for (i = 0; i < cards.length; i++) {
        results.push(cards[i].map(function(val) {
            return input[val];
        }))
    }

    for (i = 0; i < results.length; i++) {
        var flag = true;
        results[i].forEach(function(value) {
            if (value === undefined) {
                flag = false;
            }
        })
        if (results[i].length !== p + 1) {
            flag = false;
        }
        if (flag) {
            refinedResults.push(results[i]);
        }
    }

   return refinedResults;
}

window.spotIt = spotIt;
