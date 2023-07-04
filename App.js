import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TransitionPresets } from '@react-navigation/stack';

import AssignedToMeScreen from './screens/AssignedToMeScreen';
import FlaggedEmailScreen from './screens/FlaggedEmailScreen';
import ImportantScreen from './screens/ImportantScreen';
import ListsScreen from './screens/ListsScreen';
import MyDayScreen from './screens/MyDayScreen';
import PlannedScreen from './screens/PlannedScreen';
import TasksScreen from './screens/TasksScreen';
import SettingsScreen from './screens/SettingsScreen';
import SearchScreen from './screens/SearchScreen';
import Button from './components/UI/Button';
import SiriShortcutsScreen from './screens/SiriShortcutsScreen';
import AppBadgeScreen from './screens/AppBadgeScreen';
import StartOftheWeekScreen from './screens/StartOftheWeekScreen';
import FormatNameContextProvider from './contexts/formatNameContext';
import AddNewListScreen from './screens/AddNewListScreen';
import { Colors } from './constants/colors';
import ListContextProvider from './contexts/list-context';
import GroupContextProvider from './contexts/group-context';

const Stack = createNativeStackNavigator();
const ModalStack = createNativeStackNavigator()

const config = {
  animation: 'spring',
  config: {
    stiffness: 1000,
    damping: 500,
    mass: 3,
    overshootClamping: true,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
};

const ModalStackView = () => (
  <ModalStack.Navigator
    screenOptions={ ({navigation}) => ({
      headerRight: () => (
        <Button
          buttonStyle={{width:60}}
          onPress={() => navigation.navigate('lists')}
        >
          <Text style={{color:'blue',fontSize:17}}>
            Done
          </Text>
        </Button>),
    }) }
  >
    <ModalStack.Screen
      name='settings'
      component={SettingsScreen}
      options={{
        title: 'Settings',
        presentation: 'modal',
        headerShown: true,
        ...TransitionPresets.ModalPresentationIOS,
      }}
    />
    <ModalStack.Screen
      name='sirishortcuts'
      component={SiriShortcutsScreen}
      options={{
        headerShown: true,
        presentation: 'card',
        transitionSpec: {
          open: config,
          close: config,
        },
      }}
    />
    <ModalStack.Screen
      name='appbadge'
      component={AppBadgeScreen}
      options={{
        headerShown: true,
        presentation: 'card'
      }}
    />
    <ModalStack.Screen
      name='startweek'
      component={StartOftheWeekScreen}
      options={{
        headerShown: true,
        presentation: 'card'
      }}
    />
  </ModalStack.Navigator>
)

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <FormatNameContextProvider>
        <ListContextProvider>
          <GroupContextProvider>
            <NavigationContainer>
              <Stack.Navigator
                initialRouteName='lists'
                screenOptions={{
                  headerShown: false,
                }}
              >
                <Stack.Screen
                  name='myday'
                  component={MyDayScreen}
                  options={{
                    contentStyle: {
                      paddingTop: 70,
                      paddingHorizontal: 24,
                      backgroundColor: 'lightblue'
                    }
                  }}
                />
                <Stack.Screen
                  name='assigned'
                  component={AssignedToMeScreen}
                />
                <Stack.Screen
                  name='flaggedemail'
                  component={FlaggedEmailScreen}
                />
                <Stack.Screen
                  name='important'
                  component={ImportantScreen}
                />
                <Stack.Screen
                  name='lists'
                  component={ListsScreen}
                  options={{
                    contentStyle: {
                      paddingTop: 70,
                      paddingHorizontal: 24,
                    }
                  }}
                />
                <Stack.Screen
                  name='planned'
                  component={PlannedScreen}
                />
                <Stack.Screen
                  name='tasks'
                  component={TasksScreen}
                />
                <Stack.Screen
                  name="modal"
                  component={ModalStackView}
                  options={{
                    headerShown: false,
                    presentation: 'modal',
                    ...TransitionPresets.ModalPresentationIOS,
                  }}
                />
                <Stack.Screen
                  name='search'
                  component={SearchScreen}
                />
                <Stack.Screen
                  name='addnew'
                  component={AddNewListScreen}
                  options={{
                    contentStyle: {
                      paddingTop: 70,
                      paddingHorizontal: 24,
                      backgroundColor: Colors.purplish
                    }
                  }}
                />
              </Stack.Navigator>
            </NavigationContainer>
          </GroupContextProvider>
        </ListContextProvider>
      </FormatNameContextProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
});
