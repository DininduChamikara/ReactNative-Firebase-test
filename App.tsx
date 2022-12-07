import { StatusBar } from "expo-status-bar";
import {
  deleteDoc,
  doc,
  DocumentData,
  getDoc,
  setDoc,
} from "firebase/firestore";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { useState } from "react";
// Using DB Reference
import { db } from "./Core/config";

export default function App() {
  // Storing User Data
  const [userDoc, setUserDoc] = useState<DocumentData>();
  // update text
  const [text, setText] = useState("");

  // MARK: CRUD Functions
  const Create = () => {
    // MARK: Creating New Doc in Firebase

    const myDoc = doc(db, "MyCollection", "MyDocument");

    // Your Document Goes Here
    const docData = {
      name: "Dinindu",
      bio: "Student",
    };

    setDoc(myDoc, docData)
      // Handling Promises
      .then(() => {
        // MARK: Success
        alert("Document Created!");
      })
      .catch((error) => {
        // MARK: Failure
        alert(error.message);
      });
  };
  const Read = () => {
    // MARK: Reading Doc
    const myDoc = doc(db, "MyCollection", "MyDocument");

    getDoc(myDoc)
      // Handling Promises
      .then((snapshot) => {
        // MARK: Success
        if (snapshot.exists()) {
          setUserDoc(snapshot.data());
        } else {
          alert("No Doc Found");
        }
      })
      .catch((error) => {
        // MARK: Failure
        alert(error.message);
      });
  };
  const Update = (value: { bio: string }, merge: boolean) => {
    // MARK: Updating Doc
    const myDoc = doc(db, "MyCollection", "MyDocument");

    // If you set merge true then it will merge with existing doc otherwise it will be a fresh on
    setDoc(myDoc, value, { merge: merge })
      .then(() => {
        // MARK: Success
        alert("Updated Successfully");
        setText("");
      })
      .catch((error) => {
        // MARK: Failure
        alert(error.message);
      });
  };
  const Delete = () => {
    // MARK: Deleting Doc
    const myDoc = doc(db, "MyCollection", "MyDocument");

    deleteDoc(myDoc)
      .then(() => {
        // MARK: Success
        alert("Deleted Successfully!");
      })
      .catch((error) => {
        // MARK: Failure
        alert(error.message);
      });
  };

  return (
    <View style={styles.container}>
      <Button title="Create New Doc" onPress={Create}></Button>
      <Button title="Read Doc" onPress={Read}></Button>
      {userDoc != null && <Text>Bio: {userDoc.bio}</Text>}
      <TextInput
        style={{
          width: "95%",
          fontSize: 18,
          padding: 12,
          borderColor: "gray",
          borderWidth: 0.2,
          borderRadius: 10,
          marginVertical: 20,
        }}
        placeholder="Type Here"
        onChangeText={(text) => {
          setText(text);
        }}
        value={text}
      ></TextInput>

      <Button
        title="Update Doc"
        onPress={() => {
          Update(
            {
              bio: text,
            },
            true
          );
        }}
        disabled={text == ""}
      ></Button>

      <Button title="Delete Doc" onPress={Delete}></Button>
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
