
    var a = {
        //页面全局变量
        demo: function (a) {
            var b;
            if (a > 5) {
                b = 5;
            } else if (a > 15) {
                b = a + 10;
            }
            return b;
        },
        foo: function (a, b) {
            var nReturn = 0;
            if (a < b < 10) {// 分支一
                nReturn += 1;
            }
            if (a > b > 10) {// 分支二
                nReturn += 10;
            }
            return nReturn;
        }

    }

a.demo(1);