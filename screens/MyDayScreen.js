import React from 'react';
import {
    View,
    ScrollView,
    useWindowDimensions,
    StyleSheet
} from 'react-native';
import Title from '../components/MyDay/Title';
import Header from '../components/MyDay/Header';
import AddNew from '../components/UI/AddNew';

const MyDayScreen = () => {
    const deviceHeight = useWindowDimensions().height;

    return (
        <View style={styles.container}>
            <Header />
            <ScrollView
                horizontal={false}
                nestedScrollEnabled={true}
            >
                <ScrollView
                    horizontal={true}
                    scrollEnabled={false}
                    nestedScrollEnabled={true}
                >
                    <Title />
                </ScrollView>
                <View style={{marginTop:deviceHeight/2-30}}>

                </View>
            </ScrollView>
            <AddNew
                containerStyle={[styles.detailsSearchContainer]}
                buttonStyle={[styles.nameImageContainer, styles.button]}
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
        borderRadius:'50%',
        width: 30,
        height: 30,
        backgroundColor: 'gray',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15
    },
    button: {
        backgroundColor: 'gray',
        borderRadius: 8,
        paddingVertical: 12
    }
});

export default MyDayScreen;