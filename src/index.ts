interface Options {
    categoria?: string; //page path
    acao?: string; // conteúdo-dinâmico
    rotulo?: string; // Nenhum rotulo encontrado
}

function convertStrToHtml(str: string): Element {
    const htmlObject = document.createElement('div');
    htmlObject.innerHTML = str;
    return htmlObject;
}

/**
 * Adiciona os atributos data-bb-acao e data-bb-rotuno nas tags A
 * @date 2021-06-25
 * @param {string} str=''
 * @returns {string}
 */
export default function adicionarBBTrackerNoTexto(str: string = '', options?: Options): string {
    const htmlObject = convertStrToHtml(str);
    
    // Valores padrão
    const options$ = {
        acao: 'conteúdo-dinâmico',
        rotulo: 'Nenhum rotulo encontrado', 
        ...options
    }

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
            element.setAttribute('data-bb-acao', options$.acao);
        }

        /* 
        * Adiciona data-bb-rotulo
        */
        if (attrs.indexOf('data-bb-rotulo') === -1) {
            let rotulo = options$.rotulo;
            const text: string = element?.innerText || '';
            if (text.trim()) {
                rotulo = text.trim();
            } else {
                const imgElement: HTMLImageElement | null = element.querySelector('img');
                const imgAlt: string = imgElement?.getAttribute('alt')?.trim() || '';
                const imgSrc: string = imgElement?.getAttribute('src')?.trim() || '';
                if (!!imgAlt) {
                    rotulo = `img-alt:${imgAlt}`;
                } else if (imgSrc) {
                    rotulo = `img-src:${imgSrc}`;
                }
            }
            element.setAttribute('data-bb-rotulo', rotulo)
        }
    }
    return String(htmlObject.innerHTML);
}


/**
 * Busca o elemento na página e adicionar os atributos data-bb-acao e data-bb-rotuno nas tags A
 * @date 2021-06-25
 * @param {string} elemento:string
 * @returns {void}
 */
export function adicionarBBTrackerNoElemento(elemento: string, options?: Options) {
    const el: Element | null = document.querySelector(elemento);
    if (el) {
        const str: string = el?.innerHTML || '';
        const strHtml = adicionarBBTrackerNoTexto(str, options);
        el.innerHTML = strHtml;
    }
}