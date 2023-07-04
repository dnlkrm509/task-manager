import React from "react";
import { TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Icon } from '@rneui/themed';

const ButtonIcon = ({buttonStyle, onPress, type, name, size, color}) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={[styles.button, buttonStyle]}
        >
            {type && <Icon type={type} name={name} size={size} color={color} />}
            {!type && <Ionicons name={name} size={size} color={color} />}
        </TouchableOpacity>
    )
};

const styles = StyleSheet.create({
    button: {
        padding: 3
    }
});

export default ButtonIcon;