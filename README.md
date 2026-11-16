# CLOSET.exe · versão 4.1

Projeto completo, pronto para abrir localmente. Esta versão estende o sistema aprovado da Ana a **Nicole, Lívia, Sophia e Isadora**, preservando a identidade visual das personagens.

## Abrir

1. Extraia TODO o ZIP em uma pasta nova.
2. Abra **index.html** no Chrome ou Edge. Não é necessário instalar nada para jogar.
3. Para conferir cada roupa, abra **provador.html** ou use “Testar peças individualmente” dentro do jogo. Os cinco botões escolhem a personagem.
4. Mantenha os arquivos e pastas juntos; não abra o HTML diretamente dentro do ZIP.

**provador-ana.html** continua disponível e usa os mesmos arquivos aprovados da versão 4.0.

## Closets individuais

Cada personagem tem **31 opções**: 14 blusas, 7 partes de baixo, 3 calçados, 5 acessórios, “Sem acessório” e 1 vestido. Cada roupa é uma imagem própria com transparência. Não há look completo pré-renderizado usado para vestir a personagem.

Clique na peça para vestir. No provador, clique novamente para retirar. Os botões “Retirar” e “Retirar todas as peças” permitem desmontar o look; escolher um vestido retira blusa e parte de baixo, e escolher uma delas retira o vestido. Trocar uma blusa preserva a parte de baixo.

Ao retirar peças, aparece uma **base neutra e opaca** de prova. Sophia mantém uma blusa ciganinha neutra como base; as demais usam uma base esportiva neutra. Retirar roupa não revela nudez.

Os novos encaixes usam as proporções e a pose de cada fotografia. Rostos e cabelos ficam em máscaras fixas com pixels das fotos originais. As pernas que já estavam visíveis na foto da Isadora foram reutilizadas; regiões antes escondidas por roupas longas foram reconstruídas. Isso é um closet 2D preparado para essas poses, não simulação física 3D nem adaptação automática a qualquer foto.

## O que foi preservado

- Os arquivos originais **nicole.jpeg, livia.jpeg, sophia.jpeg e isadora.jpeg** permanecem idênticos.
- Todos os arquivos em **assets/ana/** permanecem idênticos aos aprovados. O render da Ana foi comparado pixel por pixel com a versão 4.0 em cinco situações, incluindo base, roupas separadas, acessórios e vestido.
- As roupas novas ficam em **assets/characters/**, organizadas por personagem. Os PNGs são recortados somente nas margens transparentes, mantendo a resolução nativa. As posições estão em **fitting-profiles.js** e nos manifestos individuais.

## Partida e matemática

O funcionamento aprovado foi mantido: ocasião, duas regras, montagem, carta, **18 segundos extras de revisão**, Combo IQ, retorno à montagem, resultado e revelação matemática. A revisão não consome o tempo do look nem do cálculo. Durante a revisão, confira as categorias, preços e bloqueios e experimente substituições.

Os preços continuam reduzidos em aproximadamente **25%**, arredondados para reais inteiros. Não houve uma segunda redução. O Cartão recusado mantém o limite de **R$ 70 por peça**, com preços visíveis mesmo nas peças bloqueadas. Os números do cálculo consideram somente opções válidas.

Agora todas têm vestido: **(14 × 7 + 1) × 3 × 6 = 1.782** escolhas antes das regras. Vestido é uma alternativa ao par blusa + parte de baixo e ocupa dois lugares na regra de elegância. A carta filtra as peças primeiro; as regras descontam combinações sem duplicação.

Ranking, carreira, nome, som, configurações de tempo, guia, cartas físicas e créditos continuam no jogo. Os dados ficam no navegador do aparelho. Abra **CARTAS-DE-CAOS.html** para imprimir as cartas.

## Testes e comprovação

Veja **docs/RELATORIO-DE-TESTES.md**, **docs/browser-report-4.1.json** e **docs/evidencias-4.1/**. Foram testadas as 155 opções e renderizadas 490 combinações nas cinco personagens, além de vestidos, remoção independente, preservação facial, fluxo completo, celular e abertura sem servidor.

Para desenvolvimento: **npm run dev** inicia http://127.0.0.1:4173. **npm test** verifica o motor e a preservação dos arquivos. **npm install** instala somente a ferramenta de teste de navegador; com o servidor aberto, **npm run test:browser** executa os testes de interação. As variáveis opcionais CLOSET_TEST_URL, CLOSET_TEST_OUTPUT e CLOSET_BROWSER configuram endereço, pasta de resultados e navegador.

## Créditos

Gabriel Klemm Biesek — Buda · Instagram @budaa_01

Fernando Rodrigues Fortes · Instagram @fefortes14
