import React, { useState } from "react";
import { View, ScrollView, StyleSheet } from "react-native";

import NameSearch from "./NameSearch";
import HomeLists from "./HomeLists";
import { Colors } from "../../constants/colors";
import Groups from "./Groups";
import NewList from "./NewList";
import GroupLists from "./GroupList";

const Home = () => {
    const [modalIsVisible, setModalIsVisible] = useState(false);
    const [groupId, setGroupId] = useState('');
    const [initialState, setInitialState] = useState(false);

    const onSetModalIsVisible = (state) => {
        setModalIsVisible(state);
    }

    const onSetGroupId = (id) => {
        setGroupId(id);
    }


    const onSetInitialState = (state) => {
        setInitialState(state);
    }

    return (
        <View style={{flex:1}}>
            <NameSearch />
            <ScrollView
                horizontal={false}
                nestedScrollEnabled={true}
            >
                <HomeLists />
                <View style={styles.lineBreak}></View>
                <GroupLists />
                <Groups
                    initialState={initialState}
                    modalIsVisible={modalIsVisible}
                    groupId={groupId}
                    onSetGroupId={(id) => onSetGroupId(id)}
                    onSetModalIsVisible={(state) => {onSetModalIsVisible(state)}}
                    onSetInitialState={(state) => onSetInitialState(state)}
                />
            </ScrollView>
            <View style={{marginBottom:20}}>
                <NewList
                    onSetModalIsVisible={(state) => {onSetModalIsVisible(state)}}
                    onSetInitialState={(state) => onSetInitialState(state)}
                    onSetGroupId={(id) => onSetGroupId(id)}
                />
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    lineBreak: {
        alignSelf: 'stretch',
        height: 1,
        backgroundColor: Colors.lineBreak
    }
});

export default Home;