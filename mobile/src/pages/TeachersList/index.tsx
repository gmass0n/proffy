import React, { useRef, useCallback, useState, useEffect } from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { Modalize } from "react-native-modalize";
import { Portal } from "react-native-portalize";
import { Picker } from "@react-native-community/picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Feather } from '@expo/vector-icons'
import { RectButton } from "react-native-gesture-handler";
import AsyncStorage from '@react-native-community/async-storage';

import PageHeader from "../../components/PageHeader";
import TeacherItem from "../../components/TeacherItem";

import styles from "./styles";
import api from "../../services/api";
import formatTime from "../../utils/formatTime";

type SelectedInput = "subject" | "weekDay" | "time";

interface FilterData {
  weekDay: {
    label: string;
    value: string
  };
  time: Date;
  subject: string;
}

interface Teacher {
  id: string;
  name: string;
  subject: string;
  bio: string;
  avatar: string;
  cost: number;
  whatsapp: string;
}

const subjects = [
  { value: "Artes", label: "Artes" },
  { value: "Biologia", label: "Biologia" },
  { value: "Ciências", label: "Ciências" },
  { value: "Educação Física", label: "Artes" },
  { value: "Matemática", label: "Matemática" },
  { value: "Portugûes", label: "Portugûes" },
  { value: "Quimíca", label: "Quimíca" },
  { value: "História", label: "História" },
  { value: "Sociologia", label: "Sociologia" },
  { value: "Filosofia", label: "Filosofia" },
  { value: "Inglês", label: "Inglês" },
  { value: "Espanhol", label: "Espanhol" },
];

const weekDays = [
  { value: "0", label: "Domingo" },
  { value: "1", label: "Segunda-feira" },
  { value: "2", label: "Terça-feira" },
  { value: "3", label: "Quarta-feira" },
  { value: "4", label: "Quinta-feira" },
  { value: "5", label: "Sexta-feira" },
  { value: "6", label: "Sábado" },
];

