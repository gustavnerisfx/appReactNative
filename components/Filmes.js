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
    titulo: 'Matrix',
    imagem: 'https://www.themoviedb.org/t/p/w1280/lDqMDI3xpbB9UQRyeXfei0MXhqb.jpg',
    genero: 'Ficção Científica / Ação',
    sinopse: 'Um hacker descobre que o mundo real é uma simulação criada por máquinas superinteligentes.',
    resenha: 'Revolucionário visualmente e filosoficamente. Redefiniu os efeitos especiais e a cultura pop.'
  },
  {
    id: '7',
    titulo: 'Parasita',
    imagem: 'https://www.themoviedb.org/t/p/w1280/igw938inb6Fy0YVcwIyxQ7Lu5FO.jpg',
    genero: 'Suspense / Drama',
    sinopse: 'Uma família sul-coreana pobre cria um plano para se infiltrar na vida de uma família rica.',
    resenha: 'Um thriller brilhante e imprevisível com humor negro e uma crítica mordaz à desigualdade.'
  },
  {
    id: '8',
    titulo: 'O Senhor dos Anéis: A Sociedade do Anel',
    imagem: 'https://www.themoviedb.org/t/p/w1280/tlvsNCwWEIgwAM23aNzTmMIcPEZ.jpg',
    genero: 'Fantasia / Aventura',
    sinopse: 'Um hobbit deve liderar um grupo em uma jornada épica para destruir um anel de imenso poder maligno.',
    resenha: 'A fundação do cinema de fantasia moderno com escala e paixão insuperáveis.'
  },
  {
    id: '9',
    titulo: 'O Poderoso Chefão',
    imagem: 'https://www.themoviedb.org/t/p/w1280/u8LAG1JI57U9p0s8TyEEeoykR5d.jpg',
    genero: 'Crime / Drama',
    sinopse: 'O patriarca de uma dinastia do crime organizado transfere o controle de seu império clandestino para seu filho relutante.',
    resenha: 'Considerado um dos maiores filmes de todos os tempos, é uma aula de cinema, roteiro e atuação.'
  },
  {
    id: '10',
    titulo: 'A Origem',
    imagem: 'https://www.themoviedb.org/t/p/w1280/9e3Dz7aCANy5aRUQF745IlNloJ1.jpg',
    genero: 'Ficção Científica / Ação',
    sinopse: 'Um ladrão que rouba segredos corporativos através do uso da tecnologia de compartilhamento de sonhos recebe a tarefa de plantar uma ideia na mente de um CEO.',
    resenha: 'Christopher Nolan entrega um quebra-cabeça visualmente espetacular que prende a atenção até o último pião girar.'
  },
  {
    id: '11',
    titulo: 'Clube da Luta',
    imagem: 'https://www.themoviedb.org/t/p/w1280/mCICnh7QBH0gzYaTQChBDDVIKdm.jpg',
    genero: 'Drama / Suspense',
    sinopse: 'Um trabalhador de escritório insone e um fabricante de sabonetes formam um clube de luta clandestino que evolui para algo muito maior.',
    resenha: 'Subversivo, sujo e provocador. Uma crítica ácida ao consumismo e à masculinidade moderna.'
  },
  {
    id: '12',
    titulo: 'Batman: O Cavaleiro das Trevas',
    imagem: 'https://www.themoviedb.org/t/p/w1280/4lj1ikfsSmMZNyfdi8R8Tv5tsgb.jpg',
    genero: 'Ação / Crime',
    sinopse: 'Quando a ameaça conhecida como Coringa causa estragos e caos na cidade de Gotham, Batman deve aceitar um dos maiores testes psicológicos de sua vida.',
    resenha: 'Elevou o gênero de super-heróis a um thriller policial tenso, liderado pela atuação lendária de Heath Ledger.'
  },
  {
    id: '13',
    titulo: 'Interestelar',
    imagem: 'https://media.themoviedb.org/t/p/w600_and_h900_face/6ricSDD83BClJsFdGB6x7cM0MFQ.jpg',
    genero: 'Ficção Científica / Drama',
    sinopse: 'Uma equipe de exploradores viaja através de um buraco de minhoca no espaço na tentativa de garantir a sobrevivência da humanidade.',
    resenha: 'Um épico visual e emocional que explora o amor como uma força quantificável através do tempo e do espaço.'
  },
  {
    id: '14',
    titulo: 'Cidade de Deus',
    imagem: 'https://www.themoviedb.org/t/p/w1280/gfnXixcGC060QcG6JPxN6AMdVsq.jpg',
    genero: 'Crime / Drama',
    sinopse: 'Nas favelas do Rio de Janeiro, os caminhos de dois jovens divergem quando um se torna fotógrafo e o outro um chefe do tráfico.',
    resenha: 'A maior obra-prima do cinema nacional. Cru, cinético e narrado com uma energia impossível de ignorar.'
  },
  {
    id: '15',
    titulo: 'De Volta para o Futuro',
    imagem: 'https://www.themoviedb.org/t/p/w1280/i996T0lI1fGtFEowiH3V6eZthL0.jpg',
    genero: 'Aventura / Comédia',
    sinopse: 'Um adolescente é enviado acidentalmente 30 anos no passado em um DeLorean e precisa garantir que seus pais se apaixonem.',
    resenha: 'O roteiro perfeito. Divertido, criativo e que não envelheceu um dia sequer desde seu lançamento.'
  },
  {
    id: '16',
    titulo: 'Jurassic Park',
    imagem: 'https://www.themoviedb.org/t/p/w1280/K74aFVViCJvoJjLOfHCdCjLreF.jpg',
    genero: 'Aventura / Ficção Científica',
    sinopse: 'Um parque temático com dinossauros clonados sofre uma grande falha de energia, e as feras escapam.',
    resenha: 'Magia cinematográfica em estado puro. A primeira vez que vimos o T-Rex é uma memória imortal do cinema.'
  },
  {
    id: '17',
    titulo: 'O Iluminado',
    imagem: 'https://www.themoviedb.org/t/p/w1280/47BdQqDWnj3VIzpH9bd2agho2PN.jpg',
    genero: 'Terror / Suspense',
    sinopse: 'Uma família isola-se em um hotel no inverno, onde uma presença maligna leva o pai à violência, enquanto o filho tem visões.',
    resenha: 'Kubrick cria uma atmosfera opressiva inigualável, tornando o próprio hotel o maior vilão da trama.'
  },
  {
    id: '18',
    titulo: 'A Viagem de Chihiro',
    imagem: 'https://www.themoviedb.org/t/p/w1280/ivHwYw3b03dFqRkcqaDSxjj2LQT.jpg',
    genero: 'Animação / Fantasia',
    sinopse: 'Uma garota de 10 anos adentra um mundo governado por deuses, bruxas e espíritos, onde humanos são transformados em bestas.',
    resenha: 'A genialidade do Studio Ghibli. Um conto de amadurecimento lindo e visualmente espetacular.'
  },
  {
    id: '19',
    titulo: 'Gladiador',
    imagem: 'https://www.themoviedb.org/t/p/w1280/4DUClyGA6OqjXv6yC0Imf6THGfp.jpg',
    genero: 'Ação / Épico',
    sinopse: 'Um ex-general romano busca vingança contra o imperador corrupto que assassinou sua família e o enviou à escravidão.',
    resenha: 'Uma epopeia sobre vingança e honra, impulsionada pela carismática atuação de Russell Crowe e a trilha de Hans Zimmer.'
  },
  {
    id: '20',
    titulo: 'Se7en: Os Sete Crimes Capitais',
    imagem: 'https://www.themoviedb.org/t/p/w1280/dZXYPSEaXCeigR2GEuZoukNmLTf.jpg',
    genero: 'Policial / Suspense',
    sinopse: 'Dois detetives caçam um serial killer que usa os sete pecados capitais como motivos para seus assassinatos.',
    resenha: 'Obscuro, niilista e com um dos finais mais chocantes já concebidos pelo cinema moderno.'
  },
  {
    id: '21',
    titulo: 'Forrest Gump: O Contador de Histórias',
    imagem: 'https://www.themoviedb.org/t/p/w1280/d74WpIsH8379TIL4wUxDneRCYv2.jpg',
    genero: 'Drama / Romance',
    sinopse: 'As presidências de Kennedy e Johnson, a Guerra do Vietnã e Watergate desdobram-se através da perspectiva de um homem com QI baixo.',
    resenha: 'Um filme que é impossível não amar, cheio de lições de vida e momentos emocionantes do começo ao fim.'
  },
  {
    id: '22',
    titulo: 'O Silêncio dos Inocentes',
    imagem: 'https://www.themoviedb.org/t/p/w1280/9IflTrxN8yw44ZxhfvJPziGzGHM.jpg',
    genero: 'Suspense / Crime',
    sinopse: 'Uma cadete do FBI busca a ajuda de um assassino canibal preso para capturar outro serial killer.',
    resenha: 'A química perturbadora entre Jodie Foster e Anthony Hopkins faz deste um thriller psicológico impecável.'
  },
  {
    id: '23',
    titulo: 'Os Infiltrados',
    imagem: 'https://www.themoviedb.org/t/p/w1280/qtnAwzDapzOML4Q9p7lv2bk5gvz.jpg',
    genero: 'Crime / Thriller',
    sinopse: 'Um policial disfarçado e um espião na polícia tentam identificar um ao outro enquanto se infiltram em uma gangue irlandesa.',
    resenha: 'Scorsese em sua melhor forma. Tensão constante e reviravoltas chocantes com um elenco estelar.'
  },
  {
    id: '24',
    titulo: 'Homem-Aranha no Aranhaverso',
    imagem: 'https://www.themoviedb.org/t/p/w1280/gte2cJ3mtc2I8hZyXwRTzyclKuC.jpg',
    genero: 'Animação / Super-Herói',
    sinopse: 'Miles Morales se torna o Homem-Aranha do seu universo e deve unir forças com outros Homens-Aranha de várias dimensões.',
    resenha: 'Visualmente inovador e com mais emoção em cada frame do que a maioria dos filmes live-action do gênero.'
  },
  {
    id: '25',
    titulo: 'O Exterminador do Futuro 2: O Julgamento Final',
    imagem: 'https://www.themoviedb.org/t/p/w1280/eTIY2LO5cDclxgKtCHuvIKdF3c3.jpg',
    genero: 'Ação / Ficção Científica',
    sinopse: 'Um ciborgue idêntico ao que falhou em matar Sarah Connor deve agora proteger seu filho de um ciborgue mais avançado.',
    resenha: 'A rara sequência que supera o original. Ação ininterrupta, efeitos práticos lendários e coração.'
  },
  {
    id: '26',
    titulo: 'Mad Max: Estrada da Fúria',
    imagem: 'https://www.themoviedb.org/t/p/w1280/tH64gzAHDFg7EFcgfkkZyHdGM5P.jpg',
    genero: 'Ação / Pós-Apocalíptico',
    sinopse: 'Em um deserto onde a água e o combustível são escassos, uma mulher se rebela contra um governante tirânico.',
    resenha: 'Um balé de destruição veicular. É essencialmente uma longa e alucinante perseguição de carro sem fôlego.'
  },
  {
    id: '27',
    titulo: 'Vingadores: Guerra Infinita',
    imagem: 'https://www.themoviedb.org/t/p/w1280/A4kvp7vY1BDLrrQIagRCffLKj1t.jpg',
    genero: 'Super-Herói / Ação',
    sinopse: 'Os Vingadores se reúnem para enfrentar o poderoso Thanos antes que ele reúna as Joias do Infinito.',
    resenha: 'Um evento cinematográfico sem precedentes onde, surpreendentemente, o vilão é o verdadeiro protagonista.'
  },
  {
    id: '28',
    titulo: 'Blade Runner',
    imagem: 'https://www.themoviedb.org/t/p/w1280/49pANIZXRAdHUiWjjBv4vxPeqRC.jpg',
    genero: 'Ficção Científica / Neo-Noir',
    sinopse: 'Um policial exausto deve caçar quatro humanos sintéticos fugitivos e assassiná-los na Los Angeles de 2019.',
    resenha: 'Um visual cyberpunk que ditou as regras da ficção científica nas décadas seguintes.'
  },
  {
    id: '29',
    titulo: 'O Grande Truque',
    imagem: 'https://www.themoviedb.org/t/p/w1280/4AUW2bGbQjWACUREckGJWXmyF0d.jpg',
    genero: 'Mistério / Drama',
    sinopse: 'Dois mágicos rivais se envolvem em uma batalha amarga para criar a ilusão de palco definitiva no século XIX.',
    resenha: 'Como o próprio título sugere, o filme é um grande truque de mágica que ousa te desafiar a encontrar o segredo.'
  },
  {
    id: '30',
    titulo: 'Meu Amigo Totoro',
    imagem: 'https://www.themoviedb.org/t/p/w1280/23KKTxDg6rxZVc66bloQQdPSr29.jpg',
    genero: 'Animação / Família',
    sinopse: 'Duas meninas se mudam para o campo e descobrem criaturas da floresta místicas lideradas pelo amável Totoro.',
    resenha: 'A pura essência da infância inocente e curiosa retratada pelas mãos do mestre Hayao Miyazaki.'
  },
  {
    id: '31',
    titulo: 'O Resgate do Soldado Ryan',
    imagem: 'https://www.themoviedb.org/t/p/w1280/hMLxNLCXRDd62acfCBn6mIyW1HU.jpg',
    genero: 'Guerra / Ação',
    sinopse: 'Após o desembarque na Normandia, um pelotão tenta encontrar um soldado cujos três irmãos foram mortos em combate.',
    resenha: 'Os primeiros 20 minutos de invasão na praia mostram a guerra crua e brutal como nunca havia sido feito antes.'
  }
];

function Filmes () {
    const theme = useTheme();
    const navigation = useNavigation();

    const Cabecalho = () => (
      <View style={styles.hero}>
        <Text style={[styles.sectionTitle, { color: theme.colors.onBackground }]}>Apenas Filmes</Text>
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

export default Filmes;

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
  },
});