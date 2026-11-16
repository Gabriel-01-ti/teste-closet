# Relatório final · CLOSET.exe 4.1

Data: 16 de novembro de 2026. Resultado: **PASSOU**.

## Exigência principal

As roupas das quatro personagens foram individualizadas. Cada uma tem 31 opções com vestir, retirar e substituir; a personagem permanece a mesma. A Ana aprovada foi mantida.

| Verificação | Resultado |
|---|---|
| Opções por personagem | 31 selecionadas e retiradas por cliques reais no provador. 155 opções nas cinco personagens. |
| Blusas e partes de baixo | 98 combinações renderizadas por personagem, 490 no total. |
| Rosto original | Amostra facial nativa comparada aos pixels da foto de origem em todas as 98 combinações e no vestido de cada personagem. |
| Cabelo/identidade | Nas quatro novas máscaras, todos os pixels totalmente opacos comparados ao arquivo de referência, sem diferenças de cor. |
| Ana aprovada | Todos os arquivos conferidos por SHA-256; cinco composições comparadas pixel por pixel ao render aprovado da versão 4.0. Sem alterações. |
| Fotos das outras quatro | Arquivos JPEG originais conferidos por SHA-256. Sem alterações. |
| Peça independente | Trocar blusa manteve a calça; retirar blusa manteve a calça; retirar calça manteve a blusa. |
| Vestido | Substituiu cima e baixo; sua retirada removeu a imagem inteira da composição. |
| Novos sprites | 132 imagens independentes com transparência e coordenadas individuais. Resolução nativa preservada. |
| Regras, preços e contagem | 64.877 verificações do motor, referências, dimensões e preservação de arquivos. |
| Fluxo completo | Cada uma das quatro novas personagens passou por início, regras, carta, revisão, cálculo, retomada, resultado e matemática. |
| Cartão recusado | Peças acima de R$ 70 bloqueadas; preço continuou visível; cálculo usou somente opções válidas. |
| Relógios | Revisão separada de 18 s; montagem permaneceu pausada; cálculo abriu com seus 30 s integrais. |
| Navegador | 400 verificações de interação, sem erros de execução, console ou HTTP. |
| Celular | Janela 390 × 844 no Chrome, sem rolagem horizontal no jogo ou provador. |
| Sem servidor | index.html aberto por file://, com vestido funcionando nas quatro personagens. |

As capturas estão em **evidencias-4.1/**. Os números altos do teste do motor vêm principalmente da enumeração das combinações e não substituem a inspeção visual. As 14 blusas, as sete partes de baixo e os vestidos também foram inspecionados em painéis ampliados, com correções de máscaras, barras, cintura e sobreposição de cabelo/braços.

## Como reproduzir

Abra **provador.html**, escolha a personagem e use os exemplos. Retire somente a blusa, vista outra, retire a parte de baixo e depois teste o vestido. Use “Comparar com a fotografia” para conferir o rosto de origem. Voltar à base neutra é parte do funcionamento; não há nudez.

## Alcance

A preservação facial foi medida nas amostras indicadas em browser-report-4.1.json; a checagem da máscara também compara seus pixels opacos de origem. As áreas antes escondidas pelas roupas, especialmente pernas sob calças e saia longa, tiveram reconstrução. O teste de celular usa janela estreita no computador, não aparelhos físicos. O jogo permanece local e não foi publicado externamente.
