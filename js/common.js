window.ti = 0;
window.t1 = true;

const instance = axios.create({
    baseURL: 'https://some-domain.com/api/',
    timeout: 1000,
    headers: {'X-Custom-Header': 'foobar'}
});

window.onload = function () {
    autoCenter(loginBox);
    fillToBody(mask);
    setInterval(function () {
        var find_game = document.getElementById("find_game");
        var main_div = document.getElementById("boom_main");
        var math_div = document.getElementById("math");
        var Maze_div = document.getElementById("maze");
        var next_div = document.getElementById("next");
        this.checkIsNext()

        // 获取浏览器窗口
        var windowScreen = document.documentElement;
        // 获取main的div元素
        // 通过窗口宽高和div宽高计算位置
        var main_left_find_game = (windowScreen.clientWidth - find_game.clientWidth) / 2 + "px";
        var main_top_find_game = (windowScreen.clientHeight - find_game.clientHeight) / 2 + "px";
        // 位置赋值
        find_game.style.left = main_left_find_game;
        find_game.style.top = main_top_find_game;

        // 获取main的div元素
        // 通过窗口宽高和div宽高计算位置
        var main_left = (windowScreen.clientWidth - main_div.clientWidth) / 2 + "px";
        var main_top = (windowScreen.clientHeight - main_div.clientHeight) / 2 + "px";
        // 位置赋值
        main_div.style.left = main_left;
        main_div.style.top = main_top;


        // 获取main的div元素
        // 通过窗口宽高和div宽高计算位置
        var math_left = (windowScreen.clientWidth - math_div.clientWidth) / 2 + "px";
        var math_top = (windowScreen.clientHeight - math_div.clientHeight) / 2 + "px";
        // 位置赋值
        math_div.style.left = math_left;
        math_div.style.top = math_top;


        // 获取main的div元素
        // 通过窗口宽高和div宽高计算位置
        var Maze_div_left = (windowScreen.clientWidth - Maze_div.clientWidth) / 2 + "px";
        var Maze_divtop = (windowScreen.clientHeight - Maze_div.clientHeight) / 2 + "px";
        // 位置赋值
        Maze_div.style.left = Maze_div_left;
        Maze_div.style.top = Maze_divtop;

        // 获取main的div元素
        // 通过窗口宽高和div宽高计算位置
        var next_div_left = (windowScreen.clientWidth - next_div.clientWidth) / 2 + "px";
        var next_divtop = (windowScreen.clientHeight - next_div.clientHeight) / 2 + "px";
        // 位置赋值
        next_div.style.left = next_div_left;
        next_div.style.top = next_divtop;
        this.showMask();
    }, 500)

}

var mask = document.getElementById("mask"),
    loginBox = document.getElementById('loginBox')


function addEvent(ele, type, hander) {
    if (ele.addEventListener) {
        ele.addEventListener(type, hander, false);
    } else if (ele.attachEvent) {
        ele.attachEvent('on' + type, hander);
    } else {
        ele['on' + type] = hander;
    }
}

function showMask() {
    mask.style.display = 'block';
    loginBox.style.display = 'block';
    autoCenter(loginBox);
}

function hideMask() {
    mask.style.display = 'none';
}

function hidebox() {
    loginBox.style.display = "none";
    hideMask()
}

function hid(e) {
    var event = e || window.event;
    if (e.target.id === "mask") {
        mask.style.display = 'none';
    }
}

function autoCenter(ele) {
    var bodyW = document.documentElement.clientWidth;
    var bodyH = document.documentElement.clientHeight;
    var eleW = ele.offsetWidth;
    var eleH = ele.offsetHeight;
    ele.style.left = (bodyW - eleW) / 2 + "px";
    ele.style.top = (bodyH - eleH) / 2 + "px";
}

function fillToBody(ele) {
    ele.style.width = document.documentElement.clientWidth + "px";
    ele.style.height = document.documentElement.clientHeight + "px";
}

// addEvent(mask,'click',hid);

function checkIsNext() {
    var find_game = document.getElementById("find_game");
    var main_div = document.getElementById("boom_main");
    var math_div = document.getElementById("math");
    var Maze_div = document.getElementById("maze");
    var next_div = document.getElementById("next");
    if (window.ti === 0) {
        this.displayNone(find_game, math_div, main_div, Maze_div, next_div);
    } else if (window.ti === 1) {
        main_div.style.display = "block";
        this.displayNone(find_game, math_div, Maze_div);
        this.hidebox()
        if (window.t1 === true) {
            this.startBoom();
            window.t1 = false;
        }
    } else if (window.ti === 2) {
        math_div.style.display = "block";
        this.displayNone(main_div, find_game, Maze_div);
    } else if (window.ti === 3) {
        find_game.style.display = "block";
        this.displayNone(main_div, math_div, Maze_div);
    } else if (window.ti === 4) {
        Maze_div.style.display = "block";
        this.displayNone(find_game, math_div, main_div);
    } else if (window.ti === 5) {
        next_div.style.display = "block";
        this.displayNone(find_game, math_div, main_div, Maze_div);
    }
}

function displayNone() {
    var length = arguments.length;
    for (let i = 0; i < length; i++) {
        arguments[i].style.display = "none";
    }
}

function next_t() {
    window.ti++
}

var loginSubmit = document.getElementById("loginSubmit")

var loginSubmitfun = function () {
    instance.get('/user', {
        params: {
            ID: 12345
        }
    })
        .then(function (response) {
            window.ti++
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
}

loginSubmit.onclick = loginSubmitfun