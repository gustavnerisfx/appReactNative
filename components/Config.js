import React, { useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import { Switch, Text, useTheme } from 'react-native-paper';
import { ThemeContext } from '../App';

export default function Config() {
  const { toggleTheme, isDarkTheme } = useContext(ThemeContext);
  const theme = useTheme();

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme.colors.background }
      ]}
    >
      <View style={styles.settingRow}>
        <Switch
          value={isDarkTheme}
          onValueChange={toggleTheme}
          color="#E50914"
          thumbColor="#FFFFFF"
          trackColor={{
            false: '#4B5563',
            true: '#E50914',
          }}
        />

        <View style={styles.textContainer}>
          <Text
            style={[
              styles.title,
              { color: theme.colors.onBackground }
            ]}
          >
            Tema
          </Text>

          <Text
            style={[
              styles.subtitle,
              {
                color: isDarkTheme
                  ? '#AAB2D5'
                  : '#6B7280'
              }
            ]}
          >
            {isDarkTheme ? 'Escuro' : 'Claro'}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 30,
  },

  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  textContainer: {
    marginLeft: 16,
  },

  title: {
    fontSize: 17,
    fontWeight: '600',
  },

  subtitle: {
    fontSize: 13,
    marginTop: 2,
  },
});