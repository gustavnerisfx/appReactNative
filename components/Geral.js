import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Card, Text, useTheme } from 'react-native-paper';
import {
  useFonts,
  Montserrat_700Bold,
  Montserrat_800ExtraBold,
} from '@expo-google-fonts/montserrat';
import {
  Inter_500Medium,
  Inter_600SemiBold,
} from '@expo-google-fonts/inter';

const FILMES = [
  {
    id: '1',
    titulo: 'Donnie Darko',
    imagem: 'https://www.themoviedb.org/t/p/w1280/sv7D4vlfIH25lNjQYoXzoOFCYaz.jpg',
    genero: 'Ficção Científica / Suspense',
    sinopse: 'Um adolescente problemático escapa por pouco de um acidente fatal. A partir desse dia, ele passa a ter visões de um coelho gigante chamado Frank, que o manipula a cometer crimes.',
    resenha: 'Um clássico cult que desafia a mente com viagens no tempo e angústia adolescente em uma atmosfera sombria.'
  },
  {
    id: '2',
    titulo: 'Rambo: Programado para Matar',
    imagem: 'https://www.themoviedb.org/t/p/w1280/eZlxLq2iNpDKvjpjLhEJV2gK6Kk.jpg',
    genero: 'Ação / Drama',
    sinopse: 'Um veterano do Vietnã é injustamente preso e abusado por um xerife. Traumatizado, ele foge e usa táticas de guerrilha para sobreviver.',
    resenha: 'Mais profundo que a pura ação que a franquia virou depois, é uma excelente crítica sobre o trauma pós-guerra.'
  },
  {
    id: '3',
    titulo: 'Rocky: Um Lutador',
    imagem: 'https://www.themoviedb.org/t/p/w1280/b9B1DXcPNsJfTtc4x2LKA3bykoJ.jpg',
    genero: 'Drama / Esporte',
    sinopse: 'Um boxeador amador é escolhido ao acaso para lutar contra o campeão mundial dos pesos pesados.',
    resenha: 'A essência da jornada do herói, provando que a verdadeira vitória é aguentar de pé até o fim.'
  },
  {
    id: '4',
    titulo: 'Alien: O Oitavo Passageiro',
    imagem: 'https://www.themoviedb.org/t/p/w1280/rFHzJrkO1kNIezb6rFog5oCJUEn.jpg',
    genero: 'Ficção Científica / Terror',
    sinopse: 'A tripulação da Nostromo investiga um sinal de socorro e acaba trazendo uma forma de vida letal para a nave.',
    resenha: 'Obra-prima de Ridley Scott com um terror claustrofóbico brilhante usando a máxima do "menos é mais".'
  },
  {
    id: '5',
    titulo: 'Pulp Fiction: Tempo de Violência',
    imagem: 'https://www.themoviedb.org/t/p/w1280/tptjnB2LDbuUWya9Cx5sQtv5hqb.jpg',
    genero: 'Crime / Drama',
    sinopse: 'A narrativa acompanha assassinos da máfia, um boxeador e um casal de assaltantes, tecendo uma teia de violência e humor.',
    resenha: 'O divisor de águas dos anos 90. Diálogos brilhantes que explodem subitamente em ação frenética.'
  },
  {
    id: '6',
    titulo: 'Breaking Bad',
    imagem: 'https://www.themoviedb.org/t/p/w1280/hGwm9Cj3CdbJIqQWNExQqiYmCd4.jpg',
    genero: 'Drama / Suspense (Série)',
    sinopse: 'Um professor de química com câncer terminal junta-se a um ex-aluno para fabricar metanfetamina.',
    resenha: 'A transformação de Walter White é um estudo de personagem magistral e de tirar o fôlego.'
  },
  {
    id: '7',
    titulo: 'Fullmetal Alchemist: Brotherhood',
    imagem: 'https://www.themoviedb.org/t/p/w1280/5ZFUEOULaVml7pQuXxhpR2SmVUw.jpg',
    genero: 'Ação / Fantasia (Anime)',
    sinopse: 'Dois irmãos usam alquimia proibida para ressuscitar a mãe e pagam um preço terrível.',
    resenha: 'Uma narrativa perfeita que equilibra política, filosofia, ação e emoção. Obrigatório.'
  },
  {
    id: '8',
    titulo: 'Matrix',
    imagem: 'https://www.themoviedb.org/t/p/w1280/lDqMDI3xpbB9UQRyeXfei0MXhqb.jpg',
    genero: 'Ficção Científica / Ação',
    sinopse: 'Um hacker descobre que o mundo real é uma simulação criada por máquinas superinteligentes.',
    resenha: 'Revolucionário visualmente e filosoficamente. Redefiniu os efeitos especiais e a cultura pop.'
  },
  {
    id: '9',
    titulo: 'The Office (US)',
    imagem: 'https://www.themoviedb.org/t/p/w1280/e7BoS8uUnew9ioS6reqtK9matqy.jpg',
    genero: 'Comédia (Série)',
    sinopse: 'O dia a dia bizarro e hilário dos funcionários de uma filial de empresa de papel liderada por Michael Scott.',
    resenha: 'A série "conforto" definitiva. Humor constrangedor que logo dá espaço a um carinho genuíno.'
  },
  {
    id: '10',
    titulo: 'Attack on Titan',
    imagem: 'https://www.themoviedb.org/t/p/w1280/8aMqmB5xSblsZc7bLMEhE28yHa2.jpg',
    genero: 'Ação / Fantasia (Anime)',
    sinopse: 'A humanidade vive enclausurada em muralhas para se proteger de gigantes devoradores de humanos.',
    resenha: 'Uma montanha-russa de reviravoltas sobre os horrores da guerra e a moralidade cinzenta.'
  },
  {
    id: '11',
    titulo: 'Parasita',
    imagem: 'https://www.themoviedb.org/t/p/w1280/igw938inb6Fy0YVcwIyxQ7Lu5FO.jpg',
    genero: 'Suspense / Drama',
    sinopse: 'Uma família sul-coreana pobre cria um plano para se infiltrar na vida de uma família rica.',
    resenha: 'Um thriller brilhante e imprevisível com humor negro e uma crítica mordaz à desigualdade.'
  },
  {
    id: '12',
    titulo: 'Stranger Things',
    imagem: 'https://www.themoviedb.org/t/p/w1280/twfKp60THrcOIep9sjHODOOfO8d.jpg',
    genero: 'Ficção Científica / Terror (Série)',
    sinopse: 'Crianças embarcam em uma busca por um amigo desaparecido, envolvendo monstros e experimentos governamentais.',
    resenha: 'Uma carta de amor à cultura pop dos anos 80, combinando aventura e suspense perfeitamente.'
  },
  {
    id: '13',
    titulo: 'Cowboy Bebop',
    imagem: 'https://www.themoviedb.org/t/p/w1280/xDiXDfZwC6XYC6fxHI1jl3A3Ill.jpg',
    genero: 'Ficção Científica (Anime)',
    sinopse: 'Caçadores de recompensas viajam pelo sistema solar na espaçonave Bebop lidando com seus passados trágicos.',
    resenha: 'Estiloso, melancólico e com uma trilha de jazz impecável. Obra de arte madura.'
  },
  {
    id: '14',
    titulo: 'O Senhor dos Anéis: A Sociedade do Anel',
    imagem: 'https://www.themoviedb.org/t/p/w1280/tlvsNCwWEIgwAM23aNzTmMIcPEZ.jpg',
    genero: 'Fantasia / Aventura',
    sinopse: 'Um hobbit deve liderar um grupo em uma jornada épica para destruir um anel de imenso poder maligno.',
    resenha: 'A fundação do cinema de fantasia moderno com escala e paixão insuperáveis.'
  },
  {
    id: '15',
    titulo: 'O Poderoso Chefão',
    imagem: 'https://www.themoviedb.org/t/p/w1280/u8LAG1JI57U9p0s8TyEEeoykR5d.jpg',
    genero: 'Crime / Drama',
    sinopse: 'O patriarca de uma dinastia do crime organizado transfere o controle de seu império clandestino para seu filho relutante.',
    resenha: 'Considerado um dos maiores filmes de todos os tempos, é uma aula de cinema, roteiro e atuação.'
  },
  {
    id: '16',
    titulo: 'A Origem',
    imagem: 'https://www.themoviedb.org/t/p/w1280/9e3Dz7aCANy5aRUQF745IlNloJ1.jpg',
    genero: 'Ficção Científica / Ação',
    sinopse: 'Um ladrão que rouba segredos corporativos através do uso da tecnologia de compartilhamento de sonhos recebe a tarefa de plantar uma ideia na mente de um CEO.',
    resenha: 'Christopher Nolan entrega um quebra-cabeça visualmente espetacular que prende a atenção até o último pião girar.'
  },
  {
    id: '17',
    titulo: 'Clube da Luta',
    imagem: 'https://www.themoviedb.org/t/p/w1280/mCICnh7QBH0gzYaTQChBDDVIKdm.jpg',
    genero: 'Drama / Suspense',
    sinopse: 'Um trabalhador de escritório insone e um fabricante de sabonetes formam um clube de luta clandestino que evolui para algo muito maior.',
    resenha: 'Subversivo, sujo e provocador. Uma crítica ácida ao consumismo e à masculinidade moderna.'
  },
  {
    id: '18',
    titulo: 'Batman: O Cavaleiro das Trevas',
    imagem: 'https://www.themoviedb.org/t/p/w1280/4lj1ikfsSmMZNyfdi8R8Tv5tsgb.jpg',
    genero: 'Ação / Crime',
    sinopse: 'Quando a ameaça conhecida como Coringa causa estragos e caos na cidade de Gotham, Batman deve aceitar um dos maiores testes psicológicos de sua vida.',
    resenha: 'Elevou o gênero de super-heróis a um thriller policial tenso, liderado pela atuação lendária de Heath Ledger.'
  },
  {
    id: '19',
    titulo: 'Interestelar',
    imagem: 'https://media.themoviedb.org/t/p/w600_and_h900_face/6ricSDD83BClJsFdGB6x7cM0MFQ.jpg',
    genero: 'Ficção Científica / Drama',
    sinopse: 'Uma equipe de exploradores viaja através de um buraco de minhoca no espaço na tentativa de garantir a sobrevivência da humanidade.',
    resenha: 'Um épico visual e emocional que explora o amor como uma força quantificável através do tempo e do espaço.'
  },
  {
    id: '20',
    titulo: 'Cidade de Deus',
    imagem: 'https://www.themoviedb.org/t/p/w1280/gfnXixcGC060QcG6JPxN6AMdVsq.jpg',
    genero: 'Crime / Drama',
    sinopse: 'Nas favelas do Rio de Janeiro, os caminhos de dois jovens divergem quando um se torna fotógrafo e o outro um chefe do tráfico.',
    resenha: 'A maior obra-prima do cinema nacional. Cru, cinético e narrado com uma energia impossível de ignorar.'
  },
  {
    id: '21',
    titulo: 'Death Note',
    imagem: 'https://www.themoviedb.org/t/p/w1280/tCZFfYTIwrR7n94J6G14Y4hAFU6.jpg',
    genero: 'Suspense / Sobrenatural (Anime)',
    sinopse: 'Um estudante brilhante descobre um caderno que permite matar qualquer pessoa cujo nome seja escrito nele.',
    resenha: 'Um jogo de xadrez mental entre dois gênios que te faz questionar os limites da justiça e da moralidade.'
  },
  {
    id: '22',
    titulo: 'De Volta para o Futuro',
    imagem: 'https://www.themoviedb.org/t/p/w1280/i996T0lI1fGtFEowiH3V6eZthL0.jpg',
    genero: 'Aventura / Comédia',
    sinopse: 'Um adolescente é enviado acidentalmente 30 anos no passado em um DeLorean e precisa garantir que seus pais se apaixonem.',
    resenha: 'O roteiro perfeito. Divertido, criativo e que não envelheceu um dia sequer desde seu lançamento.'
  },
  {
    id: '23',
    titulo: 'Jurassic Park',
    imagem: 'https://www.themoviedb.org/t/p/w1280/K74aFVViCJvoJjLOfHCdCjLreF.jpg',
    genero: 'Aventura / Ficção Científica',
    sinopse: 'Um parque temático com dinossauros clonados sofre uma grande falha de energia, e as feras escapam.',
    resenha: 'Magia cinematográfica em estado puro. A primeira vez que vimos o T-Rex é uma memória imortal do cinema.'
  },
  {
    id: '24',
    titulo: 'Game of Thrones',
    imagem: 'https://www.themoviedb.org/t/p/w1280/eDn8XWA0a4U3zOhd1gh7HExdt4Y.jpg',
    genero: 'Fantasia / Drama (Série)',
    sinopse: 'Nove famílias nobres lutam pelo controle de Westeros, enquanto um inimigo antigo retorna após milênios.',
    resenha: 'Apesar do final controverso, entregou algumas das melhores batalhas e reviravoltas políticas da história da TV.'
  },
  {
    id: '25',
    titulo: 'O Iluminado',
    imagem: 'https://www.themoviedb.org/t/p/w1280/47BdQqDWnj3VIzpH9bd2agho2PN.jpg',
    genero: 'Terror / Suspense',
    sinopse: 'Uma família isola-se em um hotel no inverno, onde uma presença maligna leva o pai à violência, enquanto o filho tem visões.',
    resenha: 'Kubrick cria uma atmosfera opressiva inigualável, tornando o próprio hotel o maior vilão da trama.'
  },
  {
    id: '26',
    titulo: 'A Viagem de Chihiro',
    imagem: 'https://www.themoviedb.org/t/p/w1280/ivHwYw3b03dFqRkcqaDSxjj2LQT.jpg',
    genero: 'Animação / Fantasia',
    sinopse: 'Uma garota de 10 anos adentra um mundo governado por deuses, bruxas e espíritos, onde humanos são transformados em bestas.',
    resenha: 'A genialidade do Studio Ghibli. Um conto de amadurecimento lindo e visualmente espetacular.'
  },
  {
    id: '27',
    titulo: 'Gladiador',
    imagem: 'https://www.themoviedb.org/t/p/w1280/4DUClyGA6OqjXv6yC0Imf6THGfp.jpg',
    genero: 'Ação / Épico',
    sinopse: 'Um ex-general romano busca vingança contra o imperador corrupto que assassinou sua família e o enviou à escravidão.',
    resenha: 'Uma epopeia sobre vingança e honra, impulsionada pela carismática atuação de Russell Crowe e a trilha de Hans Zimmer.'
  },
  {
    id: '28',
    titulo: 'The Boys',
    imagem: 'https://www.themoviedb.org/t/p/w1280/in1R2dDc421JxsoRWaIIAqVI2KE.jpg',
    genero: 'Ação / Sátira (Série)',
    sinopse: 'Um grupo de vigilantes propõe derrubar super-heróis corruptos que abusam de seus poderes.',
    resenha: 'Violenta, ácida e hilária. A melhor desconstrução moderna sobre como super-heróis reais seriam terríveis.'
  },
  {
    id: '29',
    titulo: 'Dark',
    imagem: 'https://www.themoviedb.org/t/p/w1280/1DLjjvSWMYo17B7wuz6YikB96hH.jpg',
    genero: 'Ficção Científica / Mistério (Série)',
    sinopse: 'O desaparecimento de duas crianças revela os laços entre quatro famílias e um complexo enigma de viagem no tempo.',
    resenha: 'Você precisará de um caderno de anotações, mas o roteiro amarra todos os nós paradoxais de forma magistral.'
  },
  {
    id: '30',
    titulo: 'Neon Genesis Evangelion',
    imagem: 'https://www.themoviedb.org/t/p/w1280/j6G24dqI4WgUtChhWjfnI4lnmiK.jpg',
    genero: 'Mecha / Psicológico (Anime)',
    sinopse: 'Adolescentes pilotam robôs gigantes para lutar contra seres alienígenas chamados "Anjos", enquanto lidam com traumas severos.',
    resenha: 'Esqueça as lutas de robô; é um mergulho profundo na depressão humana e na filosofia existencial.'
  },
  {
    id: '31',
    titulo: 'Se7en: Os Sete Crimes Capitais',
    imagem: 'https://www.themoviedb.org/t/p/w1280/dZXYPSEaXCeigR2GEuZoukNmLTf.jpg',
    genero: 'Policial / Suspense',
    sinopse: 'Dois detetives caçam um serial killer que usa os sete pecados capitais como motivos para seus assassinatos.',
    resenha: 'Obscuro, niilista e com um dos finais mais chocantes já concebidos pelo cinema moderno.'
  },
  {
    id: '32',
    titulo: 'Chernobyl',
    imagem: 'https://www.themoviedb.org/t/p/w1280/bnB2EkaY6HEdzwVkkH7dBHy6HmZ.jpg',
    genero: 'Drama / Histórico (Série)',
    sinopse: 'A dramatização do desastre da usina nuclear de 1986 e os sacrifícios feitos para salvar a Europa.',
    resenha: 'Aterrorizante porque é real. Um alerta sobre o custo das mentiras e a burocracia estatal.'
  },
  {
    id: '33',
    titulo: 'Forrest Gump: O Contador de Histórias',
    imagem: 'https://www.themoviedb.org/t/p/w1280/d74WpIsH8379TIL4wUxDneRCYv2.jpg',
    genero: 'Drama / Romance',
    sinopse: 'As presidências de Kennedy e Johnson, a Guerra do Vietnã e Watergate desdobram-se através da perspectiva de um homem com QI baixo.',
    resenha: 'Um filme que é impossível não amar, cheio de lições de vida e momentos emocionantes do começo ao fim.'
  },
  {
    id: '34',
    titulo: 'O Silêncio dos Inocentes',
    imagem: 'https://www.themoviedb.org/t/p/w1280/9IflTrxN8yw44ZxhfvJPziGzGHM.jpg',
    genero: 'Suspense / Crime',
    sinopse: 'Uma cadete do FBI busca a ajuda de um assassino canibal preso para capturar outro serial killer.',
    resenha: 'A química perturbadora entre Jodie Foster and Anthony Hopkins faz deste um thriller psicológico impecável.'
  },
  {
    id: '35',
    titulo: 'Hunter x Hunter',
    imagem: 'https://www.themoviedb.org/t/p/w1280/i2EEr2uBvRlAwJ8d8zTG2Y19mIa.jpg',
    genero: 'Aventura / Ação (Anime)',
    sinopse: 'O jovem Gon parte em uma jornada para se tornar um "Hunter", na esperança de encontrar seu pai.',
    resenha: 'O que parece um desenho infantil fofo se transforma em uma das obras mais táticas e adultas dos animes.'
  },
  {
    id: '36',
    titulo: 'Os Infiltrados',
    imagem: 'https://www.themoviedb.org/t/p/w1280/qtnAwzDapzOML4Q9p7lv2bk5gvz.jpg',
    genero: 'Crime / Thriller',
    sinopse: 'Um policial disfarçado e um espião na polícia tentam identificar um ao outro enquanto se infiltram em uma gangue irlandesa.',
    resenha: 'Scorsese em sua melhor forma. Tensão constante e reviravoltas chocantes com um elenco estelar.'
  },
  {
    id: '37',
    titulo: 'Homem-Aranha no Aranhaverso',
    imagem: 'https://www.themoviedb.org/t/p/w1280/gte2cJ3mtc2I8hZyXwRTzyclKuC.jpg',
    genero: 'Animação / Super-Herói',
    sinopse: 'Miles Morales se torna o Homem-Aranha do seu universo e deve unir forças com outros Homens-Aranha de várias dimensões.',
    resenha: 'Visualmente inovador e com mais emoção em cada frame do que a maioria dos filmes live-action do gênero.'
  },
  {
    id: '38',
    titulo: 'Succession',
    imagem: 'https://www.themoviedb.org/t/p/w1280/z0XiwdrCQ9yVIr4O0pxzaAYRxdW.jpg',
    genero: 'Drama (Série)',
    sinopse: 'A família Roy é conhecida por controlar a maior empresa de mídia do mundo. As coisas mudam quando o pai renuncia.',
    resenha: 'Diálogos cortantes como navalhas e atuações formidáveis. A melhor série sobre pessoas terríveis no poder.'
  },
  {
    id: '39',
    titulo: 'O Exterminador do Futuro 2: O Julgamento Final',
    imagem: 'https://www.themoviedb.org/t/p/w1280/eTIY2LO5cDclxgKtCHuvIKdF3c3.jpg',
    genero: 'Ação / Ficção Científica',
    sinopse: 'Um ciborgue idêntico ao que falhou em matar Sarah Connor deve agora proteger seu filho de um ciborgue mais avançado.',
    resenha: 'A rara sequência que supera o original. Ação ininterrupta, efeitos práticos lendários e coração.'
  },
  {
    id: '40',
    titulo: 'One Piece',
    imagem: 'https://www.themoviedb.org/t/p/w1280/9ltisibeD4gzqjM1AzmQwCdyirQ.jpg',
    genero: 'Aventura / Comédia (Anime)',
    sinopse: 'Monkey D. Luffy e sua tripulação pirata exploram um mundo de oceanos fantásticos em busca do tesouro supremo.',
    resenha: 'Apesar do tamanho colossal, a construção de mundo do criador Eiichiro Oda é a melhor de toda a ficção japonesa.'
  },
  {
    id: '41',
    titulo: 'Mad Max: Estrada da Fúria',
    imagem: 'https://www.themoviedb.org/t/p/w1280/tH64gzAHDFg7EFcgfkkZyHdGM5P.jpg',
    genero: 'Ação / Pós-Apocalíptico',
    sinopse: 'Em um deserto onde a água e o combustível são escassos, uma mulher se rebela contra um governante tirânico.',
    resenha: 'Um balé de destruição veicular. É essencialmente uma longa e alucinante perseguição de carro sem fôlego.'
  },
  {
    id: '42',
    titulo: 'Peaky Blinders',
    imagem: 'https://www.themoviedb.org/t/p/w1280/i0uajcHH9yogXMfDHpOXexIukG9.jpg',
    genero: 'Crime / Drama Histórico (Série)',
    sinopse: 'Um épico de gangues focado na família Shelby na Inglaterra logo após a Primeira Guerra Mundial.',
    resenha: 'Tommy Shelby é um dos protagonistas mais frios da TV, tudo embalado por uma estética formidável e trilha rock.'
  },
  {
    id: '43',
    titulo: 'Vingadores: Guerra Infinita',
    imagem: 'https://www.themoviedb.org/t/p/w1280/A4kvp7vY1BDLrrQIagRCffLKj1t.jpg',
    genero: 'Super-Herói / Ação',
    sinopse: 'Os Vingadores se reúnem para enfrentar o poderoso Thanos antes que ele reúna as Joias do Infinito.',
    resenha: 'Um evento cinematográfico sem precedentes onde, surpreendentemente, o vilão é o verdadeiro protagonista.'
  },
  {
    id: '44',
    titulo: 'Jujutsu Kaisen',
    imagem: 'https://www.themoviedb.org/t/p/w1280/8R1mMSC1gX1cg5ed7ns49JOEqw3.jpg',
    genero: 'Ação / Sobrenatural (Anime)',
    sinopse: 'Um jovem engole um dedo amaldiçoado e junta-se a uma escola de feiticeiros para combater Maldições.',
    resenha: 'Ação frenética, animação de cair o queixo e um elenco carismático fazem dele o melhor shounen atual.'
  },
  {
    id: '45',
    titulo: 'The Sopranos',
    imagem: 'https://www.themoviedb.org/t/p/w1280/xmn4PfUivHztFdJBMtijhLU4KTD.jpg',
    genero: 'Crime / Drama (Série)',
    sinopse: 'O chefe da máfia de Nova Jersey, Tony Soprano, lida com problemas pessoais e profissionais enquanto faz terapia.',
    resenha: 'A série que deu início à era de ouro da TV. Complexa, engraçada e brutalmente honesta.'
  },
  {
    id: '46',
    titulo: 'Blade Runner',
    imagem: 'https://www.themoviedb.org/t/p/w1280/49pANIZXRAdHUiWjjBv4vxPeqRC.jpg',
    genero: 'Ficção Científica / Neo-Noir',
    sinopse: 'Um policial exausto deve caçar quatro humanos sintéticos fugitivos e assassiná-los na Los Angeles de 2019.',
    resenha: 'Um visual cyberpunk que ditou as regras da ficção científica nas décadas seguintes.'
  },
  {
    id: '47',
    titulo: 'Black Mirror',
    imagem: 'https://www.themoviedb.org/t/p/w1280/aCTL24B8ZuiI2osMwoUI5rqBXoF.jpg',
    genero: 'Ficção Científica / Thriller (Série)',
    sinopse: 'Série antológica que explora um multiverso distópico onde as inovações tecnológicas colidem com instintos obscuros.',
    resenha: 'Perturbadora e visionária, fazendo você olhar para o seu próprio celular com desconfiança a cada fim de episódio.'
  },
  {
    id: '48',
    titulo: 'Naruto',
    imagem: 'https://www.themoviedb.org/t/p/w1280/9ptbVZpKNy5NY9D4zq4KGiYWRQY.jpg',
    genero: 'Ação / Aventura (Anime)',
    sinopse: 'Um jovem ninja rejeitado por sua vila sonha em se tornar o líder da aldeia para conseguir aprovação.',
    resenha: 'Apesar de longo, é uma história profunda sobre superação, ciclo de ódio e empatia que marcou uma geração.'
  },
  {
    id: '49',
    titulo: 'O Grande Truque',
    imagem: 'https://www.themoviedb.org/t/p/w1280/4AUW2bGbQjWACUREckGJWXmyF0d.jpg',
    genero: 'Mistério / Drama',
    sinopse: 'Dois mágicos rivais se envolvem em uma batalha amarga para criar a ilusão de palco definitiva no século XIX.',
    resenha: 'Como o próprio título sugere, o filme é um grande truque de mágica que ousa te desafiar a encontrar o segredo.'
  },
  {
    id: '50',
    titulo: 'Fleabag',
    imagem: 'https://www.themoviedb.org/t/p/w1280/27vEYsRKa3eAniwmoccOoluEXQ1.jpg',
    genero: 'Comédia / Drama (Série)',
    sinopse: 'Uma jovem de espírito livre e irritada tenta se adaptar à vida em Londres enquanto lida com uma tragédia recente.',
    resenha: 'Uma quebra da quarta parede brilhante, absurdamente engraçada e com um peso dramático inesperado.'
  },
  {
    id: '51',
    titulo: 'Steins;Gate',
    imagem: 'https://www.themoviedb.org/t/p/w1280/96R4bV7dB8ramaWceNKsxvJgCUd.jpg',
    genero: 'Ficção Científica / Thriller (Anime)',
    sinopse: 'Um autoproclamado cientista louco descobre uma forma de enviar mensagens de texto para o passado.',
    resenha: 'A melhor história sobre viagem no tempo já feita nos animes, indo da comédia ao desespero puro rapidamente.'
  },
  {
    id: '52',
    titulo: 'True Detective (1ª Temporada)',
    imagem: 'https://www.themoviedb.org/t/p/w1280/1fxr55V72a2gtqyn2b8pf6FslOf.jpg',
    genero: 'Crime / Mistério (Série)',
    sinopse: 'Dois detetives da Louisiana são entrevistados sobre um caso de assassinato macabro ocorrido há 17 anos.',
    resenha: 'A primeira temporada é irretocável. Filosofia pesada e um tom sufocante dominam cada cena.'
  },
  {
    id: '53',
    titulo: 'Your Name (Kimi no Na wa)',
    imagem: 'https://www.themoviedb.org/t/p/w1280/eIm2nKC0125GyEPSWl6ODCA9J1S.jpg',
    genero: 'Romance / Fantasia (Anime)',
    sinopse: 'Dois adolescentes do Japão, uma do campo e outro de Tóquio, começam a trocar de corpo magicamente.',
    resenha: 'Não é apenas visualmente deslumbrante, é uma montanha-russa emocional que parte e cola seu coração.'
  },
  {
    id: '54',
    titulo: 'Better Call Saul',
    imagem: 'https://www.themoviedb.org/t/p/w1280/tFCPd8nOqrxjKpTs0ZAdPRydQFR.jpg',
    genero: 'Drama / Crime (Série)',
    sinopse: 'Acompanhe a transformação do outrora honesto advogado Jimmy McGill em Saul Goodman.',
    resenha: 'O raro spin-off que empata (e para muitos, supera) a série original. A tragédia em câmera lenta perfeita.'
  },
  {
    id: '55',
    titulo: 'Akira',
    imagem: 'https://www.themoviedb.org/t/p/w1280/tbwwTQ3EqSdotbQ3ZcIl6vKBv7q.jpg',
    genero: 'Cyberpunk / Ação (Anime)',
    sinopse: 'Em Neo-Tóquio, um jovem integrante de uma gangue de motoqueiros ganha poderes telecinéticos após um acidente.',
    resenha: 'O anime que apresentou a animação japonesa ao ocidente. Um marco visual estonteante até hoje.'
  },
  {
    id: '56',
    titulo: 'Friends',
    imagem: 'https://www.themoviedb.org/t/p/w1280/oY3ck2Sdu8qsEWFnuiX2HEfr65k.jpg',
    genero: 'Comédia (Série)',
    sinopse: 'Acompanha a vida pessoal e profissional de seis amigos vivendo na cidade de Nova York nos anos 90.',
    resenha: 'A sitcom definitiva de uma geração, imortalizou frases e situações que são copiadas até hoje.'
  },
  {
    id: '57',
    titulo: 'Meu Amigo Totoro',
    imagem: 'https://www.themoviedb.org/t/p/w1280/23KKTxDg6rxZVc66bloQQdPSr29.jpg',
    genero: 'Animação / Família',
    sinopse: 'Duas meninas se mudam para o campo e descobrem criaturas da floresta místicas lideradas pelo amável Totoro.',
    resenha: 'A pura essência da infância inocente e curiosa retratada pelas mãos do mestre Hayao Miyazaki.'
  },
  {
    id: '58',
    titulo: 'The Wire',
    imagem: 'https://www.themoviedb.org/t/p/w1280/iLmoND7FpDKFwucLjS7lkM4ZX1p.jpg',
    genero: 'Crime / Drama (Série)',
    sinopse: 'As ruas de Baltimore são retratadas tanto pelos olhos dos criminosos e traficantes quanto pelas forças da lei.',
    resenha: 'Muito mais que um programa policial, é um romance televisivo em sua forma mais ambiciosa e realista.'
  },
  {
    id: '59',
    titulo: 'Demon Slayer (Kimetsu no Yaiba)',
    imagem: 'https://www.themoviedb.org/t/p/w1280/xUfRZu2mi8jH6SzQEJGP6tjBuYj.jpg',
    genero: 'Ação / Fantasia (Anime)',
    sinopse: 'Um menino bondoso se torna matador de demônios para curar sua irmã que foi transformada em um.',
    resenha: 'Pode ter uma história clássica, mas a qualidade de animação e as coreografias de lutas beiram a perfeição.'
  },
  {
    id: '60',
    titulo: 'Seinfeld',
    imagem: 'https://www.themoviedb.org/t/p/w1280/aCw8ONfyz3AhngVQa1E2Ss4KSUQ.jpg',
    genero: 'Comédia (Série)',
    sinopse: 'O comediante de stand-up Jerry Seinfeld convive com seus três amigos excêntricos na cidade de Nova York.',
    resenha: 'A infame "série sobre nada" revolucionou o humor televisivo ao focar inteiramente nos pormenores do cotidiano.'
  },
  {
    id: '61',
    titulo: 'Ghost in the Shell (O Fantasma do Futuro)',
    imagem: 'https://www.themoviedb.org/t/p/w1280/4YgDy47HKxcSwUPQWrg0J39lEZA.jpg',
    genero: 'Cyberpunk / Filosófico (Anime)',
    sinopse: 'Uma ciborgue policial lidera uma força tarefa na caçada de um perigoso e misterioso hacker, o Mestre dos Fantoches.',
    resenha: 'A base inspiracional de "Matrix". Um mergulho filosófico melancólico sobre o que nos torna essencialmente humanos.'
  },
  {
    id: '62',
    titulo: 'O Resgate do Soldado Ryan',
    imagem: 'https://www.themoviedb.org/t/p/w1280/hMLxNLCXRDd62acfCBn6mIyW1HU.jpg',
    genero: 'Guerra / Ação',
    sinopse: 'Após o desembarque na Normandia, um pelotão tenta encontrar um soldado cujos três irmãos foram mortos em combate.',
    resenha: 'Os primeiros 20 minutos de invasão na praia mostram a guerra crua e brutal como nunca havia sido feito antes.'
  },
  {
    id: '63',
    titulo: 'Dragon Ball Z',
    imagem: 'https://www.themoviedb.org/t/p/w1280/kbkuYkaFsDwL6cyMgnBf77LczEo.jpg',
    genero: 'Artes Marciais / Shounen (Anime)',
    sinopse: 'Goku e seus amigos defendem a Terra de uma variedade de vilões variando de lutadores espaciais a monstros mágicos.',
    resenha: 'O pai dos animes modernos de luta. Fez o mundo inteiro levantar os braços para emprestar energia à Genki Dama.'
  },
  {
    id: '64',
    titulo: 'O Castelo Animado',
    imagem: 'https://www.themoviedb.org/t/p/w1280/1hTfaEWktMJPxCk5nZNtK7F86C9.jpg',
    genero: 'Fantasia / Aventura (Anime)',
    sinopse: 'Amaldiçoada com o corpo de uma velha, uma jovem busca ajuda de um bruxo vaidoso que viaja em um castelo andante.',
    resenha: 'Miyazaki usa fantasia estonteante para criar um romance poderoso e uma bela mensagem pacifista.'
  }
];

