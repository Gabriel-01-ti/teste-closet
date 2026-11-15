# CLOSET.exe — versão 3.27

Jogo de moda, cartas de caos e análise combinatória. Funciona com arquivos locais e em hospedagem estática, incluindo GitHub Pages.

## Como abrir

1. Extraia TODO o ZIP em uma pasta nova.
2. Abra o arquivo index.html no navegador.
3. Mantenha a pasta assets junto dos arquivos do jogo.

Não abra o HTML diretamente de dentro do ZIP. Nenhuma instalação é necessária para jogar.

Para desenvolvimento, com Node.js instalado:
- npm run dev
- abra o endereço informado pelo servidor.
- npm test executa as verificações de regras, interface e relógios.

## Como jogar

1. Escolha uma das cinco personagens: Nicole, Lívia, Ana, Sophia ou Isadora. Cada personagem é a imagem enviada (boneca/avatar estilizado), vestida em camadas recortadas dessa mesma imagem.
2. Digite seu nome, escolha o tempo do cálculo (30 a 90 s) e o **tempo para vestir (45 s, 60 s, 90 s ou 2 min; padrão 60 s)**.
3. Clique em START GAME, leia a ocasião e as duas regras e comece a montagem.
4. Escolha blusa, parte de baixo, sapato e acessório. "Sem acessório" é válido, exceto quando o caos exigir um acessório.
5. Após 12 segundos, uma Carta de Caos muda o armário. O relógio da montagem pausa durante a carta e o cálculo.
6. No Combo IQ, conte os looks válidos (Princípio Fundamental da Contagem menos as combinações proibidas) e finalize o look antes do fim do tempo.

## Armário

Na versão 3.22, as saias longas branca e vermelha foram recentradas individualmente para coincidir com o eixo do tronco de cada personagem, com abertura da barra recalibrada para evitar volume excessivo e deslocamento lateral. As saias mini também receberam um ajuste leve de alinhamento e caimento. As cores, os tecidos, os rostos, os cabelos e as imagens-base das personagens foram preservados.


Todas as peças antigas (inclusive prenda/pilcha) foram removidas. As roupas agora seguem as que cada personagem veste na foto:

- Blusas (14): cada personagem mantém seu próprio modelo original (cropped, camiseta cropped, body mesh, ciganinha ou cropped de alça), com várias cores e quatro estampas/modelos extras: listrada, poá, xadrez e transpassada.
- Parte de baixo (7): calça wide leg branca, calça jeans preta wide leg, short jeans claro, saia longa branca, saia mini preta, calça wide leg azul e saia longa vermelha. Cada peça é aplicada no seu quadro original de 640 × 1000 pixels, no mesmo sistema de coordenadas da personagem. Não há redimensionamento ou deslocamento automático de roupas ou tênis. Nas peças curtas, cada personagem usa novamente sua própria camada original de pernas, sem copiar ou deformar a pose de outra personagem. As cinco imagens-base de corpo e pernas permanecem individuais; a Ana não foi alterada.
- Sapatos (3): tênis branco, preto e vermelho, com os sprites sem deformação horizontal e posicionados sobre o pé e à frente da barra da roupa, para que todos os tons permaneçam visíveis.
- Acessórios (6): nenhum, bracelete de flores, colar, bolsa vermelha, bolsa creme e pulseiras.
- 14 × 7 × 3 × 6 = 1.764 combinações; as quantidades são atualizadas automaticamente pelas cartas.

Regras: precisa ser elegante, uma peça vermelha e nada de preto. Cartas: saia rasgou, chuva (bloqueia o tênis branco), look repetido, cartão recusado e paparazzi.

## Pontuação

- Estilo: até 100. Velocidade: até 100 (proporcional ao tempo restante do tempo escolhido para vestir). Combo IQ: 100. Total máximo: 300 (+500 estrelas de carreira ao acertar o cálculo).
- Nome, ranking e estrelas ficam salvos no navegador deste aparelho.

## Personagens

As imagens enviadas foram recortadas do fundo e separadas em camadas (corpo, pernas, cabelo/rosto, blusa, parte de baixo, sapato). O cabelo fica sempre por cima das roupas. Não são fotos reais: são bonecas/avatares 3D estilizados, usados como a própria personagem.

## Cartas físicas

Abra CARTAS-DE-CAOS.html para imprimir as cartas. Na emergência do jogo, escolha “Tenho uma carta física” e aplique o efeito retirado. O jogo lista apenas cartas que alteram o desafio e mantêm ao menos um look válido.

## Desenvolvido por

Gabriel Klemm Biesek — Buda  
Instagram: https://www.instagram.com/budaa_01/

Fernando Rodrigues Fortes  
Instagram: https://www.instagram.com/fefortes14/

## Recursos

A composição usa Canvas puro com imagens locais (pasta assets). As camadas de roupa e calçado são desenhadas nas coordenadas originais do canvas da personagem; nenhuma biblioteca externa é necessária.


Na versão 3.22, a saia longa branca da Ana e da Isadora recebeu um ajuste individual de largura. Na versão 3.27, os tênis aparecem à frente das barras para destacar as opções preta e vermelha; as blusas da Ana ficam opacas para parecerem feitas de tecido.

Na versão 3.27: a Ana voltou a aparecer ao ser escolhida (a blusa opaca dela agora vem gravada nas imagens, sem leitura de pixels que o navegador bloqueava em arquivos locais). As camadas de pernas dos shorts e das saias mini agora são individuais por peça e por personagem (legs_mini e legs_denim), recortadas pelo contorno da peça, sem degraus nem cunhas ao lado do quadril. As barras das saias mini, dos shorts, das saias longas e das calças foram limpas (pontas e triângulos soltos), a calça branca da Nicole usa a mesma silhueta limpa das outras e foram removidos fragmentos soltos da camada do corpo. Rostos, cabelos, troncos e blusas foram preservados.

Na versão 3.27: as 14 blusas "body mesh" da Ana foram regeneradas com estampa de ondas suaves e trama fina (sem os riscos esticados da foto recolorida), mantendo cores, bolinhas, listras, xadrez e wrap; as miniaturas também foram refeitas. Foram removidos da camada do cabelo da Ana os restos da blusa antiga que apareciam atrás dos cachos. A saia longa vermelha da Ana e da Isadora agora tem a mesma silhueta da saia branca, e todas as saias longas (brancas e vermelhas, nas cinco personagens) ficaram mais estreitas.

Na versão 3.27: as peças de baixo foram recortadas de novo, inteiras, a partir das fotos originais (calça larga da Lívia e da Nicole, short da Ana, saia longa da Sophia, mini da Isadora). Antes os recortes estavam incompletos (sem o babado/abertura da saia, sem os lados da mini) e por isso não encaixavam como na foto. Todas as combinações usam agora essas silhuetas completas, encaixadas na cintura de cada personagem; branca, azul e vermelha seguem o mesmo mapeamento de cor de antes. As pernas sob mini e short foram recalculadas para cada peça. A barriga da Isadora, apagada por engano na versão anterior, foi restaurada. A blusa original da Ana voltou a ser a da foto (sem restos de manga clara) e as outras 13 seguem com a estampa de mesh limpa.

## v3.27
- Calças alinhadas aos tênis; tênis ficam sob saias longas; tênis vermelho/preto com sombreamento realista; faixa bege da Ana removida; miniaturas das blusas da Ana refeitas.
