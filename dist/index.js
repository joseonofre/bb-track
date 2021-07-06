"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
exports.adicionarBBTrackerNoElemento = void 0;
function convertStrToHtml(str) {
    var htmlObject = document.createElement('div');
    htmlObject.innerHTML = str;
    return htmlObject;
}
/**
 * Adiciona os atributos data-bb-acao e data-bb-rotuno nas tags A
 * @date 2021-06-25
 * @param {string} str=''
 * @returns {string}
 */
function adicionarBBTrackerNoTexto(str, options) {
    var _a, _b;
    if (str === void 0) { str = ''; }
    var htmlObject = convertStrToHtml(str);
    // Valores padrão
    var options$ = __assign({ acao: 'conteúdo-dinâmico', rotulo: 'Nenhum rotulo encontrado' }, options);
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
            element.setAttribute('data-bb-acao', options$.acao);
        }
        /*
        * Adiciona data-bb-rotulo
        */
        if (attrs.indexOf('data-bb-rotulo') === -1) {
            var rotulo = options$.rotulo;
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
    return String(htmlObject.innerHTML);
}
exports["default"] = adicionarBBTrackerNoTexto;
/**
 * Busca o elemento na página e adicionar os atributos data-bb-acao e data-bb-rotuno nas tags A
 * @date 2021-06-25
 * @param {string} elemento:string
 * @returns {void}
 */
function adicionarBBTrackerNoElemento(elemento, options) {
    var el = document.querySelector(elemento);
    if (el) {
        var str = (el === null || el === void 0 ? void 0 : el.innerHTML) || '';
        var strHtml = adicionarBBTrackerNoTexto(str, options);
        el.innerHTML = strHtml;
    }
}
exports.adicionarBBTrackerNoElemento = adicionarBBTrackerNoElemento;
