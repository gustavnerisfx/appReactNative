import React from 'react';
import { View, ScrollView, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Text, useTheme } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';

export default function Details({ route }) {
  const { FILMES } = route.params;
  const navigation = useNavigation();
  const theme = useTheme();

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: theme.colors.background }]} 
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.imageContainer}>
        <Image source={{ uri: FILMES.imagem }} style={styles.coverImage} />
        <LinearGradient
          colors={['transparent', theme.colors.background]}
          style={styles.gradient}
        />
      </View>

      <View style={styles.contentContainer}>
        <Text style={styles.tag}>
          {FILMES.genero.toUpperCase()}
        </Text>
        
        <Text style={[styles.title, { color: theme.colors.onBackground }]}>
          {FILMES.titulo}
        </Text>

        <Text style={[styles.sectionTitle, { color: theme.colors.onBackground }]}>
          Sinopse
        </Text>
        <Text style={[styles.paragraph, { color: theme.colors.onSurfaceVariant }]}>
          {FILMES.sinopse}
        </Text>

        <View style={styles.reviewBox}>
          <Text style={[styles.reviewHeader, { color: theme.colors.onSurface }]}>🎬 O que achamos</Text>
          <Text style={[styles.reviewText, { color: theme.colors.onSurfaceVariant }]}>
            {FILMES.resenha}
          </Text>
        </View>

        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>Voltar</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
    width: '100%',
    height: 450,
    position: 'relative',
  },
  coverImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 150,
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingBottom: 40,
    marginTop: -40,
  },
  tag: {
    color: '#E50914',
    fontFamily: 'Inter_600SemiBold',
    letterSpacing: 2,
    fontSize: 12,
    marginBottom: 8,
  },
  title: {
    fontSize: 32,
    lineHeight: 38,
    fontFamily: 'Montserrat_800ExtraBold',
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Montserrat_700Bold',
    marginBottom: 12,
  },
  paragraph: {
    fontSize: 15,
    lineHeight: 24,
    fontFamily: 'Inter_500Medium',
    marginBottom: 30,
    textAlign: 'justify',
  },
  reviewBox: {
    padding: 20,
    borderRadius: 16,
    marginBottom: 30,
    borderLeftWidth: 4,
    borderLeftColor: '#E50914',
  },
  reviewHeader: {
    fontSize: 16,
    fontFamily: 'Montserrat_700Bold',
    marginBottom: 10,
  },
  reviewText: {
    fontSize: 14,
    lineHeight: 22,
    fontFamily: 'Inter_500Medium',
    fontStyle: 'italic',
  },
  backButton: {
    alignSelf: 'center',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    borderColor: '#E50914',
    borderWidth: 1,
    marginBottom: 30,
  },
  backButtonText: {
    color: '#E50914',
    fontFamily: 'Inter_600SemiBold',
    fontSize: 14,
  }
});