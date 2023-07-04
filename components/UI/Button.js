import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";

const Button = ({children, onPress, buttonStyle}) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={[styles.button, buttonStyle]}
        >
            {children}
        </TouchableOpacity>
    )
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: 'transparent',
        borderRadius: 4,
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderWidth: 0,
        width: '100%'
    },
});

export default Button;