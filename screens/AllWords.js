import {
  View,
  FlatList,
  StyleSheet,
  Image,
  Pressable,
  Text,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useState, useEffect, use } from "react";
import Item from "../components/ListItem";
import Ionicons from "@expo/vector-icons/Ionicons";

import { COLORS } from "../constants";

function AllWords() {
  const [myWords, setMyWords] = useState([]);
  const navigation = useNavigation();
  const route = useRoute();
  const onPressAddWord = () => {
    navigation.navigate("AddWord");
  };

  const onPressEditWord = (item) => {
    console.log("pressed", item.word);
    navigation.navigate("EditWord", { word: item });
  };

  const newWord = route.params?.newWord;

  useEffect(() => {
    if (newWord) {
      setMyWords((prev) =>
        prev.some((item) => item.word === newWord.word)
          ? prev
          : [...prev, newWord],
      );
    }
  }, [newWord]);

  const editedWord = route.params.editedWord;

  useEffect(() => {
    if (editedWord) {
      setMyWords((prev) =>
        prev.map((w) => (w.word === editedWord.word ? editedWord : w)),
      );
      navigation.setParams({ editedWord: undefined });
    }
  }, [editedWord]);

  function deleteWord(wordToDelete) {
    setMyWords((prev) => prev.filter((item) => item.word != wordToDelete));
  }

  return (
    <View style={styles.mainContainer}>
      <Pressable style={styles.addPressable} onPress={onPressAddWord}>
        <Ionicons name="add-outline" size={46} color={COLORS.white} />
      </Pressable>
      <View style={{ flex: 2 }}>
        <FlatList
          data={myWords}
          renderItem={({ item }) => (
            <Item
              item={item}
              onDelete={deleteWord}
              onPress={() => onPressEditWord(item)}
            />
          )}
          keyExtractor={(item) => item.word}
          ListEmptyComponent={
            <View style={styles.empty}>
              <Text style={styles.textEmpty}>No words yet</Text>
            </View>
          }
          ListHeaderComponent={
            <View style={styles.imageContainer}>
              <Image
                style={styles.image}
                source={require("../assets/cartoon-squirrel-mike-sm.png")}
              />
            </View>
          }
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: "#474747",
    flex: 1,
  },
  imageContainer: {
    height: 220,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    zIndex: 10,
  },
  addPressable: {
    position: "absolute",
    width: 60,
    borderRadius: 30,
    aspectRatio: 1,
    top: 210,
    right: "10%",
    backgroundColor: COLORS.primary900,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
    elevation: 5,
  },
  image: {
    width: "45%",
    height: undefined,
    aspectRatio: 1,
    alignSelf: "center",
    resizeMode: "contain",
  },
  empty: {
    height: 300,
    backgroundColor: COLORS.white,
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
  },
  textEmpty: {
    fontSize: 40,
    color: COLORS.primary200,
  },
});

export default AllWords;
