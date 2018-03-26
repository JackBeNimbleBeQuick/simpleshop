var DOMWatchers = /** @class */ (function () {
    function DOMWatchers() {
    }
    DOMWatchers.prototype.construtor = function () {
    };
    DOMWatchers.prototype.resizeText = function (selector) {
        var text = document.querySelectorAll(selector);
        console.log(text);
        window.addEventListener('resize', function (event) {
            for (var index in text) {
                var el = text[index];
                var child = el.firstElementChild;
                console.log(el.childNodes);
                if (child) {
                    var c_width = el.offsetWidth;
                    var s_width = child.offsetWidth;
                    var aspect = (c_width / s_width);
                    console.log(child);
                    console.log(c_width);
                    console.log(s_width);
                    if (c_width < s_width) {
                        console.log(index);
                        console.log(aspect);
                        el.style.fontSize = aspect + 'em';
                    }
                    else {
                        el.style.fontSize = '1em';
                    }
                }
                // console.log(index);
            }
        });
    };
    return DOMWatchers;
}());
export { DOMWatchers };
//# sourceMappingURL=Watchers.js.map