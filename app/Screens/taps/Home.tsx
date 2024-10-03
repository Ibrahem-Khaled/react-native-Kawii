import React, { useRef, useState } from 'react';
import { FlatList, Dimensions } from 'react-native';
import Feed from '../../Components/Feed';
import Header from '../../Components/Header';
import { SafeAreaView} from 'react-native-safe-area-context';
const { height } = Dimensions.get('window');

// بيانات الفيديوهات الوهمية
const videos = [
    { id: 1, url: 'https://www.w3schools.com/html/mov_bbb.mp4', likes: 23500, comments: 3800, shares: 2400 },
    { id: 2, url: 'https://www.w3schools.com/html/movie.mp4', likes: 12500, comments: 2300, shares: 1400 },
    { id: 3, url: 'https://www.w3schools.com/html/mov_bbb.mp4', likes: 19500, comments: 3200, shares: 2100 },
];

const HomeScreen = () => {
    const videoRefs = useRef([]);  // قائمة مراجع الفيديوهات
    const [currentIndex, setCurrentIndex] = useState(0);  // المؤشر الحالي

    const handleScroll = (event) => {
        const offsetY = event.nativeEvent.contentOffset.y;
        const newIndex = Math.round(offsetY / height); // حساب المؤشر بناءً على موضع التمرير
        setCurrentIndex(newIndex);

        // تشغيل الفيديو الحالي وإيقاف الفيديوهات الأخرى
        videoRefs.current.forEach((video, i) => {
            if (video) {
                if (i === newIndex) {
                    video.playAsync();
                } else {
                    video.pauseAsync();
                }
            }
        });
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#000' }}>
            <Header />
            <FlatList
                data={videos}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item, index }) => (
                    <Feed item={item} index={index} currentIndex={currentIndex} videoRefs={videoRefs} />
                )}
                pagingEnabled
                showsVerticalScrollIndicator={false}
                onScroll={handleScroll} // مراقبة التمرير
                scrollEventThrottle={16} // استدعاء دالة التمرير بسرعة لتجنب التأخير
                getItemLayout={(data, index) => (
                    { length: height, offset: height * index, index }  // لضبط ارتفاع كل عنصر بشكل صحيح
                )}
            />
        </SafeAreaView>
    );
};

export default HomeScreen;
