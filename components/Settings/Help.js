import React from 'react';
import { View, StyleSheet, useWindowDimensions } from 'react-native';

import List from '../UI/setting/List';
import help from '../../data/help.json';

const Help = () => {
    const deviceWidth = useWindowDimensions().width;

    return (
        <View style={[styles.screen, {width:deviceWidth}]}>
            <List data={help} />
        </View>
    )
};

const styles = StyleSheet.create({
    screen: {
        backgroundColor: 'white'
    }
});

export default Help;