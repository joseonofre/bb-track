# Bem vindo ao BB-Track

  
Aqui deixaremos disponível 2 funções para auxiliar na implementação do GTM no código dinâmico inserido por Rich Text(editor de texto rico).

* 1 - adicionarBBTrackerNoTexto()

Essa primeira função tem como objetivo auxiliar na implementação de páginas desenvolvidas utilização a arquitetura SPA ou códigos componentizados que injetam html por meio do Javascript.

* 2 - adicionarBBTrackerNoElemento()

A segunda opção, são para páginas renderizadas pelo servidor.

Para implementar, é preciso envolver o texto/html que será impresso no bind na função `adicionarBBTrackerNoTexto` 

| Parâmetro    | Obrigatório |Valor padrão                   |
|--------------|-------------|-------------------------------|
|meuHTML       |Sim          |`''`            |
|opcoes        |Não          |`{ `<br />`categoria?:  string  = {Page  Path}; //Variável do google`<br />`acao?:  string  =  'conteúdo-dinâmico';`<br />`rotulo?:  string  =  'Nenhum rotulo encontrado';`<br />`}`            |

**Importando o pacote no NPM**

```
import adicionarBBTrackerNoTexto from 'bb-track';
```

**Importando o javascript com CDN**

```
https://cdn.jsdelivr.net/npm/bb-track@latest/dist/index.min.js
```

  

## Utilizando o NPM

Veja o exemplo:

**AngularJS**

```
<div ng-bind-html="adicionarBBTrackerNoTexto(meuHTML, opcoes)"></div>
```

**React**

```

dangerouslySetInnerHTML={{
	__html: adicionarBBTrackerNoTexto(meuHTML, opcoes) || ''
}}

```

## Utilizando o script

Nesse caso usamos a classe `.cmpLead` como exemplo, mas poderia ser qualquer classe, id, elemento, etc. Devemos nos atentar a usar o caminha mais preciso possível, para o código não rodar em lugares indesejados.

Ex.: `section.cmpLead` ele pegará todo código interno desse elemento e substituirá por um novo com os dados inseridos.

```
<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/bb-track@latest/dist/index.min.js"></script>

<script>
	adicionarBBTrackerNoElemento('.cmpLead', opcoes);
</script>
```