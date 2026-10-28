import {
  View,
  StyleSheet,
  Image,
  Pressable,
  Text,
  TextInput,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useState, useEffect } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { playSound } from "../services/soundHandler";
import { COLORS } from "../constants";

export default function EditWord() {
  const navigation = useNavigation();
  const route = useRoute();
  const newWord = route.params?.word;
  const [form, setForm] = useState({
    phonetics: newWord?.phonetics ?? "",
    partOfSpeech: newWord?.partOfSpeech ?? "",
    meaning: newWord?.meaning ?? "",
  });

  const onSavePress = () => {
    navigation.navigate("AllWords", { editedWord: { ...newWord, ...form } });
  };

  const onChangeField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  useEffect(() => {
    navigation.setOptions({
      title: newWord?.word ? `Editing word "${newWord.word}"` : "Editing word",
    });
  }, [newWord, navigation]);

  return (
    <View style={styles.screen}>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={require("../assets/edit.png")} />
      </View>

      {newWord && (
        <View style={styles.receivedInfoContainer}>
          <View style={styles.wordRow}>
            <Text style={styles.word}>{newWord.word}</Text>
            {newWord.audio && (
              <Pressable onPress={() => playSound(newWord.audio)}>
                <Ionicons
                  name="volume-medium-outline"
                  size={28}
                  color={COLORS.primary900}
                />
              </Pressable>
            )}
          </View>

          <View style={styles.form}>
            <View style={styles.row}>
              <View style={styles.rowField}>
                <Text style={styles.label}>Phonetics</Text>
                <TextInput
                  style={styles.input}
                  value={form.phonetics}
                  onChangeText={(t) => onChangeField("phonetics", t)}
                />
              </View>
              <View style={styles.field}>
                <Text style={styles.label}>Part of speech</Text>
                <TextInput
                  style={styles.input}
                  value={form.partOfSpeech}
                  onChangeText={(t) => onChangeField("partOfSpeech", t)}
                />
              </View>
            </View>

            <View style={styles.field}>
              <Text style={styles.label}>Meaning</Text>
              <TextInput
                style={[styles.input, styles.multiline]}
                value={form.meaning}
                onChangeText={(t) => onChangeField("meaning", t)}
                multiline
              />
            </View>
          </View>

          <Pressable style={styles.buttonContainer} onPress={onSavePress}>
            <Text style={styles.buttonText}>Save</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#474747",
  },
  imageContainer: {
    height: 180,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 25,
  },
  image: {
    width: "45%",
    height: "100%",
    resizeMode: "contain",
  },
  receivedInfoContainer: {
    paddingHorizontal: 16,
    gap: 20,
  },
  wordRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
  },
  word: {
    fontSize: 32,
    color: "white",
  },
  form: {
    gap: 16,
  },
  row: {
    flexDirection: "row",
    gap: 12,
  },
  field: {
    gap: 6,
  },
  rowField: {
    flex: 1,
    gap: 6,
  },
  label: {
    fontSize: 12,
    color: "grey",
  },
  input: {
    minHeight: 44,
    fontSize: 18,
    color: "white",
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  multiline: {
    minHeight: 110,
    textAlignVertical: "top",
  },
  buttonContainer: {
    height: 48,
    borderRadius: 8,
    backgroundColor: COLORS.primary900,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 20,
    color: COLORS.white,
  },
});
