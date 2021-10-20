import React, { useState } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList, ScrollView } from "react-native";
import StarRating from "react-native-star-rating";

function Item({ item }) {
  return (
    <View style={styles.listItem}>  
        <View style={{flex: 1 }}>
        <Text style={styles.Heading}>{item.title}</Text>
      </View>
    </View>
  );
}

const Profile = () => {
  const [StarRatings, setStarRatings] = useState(3.5);
  //   const changeRating = (rating) => {
  //   setStarRatings(rating);
  // };
  const Data = [
    {
      id: "1",
      title: "You previous task was completed",
      icons: "email",
      obj: "Email",
    },
    {
      id: "2",
      title: "Are you looking for a Carpenter? Check this",
      icons: "phone",
      obj: "Phone Number",
    },
  ];
  return (
    <View style={styles.container}>
      <ScrollView>
      <View style={styles.header}>
      <Image
        style={styles.avatar}
        source={{ uri: "https://bootdey.com/img/Content/avatar/avatar6.png" }}
      />  
      </View>
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
        />
        </View>
        <Text style={styles.description}>No Completion Rate </Text>
      <View>

        <FlatList
        style={{ flex: 1 }}
        data={Data}
        renderItem={({ item }) => <Item item={item} />}
        keyExtractor={(item) => item.id}
      />
      </View>
      </ScrollView>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    marginTop: 0,
    textAlign: "center",
    justifyContent: "center",
  },
  header: {
    backgroundColor: "#00BFFF",
    height: 100,
  },
  star: {
    textAlign: "center",
    marginRight: 90,
    marginLeft: 90,
    marginTop:-15
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
    marginTop: 35,
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
    fontFamily:""
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
  Heading: {
    margin:0,
    fontSize: 16,
    color: "#696969",
    marginTop: 10,
    padding: 10,
    flexDirection:"row",
    display: "flex",
  },
  listItem: {
    padding: 10,
    backgroundColor: "#FFF",
    width: "100%",
    flex: 1,
    borderRadius: 5,
    flexDirection: 'row',
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
