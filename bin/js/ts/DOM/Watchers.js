var DOMWatchers = /** @class */ (function () {
    function DOMWatchers() {
    }
    DOMWatchers.prototype.construtor = function () {
    };
    DOMWatchers.prototype.resizeText = function (selector) {
        var text = document.querySelectorAll(selector);
        console.log(text);
        if (text.length) {
            document.addEventListener('resize', function () {
              for (var index in text) {
                var el = text[index];
                var aspect = el.offsetWidth;
              }
            });
        }
    };
    return DOMWatchers;
}());
export { DOMWatchers };
new DOMWatchers();
//# sourceMappingURL=Watchers.js.map
