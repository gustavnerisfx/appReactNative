import React, { useState, createContext } from 'react';
import { useWindowDimensions } from 'react-native';
import { 
  NavigationContainer, 
  DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationDarkTheme
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { 
  Provider as PaperProvider, 
  MD3LightTheme as PaperDefaultTheme,
  MD3DarkTheme as PaperDarkTheme, 
  useTheme,
  adaptNavigationTheme,
} from 'react-native-paper';
import {
  useFonts,
  Montserrat_700Bold,
  Montserrat_800ExtraBold,
} from '@expo-google-fonts/montserrat';
import {
  Inter_500Medium,
  Inter_600SemiBold,
} from '@expo-google-fonts/inter';

import Home from './components/Home';
import Geral from './components/Geral';
import Config from './components/Config';
import Details from './components/Details'; 
import Filmes from './components/Filmes';
import Series from './components/Series';
import Animes from './components/Animes';

export const ThemeContext = createContext();

const Stack = createNativeStackNavigator();

const HomeStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}> 
    <Stack.Screen name="HomeScreen" component={Home} /> 
    <Stack.Screen name="Details" component={Details} />
  </Stack.Navigator>
);

const GeralStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}> 
    <Stack.Screen name="GeralScreen" component={Geral} /> 
    <Stack.Screen name="Details" component={Details} />
  </Stack.Navigator>
);

const SeriesStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="SeriesScreen" component={Series} />
    <Stack.Screen name="Details" component={Details} />
  </Stack.Navigator>
);

const AnimesStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="AnimesScreen" component={Animes} />
    <Stack.Screen name="Details" component={Details} />
  </Stack.Navigator>
);

const FilmesStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="FilmesScreen" component={Filmes} />
    <Stack.Screen name="Details" component={Details} />
  </Stack.Navigator>
);

const Tab = createBottomTabNavigator();

const BttTab = () => {
  const theme = useTheme(); 

  return (
    <Tab.Navigator 
      screenOptions={({ route }) => ({
        tabBarStyle: { 
          position: 'absolute',
          backgroundColor: theme.colors.surface,
        },
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Config') {
            iconName = 'cog-outline';
          } else if (route.name === 'Geral') {
            iconName = 'apps-sharp';
          } else if (route.name === 'Home') {
            iconName = 'home-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'red',
        tabBarInactiveTintColor: theme.colors.onSurfaceVariant,
      })}
    >
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="Geral" component={GeralStack} />
      <Tab.Screen name="Config" component={Config} />
    </Tab.Navigator>
  );
};

const Drawer = createDrawerNavigator();

const MainDrawer = () => {
  const dimensions = useWindowDimensions();
  const theme = useTheme();

  return (
    <Drawer.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.surface, 
        },
        headerTintColor: theme.colors.onSurface,
        headerTitleStyle: {
          fontSize: 20,
          fontWeight: 'bold',
          color: theme.colors.onSurface,
          fontFamily: 'Montserrat_700Bold',
        },
        drawerStyle: {
          backgroundColor: theme.colors.surface,
          width: '100%', 
        },
        sceneContainerStyle: {
          backgroundColor: theme.colors.background, 
        },
        drawerActiveTintColor: 'white',
        drawerActiveBackgroundColor: 'red',
        drawerInactiveTintColor: theme.colors.onSurfaceVariant, 
        drawerType: dimensions.width >= 768 ? 'slide' : 'back',
        overlayColor: 'transparent',
      }}
    >
      <Drawer.Screen name="ResenhaFlixx" component={BttTab} />
      <Drawer.Screen name="Filmes" component={FilmesStack} />
      <Drawer.Screen name="Séries" component={SeriesStack} />
      <Drawer.Screen name="Animes" component={AnimesStack} />
    </Drawer.Navigator>
  );
};

export default function App() {
  const [fontsLoaded] = useFonts({
    Montserrat_700Bold,
    Montserrat_800ExtraBold,
    Inter_500Medium,
    Inter_600SemiBold,
  });

  const [isDarkTheme, setIsDarkTheme] = useState(true);

  const toggleTheme = () => {
    setIsDarkTheme(prev => !prev);
  };

  const { LightTheme, DarkTheme } = adaptNavigationTheme({
    reactNavigationLight: NavigationDefaultTheme,
    reactNavigationDark: NavigationDarkTheme,
  });

  const paperTheme = isDarkTheme
    ? { ...PaperDarkTheme, colors: { ...PaperDarkTheme.colors, ...DarkTheme.colors } }
    : { ...PaperDefaultTheme, colors: { ...PaperDefaultTheme.colors, ...LightTheme.colors } };

  const navigationTheme = isDarkTheme ? DarkTheme : LightTheme;

  if (!fontsLoaded) {
    return null;
  }

  return (
    <ThemeContext.Provider value={{ toggleTheme, isDarkTheme }}>
      <PaperProvider theme={paperTheme}>
        <NavigationContainer theme={navigationTheme}>
          <MainDrawer />
        </NavigationContainer>
      </PaperProvider>
    </ThemeContext.Provider>
  );
}