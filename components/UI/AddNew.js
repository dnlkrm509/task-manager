import React from "react";
import { View, Text, StyleSheet, useWindowDimensions, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Icon } from '@rneui/themed';

import Button from "./Button";
import ButtonIcon from "./ButtonIcon";
import { useNavigation } from "@react-navigation/native";
import { Colors } from "../../constants/colors";

const AddNew = ({
    containerStyle,
    buttonStyle,
    onPress,
    iconContainerStyle,
    iconType,
    iconName,
    iconSize,
    iconColor,
    text,
    textStyle,
    buttonIcon,
    buttonIconType,
    buttonIconName,
    buttonIconSize,
    buttonIconColor,
    buttonIconOnPress,
    group,
    showSublists,
    sublists,
    ID,
    onSelectGroupLists
}) => {
    let newSublists = [];
    if(sublists)
        newSublists = sublists.reduce((c, n) =>
        c.find(el => el.id === n.id) ? c : [...c, n], []);

    const navigation = useNavigation();
    const deviceWidth = useWindowDimensions().width;

    return (
        <View>
            <View style={containerStyle}>
                <Button
                    buttonStyle={buttonStyle}
                    onPress={onPress}
                    fullWidth
                >
                    <View style={iconContainerStyle}>
                        {iconType && <Icon type={iconType} name={iconName} size={iconSize} color={iconColor} />}
                        {!iconType && <Ionicons name={iconName} size={iconSize} color={iconColor} />}
                    </View>
                    <Text style={[styles.textStyle, textStyle]}>
                        {text}
                    </Text>
                </Button>
                {buttonIcon && (
                    <ButtonIcon
                        type={buttonIconType}
                        name={buttonIconName}
                        size={buttonIconSize}
                        color={buttonIconColor}
                        onPress={buttonIconOnPress}
                    />
                )}
            </View>
            {console.log(typeof(showSublists))}
            {group ?
                showSublists ?
                    newSublists.length > 0 ?
                        (
                            <FlatList
                                data={newSublists}
                                renderItem={({item}) => (
                                    <View style={containerStyle}>
                                        <Button
                                            buttonStyle={[buttonStyle,styles.groupButton, {justifyContent:'flex-start',paddingLeft:10}]}
                                            onPress={() => {navigation.navigate('addnew',{listDetails:item})}}
                                            fullWidth
                                        >
                                            <View style={iconContainerStyle}>
                                                <Ionicons name='list' size={28} color='blue' />
                                            </View>
                                            <Text style={[styles.textStyle, textStyle, { fontWeight: 'normal' }]}>
                                                {item.text}
                                            </Text>
                                        </Button>
                                    </View>
                                )}
                            />
                        )
                    :
                        <View style={containerStyle}>
                            <Button
                                buttonStyle={[buttonStyle,styles.groupButton,{width: deviceWidth*80/100}]}
                                onPress={() => {onSelectGroupLists(ID)}}
                                fullWidth
                            >
                                <Text style={[styles.textStyle, textStyle, { fontWeight: 'normal',color:Colors.groupText }]}>
                                    Tap or Drag Here to Add Lists
                                </Text>
                            </Button>
                        </View>
                :
                console.log('Sublists are hidden')
            :
                console.log('This item is not a group')
            }
        </View>
    )
};

const styles = StyleSheet.create({
    textStyle: {
        color: 'blue',
        fontSize: 17
    },
    groupButton: {
        justifyContent: 'center',
        height: 55,
        borderRadius: 0,
        borderLeftWidth: 2,
        borderLeftColor: Colors.lineBreak,
        marginLeft: 20
    }
});

export default AddNew;