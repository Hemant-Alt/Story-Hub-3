import * as React from "react";
import { Header } from "react-native-elements";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  ToastAndroid,
  Platform,
  Keyboard,
} from "react-native";
import * as firebase from "firebase";
import db from "../config";

export default class WriteStoryScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      title: "",
      author: "",
      storyText: "",
    };
  }

  submitStory = async () => {
    db.collection("stories").add({
      title: this.state.title,
      author: this.state.author,
      storyText: this.state.storyText,
      date: firebase.firestore.Timestamp.now().toDate(),
    });
    
    ToastAndroid.show("The story is submitted.", ToastAndroid.SHORT);
    this.setState({
      title: "",
      author: "",
      storyText: "",
    });
  };

  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: "white",
        }}
      >
        <Header
          backgroundColor={"lightblue"}
          centerComponent={{
            text: "Story Hub",
            style: { fontSize: 28, color: "grey" },
          }}
        />
        <TouchableWithoutFeedback
          onPress={() => {
            Keyboard.dismiss();
          }}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            enabled
          >
            <TextInput
              style={styles.inputBox}
              placeholder="Stor'y Title"
              placeholderTextColor="black"
              onChangeText={(txt) => this.setState({ title: txt })}
              value={this.state.title}
            />
            <TextInput
              style={styles.inputBox}
              placeholder="The Author"
              placeholderTextColor="black"
              onChangeText={(txt) => {
                this.setState({ author: txt });
              }}
              value={this.state.author}
            />
            <TextInput
              style={styles.inputBoxMultiline}
              placeholder="Type in your Story"
              placeholderTextColor="black"
              onChangeText={(txt) => {
                this.setState({
                  storyText: txt,
                });
              }}
              value={this.state.storyText}
              multiline={true}
            />

            <TouchableOpacity style={styles.button} onPress={this.submitStory}>
              <Text style={styles.buttonText}>Submit the story</Text>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  inputBox: {
    width: "90%",
    height: 50,
    borderWidth: 2,
    margin: 20,
    padding: 5,
  },
  inputBoxMultiline: {
    width: "90%",
    height: "35%",
    borderWidth: 2,
    margin: 20,
    padding: 5,
  },
  button: {
    margin: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "red",
    width: 200,
    height: 50,
    alignSelf: "center",
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "bold",
  },
});