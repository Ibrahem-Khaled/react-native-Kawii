import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { ResizeMode, Video } from 'expo-av';

const Add = () => {
    const [selectedVideo, setSelectedVideo] = useState(null);

    // فتح معرض الصور لاختيار فيديو
    const pickVideo = async () => {
        // نطلب أذونات الوصول للصور والفيديوهات
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

        if (permissionResult.granted === false) {
            alert("You need to grant permission to access the gallery!");
            return;
        }

        // نفتح المعرض لاختيار الفيديو
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Videos,
            allowsEditing: true, // يتيح للمستخدم قص الفيديو
            quality: 1,
        });

        if (!result.canceled) {
            setSelectedVideo(result.assets[0].uri); // نعرض الفيديو الذي تم اختياره
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>اختر فيديو</Text>

            {/* زر لاختيار فيديو */}
            <TouchableOpacity style={styles.button} onPress={pickVideo}>
                <Text style={styles.buttonText}>فتح المعرض</Text>
            </TouchableOpacity>

            {/* عرض الفيديو الذي تم اختياره */}
            {selectedVideo && (
                <View style={styles.videoContainer}>
                    <Text style={styles.previewText}>معاينة الفيديو:</Text>
                    <Video
                        source={{ uri: selectedVideo }}
                        style={styles.video}
                        useNativeControls
                        resizeMode={ResizeMode.CONTAIN}
                        isLooping
                    />
                    {/* زر لنشر الفيديو */}
                    <TouchableOpacity style={styles.publishButton}>
                        <Text style={styles.buttonText}>نشر الفيديو</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
};

export default Add;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#007bff',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
        marginBottom: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
    videoContainer: {
        marginTop: 20,
        alignItems: 'center',
    },
    previewText: {
        fontSize: 18,
        marginBottom: 10,
    },
    video: {
        width: 300,
        height: 200,
    },
    publishButton: {
        backgroundColor: '#28a745',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
        marginTop: 20,
    },
});
