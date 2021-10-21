window.onload = function() {

    // 获取浏览器窗口
    var windowScreen = document.documentElement;
    // 获取main的div元素
    var find_game = document.getElementById("find_game");
    // 通过窗口宽高和div宽高计算位置
    var main_left_find_game = (windowScreen.clientWidth - find_game.clientWidth)/2 + "px";
    var main_top_find_game = (windowScreen.clientHeight - find_game.clientHeight)/2 + "px";
    // 位置赋值
    find_game.style.left = main_left_find_game;
    find_game.style.top = main_top_find_game;

    // 获取main的div元素
    var main_div = document.getElementById("boom_main");
    // 通过窗口宽高和div宽高计算位置
    var main_left = (windowScreen.clientWidth - main_div.clientWidth)/2 + "px";
    var main_top = (windowScreen.clientHeight - main_div.clientHeight)/2 + "px";
    // 位置赋值
    main_div.style.left = main_left;
    main_div.style.top = main_top;


    // 获取main的div元素
    var math_div = document.getElementById("math");
    // 通过窗口宽高和div宽高计算位置
    var math_left = (windowScreen.clientWidth - math_div.clientWidth)/2 + "px";
    var math_top = (windowScreen.clientHeight - math_div.clientHeight)/2 + "px";
    // 位置赋值
    math_div.style.left = math_left;
    math_div.style.top = math_top;
}
