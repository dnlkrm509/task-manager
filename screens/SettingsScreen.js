import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

import SectionTitle from '../components/UI/setting/SectionTitle';
import Account from '../components/Settings/Account';
import General from '../components/Settings/General';
import SmartLists from '../components/Settings/SmartLists';
import ConnectedApps from '../components/Settings/ConnectedApps';
import Notifications from '../components/Settings/Notifications';
import Help from '../components/Settings/Help';
import About from '../components/Settings/About';

const SettingsScreen = () => {
    return (
        <ScrollView
            style={styles.screen}
            horizontal={false}
            nestedScrollEnabled={true}
        >
            <Account />
            <SectionTitle text='GENERAL' />
            <ScrollView
                nestedScrollEnabled={true}
                horizontal
                scrollEnabled={false}
            >
                <General />
            
            </ScrollView>
            <SectionTitle text='SMART LISTS' />
            <ScrollView
                nestedScrollEnabled={true}
                horizontal
                scrollEnabled={false}
            >
                <SmartLists />
            </ScrollView>
            <SectionTitle text='CONNECTED APPS' />
            <ScrollView
                nestedScrollEnabled={true}
                horizontal
                scrollEnabled={false}
            >
                <ConnectedApps />
            </ScrollView>
            <SectionTitle text='NOTIFICATIONS' />
            <ScrollView
                nestedScrollEnabled={true}
                horizontal
                scrollEnabled={false}
            >
                <Notifications />
            </ScrollView>
            <SectionTitle text='HELP & FEEDBACK' />
            <ScrollView
                nestedScrollEnabled={true}
                horizontal
                scrollEnabled={false}
            >
                <Help />
            </ScrollView>
            <SectionTitle text='ABOUT' />
            <ScrollView
                nestedScrollEnabled={true}
                horizontal
                scrollEnabled={false}
            >
                <About />
            </ScrollView>
            <View style={styles.viewStyle}>
                <Text>copyright</Text>
            </View>
            <View style={{backgroundColor:'white',marginBottom:60}}>
                <Text>Buttons</Text>
            </View>
        </ScrollView>
    )
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
    viewStyle: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 60
    }
});

export default SettingsScreen;