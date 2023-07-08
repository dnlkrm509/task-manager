import React from "react";
import { TouchableOpacity, StyleSheet, useWindowDimensions } from "react-native";

const Button = ({children, onPress, fullWidth, buttonStyle}) => {
    const deviceHeight = useWindowDimensions().width;
    const button = [styles.button];

    if (fullWidth) {
        button.push({ width: deviceHeight*0.7 });
    }

    if (buttonStyle) {
        button.push(buttonStyle);
    }

    return (
        <TouchableOpacity
            onPress={onPress}
            style={button}
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
    },
});

export default Button;