import React from 'react';
import { View, StyleSheet, useWindowDimensions } from 'react-native';

import List from '../UI/setting/List';
import { general } from '../../data/general';

const General = () => {
    const deviceWidth = useWindowDimensions().width;

    return (
        <View style={[styles.screen, {width:deviceWidth}]}>
            <List data={general} />
        </View>
    )
};

const styles = StyleSheet.create({
    screen: {
        backgroundColor: 'white'
    }
});

export default General;