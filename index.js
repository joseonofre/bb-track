function addAttrTracker(str = '') {
    var htmlObject = document.createElement('div');
    htmlObject.innerHTML = str;
    var elements = htmlObject.querySelectorAll('a');
    for(var i = 0; i < elements.length; i++) {
        var element = elements[i];
        if(element.tagName === 'A') {
            var attrs = element.getAttributeNames();
            // 
            /* 
            * Adiciona data-bb-acao
            * Se no elemento já existir o data-bb-rotulo, não pode ser inserido o data-bb-acao, isso significa que já existe o data-bb-acao em um parent
            * Em alguns casos, é necessário incluir somente o data-bb-rotulo
            */
            if(!attrs.includes(['data-bb-acao']) && !attrs.includes(['data-bb-rotulo'])) {
                element.setAttribute('data-bb-acao', 'conteudo-dinamico')
            }

            /* 
            * Adiciona data-bb-rotulo
            */
            if(!attrs.includes(['data-bb-rotulo'])) {
                var rotulo = 'Nenhum rotulo encontrado';
                var text = element.innerText || '';
                if(text.trim()) {
                    rotulo = text.trim();
                } else {
                    var imgElement = element.querySelector('img');
                    var imgAlt = imgElement.getAttribute('alt') || '';
                    var imgSrc = imgElement.getAttribute('src') || '';
                    var imgRotulo = imgAlt.trim() || imgSrc.trim();
                    rotulo = imgRotulo ? imgRotulo : rotulo;
                }
                element.setAttribute('data-bb-rotulo', rotulo)
            }
        }
    }
    return htmlObject.innerHTML;
}

var html = addAttrTracker(document.querySelector('div').innerHTML);
document.querySelector('div').innerHTML = html;
