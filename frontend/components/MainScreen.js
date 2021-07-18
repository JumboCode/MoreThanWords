import HomeTab from './HomeTab';
import FavoratesTab from './FavoratesTab';
import SettingsTab from './SettingsTab';
import { componentWithRefreshFunc } from '../utils/refresh';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHome, faStar as faSolidStar, faCog } from '@fortawesome/free-solid-svg-icons';
import { faStar as faRegularStar } from '@fortawesome/free-regular-svg-icons';
import React from 'react';

const TabNav = createBottomTabNavigator();

export default function MainScreen({ refresh }) {
    return <NavigationContainer>
        <TabNav.Navigator screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
                let icon;
                switch(route.name) {
                case "Home":
                    icon = faHome;
                    break;
                case "Favorates":
                    icon = focused ? faSolidStar : faRegularStar;
                    break;
                case "Settings":
                default:
                    icon = faCog;
                }
                return <FontAwesomeIcon icon={icon} size={size} color={color}/>
        }})}>
            <TabNav.Screen name="Home" component={componentWithRefreshFunc(HomeTab, refresh)} />
            <TabNav.Screen name="Favorates" component={FavoratesTab} />
            <TabNav.Screen name="Settings" component={componentWithRefreshFunc(SettingsTab, refresh)}/>
        </TabNav.Navigator>
    </NavigationContainer>
}

