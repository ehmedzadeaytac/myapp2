import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useState } from "react";
import {
  Alert,
  Button,
  FlatList,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

type Task = {
  id: string;
  title: string;
  done: boolean;
};

export default function HomeScreen() {
  const [text, setText] = useState<string>("");
  const [tasks, setTasks] = useState<Task[]>([]);

  const addTask = () => {
    if (!text.trim()) {
      Alert.alert("Error", "Please enter a task!");
      return;
    }

    const newTask: Task = {
      id: Date.now().toString(),
      title: text.trim(),
      done: false,
    };

    setTasks([newTask, ...tasks]);
    setText("");
  };

  const toggleTask = (id: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task,
      ),
    );
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <View style={[styles.container, { paddingTop: StatusBar.currentHeight }]}>
      <Text style={styles.title}>My ToDo List</Text>

      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="Add a new task..."
          value={text}
          onChangeText={setText}
          onSubmitEditing={addTask}
        />
        <Button title="Add" onPress={addTask} />
      </View>

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.taskRow}>
            <Text style={[styles.task, item.done && styles.taskDone]}>
              {item.title}
            </Text>

            <Pressable onPress={() => toggleTask(item.id)}>
              <MaterialCommunityIcons
                name={item.done ? "check-circle" : "check-circle-outline"}
                size={28}
                color={item.done ? "green" : "gray"}
              />
            </Pressable>

            <Pressable onPress={() => deleteTask(item.id)}>
              <MaterialCommunityIcons name="delete" size={28} color="red" />
            </Pressable>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f2f2f2",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 20,
  },
  input: {
    flex: 1,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 10,
  },
  taskRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 8,
  },
  task: {
    flex: 1,
    fontSize: 18,
  },
  taskDone: {
    textDecorationLine: "line-through",
    color: "gray",
  },
});