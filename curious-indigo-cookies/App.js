import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Button, FlatList, Text, TouchableOpacity, Switch } from 'react-native';

export default function App() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const addTask = () => {
    setTasks([...tasks, { key: Math.random().toString(), value: task, completed: false }]);
    setTask('');
  };

  const toggleCompletion = (taskKey) => {
    setTasks(tasks.map((item) =>
      item.key === taskKey ? { ...item, completed: !item.completed } : item
    ));
  };

  const deleteTask = (taskKey) => {
    setTasks(tasks.filter((item) => item.key !== taskKey));
  };

  // Search functionality
  const filteredTasks = tasks.filter((item) =>
    item.value.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>TODO APP</Text>

      <TextInput
        style={styles.input}
        placeholder="Nhập công việc"
        value={task}
        onChangeText={setTask}
      />
      <Button title="Thêm công việc" onPress={addTask} />

      <TextInput
        style={styles.searchInput}
        placeholder="Tìm kiếm công việc"
        value={searchTerm}
        onChangeText={setSearchTerm}
      />

      <FlatList
        data={filteredTasks}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <Text style={item.completed ? styles.completedTask : undefined}>
              {item.value}
            </Text>
            <View style={styles.actions}>
              <Switch
                value={item.completed}
                onValueChange={() => toggleCompletion(item.key)}
              />
              <TouchableOpacity onPress={() => deleteTask(item.key)}>
                <Text style={styles.deleteButton}>Xóa</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 50,
    marginTop: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: 'green',
    marginBottom: 20,
    paddingHorizontal: 8,
    paddingVertical: 6,
  },
  searchInput: {
    borderBottomWidth: 1,
    borderBottomColor: 'green',
    marginBottom: 20,
    paddingHorizontal: 8,
    paddingVertical: 6,
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
    borderWidth: 1,
    borderColor: 'blue',
    padding: 10,
    borderRadius: 5,
    backgroundColor: 'aqua',
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  completedTask: {
    textDecorationLine: 'line-through',
  },
  deleteButton: {
    marginLeft: 10,
    color: 'red',
  },
});