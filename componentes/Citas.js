import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Cita = ({ cita }) => {
    return ( 
        <View style={styles.cita}>
            <View>
                <Text style={styles.label}>Paciente: </Text>
                <Text style={styles.text}>{cita.paciente}</Text>    
            </View>  
            <View>
                <Text style={styles.label}>Paciente: </Text>
                <Text style={styles.text}>{cita.propietario}</Text>    
            </View>  
            <View>
                <Text style={styles.label}>Paciente: </Text>
                <Text style={styles.text}>{cita.sintomas}</Text>    
            </View>  
        </View>
     );
}
 
const styles = StyleSheet.create({
    cita: {
        backgroundColor: '#FFF',
        borderBottomColor: '#e1e1e1',
        borderStyle: 'solid',
        borderBottomWidth: 2,
        paddingVertical: 20,
        paddingHorizontal: 10

    },
    label:{
        fontWeight: 'bold',
        fontSize: 18,
        marginTop: 20
    },
    text: {
        fontSize: 18,

    }
})


export default Cita ;