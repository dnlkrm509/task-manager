import React, { useState } from 'react';
import { View, Text, StyleSheet, useWindowDimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';

import { Colors } from '../../../constants/colors';
import ButtonIcon from '../ButtonIcon';
import Button from '../Button';

const Item = ({text, secondText, thirdText, type, name, size, color, button, navigateTo, linkTo}) => {
    const [iconColor, setIconColor] = useState(color);
    const [iconName, setIconName] = useState(name);

    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('time');

    const deviceWidth = useWindowDimensions().width;
    const navigation = useNavigation();
    
    const colorHandler = () => {
        if (iconColor === 'blue') {
            setIconColor(Colors.lineBreak);
            setIconName('toggle-off');
        } else {
            setIconColor('blue');
            setIconName('toggle-on');
        }
    }

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        setDate(currentDate);
      };
    
      const showMode = (currentMode) => {
        setMode(currentMode);
      };
    
      const showDatepicker = () => {
        showMode('date');
      };
    
      const showTimepicker = () => {
        showMode('time');
      };

    return (
        <View>
            {size && (
                <View>
                    {!button && (
                        <View style={styles.container}>
                            <Text style={{width:deviceWidth*3/4,fontSize: 17}}>{text}</Text>
                            <ButtonIcon
                                buttonStyle={{padding:0}}
                                type={type}
                                name={iconName}
                                size={size}
                                color={iconColor}
                                onPress={colorHandler}
                            />
                        </View>
                    )}
                    {button && (
                        <Button
                            buttonStyle={styles.container}
                            onPress={() => navigation.push(navigateTo)}
                        >
                            <Text style={{width:deviceWidth*3/4,fontSize: 17}}>{text}</Text>
                            <ButtonIcon
                                buttonStyle={{padding:0}}
                                type={type}
                                name={iconName}
                                size={size}
                                color={iconColor}
                                onPress={colorHandler}
                            />
                        </Button>
                    )}
                </View>
            )}
            {!size && (
                <View>
                    {!button && (
                        <View style={styles.container}>
                            <Text style={{fontSize: 17}}>{text}</Text>
                            {text !== "Time Of Due Today Notifications" &&
                                <Text style={{paddingRight:15,color:'blue'}}>{secondText}</Text>
                            }
                            {text === "Time Of Due Today Notifications" &&
                                <Button
                                    buttonStyle={{width:'auto',paddingHorizontal:0}}
                                    onPress={showTimepicker}
                                >
                                    <DateTimePicker
                                      testID="dateTimePicker"
                                      value={date}
                                      mode={mode}
                                      is24Hour={true}
                                      onChange={onChange}
                                    />
                                </Button>
                            }
                        </View>
                    )}
                    {button && (
                        <Button
                            buttonStyle={styles.container}
                        >
                            <Text style={{width:deviceWidth*3/4,fontSize: 17}}>{text}</Text>
                            <Text style={{paddingRight:15}}>{thirdText}</Text>
                        </Button>
                    )}
                </View>
            )}
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        height: 43,
        alignItems: 'center',
        paddingLeft: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomColor: Colors.lineBreak,
        borderBottomWidth: 1
    }
});

export default Item;