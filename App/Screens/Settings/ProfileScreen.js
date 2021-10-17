import React, { useState } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList } from "react-native";
import StarRating from "react-native-star-rating";
const Profile = () => {
  const [StarRatings, setStarRatings] = useState(3.5);
  const changeRating = (rating) => {
    setStarRatings(rating);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}></View>
      <Image
        style={styles.avatar}
        source={{ uri: "https://bootdey.com/img/Content/avatar/avatar6.png" }}
      />  
      <View style={styles.body}>
        <View style={styles.bodyContent}>
          <Text style={styles.name}>Syed Saad Zahidi</Text>
          <Text style={styles.info}>Away / Online</Text>
        </View>
      </View>
      <View style={styles.star}>
        <StarRating
          disabled={false}
          maxStars={5}
          fullStarColor={'#3CAABB'}
          rating={StarRatings}
          selectedStar={(rating) => changeRating(rating)}
        />
        <Text style={styles.description}>No Completion Rate </Text>
      </View>
      <FlatList>
          <View style={styles.bodyContent }>
              <Text style={styles.name}>Text</Text>
          </View>
      </FlatList>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#00BFFF",
    height: 150,
  },
  star: {
    marginTop: 50,
    textAlign: "center",
    marginRight: 90,
    marginLeft: 90,
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom: 10,
    alignSelf: "center",
    position: "absolute",
    marginTop: 80,
  },
  name: {
    fontSize: 22,
    color: "#FFFFFF",
    fontWeight: "600",
  },
  body: {
    marginTop: 40,
  },
  bodyContent: {
    flex: 1,
    alignItems: "center",
    padding: 30,
  },
  name: {
    fontSize: 28,
    color: "#696969",
    fontWeight: "600",
  },
  info: {
    fontSize: 16,
    color: "#00BFFF",
    marginTop: 10,
  },
  description: {
    fontSize: 16,
    color: "#696969",
    marginTop: 10,
    textAlign: "center",
  },
  buttonContainer: {
    marginTop: 10,
    height: 45,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
    backgroundColor: "#00BFFF",
  },
});
