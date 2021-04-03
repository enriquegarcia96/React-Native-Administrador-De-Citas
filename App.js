
import React, { useState } from 'react';
import { Text, StyleSheet, View, FlatList } from 'react-native';
import Cita from './componentes/Citas';


const App = ()   => {

  //--- Definir es el state de citas ---//
  const [ citas, setCitas ] = useState([
    { id: '1', paciente: 'Hook', propietario: 'Enrique', sintomas: 'Dolor de cabeza' },
    { id: '2', paciente: 'React', propietario: 'Diana', sintomas: 'No duerme' },
    { id: '3', paciente: 'Redux', propietario: 'Shellsea', sintomas: 'No Canta' },
  ]);


  return(
  
    <View style={ styles.contenedor }>
        <Text style={ styles.titulo }>Administrador de Citas</Text>
        
        <FlatList 
          data={citas}
          renderItem={ ({ item }) => <Cita cita={item} />}
            keyExtractor={ cita => cita.id } //le pasa un id a cada uno de los valores de los objetos
        />

        {/*citas.map(cita => (
          <View>
              <Text>{cita.paciente}</Text>
          </View>
        ))*/}

    </View>
  );
};



//---  Creo mis estilos ---//
const styles = StyleSheet.create({
  contenedor: {
    backgroundColor: '#AA076B',
    flex: 1, //para que cubra toda la pantalla del mismo color
  },
  titulo: {
    color: '#FFF',
    marginTop: 40,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center'
  }
})


export default App;
