var t = function () {
    var head = "<tr>"
    for (let i = 65; i <= 90; i++) {
        head += "<th class=\"ths\">" + String.fromCharCode(i) + "</th>"
    }
    head = head + "</tr>\n"
    var body = "<tr>"
    for (let i = 66; i <= 80; i++) {
        body += "<th class=\"ths\">" + String.fromCharCode(i) + "</th>"
        for (let j = 0; j < 25; j++) {
            body += "<th class=\"ths\">" + Math.floor(Math.random() * 5);
            +"</th>"
        }
        body += "</tr>"
    }
    document.getElementById("tables").innerHTML = head + body
}
t();

var findSubmit = document.getElementById("findSubmit")

var findSubmitfun = function () {
    window.ti++
}

findSubmit.onclick = findSubmitfun

