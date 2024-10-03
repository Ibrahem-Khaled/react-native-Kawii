import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

const CheckIsAuth = () => {
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.welcomeText}>مرحباً إلى Kwai</Text>
            <Text style={styles.description}>عرض الرسائل بعد تسجيل الدخول</Text>

            <TouchableOpacity style={styles.googleButton}>
                <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/512/2991/2991148.png' }} style={styles.googleIcon} />
                <Text style={styles.googleButtonText}>التسجيل باستخدام Google</Text>
            </TouchableOpacity>

            <Text style={styles.orText}>أو استخدام</Text>
            <View style={styles.otherOptions}>
                <TouchableOpacity>
                    <Text style={styles.optionText}>Facebook</Text>
                </TouchableOpacity>
                <Text style={styles.divider}>|</Text>
                <TouchableOpacity>
                    <Text style={styles.optionText}>الهاتف</Text>
                </TouchableOpacity>
                <Text style={styles.divider}>|</Text>
                <TouchableOpacity>
                    <Text style={styles.optionText}>البريد الإلكتروني</Text>
                </TouchableOpacity>
            </View>

            <Text style={styles.termsText}>
                بالاستمرار، فإنك توافق على <Text style={styles.linkText}>شروط الخدمة</Text> و<Text style={styles.linkText}>سياسة الخصوصية</Text>.
            </Text>
        </SafeAreaView>
    );
};

export default CheckIsAuth;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    welcomeText: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        alignSelf: 'flex-start',
        margin: 10,
        color: '#000',
    },
    description: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        margin: 10,
        alignSelf: 'flex-start',
    },
    googleButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: width * 0.9,
        paddingVertical: 15,
        borderWidth: 1,
        borderColor: '#333',
        borderRadius: 8,
        margin: 20,
    },
    googleIcon: {
        width: 24,
        height: 24,
        marginLeft: 20,
    },
    googleButtonText: {
        fontSize: 16,
        color: '#000',
        fontFamily: 'Cairo-SemiBold',
        flex: 1,
        textAlign: 'center',
    },
    orText: {
        fontSize: 16,
        color: '#666',
        marginBottom: 10,
    },
    otherOptions: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    optionText: {
        fontSize: 16,
        color: '#007bff',
    },
    divider: {
        fontSize: 16,
        color: '#666',
        marginHorizontal: 5,
    },
    termsText: {
        fontSize: 12,
        color: '#666',
        textAlign: 'left',
        paddingHorizontal: 20,
        fontFamily: 'Cairo-Regular',
        alignSelf: 'flex-start',
        top: '30%',
    },
    linkText: {
        color: '#007bff',
    },
});
