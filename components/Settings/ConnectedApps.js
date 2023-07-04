import React from 'react';
import { View, StyleSheet, useWindowDimensions } from 'react-native';

import List from '../UI/setting/List';
import connectedApps from '../../data/connectedApps.json';

const ConnectedApps = () => {
    const deviceWidth = useWindowDimensions().width;

    return (
        <View style={[styles.screen, {width:deviceWidth}]}>
            <List data={connectedApps} />
        </View>
    )
};

const styles = StyleSheet.create({
    screen: {
        backgroundColor: 'white'
    }
});

export default ConnectedApps;