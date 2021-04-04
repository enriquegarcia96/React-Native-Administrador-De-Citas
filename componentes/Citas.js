import React from 'react';
import { View, Text, StyleSheet, TouchableHighlight,Image,ScrollView } from 'react-native';

//--- importo los Iconos ---//
let user = require('../asset/user23.png');
let dueño = require('.././asset/propie.png');
let enfermeda = require('.././asset/fiebr.png');

const Cita = ({ item, eliminarPaciente }) => {

    //--- Funciones para el los botones (TouchableHighlight) ---//
    const dialogoEliminar = ( id ) =>{
        console.log('eliminando...', id);
        eliminarPaciente( id );
    }


    return ( 
        <ScrollView style={styles.cita}>
            <View style={styles.row}>
                <Text style={styles.label}>Paciente: </Text>
                <Image style={styles.imgIcon} source={user} />
            </View>  
                <Text style={styles.text}>{item.paciente}</Text>    
            <View style={styles.row}>
                <Text style={styles.label}>Propietario: </Text>
                <Image style={styles.imgIcon} source={dueño} />
            </View>  
                <Text style={styles.text}>{item.propietario}</Text>    
            <View style={styles.row}>
                <Text style={styles.label}>Sintomas: </Text>
                <Image style={styles.imgIcon} source={enfermeda} />
            </View>  
                <Text style={styles.text}>{item.sintomas}</Text>    

            <View>
                <TouchableHighlight onPress={ () => dialogoEliminar( item.id ) } style={styles.btnEliminar}>
                    <Text style={styles.textoEliminar}>Eliminar &times;</Text>
                </TouchableHighlight>
            </View>
        
        </ScrollView>
     );
}
 
const styles = StyleSheet.create({
    cita: {
        backgroundColor: '#5c636e',
        borderBottomColor: '#e1e1e1',
        borderStyle: 'solid',
        borderBottomWidth: 2,
        paddingVertical: 20,
        paddingHorizontal: 10

    },
    label:{
        fontWeight: 'bold',
        fontSize: 18,
        marginTop: 20,
        color: '#fbfbfb'
    },
    text: {
        fontSize: 18,
        color: '#f4f7f7'

    },
    btnEliminar:{
        padding: 10,
        backgroundColor: 'red',
        marginVertical:10
    },
    textoEliminar:{
        color: '#FFF',
        fontWeight: 'bold',
        textAlign: 'center'
    },
    imgIcon: {
        width: 50,
        height: 50,
        
    },
    row:{
        flexDirection:'row'
    }
    
})


export default Cita ;