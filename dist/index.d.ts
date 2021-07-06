interface Options {
    categoria?: string;
    acao?: string;
    rotulo?: string;
}
/**
 * Adiciona os atributos data-bb-acao e data-bb-rotuno nas tags A
 * @date 2021-06-25
 * @param {string} str=''
 * @returns {string}
 */
export default function adicionarBBTrackerNoTexto(str?: string, options?: Options): string;
/**
 * Busca o elemento na página e adicionar os atributos data-bb-acao e data-bb-rotuno nas tags A
 * @date 2021-06-25
 * @param {string} elemento:string
 * @returns {void}
 */
export declare function adicionarBBTrackerNoElemento(elemento: string, options?: Options): void;
export {};