const TeachersList: React.FC = () => {
  const modalizeRef = useRef<Modalize>(null);

  const [selectedInput, setSelectedInput] = useState<SelectedInput>("subject");
  const [isFiltersVisible, setIsFiltersVisible] = useState(false);

  const [filterData, setFilterData] = useState<FilterData>({
    subject: '',
    time: new Date(),
    weekDay: {
      label: '',
      value: ''
    }
  })

  const [favorites, setFavorites] = useState<string[]>([]);
  const [teachers, setTeachers] = useState<Teacher[]>([]);

  async function loadFavoritesList() {
    const response = await AsyncStorage.getItem('favorites');
    
    if(response) {
      const favoritedTeachers: Teacher[] = JSON.parse(response);
      const favoritedTeachersIds = favoritedTeachers.map((teacher) => {
        return teacher.id
      })

      setFavorites(favoritedTeachersIds);
    }
  }

  useEffect(() => {
    loadFavoritesList();
  }, [])

  useEffect(() => {
    async function loadClasses() {
      const response = await api.get('/classes');

      if(response.data) {
        setTeachers(response.data);
      }
    }

    loadClasses();
  }, [])
  
  const handleOpenModal = useCallback(
    (input: SelectedInput) => {
      setSelectedInput(input);

      modalizeRef.current?.open();
    },
    [modalizeRef]
  );

  const handleToggleFiltersVisible = useCallback(() => {
    setIsFiltersVisible((prevState) => !prevState);
  }, [])

  const handleChangeSubject = useCallback((value) => {
    setFilterData((prevState) => ({
      ...prevState,
      subject: value
    }))
  }, []);

  const handleChangeWeekDay = useCallback((value) => {
    const findWeekDay = weekDays.find((weekDay) => weekDay.value === value);

    if(findWeekDay) {
      setFilterData((prevState) => ({
        ...prevState,
        weekDay: findWeekDay
      }))
    }
  }, [weekDays]);

  const handleChangeTime = useCallback((event, selectedDate) => {
    setFilterData((prevState) => ({
      ...prevState,
      time: selectedDate
    }))
  }, [])

  const handleFiltersSubmit = useCallback(async () => {
    try {
      loadFavoritesList();

      const { subject, time, weekDay } = filterData;

      const data = {
        weekDay: weekDay.value,
        time: formatTime(time),
        subject
      }

      const response = await api.get('/classes', {
        params: data
      })

      setTeachers(response.data);
      setIsFiltersVisible(false);
    } catch(error) {
      return;
    }
  }, [filterData, loadFavoritesList])

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <PageHeader title="Proffys disponíveis" headerRight={(
          <RectButton onPress={handleToggleFiltersVisible} style={styles.filterButton}>
            <Feather name="filter" size={16} color="#fff" />
          </RectButton>
        )}>
          {isFiltersVisible && (
            <View style={styles.searchForm}>
              <TouchableOpacity
                onPress={() => handleOpenModal("subject")}
                activeOpacity={0.8}
              >
                <Text style={styles.label}>Materias</Text>

                <View style={styles.input}>
                  {filterData.subject ? (
                    <Text style={styles.inputText}>{filterData.subject}</Text>
                  ) : (
                    <Text style={styles.inputPlaceholder}>Qual a matéria?</Text>
                  )}
                </View>
              </TouchableOpacity>

              <View style={styles.inputGroup}>
                <TouchableOpacity
                  onPress={() => handleOpenModal("weekDay")}
                  activeOpacity={0.8}
                  style={styles.inputPrimary}
                >
                  <Text style={styles.label}>Dia da semana</Text>

                  <View style={styles.input}>
                    {filterData.weekDay.value ? (
                      <Text style={styles.inputText}>{filterData.weekDay.label}</Text>
                    ) : (
                      <Text style={styles.inputPlaceholder}>Qual o dia da semana?</Text>
                    )}
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => handleOpenModal("time")}
                  activeOpacity={0.8}
                  style={styles.inputSecondary}
                >
                  <Text style={styles.label}>Horário</Text>

                  <View style={styles.input}>
                  {filterData.time ? (
                      <Text style={styles.inputText}>{formatTime(filterData.time)}</Text>
                    ) : ( 
                      <Text style={styles.inputPlaceholder}>Qual o dia da semana?</Text>
                    )}
                  </View>
                </TouchableOpacity>
              </View>

              <RectButton style={styles.submitButton} onPress={handleFiltersSubmit}>
                <Text style={styles.submitButtonText}>
                  Filtrar
                </Text>
              </RectButton>
            </View>
          )}
        </PageHeader>

        <FlatList 
          style={styles.teacherList}
          contentContainerStyle={{
            paddingHorizontal: 20,
            paddingBottom: 20
          }}
          showsVerticalScrollIndicator={false}
          data={teachers}
          keyExtractor={(teacher) => teacher.id}
          renderItem={({ item }) => (
            <TeacherItem teacher={item} favorited={favorites.includes(item.id)}/>
          )}
        />
      </View>

      <Portal>
        <Modalize ref={modalizeRef} modalHeight={230}>
          {selectedInput === "subject" && (
            <Picker
              selectedValue={filterData.subject}
              onValueChange={(itemValue) => handleChangeSubject(itemValue)}
            >
              {subjects.map((subject) => (
                <Picker.Item
                  key={subject.value}
                  label={subject.label}
                  value={subject.value}
                />
              ))}
            </Picker>
          )}

          {selectedInput === "weekDay" && (
            <Picker
              selectedValue={filterData.weekDay.value}
              onValueChange={(itemValue) => handleChangeWeekDay(itemValue)}
            >
              {weekDays.map((weekDay) => (
                <Picker.Item
                  key={weekDay.value}
                  label={weekDay.label}
                  value={weekDay.value}
                />
              ))}
            </Picker>
          )}

          {selectedInput === "time" && (
            <DateTimePicker
              is24Hour={true}
              value={filterData.time}
              onChange={handleChangeTime}
              display="spinner"
              mode="time"
            />
          )}
        </Modalize>
      </Portal>
    </View>
  );
};

export default TeachersList;
