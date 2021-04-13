
import React, { useState, useEffect } from 'react';
import {Image ,Text, StyleSheet, View, FlatList, TouchableHighlight, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import Cita from './componentes/Citas';
import Formulario from './componentes/Formulario';

import AsyncStorage from '@react-native-community/async-storage'

const App = ()   => {

  //--- Definir es el state de citas ---//
  const [ citas, setCitas ] = useState([]);
  

  const [ mostrarFor, guardarMostrarFor ] = useState(false);

  useEffect( () =>{
    const obtenerCitasStorage = async () => {

      try {

        const citasStorage = await AsyncStorage.getItem('citas');

        if (citasStorage) {

          setCitas(JSON.parse(citasStorage))// lo convierte a un string

        }
      } catch (error) {
        console.log(error);
      }
    }

  obtenerCitasStorage()

  },[] )



  /**
   * Eliminando citas del STATE
   */
  const eliminarPaciente = id => {

    const citasFiltradas = citas.filter( cita => cita.id !== id );

    setCitas( citasFiltradas );
    guardarCitasStorage(JSON.stringify(citasFiltradas));
    
  }


  //--- MUESTRA U OCULTA EL FOMULARIO ---//
  const mostrarFormulario = () => {
      guardarMostrarFor(!mostrarFor);
  }


  //--- CERRAR TECLADO ---//
  const cerrarTeclado = () =>{
    Keyboard.dismiss();//oculta el teclado
  }




  /**
   * Creo un metodo para usar el asynstorage para almacenar
  */
  const guardarCitasStorage = async (citasJSON) =>{

    try {
        await AsyncStorage.setItem('citas', citasJSON);
    } catch (error) {
      console.log(error);
    }

  }



  return(

    /** TouchableWithoutFeedback
      para que el usuario pueda salirse de los inputs al darle touch en la pantalla
    */
    <TouchableWithoutFeedback onPress={ () => cerrarTeclado() }>
      <View style={ styles.contenedor }>

          <Text style={ styles.titulo }>Administrador de Citas</Text>
          <Text style={ styles.firma }>Enrique S. García</Text>

          <View>
            <TouchableHighlight onPress={ () => mostrarFormulario() } style={styles.btnMostrarForm}>
              <Text style={styles.textoMostrarForm}>{ mostrarFor ? 'Cancelar Crear Cita' :'Crear Nueva Cita'}</Text>
            </TouchableHighlight>
          </View>
          

          <View style={styles.contenido}>

            {
              mostrarFor ? (
                <>
                <Text style={styles.titulo}>Crear Nueva Cita  <Image style={ styles.imgIcon }source={ require('./asset/Formulario.png') }/> </Text>
                <Formulario 
                    citas={citas}
                    setCitas={setCitas}
                    guardarMostrarFor={guardarMostrarFor}
                    guardarCitasStorage={guardarCitasStorage}
                    
                />
                </>

              ) : (
                <>
                  <Text 
                    style={styles.titulo}>{ citas.length > 0 ? 
                      'Administra tus citas' : 'No hay citas, agrega una' }
                  </Text>

                  <FlatList 
                    //^^ para tener un buen performance utilizar Flatlist
                      style={styles.listado}
                      data={citas}
                      renderItem={ ({ item }) => <Cita item={item} eliminarPaciente={eliminarPaciente} />}
                      keyExtractor={ cita => cita.id } //le pasa un id a cada uno de los valores de los objetos
                  />
                </>
              )}
          </View>

      </View>
    </TouchableWithoutFeedback>
  );
};



//---  Creo mis estilos ---//
const styles = StyleSheet.create({
  contenedor: {
    backgroundColor: '#222831',
    flex: 1, //para que cubra toda la pantalla del mismo color
  },
  titulo: {
    color: '#f7f7f7',
    marginTop: Platform.OS === 'ios' ? 40 : 20,
    marginBottom: 11,
    fontSize: 35, 
    textAlign: 'center',
    fontFamily: 'BebasNeue-Regular'
  },
  contenido: {
    flex: 1,
    marginHorizontal: '2.5%', //se paracion de las orillas (darle mas centrado al formulario)
  },
  listado: {
    flex: 1,//para que crezca y pueda tomar todo el espacio en el telefono
  },
  btnMostrarForm:{
    padding: 10,
    backgroundColor: '#903749',
    marginVertical:10
  },
  textoMostrarForm:{
    color: '#FFF',
    //fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'PermanentMarker-Regular'
    },
    imgIcon: {
      width: 44,
      height: 44
    },
    firma:{
      textAlign: 'right',
      marginRight: 20,
      color: '#e05297',
      fontFamily: 'DancingScript-VariableFont_wght',
      fontSize: 15
      
    }
})


export default App;

