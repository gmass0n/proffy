import React from "react";
import { View, ScrollView } from "react-native";

import PageHeader from "../../components/PageHeader";

import TeacherItem from "../../components/TeacherItem";

import styles from "./styles";

const Favorites: React.FC = () => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <PageHeader title="Meus Proffys favoritos" />
      </View>
    </View>
  );
};

export default Favorites;
