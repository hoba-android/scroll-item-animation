import React, { useRef } from "react";
import {
  StatusBar,
  FlatList,
  Image,
  Animated,
  Text,
  View,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Easing,
  SafeAreaViewBase,
  SafeAreaView,
} from "react-native";
const { width, height } = Dimensions.get("screen");
import faker from "faker";

faker.seed(10);

const DATA = [...Array(30).keys()].map((_, i) => {
  return {
    key: faker.random.uuid(),
    image: `https://randomuser.me/api/portraits/${faker.helpers.randomize([
      "women",
      "men",
    ])}/${faker.random.number(60)}.jpg`,
    name: faker.name.findName(),
    jobTitle: faker.name.jobTitle(),
    email: faker.internet.email(),
  };
});

const SPACING = 20;
const AVATAR_SIZE = 70;
const ITEM_SIZE = AVATAR_SIZE + SPACING * 3;

const BG_IMG =
  "https://www.dpie.nsw.gov.au/__data/assets/image/0003/271659/stars.jpg";

export default function App() {
  const scrollY = useRef(new Animated.Value(0)).current;

  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <Image
        source={{ uri: BG_IMG }}
        style={StyleSheet.absoluteFill}
        blurRadius={10}
      />
      <Animated.FlatList
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        contentContainerStyle={{
          padding: SPACING,
          paddingTop: StatusBar.currentHeight || 12,
        }}
        data={DATA}
        keyExtractor={(item) => item.key}
        renderItem={({ item, index }) => {
          const inputRange = [
            -1,
            0,
            ITEM_SIZE * index,
            ITEM_SIZE * (index + 1),
          ];
          const opacityInputRange = [
            -1,
            0,
            ITEM_SIZE * index,
            ITEM_SIZE * (index + 2),
          ];
          const scale = scrollY.interpolate({
            inputRange: inputRange,
            outputRange: [2, 1, 1, 0],
          });
          const opacity = scrollY.interpolate({
            inputRange: opacityInputRange,
            outputRange: [1, 1, 1, 0],
          });
          return (
            <Animated.View
              style={{
                flexDirection: "row",
                padding: SPACING,
                marginBottom: SPACING,
                backgroundColor: "rgba(255,255,255,0.8)",
                shadowColor: "#000",
                shadowOpacity: 0.4,
                shadowRadius: 20,
                shadowOffset: { width: 0, height: 10 },
                elevation: 20,
                borderRadius: 12,
                transform: [{ scale }],
                opacity,
              }}
            >
              <Image
                style={{
                  width: AVATAR_SIZE,
                  height: AVATAR_SIZE,
                  borderRadius: AVATAR_SIZE,
                  marginRight: SPACING / 2,
                }}
                source={{ uri: item.image }}
              />
              <View>
                <Text style={{ fontSize: 22, fontWeight: "700" }}>
                  {item.name}
                </Text>
                <Text style={{ fontSize: 18, opacity: 0.7 }}>
                  {item.jobTitle}
                </Text>
                <Text style={{ fontSize: 14, opacity: 0.8, color: "#0099cc" }}>
                  {item.email}
                </Text>
              </View>
            </Animated.View>
          );
        }}
      />
      <StatusBar hidden />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
