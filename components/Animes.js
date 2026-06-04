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
    titulo: 'Fullmetal Alchemist: Brotherhood',
    imagem: 'https://www.themoviedb.org/t/p/w1280/5ZFUEOULaVml7pQuXxhpR2SmVUw.jpg',
    genero: 'Ação / Fantasia (Anime)',
    sinopse: 'Dois irmãos usam alquimia proibida para ressuscitar a mãe e pagam um preço terrível.',
    resenha: 'Uma narrativa perfeita que equilibra política, filosofia, ação e emoção. Obrigatório.'
  },
  {
    id: '2',
    titulo: 'Attack on Titan',
    imagem: 'https://www.themoviedb.org/t/p/w1280/8aMqmB5xSblsZc7bLMEhE28yHa2.jpg',
    genero: 'Ação / Fantasia (Anime)',
    sinopse: 'A humanidade vive enclausurada em muralhas para se proteger de gigantes devoradores de humanos.',
    resenha: 'Uma montanha-russa de reviravoltas sobre os horrores da guerra e a moralidade cinzenta.'
  },
  {
    id: '3',
    titulo: 'Cowboy Bebop',
    imagem: 'https://www.themoviedb.org/t/p/w1280/xDiXDfZwC6XYC6fxHI1jl3A3Ill.jpg',
    genero: 'Ficção Científica (Anime)',
    sinopse: 'Caçadores de recompensas viajam pelo sistema solar na espaçonave Bebop lidando com seus passados trágicos.',
    resenha: 'Estiloso, melancólico e com uma trilha de jazz impecável. Obra de arte madura.'
  },
  {
    id: '4',
    titulo: 'Death Note',
    imagem: 'https://www.themoviedb.org/t/p/w1280/tCZFfYTIwrR7n94J6G14Y4hAFU6.jpg',
    genero: 'Suspense / Sobrenatural (Anime)',
    sinopse: 'Um estudante brilhante descobre um caderno que permite matar qualquer pessoa cujo nome seja escrito nele.',
    resenha: 'Um jogo de xadrez mental entre dois gênios que te faz questionar os limites da justiça e da moralidade.'
  },
  {
    id: '5',
    titulo: 'Neon Genesis Evangelion',
    imagem: 'https://www.themoviedb.org/t/p/w1280/j6G24dqI4WgUtChhWjfnI4lnmiK.jpg',
    genero: 'Mecha / Psicológico (Anime)',
    sinopse: 'Adolescentes pilotam robôs gigantes para lutar contra seres alienígenas chamados "Anjos", enquanto lidam com traumas severos.',
    resenha: 'Esqueça as lutas de robô; é um mergulho profundo na depressão humana e na filosofia existencial.'
  },
  {
    id: '6',
    titulo: 'Hunter x Hunter',
    imagem: 'https://www.themoviedb.org/t/p/w1280/i2EEr2uBvRlAwJ8d8zTG2Y19mIa.jpg',
    genero: 'Aventura / Ação (Anime)',
    sinopse: 'O jovem Gon parte em uma jornada para se tornar um "Hunter", na esperança de encontrar seu pai.',
    resenha: 'O que parece um desenho infantil fofo se transforma em uma das obras mais táticas e adultas dos animes.'
  },
  {
    id: '7',
    titulo: 'One Piece',
    imagem: 'https://www.themoviedb.org/t/p/w1280/9ltisibeD4gzqjM1AzmQwCdyirQ.jpg',
    genero: 'Aventura / Comédia (Anime)',
    sinopse: 'Monkey D. Luffy e sua tripulação pirata exploram um mundo de oceanos fantásticos em busca do tesouro supremo.',
    resenha: 'Apesar do tamanho colossal, a construção de mundo do criador Eiichiro Oda é a melhor de toda a ficção japonesa.'
  },
  {
    id: '8',
    titulo: 'Jujutsu Kaisen',
    imagem: 'https://www.themoviedb.org/t/p/w1280/8R1mMSC1gX1cg5ed7ns49JOEqw3.jpg',
    genero: 'Ação / Sobrenatural (Anime)',
    sinopse: 'Um jovem engole um dedo amaldiçoado e junta-se a uma escola de feiticeiros para combater Maldições.',
    resenha: 'Ação frenética, animação de cair o queixo e um elenco carismático fazem dele o melhor shounen atual.'
  },
  {
    id: '9',
    titulo: 'Naruto',
    imagem: 'https://www.themoviedb.org/t/p/w1280/9ptbVZpKNy5NY9D4zq4KGiYWRQY.jpg',
    genero: 'Ação / Aventura (Anime)',
    sinopse: 'Um jovem ninja rejeitado por sua vila sonha em se tornar o líder da aldeia para conseguir aprovação.',
    resenha: 'Apesar de longo, é uma história profunda sobre superação, ciclo de ódio e empatia que marcou uma geração.'
  },
  {
    id: '10',
    titulo: 'Steins;Gate',
    imagem: 'https://www.themoviedb.org/t/p/w1280/96R4bV7dB8ramaWceNKsxvJgCUd.jpg',
    genero: 'Ficção Científica / Thriller (Anime)',
    sinopse: 'Um autoproclamado cientista louco descobre uma forma de enviar mensagens de texto para o passado.',
    resenha: 'A melhor história sobre viagem no tempo já feita nos animes, indo da comédia ao desespero puro rapidamente.'
  },
  {
    id: '11',
    titulo: 'Your Name (Kimi no Na wa)',
    imagem: 'https://www.themoviedb.org/t/p/w1280/eIm2nKC0125GyEPSWl6ODCA9J1S.jpg',
    genero: 'Romance / Fantasia (Anime)',
    sinopse: 'Dois adolescentes do Japão, uma do campo e outro de Tóquio, começam a trocar de corpo magicamente.',
    resenha: 'Não é apenas visualmente deslumbrante, é uma montanha-russa emocional que parte e cola seu coração.'
  },
  {
    id: '12',
    titulo: 'Akira',
    imagem: 'https://www.themoviedb.org/t/p/w1280/tbwwTQ3EqSdotbQ3ZcIl6vKBv7q.jpg',
    genero: 'Cyberpunk / Ação (Anime)',
    sinopse: 'Em Neo-Tóquio, um jovem integrante de uma gangue de motoqueiros ganha poderes telecinéticos após um acidente.',
    resenha: 'O anime que apresentou a animação japonesa ao ocidente. Um marco visual estonteante até hoje.'
  },
  {
    id: '13',
    titulo: 'Demon Slayer (Kimetsu no Yaiba)',
    imagem: 'https://www.themoviedb.org/t/p/w1280/xUfRZu2mi8jH6SzQEJGP6tjBuYj.jpg',
    genero: 'Ação / Fantasia (Anime)',
    sinopse: 'Um menino bondoso se torna matador de demônios para curar sua irmã que foi transformada em um.',
    resenha: 'Pode ter uma história clássica, mas a qualidade de animação e as coreografias de lutas beiram a perfeição.'
  },
  {
    id: '14',
    titulo: 'Ghost in the Shell (O Fantasma do Futuro)',
    imagem: 'https://www.themoviedb.org/t/p/w1280/4YgDy47HKxcSwUPQWrg0J39lEZA.jpg',
    genero: 'Cyberpunk / Filosófico (Anime)',
    sinopse: 'Uma ciborgue policial lidera uma força tarefa na caçada de um perigoso e misterioso hacker, o Mestre dos Fantoches.',
    resenha: 'A base inspiracional de "Matrix". Um mergulho filosófico melancólico sobre o que nos torna essencialmente humanos.'
  },
  {
    id: '15',
    titulo: 'Dragon Ball Z',
    imagem: 'https://www.themoviedb.org/t/p/w1280/kbkuYkaFsDwL6cyMgnBf77LczEo.jpg',
    genero: 'Artes Marciais / Shounen (Anime)',
    sinopse: 'Goku e seus amigos defendem a Terra de uma variedade de vilões variando de lutadores espaciais a monstros mágicos.',
    resenha: 'O pai dos animes modernos de luta. Fez o mundo inteiro levantar os braços para emprestar energia à Genki Dama.'
  },
  {
    id: '16',
    titulo: 'O Castelo Animado',
    imagem: 'https://www.themoviedb.org/t/p/w1280/1hTfaEWktMJPxCk5nZNtK7F86C9.jpg',
    genero: 'Fantasia / Aventura (Anime)',
    sinopse: 'Amaldiçoada com o corpo de uma velha, uma jovem busca ajuda de um bruxo vaidoso que viaja em um castelo andante.',
    resenha: 'Miyazaki usa fantasia estonteante para criar um romance poderoso e uma bela mensagem pacifista.'
  }
];

function Filmes () {
    const theme = useTheme();
    const navigation = useNavigation();

    const Cabecalho = () => (
      <View style={styles.hero}>
        <Text style={[styles.sectionTitle, { color: theme.colors.onBackground }]}>Apenas Animes</Text>
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