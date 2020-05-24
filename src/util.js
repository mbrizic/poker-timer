function getLastElement(array) {
    return array[array.length - 1];
}

function copy(obj) {
    return JSON.parse(
        JSON.stringify(obj)
    );
}

function range(len) {
    return [ ...Array(len).keys() ];
}

function isAscending(arr) {
    return arr.every((el, index) => {
        var previousElement = arr[index - 1];
        var isFirstElement = previousElement == null

        return isFirstElement || el > previousElement;
    });
}

function floorToClosestDivisibleByNumber(number, divider) {
    var remainder = number % divider

    var shouldAdd = remainder > (divider / 2)

    return shouldAdd 
        ? Math.floor(number + remainder)
        : Math.floor(number - remainder)
}
