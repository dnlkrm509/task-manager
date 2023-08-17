import React from "react";
import {
    useWindowDimensions,
    View,
    Text,
    ScrollView,
    FlatList,
    StyleSheet
} from "react-native";
import { Icon } from '@rneui/themed';
import { useNavigation } from "@react-navigation/native";

import { lists } from '../../data/lists';
import Button from '../UI/Button';

const HomeLists = () => {
    const navigation = useNavigation();
    const deviceWidth = useWindowDimensions().width;

    return (
        <ScrollView
            horizontal={true}
            scrollEnabled={false}
            nestedScrollEnabled={true}
        >
            <FlatList
                data={lists}
                renderItem={({ item }) => { return (
                <Button
                    buttonStyle={[
                        styles.detailsSearchContainer,
                        {
                            justifyContent: 'flex-start',
                            paddingVertical: 0,
                            paddingHorizontal: 0,
                            width: deviceWidth
                        }
                    ]}
                    onPress={() => navigation.navigate(item.screen)}
                >
                    <View style={[styles.image, {backgroundColor:'transparent'}]}>
                        <Icon
                            type={item.icontype}
                            name={item.iconname}
                            size={22}
                            color={item.iconcolor}
                        />
                    </View>
                    <Text style={{fontSize:17}}>{item.title}</Text>
                </Button>
                )}}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{alignSelf: 'flex-start', paddingBottom: 5}}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false}
                directionalLockEnabled={true}
                alwaysBounceVertical={false}
            />
        </ScrollView>
    )
};

const styles = StyleSheet.create({
    detailsSearchContainer: {
        height: 30,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    image: {
        borderRadius: 50,
        width: 30,
        height: 30,
        backgroundColor: 'gray',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 15
    }
});

export default HomeLists;