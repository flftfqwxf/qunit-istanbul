function demo(a) {
    var b;
    if (a > 5) {
        b = 5;
    } else if (a > 15) {
        b = a + 10;
    }
    return b;
}

function foo(a, b) {
    var nReturn = 0;
    if (a < b < 10) {
        nReturn += 1;
    }
    if (a > b > 10) {
        nReturn += 10;
    }
    return nReturn;
}
