# Imagens e encaixes · 4.1

Foi usada a ferramenta integrada **image_gen**, sem API externa no jogo. O resultado final é local. Os rostos e cabelos são desenhados por camadas fixas de identidade com RGB dos arquivos originais; não são gerados durante a partida.

## Conjunto de prompts

- Base de Nicole e Lívia: editar a foto 1024 × 1536, manter identidade facial, cabelo, pose, ombros, braços, mãos e proporções; trocar apenas roupa por top esportivo opaco marfim e short esportivo opaco e manter calçado branco. Remover fundo para alpha; reconstruir somente regiões antes cobertas por calça.
- Base de Isadora: mesmas condições, preservando as pernas já visíveis e a postura inclinada. A implementação final reaproveita os pixels originais das pernas e a identidade original.
- Base de Sophia: manter a pessoa e a blusa ciganinha original, trocar apenas saia longa por short de caminhada opaco marfim; remover fundo; manter pose e calçado. A blusa neutra da base recebeu tom próprio; a peça branca original é independente.
- Vestido de Nicole: peça isolada terracota com alças largas e decote quadrado, modelagem transpassada, cintura ajustada e saia midi em A, na pose de três quartos da foto.
- Vestido de Lívia: peça isolada terracota de malha com manga curta e gola redonda discreta, cintura transpassada e saia midi, seguindo a pose frontal.
- Vestido de Sophia: peça isolada midi terracota com o mesmo decote ciganinha e manga bufante da blusa original, cintura ajustada e saia em camadas.
- Vestido de Isadora: peça isolada midi terracota com decote diagonal, alça fina direita, cintura inclinada e saia transpassada seguindo a pose original.
- Calça clara de Lívia: editar somente a calça preta para jeans marfim, conservar corte, cintura, bolsos, costuras, dobras, pernas e barras; tecido fotográfico sem aparência metálica; todo o restante da foto intacto. Só a calça foi extraída do estudo.
- Estudo de blusa da Isadora: editar somente o cropped preto assimétrico para marfim, preservar decote diagonal, alça fina, barra inclinada, dobras e corte; não recolorir cabelo nem alterar pessoa, corpo, saia ou pose. Só o tecido foi extraído. O estudo também auxiliou a separar cabelo escuro de tecido preto; o RGB da máscara final de identidade vem da foto original.
- Estudo de extração do cabelo da Isadora: isolar cabeça e cabelo, sem corpo nem roupas, em canvas 1024 × 1536 com transparência. O estudo não substitui o rosto original e não é usado como retrato novo no jogo.

Todos os prompts de peças isoladas pediram: fundo verdadeiramente transparente, ausência de pessoa/mannequin, margens da foto original, nenhum reposicionamento para preencher a tela, textura, costuras, volume, dobras e iluminação fotográficas, sem brilho/sombra fora do tecido, sem texto.

## Produção final

As imagens recebidas passaram por recortes e máscaras próprios. Os mapas de cada personagem estão em assets/characters/<personagem>/manifest.json e fitting-profiles.js. A máscara de identidade usa a foto original; braços ficam à frente das peças inferiores, cabelo fica à frente das roupas e calçados ficam sob barras longas. As roupas foram adaptadas individualmente, com controle próprio de cintura, quadril, pernas, comprimento e barra.

As fotos originais, os arquivos da Ana e os sprites legados foram preservados. PNGs novos foram recortados apenas nas margens vazias, mantendo pixels na resolução nativa; a composição usa as coordenadas originais e não estica a peça durante a troca. A paleta preserva a luminância das dobras e as padronagens são peças independentes.
