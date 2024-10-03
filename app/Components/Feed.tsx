import { Animated, Text, View, TouchableOpacity, StyleSheet, Pressable } from 'react-native';
import React, { useRef, useEffect, useState } from 'react';
import { AntDesign, Ionicons, FontAwesome, FontAwesome6, FontAwesome5 } from '@expo/vector-icons';
import { Video, ResizeMode } from 'expo-av';
import { useWindowDimensions } from 'react-native';


const Feed = ({ item, index, currentIndex, videoRefs }) => {
    const [isPlaying, setIsPlaying] = useState(true); // للتحكم في تشغيل الفيديو أو إيقافه
    const [showHeart, setShowHeart] = useState(false); // للتحكم في إظهار القلب
    const [showPlayIcon, setShowPlayIcon] = useState(false); // لإظهار أيقونة التشغيل/الإيقاف
    const musicEffect = useRef(new Animated.Value(1)).current;
    const heartAnimation = useRef(new Animated.Value(0)).current; // أنيميشن للقلب
    const playIconAnimation = useRef(new Animated.Value(0)).current; // أنيميشن لأيقونة التشغيل/الإيقاف
    const rotation = useRef(new Animated.Value(0)).current; // أنيميشن دوران الصورة
    const { height, width } = useWindowDimensions();

    const rotateAnimation = rotation.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });

    // Animation for music effect
    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(musicEffect, {
                    toValue: 1.5, // Scales the music icon up
                    duration: 1000,
                    useNativeDriver: true,
                }),
                Animated.timing(musicEffect, {
                    toValue: 1, // Scales the music icon back to normal
                    duration: 1000,
                    useNativeDriver: true,
                }),
            ])
        ).start();
    }, []);

    // Animation for rotating profile picture
    useEffect(() => {
        Animated.loop(
            Animated.timing(rotation, {
                toValue: 1,
                duration: 5000, // Rotate for 5 seconds
                useNativeDriver: true,
            })
        ).start();
    }, []);

    // التحكم في الضغط المزدوج والضغط الفردي
    const lastTap = useRef(null);
    const handleTap = () => {
        const now = Date.now();
        const DOUBLE_PRESS_DELAY = 300;
        if (lastTap.current && (now - lastTap.current) < DOUBLE_PRESS_DELAY) {
            // إذا كان الضغط مزدوجًا
            triggerHeartAnimation();
        } else {
            // إذا كان الضغط فرديًا
            const isPlayingNow = !isPlaying;
            setIsPlaying(isPlayingNow);
            triggerPlayPauseIcon(); // إظهار تأثير التشغيل/الإيقاف
            if (videoRefs.current[index]) {
                if (isPlayingNow) {
                    videoRefs.current[index].playAsync();
                } else {
                    videoRefs.current[index].pauseAsync();
                }
            }
        }
        lastTap.current = now;
    };

    // Animation for play/pause icon
    const triggerPlayPauseIcon = () => {
        setShowPlayIcon(true);
        Animated.sequence([
            Animated.timing(playIconAnimation, {
                toValue: 1,
                duration: 200,
                useNativeDriver: true,
            }),
            Animated.timing(playIconAnimation, {
                toValue: 0,
                duration: 800,
                delay: 400,
                useNativeDriver: true,
            }),
        ]).start(() => {
            setShowPlayIcon(false);
        });
    };

    // Animation for heart when double-tapped
    const triggerHeartAnimation = () => {
        setShowHeart(true); // إظهار القلب
        Animated.sequence([
            Animated.timing(heartAnimation, {
                toValue: 1.5, // تكبير القلب
                duration: 400,
                useNativeDriver: true,
            }),
            Animated.timing(heartAnimation, {
                toValue: 0, // تصغير القلب ثم إخفاؤه
                duration: 400,
                useNativeDriver: true,
            }),
        ]).start(() => {
            setShowHeart(false); // إخفاء القلب بعد انتهاء الأنيميشن
        });
    };

    return (
        <Pressable style={[styles.videoContainer, { height: height }]} onPress={handleTap}>
            <Video
                ref={(ref) => (videoRefs.current[index] = ref)} // تخزين مراجع الفيديوهات
                source={{ uri: item.url }}
                resizeMode={ResizeMode.CONTAIN}
                shouldPlay={currentIndex === index}  // تشغيل الفيديو الحالي فقط
                isLooping
                style={[styles.video, StyleSheet.absoluteFill]}
            />
            {/* القلب الذي يظهر عند الضغط المزدوج */}
            {showHeart && currentIndex === index && (
                <Animated.View style={[styles.heartContainer, { transform: [{ scale: heartAnimation }] }]}>
                    <AntDesign name="heart" size={100} color="red" />
                </Animated.View>
            )}

            {/* أيقونة التشغيل/الإيقاف التي تظهر عند النقر */}
            {showPlayIcon && currentIndex === index && (
                <Animated.View style={[styles.playPauseIconContainer, { opacity: playIconAnimation }]}>
                    <FontAwesome5
                        name={isPlaying ? 'pause' : 'play'}
                        size={60}
                        color="white"
                    />
                </Animated.View>
            )}

            {/* بيانات الفيديو الخاصة مثل اللايكات والكومنتات */}
            <View style={styles.interactionContainer}>
                <TouchableOpacity style={styles.interactionButton}>
                    <AntDesign name="hearto" size={30} color="white" />
                    <Text style={styles.iconText}>{(item.likes / 1000).toFixed(1)}K</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.interactionButton}>
                    <AntDesign name="message1" size={30} color="white" />
                    <Text style={styles.iconText}>{(item.comments / 1000).toFixed(1)}K</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.interactionButton}>
                    <AntDesign name="sharealt" size={30} color="white" />
                    <Text style={styles.iconText}>{(item.shares / 1000).toFixed(1)}K</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.interactionButton}>
                    <AntDesign name="download" size={30} color="white" />
                </TouchableOpacity>

                {/* صورة الشخصية مع تأثير الدوران */}
                <View style={styles.profileContainer}>
                    <Animated.Image
                        source={{ uri: 'https://randomuser.me/api/portraits/men/41.jpg' }}
                        style={[styles.profileImage, { transform: [{ rotate: rotateAnimation }] }]}
                    />
                    {/* أيقونة الموسيقى مع تأثير الأنيميشن */}
                    <Animated.View style={{ transform: [{ scale: musicEffect }] }}>
                        <Ionicons name="musical-notes-outline" size={30} color="white" style={styles.musicIcon} />
                    </Animated.View>
                </View>
            </View>
        </Pressable>
    );
};

export default Feed;

const styles = StyleSheet.create({
    videoContainer: {},
    video: {},
    heartContainer: {
        position: 'absolute',
        top: '40%',
        left: '35%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    playPauseIconContainer: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        justifyContent: 'center',
        alignItems: 'center',
        transform: [{ translateX: -30 }, { translateY: -30 }],
    },
    interactionContainer: {
        position: 'absolute',
        right: 20,
        bottom: 80,
        justifyContent: 'space-around',
        alignItems: 'center',
        height: '40%',
    },
    interactionButton: {
        marginBottom: 20,
        alignItems: 'center',
    },
    iconText: {
        color: 'white',
        fontSize: 12,
        marginTop: 5,
        textAlign: 'center',
    },
    profileContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    profileImage: {
        width: 60,
        height: 60,
        borderRadius: 30,
        borderWidth: 2,
        borderColor: 'white',
    },
    musicIcon: {
        position: 'absolute',
        top: -15,
        right: -15,
    },
});
