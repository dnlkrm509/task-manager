import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import Modal from "react-native-modal";
import { TouchableHighlight } from "react-native-gesture-handler";
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
    headerTitle,
    buttonText,
    lineBreak,
    onAdd,
    onCancel,
    onSkip,
    children
}) => {
    const container = [styles.container];

    if (height) {
        container.push({height:height});
    }

    return (
        <View style={styles.root}>
            <Modal
                style={styles.modal}
                isVisible={modalVisible}
                onHideModal={onHideModal}
                hasBackdrop={hasBackdrop}
                onBackdropPress={onBackdropPress}
                onSwipeComplete={onSwipeComplete}
                propagateSwipe={propagateSwipe}
                swipeDirection={swipeDirection}
            >
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
                    {lineBreak && <View style={styles.lineBreak}></View>}
                    <View style={styles.content}>
                        <ScrollView>
                            {children}
                            <TouchableHighlight
                                style={{
                                    position: 'absolute',
                                    top: 0,
                                    right: 0,
                                    bottom: 0,
                                    left: 0
                                }}
                            />
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
        flex: 1,
        padding: 24,
    }
});

export default ModalUI;