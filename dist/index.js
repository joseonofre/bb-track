"use strict";
exports.__esModule = true;
function convertStrToHtml(str) {
    var htmlObject = document.createElement('div');
    htmlObject.innerHTML = str;
    return htmlObject;
}
function addAttrTracker(str) {
    var _a, _b;
    if (str === void 0) { str = ''; }
    var htmlObject = convertStrToHtml(str);
    var elements = htmlObject.querySelectorAll('a');
    for (var i = 0; i < elements.length; i++) {
        var element = elements[i];
        var attrs = element.getAttributeNames() || [];
        /*
        * Adiciona data-bb-acao
        * Se no elemento já existir o data-bb-rotulo, não pode ser inserido o data-bb-acao, isso significa que já existe o data-bb-acao em um parent
        * Em alguns casos, é necessário incluir somente o data-bb-rotulo
        */
        if (attrs.indexOf('data-bb-acao') === -1 && attrs.indexOf('data-bb-rotulo') === -1) {
            element.setAttribute('data-bb-acao', 'conteúdo-dinâmico');
        }
        /*
        * Adiciona data-bb-rotulo
        */
        if (attrs.indexOf('data-bb-rotulo') === -1) {
            var rotulo = 'Nenhum rotulo encontrado';
            var text = (element === null || element === void 0 ? void 0 : element.innerText) || '';
            if (text.trim()) {
                rotulo = text.trim();
            }
            else {
                var imgElement = element.querySelector('img');
                var imgAlt = ((_a = imgElement === null || imgElement === void 0 ? void 0 : imgElement.getAttribute('alt')) === null || _a === void 0 ? void 0 : _a.trim()) || '';
                var imgSrc = ((_b = imgElement === null || imgElement === void 0 ? void 0 : imgElement.getAttribute('src')) === null || _b === void 0 ? void 0 : _b.trim()) || '';
                if (!!imgAlt) {
                    rotulo = "img-alt:" + imgAlt;
                }
                else if (imgSrc) {
                    rotulo = "img-src:" + imgSrc;
                }
            }
            element.setAttribute('data-bb-rotulo', rotulo);
        }
    }
    return htmlObject.innerHTML;
}
exports["default"] = addAttrTracker;
