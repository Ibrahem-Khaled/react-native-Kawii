import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Octicons } from '@expo/vector-icons'

const Header = () => {
    return (
        <View style={styles.container}>
            <Octicons name="search" size={24} color="#fff" style={{ flex: 1, textAlign: 'left' }} />
            <TouchableOpacity>
                <Text style={styles.titleActive}>لك</Text>
            </TouchableOpacity>
            <TouchableOpacity>
                <Text style={styles.titleInActive}>متابعة</Text>
            </TouchableOpacity>
            <TouchableOpacity>
                <Text style={styles.titleInActive}>البث المباشر</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Header

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        width: '100%',
        padding: 20,
        position: 'absolute',
        top: '6%',
        zIndex: 999,
    },
    titleInActive: {
        fontSize: 20,
        color: 'grey',
        marginRight: 20,
        fontFamily: 'Cairo-Bold'
    },
    titleActive: {
        fontSize: 20,
        color: '#fff',
        marginRight: 20,
        fontFamily: 'Cairo-Bold',
        textDecorationLine: 'underline',
    }
})