function Geral () {
    const theme = useTheme(); 
    const navigation = useNavigation();

    const Cabecalho = () => (
      <View style={styles.hero}>
        <Text style={[styles.heroSubtitle, { color: theme.colors.onBackground }]}>
            Filmes, Séries e Animes 
        </Text>
        <Text style={[styles.sectionTitle, { color: theme.colors.onBackground }]}>
        Tudo Aqui!
        </Text>
      </View>
    );

    const renderizarCard = ({ item }) => (
      <TouchableOpacity 
        style={[styles.div, { backgroundColor: theme.colors.surfaceVariant }]} 
        onPress={() => navigation.navigate('Details', {FILMES: item})}
      >
        <Card style={[styles.card, { backgroundColor: 'transparent' }]} mode="elevated">
          <Card.Cover source={{ uri: item.imagem }} style={styles.cover} />
          <Card.Content style={styles.content}>
            
            <Text variant="titleMedium" numberOfLines={1} style={[styles.titulo, { color: theme.colors.onSurface }]}>
              {item.titulo}
            </Text>
            
            <Text variant="labelSmall" numberOfLines={1} style={[styles.genero, { color: theme.colors.onSurfaceVariant }]}>
              {item.genero}
            </Text>
            
            <Text variant="bodySmall" numberOfLines={3} style={[styles.texto, { color: theme.colors.onSurface }]}>
              {item.sinopse}
            </Text>
          </Card.Content>
        </Card>
      </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <FlatList
        data={FILMES}
        keyExtractor={(item) => item.id}
        renderItem={renderizarCard}
        numColumns={2} 
        columnWrapperStyle={styles.linha} 
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={Cabecalho}
      />
    </View>
  );
}

export default Geral;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContainer: {
    padding: 16,
    paddingBottom: 50,
  },
  hero: {
    marginBottom: 25,
    paddingTop: 10,
  },
  heroSubtitle: {
    fontSize: 16,
    lineHeight: 24,
    marginTop: 12,
    fontFamily: 'Inter_500Medium',
  },
  sectionTitle: {
    fontSize: 24,
    marginBottom: 8,
    fontFamily: 'Montserrat_700Bold',
  },
  linha: {
    justifyContent: 'space-between',
  },
  card: {
    elevation: 0,
  },
  div: {
    flex: 1,
    maxWidth: '47%',
    marginBottom: 14,
    borderRadius: 14,
    overflow: 'hidden',
  },
  cover: {
    height: 250,
  },
  content: {
    padding: 12,
  },
  titulo: {
    fontSize: 15,
    fontFamily: 'Montserrat_700Bold',
    marginBottom: 4,
  },
  genero: {
    fontSize: 12,
    marginBottom: 8,
    fontFamily: 'Inter_500Medium',
  },
  texto: {
    fontSize: 12,
    lineHeight: 18,
    fontFamily: 'Inter_500Medium',
  }
});