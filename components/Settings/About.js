import React from 'react';
import { View, StyleSheet, useWindowDimensions } from 'react-native';

import List from '../UI/setting/List';
import about from '../../data/about.json';

const About = () => {
    const deviceWidth = useWindowDimensions().width;

    return (
        <View style={[styles.screen, {width:deviceWidth}]}>
            <List data={about} />
        </View>
    )
};

const styles = StyleSheet.create({
    screen: {
        backgroundColor: 'white'
    }
});

export default About;