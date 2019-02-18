import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import NewProject from '../screens/NewProject';
import SettingsScreen from '../screens/SettingsScreen';
import ProjectDetails from '../screens/ProjectDetails';

// there are elements which were created by Expo

const HomeStack = createStackNavigator({
  Home: {screen: HomeScreen},
  Details: {screen: ProjectDetails},
  NewProject: {screen: NewProject},
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Projects',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-apps`
          : 'md-apps'
      }
    />
  ),
};

const LinksStack = createStackNavigator({
  Links: {screen: LinksScreen},
  Details: {screen: ProjectDetails},
});

LinksStack.navigationOptions = {
  tabBarLabel: 'Investments',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-basket' : 'md-basket'}
    />
  ),
};

const SettingsStack = createStackNavigator({
  Settings: SettingsScreen,
});

SettingsStack.navigationOptions = {
  tabBarLabel: 'Funding',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-cash' : 'md-cash'}
    />
  ),
};

export default createBottomTabNavigator({
  HomeStack,
  LinksStack,
  SettingsStack,
});
