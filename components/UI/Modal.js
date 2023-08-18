import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import Modal from "react-native-modal";
import Button from "./Button";
import { Colors } from "../../constants/colors";

const ModalUI = ({
    modalVisible,
    hasBackdrop,
    onBackdropPress,
    onSwipeComplete,
    propagateSwipe,
    swipeDirection,
    onHideModal,
    height,
    position,
    headerTitle,
    buttonText,
    onAdd,
    onCancel,
    onSkip,
    contentTop,
    children
}) => {
    const container = [styles.container];

    if (height) {
        container.push({height:height});
    }

    let lineBreak = [styles.lineBreak];
    let modal = [styles.modal];
    let modalInnerContainer = [];
    let content = [styles.content];

    if(position === 'bottomEditGroup') {
        lineBreak.push({
            width: 45,
            height: 3,
            backgroundColor: Colors.modalLittleLine,
            marginLeft:'45%',
            borderRadius: 4
        })

        modal.push({
            margin: 0,
            flex: 1
        })

        modalInnerContainer.push([styles.modalInnerContainer,{height:height}]);
    }

    if(position === 'bottomDeleteConfirmation') {
        modal.push({
            margin: 12,
            flex: 1
        })

        modalInnerContainer.push([
            styles.modalInnerContainer,
            {
                height: height,
                bottom: 30,
                borderBottomRightRadius: 12,
                borderBottomLeftRadius: 12,
                paddingHorizontal: 0,
            }
        ]);

        content.push({paddingHorizontal: 0})

    }

    return (
        <View style={styles.root}>
            <Modal
                style={modal}
                isVisible={modalVisible}
                onHideModal={onHideModal}
                hasBackdrop={hasBackdrop}
                onBackdropPress={onBackdropPress}
                onSwipeComplete={onSwipeComplete}
                propagateSwipe={propagateSwipe}
                swipeDirection={swipeDirection}
            >
                <View style={modalInnerContainer}>
                    {position === 'bottomDeleteConfirmation' && (
                        <View>
                            <View style={styles.header}>
                                <View></View>
                                <View></View>
                                <View>
                                    <Text style={[styles.text, {fontSize:14, color:'black'}]}>
                                        {headerTitle}
                                    </Text>
                                </View>
                                <Button
                                    onPress={() => {onHideModal()}}
                                >
                                    <Text style={styles.text}>{buttonText}</Text>
                                </Button>
                            </View>
                            <View style={lineBreak}></View>
                        </View>
                    )}


                    {position === 'bottomEditGroup' && (
                        <View style={{marginTop: 10}}>
                            <View>
                                <View style={lineBreak}></View>
                            </View>
                            <View style={styles.header}>
                                <View></View>
                                <View></View>
                                <View>
                                    <Text style={[styles.text, {fontWeight:'bold',color:'black'}]}>
                                        {headerTitle}
                                    </Text>
                                </View>
                                <Button
                                    onPress={() => {onHideModal()}}
                                >
                                    <Text style={styles.text}>{buttonText}</Text>
                                </Button>
                            </View>
                        </View>
                    )}


                    {position === 'middle' && (
                        <View style={container}>
                            <View style={styles.header}>
                                <Button
                                    onPress={() => {onCancel();onHideModal()}}
                                >
                                    <Text style={styles.text}>Cancel</Text>
                                </Button>
                                <View>
                                    <Text style={[styles.text, {fontWeight:'bold',color:'black'}]}>
                                        {headerTitle}
                                    </Text>
                                </View>
                                <Button
                                    onPress={() => {if(buttonText==='Add'){onAdd();}if(buttonText==='Skip'){onSkip();}onHideModal();}}
                                >
                                    <Text style={styles.text}>{buttonText}</Text>
                                </Button>
                            </View>
                            <View style={lineBreak}></View>
                        </View>
                        
                    )}
                    <View style={[content,{
                                    position: 'absolute',
                                    top: contentTop,
                                    right: 0,
                                    bottom: 0,
                                    left: 0,
                                }]}>
                        <ScrollView>
                            {children}
                        </ScrollView>
                    </View>
                </View>
            </Modal>
        </View>
    )
};

const styles = StyleSheet.create({
    root: {
        flex: 1,
        position: 'absolute',
        top: 0
    },
    container: {
        backgroundColor: 'white',
        borderRadius: 12,
    },
    modalInnerContainer: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        paddingHorizontal: 24,
        backgroundColor: 'white',
        borderTopRightRadius: 12,
        borderTopLeftRadius: 12,
        flex: 1
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 12
    },
    text: {
        color: 'blue',
        fontSize: 18
    },
    lineBreak: {
        alignSelf: 'stretch',
        height: 1,
        backgroundColor: Colors.lineBreak
    },
    content: {
        paddingVertical: 24,
        paddingHorizontal: 24
    }
});

export default ModalUI;