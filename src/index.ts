function convertStrToHtml(str: string): Element {
    const htmlObject = document.createElement('div');
    htmlObject.innerHTML = str;
    return htmlObject;
}

function addAttrTracker(str = '') {
    const htmlObject = convertStrToHtml(str);
    const elements: NodeListOf<HTMLAnchorElement> = htmlObject.querySelectorAll('a');
    for (let i = 0; i < elements.length; i++) {
        const element = elements[i];
        const attrs: Array<string> = element.getAttributeNames() || [];
        
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
            let rotulo = 'Nenhum rotulo encontrado';
            const text: string = element?.innerText || '';
            if (text.trim()) {
                rotulo = text.trim();
            } else {
                const imgElement: HTMLImageElement | null = element.querySelector('img');
                const imgAlt: string = imgElement?.getAttribute('alt')?.trim() || '';
                const imgSrc: string = imgElement?.getAttribute('src')?.trim() || '';
                if(!!imgAlt) {
                    rotulo = `img-alt:${imgAlt}`;
                } else if(imgSrc) {
                    rotulo = `img-src:${imgSrc}`;
                }
            }
            element.setAttribute('data-bb-rotulo', rotulo)
        }
    }
    return htmlObject.innerHTML;
}