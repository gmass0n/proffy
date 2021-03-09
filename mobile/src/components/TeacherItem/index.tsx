import React, { useCallback, useMemo, useState } from "react";
import { View, Image, Text, Linking } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-community/async-storage";

import heartOutlineIcon from "../../assets/images/icons/heart-outline.png";
import unfavoriteIcon from "../../assets/images/icons/unfavorite.png";
import whatssappIcon from "../../assets/images/icons/whatsapp.png";

import styles from "./styles";

interface Teacher {
  id: string;
  name: string;
  subject: string;
  bio: string;
  avatar?: string;
  cost: number;
  whatsapp: string;
}

interface TeacherItemProps {
  teacher: Teacher;
  favorited: boolean;
}

const TeacherItem: React.FC<TeacherItemProps> = ({ teacher, favorited }) => {
  const [isFavorited, setIsFavorited] = useState(favorited);

  const whatsappMessage = useMemo(() => {
    return "Olá, gostaria de agendar um horário.";
  }, []);

  const handleLinkToWhatsapp = useCallback(() => {
    Linking.openURL(
      `whatsapp://send?text=${whatsappMessage}&phone=55${teacher.whatsapp}`
    );
  }, [teacher]);

  const handleToggleFavorite = useCallback(async () => {
    const favorites = await AsyncStorage.getItem("favorites");

    let favoritesArray: Teacher[] = [];

    if (favorites) {
      favoritesArray = JSON.parse(favorites);
    }

    if (isFavorited) {
      favoritesArray = favoritesArray.filter(teacherItem => teacherItem.id !== teacher.id);

      setIsFavorited(false);
    } else {
      favoritesArray.push(teacher);

      setIsFavorited(true);
    }

    await AsyncStorage.setItem("favorites", JSON.stringify(favoritesArray));
  }, [isFavorited, teacher]);

  return (
    <View style={styles.container}>
      <View style={styles.profile}>
        {teacher.avatar && (
          <Image style={styles.avatar} source={{ uri: teacher.avatar }} />
        )}

        <View>
          <Text style={styles.name}>{teacher.name}</Text>

          <Text style={styles.subject}>{teacher.subject}</Text>
        </View>
      </View>

      <Text style={styles.bio}>{teacher.bio}</Text>

      <View style={styles.footer}>
        <Text style={styles.price}>
          Preço/hora {"   "}
          <Text style={styles.priceValue}>R$ {teacher.cost}</Text>
        </Text>

        <View style={styles.buttonsContainer}>
          <RectButton
            style={[styles.favoriteButton, isFavorited ? styles.favorited : {}]}
            onPress={handleToggleFavorite}
          >
            {isFavorited ? (
              <Image source={unfavoriteIcon} />
            ) : (
              <Image source={heartOutlineIcon} />
            )}
          </RectButton>

          <RectButton
            style={styles.contactButton}
            onPress={handleLinkToWhatsapp}
          >
            <Image source={whatssappIcon} />

            <Text style={styles.contactButtonText}>Entrar em contanto</Text>
          </RectButton>
        </View>
      </View>
    </View>
  );
};

export default TeacherItem;
