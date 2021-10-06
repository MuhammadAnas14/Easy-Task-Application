import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  button,
} from "react-native";
import MessageData from "../Data/Chat.json";
import {
  Container,
  Card,
  UserInfo,
  UserImgWrapper,
  UserImg,
  UserInfoText,
  UserName,
  PostTime,
  MessageText,
  TextSection,
} from "../Styles/Messagestyle";

function Item({ item }) {
  return (
    <View style={styles.listItem}>
      {/* <Image
        source={{ uri: item.photo }}
        style={{ width: 60, height: 60, borderRadius: 30 }}
      />
      <View style={{ margin: 4, flex: 1 }}>
        <Text style={{ fontWeight: "bold", margin: 3 }}>{item.name}</Text>
        <Text style={{ margin: 3 }}>{item.chat} </Text>
      </View> */}

      <UserInfo>
        <UserImgWrapper>
          <UserImg source={{ uri: item.photo }} />
        </UserImgWrapper>
        <TextSection>
          <UserInfoText>
            <UserName>{item.name}</UserName>
            <PostTime>{item.messageTime}</PostTime>
          </UserInfoText>
          <MessageText>{item.chat}</MessageText>
        </TextSection>
      </UserInfo>
    </View>
  );
}

const MessagesScreen = ({ navigation }) => {
  const [TaskData, setTaskData] = useState(MessageData);

  return (
    <View style={styles.container}>
      <Container>
        <FlatList
          style={{ flex: 1 }}
          data={TaskData}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Card onPress={() => navigation.navigate("Chat", {userName: item.name})}>
              <UserInfo>
                <UserImgWrapper>
                  <UserImg source={{ uri: item.photo }} />
                </UserImgWrapper>
                <TextSection>
                  <UserInfoText>
                    <UserName>{item.name}</UserName>
                    <PostTime>{item.messageTime}</PostTime>
                  </UserInfoText>
                  <MessageText>{item.chat}</MessageText>
                </TextSection>
              </UserInfo>
            </Card>
          )}
        />
      </Container>
    </View>
  );
};

export default MessagesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
