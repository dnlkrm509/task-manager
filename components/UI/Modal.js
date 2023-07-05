import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import Modal from "react-native-modal";
import { TouchableHighlight } from "react-native-gesture-handler";
import Button from "./Button";

const ModalUI = ({
    modalVisible,
    hasBackdrop,
    onBackdropPress,
    onSwipeComplete,
    propagateSwipe,
    swipeDirection,
    onHideModal,
    children
}) => {
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
                <View style={styles.container}>
                    <View style={styles.header}>
                        <Button
                            onPress={onHideModal}
                        >
                            <Text style={styles.text}>Cancel</Text>
                        </Button>
                        <Button
                            onPress={onHideModal}
                        >
                            <Text style={styles.text}>Skip</Text>
                        </Button>
                    </View>
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
        padding: 12
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    text: {
        color: 'blue',
        fontSize: 18
    },
    content: {
        padding: 12,
    }
});

export default ModalUI;