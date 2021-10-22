var system = {
    win: false,
    mac: false,
    xll: false
};
//检测平台
var p = navigator.platform;
system.win = p.indexOf("Win") === 0; //如果是windows系统就显示true，否则false。
system.mac = p.indexOf("Mac") === 0; //如果是Mac系统就显示true，否则false。
system.x11 = (p === "X11") || (p.indexOf("Linux") === 0); //如果是Linux或者X11系统就显示true，否则false。
//跳转语句，如果是windows系统，苹果系统，Linux或者X11系统就跳转到www.csjwang.com；如果是手机访问就自动跳转到m.csjwang.com页面。
if (system.win || system.mac || system.xll) {

} else {

}

var redbtn = document.getElementById("red")

var boom = function () {
    this.next_t()
}

redbtn.onclick = boom

var greenbtn = document.getElementById("green")
greenbtn.onclick = function () {
    alert("恭喜")
    this.next_t()
}




function startBoom() {
    var minute = 0;
    var sec = 12;
    var t1 = setInterval(function() {
        sec--;
        var mt = minute
        var sc = sec
        if (minute < 10) {
            mt = "0" + mt;
        }
        if (sec < 10) {
            sc = "0" + sc;
        }
        document.getElementById("timer").innerHTML = mt + " : " + sc;
        if (sec === 0 && minute === 0) {
            window.clearInterval(t1)
            setTimeout(function () {
                boom();
            }, 500);
        }
        if (sec === 0) {
            minute--;
            sec = 60;
            if (minute === 0) {

            }
        }
    },1000)
}