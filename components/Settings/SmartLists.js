import React from 'react';
import { View, StyleSheet, useWindowDimensions } from 'react-native';

import List from '../UI/setting/List';
import smartLists from '../../data/smartLists.json';

const SmartLists = () => {
    const deviceWidth = useWindowDimensions().width;

    return (
        <View style={[styles.screen, {width:deviceWidth}]}>
            <List data={smartLists} />
        </View>
    )
};

const styles = StyleSheet.create({
    screen: {
        backgroundColor: 'white'
    }
});

export default SmartLists;