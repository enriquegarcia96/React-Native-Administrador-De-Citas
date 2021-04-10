import React from 'react';
import { View, Text, StyleSheet, TouchableHighlight,Image,ScrollView, TouchableOpacity } from 'react-native';

const Cita = ({ item, eliminarPaciente }) => {

    //--- Funciones para el los botones (TouchableHighlight) ---//
    const dialogoEliminar = ( id ) =>{
        console.log('eliminando...', id);
        eliminarPaciente( id );
    }


    return ( 
        <ScrollView style={styles.cita}>
            <View style={styles.row}>
                <Text style={styles.label}>Paciente</Text>
                <Image style={styles.imgIcon} source={ require('../asset/user23.png') } />
            </View>  
                <Text style={styles.text}>{item.paciente}</Text>    
            <View style={styles.row}>
                <Text style={styles.label}>Acompañante</Text>
                <Image style={styles.imgIcon} source={require('.././asset/propie.png')} />
            </View>  
                <Text style={styles.text}>{item.propietario}</Text>    
            <View style={styles.row}>
                <Text style={styles.label}>Sintomas</Text>
                <Image style={styles.imgIcon} source={ require('.././asset/fiebr.png')} />
            </View>  
                <Text style={styles.text}>{item.sintomas}</Text>    

            <View>
                <TouchableOpacity activeOpacity={1} onPress={ () => dialogoEliminar( item.id ) } style={styles.btnEliminar}>
                    <Text style={styles.textoEliminar}>
                        <Image style={ styles.borrar } source={ require('../asset/delete.png') } />
                    </Text>
                </TouchableOpacity>
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
        fontFamily: 'Cinzel-VariableFont_wght',
        fontSize: 18,
        marginTop: 20,
        color: '#fbfbfb'
    },
    text: {
        fontSize: 18,
        color: '#f4f7f7',
        fontFamily: 'YesevaOne-Regular'

    },
    btnEliminar:{
        backgroundColor: '#5c636e',
        width: 40,
        height: 37,
        marginHorizontal: 125
        
    },
    textoEliminar:{
        width: 100,
        height: 100,
        marginVertical: -24
    },
    imgIcon: {
        width: 39,
        height: 39,
        marginTop: 9,
        marginLeft: 5
    },
    row:{
        flexDirection:'row'
    },
    borrar:{
        width: 48,
        height: 48,
        
    }
    
})


export default Cita ;