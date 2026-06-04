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
    id: '15',
    titulo: 'O Poderoso Chefão',
    imagem: 'https://www.themoviedb.org/t/p/w1280/u8LAG1JI57U9p0s8TyEEeoykR5d.jpg',
    genero: 'Crime / Drama',
    sinopse: 'O patriarca de uma dinastia do crime organizado transfere o controle de seu império clandestino para seu filho relutante.',
    resenha: 'Considerado um dos maiores filmes de todos os tempos, é uma aula de cinema, roteiro e atuação.'
  },
  {
    id: '5',
    titulo: 'Pulp Fiction: Tempo de Violência',
    imagem: 'https://www.themoviedb.org/t/p/w1280/tptjnB2LDbuUWya9Cx5sQtv5hqb.jpg',
    genero: 'Crime / Drama',
    sinopse: 'A narrativa não linear acompanha as vidas interligadas de dois assassinos da máfia, a esposa de um gângster, um boxeador desesperado e um casal de assaltantes de lanchonete, tecendo uma teia de violência e humor ácido.',
    resenha: 'O divisor de águas do cinema dos anos 90. Quentin Tarantino cria um estilo único com diálogos mundanos e brilhantes que explodem subitamente em ação frenética. É autêntico, estilizado e exala carisma em cada segundo de tela.'
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
    id: '6',
    titulo: 'Breaking Bad',
    imagem: 'https://www.themoviedb.org/t/p/w1280/hGwm9Cj3CdbJIqQWNExQqiYmCd4.jpg',
    genero: 'Drama / Suspense (Série)',
    sinopse: 'Um professor de química com câncer terminal junta-se a um ex-aluno para fabricar metanfetamina.',
    resenha: 'A transformação de Walter White é um estudo de personagem magistral e de tirar o fôlego.'
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
    id: '9',
    titulo: 'The Office (US)',
    imagem: 'https://www.themoviedb.org/t/p/w1280/e7BoS8uUnew9ioS6reqtK9matqy.jpg',
    genero: 'Comédia (Série)',
    sinopse: 'O dia a dia bizarro e hilário dos funcionários de uma filial de empresa de papel liderada por Michael Scott.',
    resenha: 'A série "conforto" definitiva. Humor constrangedor que logo dá espaço a um carinho genuíno.'
  },
];

function Home () {
    const theme = useTheme();
    const navigation = useNavigation();

    const [fontsLoaded] = useFonts({
      Montserrat_700Bold,
      Montserrat_800ExtraBold,
      Inter_500Medium,
      Inter_600SemiBold,
    });

    if (!fontsLoaded) {
      return null;
    }

    const Cabecalho = () => (
      <View style={styles.hero}>

        <Text style={styles.heroTag}>
          🎬 RESENHAFLIX
        </Text>

        <Text style={[styles.heroTitle, { color: theme.colors.onBackground }]}>
          Descubra seu próximo filme favorito.
        </Text>

        <Text style={[styles.heroSubtitle, { color: theme.colors.onSurfaceVariant }]}>
          Resenhas, avaliações e recomendações para quem ama cinema.
        </Text>

        <View style={[styles.statsContainer, { backgroundColor: theme.colors.surfaceVariant }]}>
          <View style={styles.stat}>
            <Text style={[styles.statNumber, { color: theme.colors.onSurface }]}>500+</Text>
            <Text style={[styles.statLabel, { color: theme.colors.onSurfaceVariant }]}>Resenhas</Text>
          </View>

          <View style={styles.stat}>
            <Text style={[styles.statNumber, { color: theme.colors.onSurface }]}>120+</Text>
            <Text style={[styles.statLabel, { color: theme.colors.onSurfaceVariant }]}>Filmes</Text>
          </View>

          <View style={styles.stat}>
            <Text style={[styles.statNumber, { color: theme.colors.onSurface }]}>40+</Text>
            <Text style={[styles.statLabel, { color: theme.colors.onSurfaceVariant }]}>Séries</Text>
          </View>
        </View>

        <Text style={[styles.sectionTitle, { color: theme.colors.onBackground }]}>
          Em Alta Agora
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

export default Home;

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
  heroTag: {
    color: '#E50914',
    fontFamily: 'Inter_600SemiBold',
    letterSpacing: 2,
    fontSize: 12,
    marginBottom: 12,
  },
  heroTitle: {
    fontSize: 36,
    lineHeight: 42,
    fontFamily: 'Montserrat_800ExtraBold',
  },
  heroSubtitle: {
    fontSize: 16,
    lineHeight: 24,
    marginTop: 12,
    fontFamily: 'Inter_500Medium',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 25,
    marginBottom: 30,
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderRadius: 12,
  },
  stat: {
    alignItems: 'center',
    flex: 1,
  },
  statNumber: {
    fontSize: 22,
    fontFamily: 'Montserrat_800ExtraBold',
  },
  statLabel: {
    fontSize: 12,
    marginTop: 4,
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