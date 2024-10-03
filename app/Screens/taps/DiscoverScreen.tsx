import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, Image, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const images = [
    { id: 1, url: 'https://via.placeholder.com/300x300.png?text=Image1' },
    { id: 2, url: 'https://via.placeholder.com/300x300.png?text=Image2' },
    { id: 3, url: 'https://via.placeholder.com/300x300.png?text=Image3' },
    { id: 4, url: 'https://via.placeholder.com/300x300.png?text=Image4' },
    { id: 5, url: 'https://via.placeholder.com/300x300.png?text=Image5' },
    { id: 6, url: 'https://via.placeholder.com/300x300.png?text=Image6' },
    { id: 7, url: 'https://via.placeholder.com/300x300.png?text=Image7' },
    { id: 8, url: 'https://via.placeholder.com/300x300.png?text=Image8' },
];

const { width } = Dimensions.get('window');

// دالة لخلط العناصر في المصفوفة بشكل عشوائي
const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
};

const DiscoverScreen = () => {
    const [shuffledImages, setShuffledImages] = useState([]);

    useEffect(() => {
        // خلط الصور بشكل عشوائي عند تحميل الشاشة
        setShuffledImages(shuffleArray([...images]));
    }, []);

    // دالة لتوليد عرض وارتفاع عشوائيين لكل صورة
    const getRandomSize = () => {
        const minSize = width / 2 - 50; // أصغر حجم للصورة
        const maxSize = width / 2 + 20; // أكبر حجم للصورة
        const randomWidth = Math.floor(Math.random() * (maxSize - minSize + 1)) + minSize;
        const randomHeight = Math.floor(Math.random() * (maxSize - minSize + 1)) + minSize;
        return { width: randomWidth, height: randomHeight };
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>استكشاف</Text>

            <FlatList
                data={shuffledImages}
                keyExtractor={(item) => item.id.toString()}
                numColumns={2} // عرض الصور في عمودين
                renderItem={({ item }) => {
                    const { width: randomWidth, height: randomHeight } = getRandomSize(); // الحصول على حجم عشوائي
                    return (
                        <View style={[styles.imageContainer, { width: randomWidth, height: randomHeight }]}>
                            <Image source={{ uri: item.url }} style={[styles.image, { width: randomWidth, height: randomHeight }]} />
                        </View>
                    );
                }}
            />
        </SafeAreaView>
    );
};

export default DiscoverScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        padding: 5,
    },
    title: {
        fontSize: 24,
        textAlign: 'center',
        margin: 10,
        color: '#fff',
        fontFamily: 'Cairo-Bold',
    },
    imageContainer: {
        margin: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        borderRadius: 15,
    },
});
