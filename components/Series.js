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
    titulo: 'Breaking Bad',
    imagem: 'https://www.themoviedb.org/t/p/w1280/hGwm9Cj3CdbJIqQWNExQqiYmCd4.jpg',
    genero: 'Drama / Suspense (Série)',
    sinopse: 'Um professor de química com câncer terminal junta-se a um ex-aluno para fabricar metanfetamina.',
    resenha: 'A transformação de Walter White é um estudo de personagem magistral e de tirar o fôlego.'
  },
  {
    id: '2',
    titulo: 'The Office (US)',
    imagem: 'https://www.themoviedb.org/t/p/w1280/e7BoS8uUnew9ioS6reqtK9matqy.jpg',
    genero: 'Comédia (Série)',
    sinopse: 'O dia a dia bizarro e hilário dos funcionários de uma filial de empresa de papel liderada por Michael Scott.',
    resenha: 'A série "conforto" definitiva. Humor constrangedor que logo dá espaço a um carinho genuíno.'
  },
  {
    id: '3',
    titulo: 'Stranger Things',
    imagem: 'https://www.themoviedb.org/t/p/w1280/twfKp60THrcOIep9sjHODOOfO8d.jpg',
    genero: 'Ficção Científica / Terror (Série)',
    sinopse: 'Crianças embarcam em uma busca por um amigo desaparecido, envolvendo monstros e experimentos governamentais.',
    resenha: 'Uma carta de amor à cultura pop dos anos 80, combinando aventura e suspense perfeitamente.'
  },
  {
    id: '4',
    titulo: 'Game of Thrones',
    imagem: 'https://www.themoviedb.org/t/p/w1280/eDn8XWA0a4U3zOhd1gh7HExdt4Y.jpg',
    genero: 'Fantasia / Drama (Série)',
    sinopse: 'Nove famílias nobres lutam pelo controle de Westeros, enquanto um inimigo antigo retorna após milênios.',
    resenha: 'Apesar do final controverso, entregou algumas das melhores batalhas e reviravoltas políticas da história da TV.'
  },
  {
    id: '5',
    titulo: 'The Boys',
    imagem: 'https://www.themoviedb.org/t/p/w1280/in1R2dDc421JxsoRWaIIAqVI2KE.jpg',
    genero: 'Ação / Sátira (Série)',
    sinopse: 'Um grupo de vigilantes propõe derrubar super-heróis corruptos que abusam de seus poderes.',
    resenha: 'Violenta, ácida e hilária. A melhor desconstrução moderna sobre como super-heróis reais seriam terríveis.'
  },
  {
    id: '6',
    titulo: 'Dark',
    imagem: 'https://www.themoviedb.org/t/p/w1280/1DLjjvSWMYo17B7wuz6YikB96hH.jpg',
    genero: 'Ficção Científica / Mistério (Série)',
    sinopse: 'O desaparecimento de duas crianças revela os laços entre quatro famílias e um complexo enigma de viagem no tempo.',
    resenha: 'Você precisará de um caderno de anotações, mas o roteiro amarra todos os nós paradoxais de forma magistral.'
  },
  {
    id: '7',
    titulo: 'Chernobyl',
    imagem: 'https://www.themoviedb.org/t/p/w1280/bnB2EkaY6HEdzwVkkH7dBHy6HmZ.jpg',
    genero: 'Drama / Histórico (Série)',
    sinopse: 'A dramatização do desastre da usina nuclear de 1986 e os sacrifícios feitos para salvar a Europa.',
    resenha: 'Aterrorizante porque é real. Um alerta sobre o custo das mentiras e a burocracia estatal.'
  },
  {
    id: '8',
    titulo: 'Succession',
    imagem: 'https://www.themoviedb.org/t/p/w1280/z0XiwdrCQ9yVIr4O0pxzaAYRxdW.jpg',
    genero: 'Drama (Série)',
    sinopse: 'A família Roy é conhecida por controlar a maior empresa de mídia do mundo. As coisas mudam quando o pai renuncia.',
    resenha: 'Diálogos cortantes como navalhas e atuações formidáveis. A melhor série sobre pessoas terríveis no poder.'
  },
  {
    id: '9',
    titulo: 'Peaky Blinders',
    imagem: 'https://www.themoviedb.org/t/p/w1280/i0uajcHH9yogXMfDHpOXexIukG9.jpg',
    genero: 'Crime / Drama Histórico (Série)',
    sinopse: 'Um épico de gangues focado na família Shelby na Inglaterra logo após a Primeira Guerra Mundial.',
    resenha: 'Tommy Shelby é um dos protagonistas mais frios da TV, tudo embalado por uma estética formidável e trilha rock.'
  },
  {
    id: '10',
    titulo: 'The Sopranos',
    imagem: 'https://www.themoviedb.org/t/p/w1280/xmn4PfUivHztFdJBMtijhLU4KTD.jpg',
    genero: 'Crime / Drama (Série)',
    sinopse: 'O chefe da máfia de Nova Jersey, Tony Soprano, lida com problemas pessoais e profissionais enquanto faz terapia.',
    resenha: 'A série que deu início à era de ouro da TV. Complexa, engraçada e brutalmente honesta.'
  },
  {
    id: '11',
    titulo: 'Black Mirror',
    imagem: 'https://www.themoviedb.org/t/p/w1280/aCTL24B8ZuiI2osMwoUI5rqBXoF.jpg',
    genero: 'Ficção Científica / Thriller (Série)',
    sinopse: 'Série antológica que explora um multiverso distópico onde as inovações tecnológicas colidem com instintos obscuros.',
    resenha: 'Perturbadora e visionária, fazendo você olhar para o seu próprio celular com desconfiança a cada fim de episódio.'
  },
  {
    id: '12',
    titulo: 'Fleabag',
    imagem: 'https://www.themoviedb.org/t/p/w1280/27vEYsRKa3eAniwmoccOoluEXQ1.jpg',
    genero: 'Comédia / Drama (Série)',
    sinopse: 'Uma jovem de espírito livre e irritada tenta se adaptar à vida em Londres enquanto lida com uma tragédia recente.',
    resenha: 'Uma quebra da quarta parede brilhante, absurdamente engraçada e com um peso dramático inesperado.'
  },
  {
    id: '13',
    titulo: 'True Detective (1ª Temporada)',
    imagem: 'https://www.themoviedb.org/t/p/w1280/1fxr55V72a2gtqyn2b8pf6FslOf.jpg',
    genero: 'Crime / Mistério (Série)',
    sinopse: 'Dois detetives da Louisiana são entrevistados sobre um caso de assassinato macabro ocorrido há 17 anos.',
    resenha: 'A primeira temporada é irretocável. Filosofia pesada e um tom sufocante dominam cada cena.'
  },
  {
    id: '14',
    titulo: 'Better Call Saul',
    imagem: 'https://www.themoviedb.org/t/p/w1280/tFCPd8nOqrxjKpTs0ZAdPRydQFR.jpg',
    genero: 'Drama / Crime (Série)',
    sinopse: 'Acompanhe a transformação do outrora honesto advogado Jimmy McGill em Saul Goodman.',
    resenha: 'O raro spin-off que empata (e para muitos, supera) a série original. A tragédia em câmera lenta perfeita.'
  },
  {
    id: '15',
    titulo: 'Friends',
    imagem: 'https://www.themoviedb.org/t/p/w1280/oY3ck2Sdu8qsEWFnuiX2HEfr65k.jpg',
    genero: 'Comédia (Série)',
    sinopse: 'Acompanha a vida pessoal e profissional de seis amigos vivendo na cidade de Nova York nos anos 90.',
    resenha: 'A sitcom definitiva de uma geração, imortalizou frases e situações que são copiadas até hoje.'
  },
  {
    id: '16',
    titulo: 'The Wire',
    imagem: 'https://www.themoviedb.org/t/p/w1280/iLmoND7FpDKFwucLjS7lkM4ZX1p.jpg',
    genero: 'Crime / Drama (Série)',
    sinopse: 'As ruas de Baltimore são retratadas tanto pelos olhos dos criminosos e traficantes quanto pelas forças da lei.',
    resenha: 'Muito mais que um programa policial, é um romance televisivo em sua forma mais ambiciosa e realista.'
  },
  {
    id: '17',
    titulo: 'Seinfeld',
    imagem: 'https://www.themoviedb.org/t/p/w1280/aCw8ONfyz3AhngVQa1E2Ss4KSUQ.jpg',
    genero: 'Comédia (Série)',
    sinopse: 'O comediante de stand-up Jerry Seinfeld convive com seus três amigos excêntricos na cidade de Nova York.',
    resenha: 'A infame "série sobre nada" revolucionou o humor televisivo ao focar inteiramente nos pormenores do cotidiano.'
  }
];

function Filmes () {
    const theme = useTheme(); 
    const navigation = useNavigation();

    const Cabecalho = () => (
      <View style={styles.hero}>
        <Text style={[styles.sectionTitle, { color: theme.colors.onBackground }]}>Apenas Séries</Text>
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
  }
});