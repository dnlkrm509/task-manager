import React, { useState } from 'react';
import {
    View,
    ScrollView,
    useWindowDimensions,
    StyleSheet
} from 'react-native';
import Title from '../components/AddNewList/Title';
import Header from '../components/AddNewList/Header';
import AddNew from '../components/UI/AddNew';
import { Colors } from '../constants/colors';
const AddNewListScreen = ({route}) => {
    const [value, setValue] = useState('');
    const deviceWidth = useWindowDimensions().width;
    const deviceHeight = useWindowDimensions().height;
    const listDetails = route.params?.listDetails;

    return (
        <View style={styles.container}>
            <Header value={value} id={route.params ? listDetails.id : null} />
            <ScrollView
                horizontal={false}
                nestedScrollEnabled={true}
            >
                <ScrollView
                    horizontal={true}
                    scrollEnabled={false}
                    nestedScrollEnabled={true}
                >
                    <Title
                        onSetValue={(enteredValue) => setValue(enteredValue)}
                        id={route.params ? listDetails.id : null}
                    />
                </ScrollView>
                <View style={{marginTop:deviceHeight/2-30}}>

                </View>
            </ScrollView>
            <AddNew
                containerStyle={[styles.detailsSearchContainer]}
                buttonStyle={[styles.nameImageContainer, styles.button, {width:deviceWidth*95/100}]}
                iconContainerStyle={[styles.image, {backgroundColor:'transparent',borderRadius:0}]}
                iconName='add'
                iconSize={28}
                iconColor='white'
                text='Add a Task'
                textStyle={{color:'white'}}
            />
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    detailsSearchContainer: {
        height: 30,
        alignItems: 'center',
        marginBottom: 70,
    },
    nameImageContainer: {
        alignItems: 'center',
        flexDirection: 'row'
    },
    image: {
        borderRadius: 50,
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15
    },
    button: {
        backgroundColor: Colors.purplishLighter,
        borderRadius: 8,
        paddingVertical: 12
    }
});

export default AddNewListScreen;