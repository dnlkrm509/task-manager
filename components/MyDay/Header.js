import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Header = () => {
    return (
        <View style={styles.container}>
            <Text>Header</Text>
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'green',
        justifyContent: 'center',
        height: 30
    },
});

export default Header;