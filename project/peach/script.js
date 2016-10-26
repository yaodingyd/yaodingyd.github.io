'use strict';

var result = document.getElementById('get-result');
var addSymbol = document.getElementById('add-symbol');
var addImageSymbol = document.getElementById('symbol-image-input');
var removeSymbol = document.getElementById('remove-symbol');
var clearSymbol = document.getElementById('clear-symbol');

var symbolAmount = document.getElementById('symbol-amount');
var symbolInput = document.getElementById('symbol-input');
var symbolList = document.getElementById('symbol-list');

var printCards = document.getElementById('print-result');
var printSection = document.getElementById('print');

var warning = document.getElementById('warning');

var inputArray = [];

document.addEventListener('keyup', function(e) {
    if (symbolInput.value !== '' && e.keyCode === 13) {
        var tmp = document.createElement('li');
        tmp.innerHTML = symbolInput.value;
        inputArray.push(symbolInput.value);
        symbolList.appendChild(tmp);
        symbolInput.value = '';
        symbolAmount.innerHTML = inputArray.length;
    }
});

function readURL(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();
    reader.onload = function (e) {
        var tempImage = document.createElement('image');
        tempImage.setAttribute('src', e.target.result);
        tempImage.setAttribute('width', '150');
        tempImage.setAttribute('height', '150');
        tempImage = tempImage.outerHTML;
        inputArray.push(tempImage);
        var tmp = document.createElement('li');
        tmp.innerHTML = tempImage;
        symbolList.appendChild(tmp);
        input.value = '';
        symbolAmount.innerHTML = inputArray.length;
    };
    reader.readAsDataURL(input.files[0]);
  }
}

addImageSymbol.addEventListener('change', function(){
    readURL(this);
})


addSymbol.addEventListener('click', function() {
    var tmp = document.createElement('li');
    tmp.innerHTML = symbolInput.value;
    inputArray.push(symbolInput.value);
    symbolList.appendChild(tmp);
    symbolInput.value = '';
    symbolAmount.innerHTML = inputArray.length;
});

removeSymbol.addEventListener('click', function(){
    var tmp = document.getElementById('symbol-list').children;
    var tmpLen = tmp.length;
    tmp[tmpLen - 1].remove();
    inputArray.pop();
    symbolAmount.innerHTML = inputArray.length;
});

clearSymbol.addEventListener('click', function() {
    inputArray = [];
    symbolList.innerHTML = '';
    symbolAmount.innerHTML = inputArray.length;
});

result.addEventListener('click', function() {
    warning.style.visibility = 'hidden';
    var result = document.getElementById('result');
    result.innerHTML = null;

    if (inputArray.length > 100) {
        result.innerHTML = 'Total element cannot be larger than 100';
        return;
    }

    var arrays = spotIt(inputArray);

    if (arrays.length === 0) {
        warning.style.visibility = 'visible';
        return;
    }

    arrays.forEach(function(val, index) {
        var temp = document.createElement('div');
        for (var i = 0; i < val.length; i++) {
            var set = document.createElement('div');
            set.className = 'result-array-item';
            set.innerHTML = val[i];
            temp.appendChild(set);
        }

        temp.className = 'result-array';
        result.appendChild(temp);
    })

    printSection.style.display = 'block';

});

printCards.addEventListener('click', function() {
    window.print();
});