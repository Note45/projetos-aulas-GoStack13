import React, { useEffect, useState } from 'react';
import { SafeAreaView, FlatList, Text, TouchableOpacity ,StyleSheet, StatusBar } from 'react-native';

import api from './services/api';

export default function App() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    api.get('projects').then(response => {
      setProjects(response.data);
    })
  }, []);

  async function handleAddProject() {
    const response = await api.post('projects', {
      title: `Novo Projeto ${Date.now()}`,
      owner: 'Antonio'
    });

    const project = response.data;

    setProjects([...projects, project])
  }

  return (
    <>
      <StatusBar 
        barStyle='light-content' 
        backgroundColor='#7159C1' 
      />

      <SafeAreaView style={styles.container} >
        <FlatList 
          data={projects}
          keyExtractor={project => project.id}
          renderItem={({ item: project }) => (
            <Text 
              style={styles.project} 
            >
              {project.title}
            </Text>
          )}
        />

        <TouchableOpacity 
          onPress={handleAddProject} 
          activeOpacity={0.6} 
          style={styles.button}
        >
          <Text style={styles.buttonText}>Adicionar Projeto</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#7159C1'
  },  
  project: {
    color: '#fff',
    fontSize: 30,
  },  
  button: {
    backgroundColor: '#fff',
    margin: 20,
    height: 50,
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center"
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 16
  }
});