import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, TouchableHighlight, Alert, ScrollView, Image, ActivityIndicator } from 'react-native';

//--- paquete de datetime ---//
import  DateTimePickerModal  from 'react-native-modal-datetime-picker';
import shortid from 'shortid';

//--- importo los Iconos ---//
let lesion = require('.././asset/paciente.png');
let user = require('.././asset/user(2).png');
let phone = require('.././asset/phone.png');
let enfermeda = require('.././asset/sintomas.png');

const Formulario = ({ citas, setCitas, guardarMostrarFor }) => {

    //--- para los demas campos ---//
    const [ paciente, guardarPaciente ] = useState('');
    const [ propietario, guardarPropietario ] = useState('');
    const [ telefono, guardarTelefono ] = useState('');
    const [ sintomas, guardarSintomas ] = useState('');
    

    //--- Para la Hora ---//
    const [fecha, guardarFecha] = useState('');
    const [hora, guardarHora] = useState('');


    //--- Para la Fecha ---//
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
    

    //--- Muestra  la Fecha ---//
    const showDatePicker = () => {
      setDatePickerVisibility(true);
    };
  

    //--- Oculta la Fecha ---//
    const hideDatePicker = () => {
      setDatePickerVisibility(false);
    };

    const confirmarFecha = (date) => {
        //console.log(date)

        //--- Para transformar la fecha ---//
        const opciones ={ year: 'numeric', month: 'long', day: '2-digit'  };
        //console.log(date.toLocaleDateString('es-Es', opciones)) // formatea la fecha

        guardarFecha(date.toLocaleDateString('es-Es', opciones));
        
        //console.warn("A date has been picked: ", date);
        hideDatePicker();
    };


    
    //--- Muestra u oculta el Time Picker ---//
    const showTimePicker = () => {
        setTimePickerVisibility(true);
    };
    
    const hideTimePicker = () => {
        setTimePickerVisibility(false);
    };


  
    const confirmarHora = (hora) => {

        //--- lo agrego en el State ---//
        guardarHora(hora.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit', hour12: true}));
        //console.warn("A date has been picked: ", date);
        hideTimePicker();
    };


    //--- Crear nueva cita ---//
    const crearNuevaCita = () =>{

        //--- Validar Formulario ---//
        if (paciente.trim() === '' || 
            propietario.trim()===''|| 
            telefono.trim() === '' || 
            sintomas.trim() === '' || 
            fecha.trim() === '' || 
            hora.trim() === '') {

                //--- falla la validacion ---//
                mostrarAlerta()
                return;
        }   



        //--- CREAR UNA NUEVA CITA, de los variables de state ---//
        const cita = { paciente, propietario, telefono, fecha, hora, sintomas };

        //--- le asigno el ID con el paquete de shortid ---//
        cita.id = shortid.generate();

        console.log(cita);

        //--- AGREGAR AL STATE --///
        const citasNuevo = [...citas, cita];//copeo el arreglo de citas
        setCitas(citasNuevo);

        //--- OCULTAR EL FORMULARIO ---//
        guardarMostrarFor(false)


        //--- RESETEO EL FORMULARIO ---//


    }







    //--- MUESTRA LA ALERTA SI FALLA LA VALIDACION ---//
    const mostrarAlerta = () =>{
        Alert.alert(
            'Error', //Titulo
            'Todos los  campos son obligatorios', //Mensaje
            [{
                text: 'OK', //Arreglo de botones
            }]
        
        )
    }


    return ( 
        <>
            <ScrollView style={styles.formulario}>
                <View style={styles.row}>
                    <Text style={styles.label}>Paciente</Text>
                    <Image style={styles.imgIcon} source={lesion} />
                </View>

                <TextInput 
                        style={styles.input} 
                        onChangeText={ ( texto ) => guardarPaciente(texto) } //para leer la entrada del input         
                    />

                <View style={styles.row}>
                    <Text style={styles.label}>Dueño</Text>
                    <Image style={styles.imgIcon} source={user} />

                </View>

                <TextInput 
                    style={styles.input} 
                    onChangeText={ ( texto ) => guardarPropietario(texto) } //para leer la entrada del input         
                />

                <View style={styles.row}>
                    <Text style={styles.label}>Telefono Contacto</Text>
                    <Image style={styles.imgIcon} source={phone} />
                </View>
                    <TextInput 
                            //*--- Campo para la Fecha ---//
                        style={styles.input} 
                        onChangeText={ ( texto ) => guardarTelefono(texto) } //para leer la entrada del input 
                        keyboardType='numeric'
                    />

                <View>
                    <Text style={styles.label}>Fecha: </Text>
                    <Button title="Seleccionar Fecha" onPress={showDatePicker} />
                            <DateTimePickerModal
                                isVisible={isDatePickerVisible}
                                mode="date"
                                onConfirm={confirmarFecha}
                                onCancel={hideDatePicker}
                                locale='es_ES'
                                headerTextIOS='Elige la fecha'
                                cancelTextIOS='Cancelar'
                            />
                        <Text style={styles.label}>{ fecha }</Text>
                </View>

                <View>
                    <Text style={styles.label}>Hora: </Text>
                    <Button title="Seleccionar Hora" onPress={showTimePicker} style={styles.btn} />
                            <DateTimePickerModal
                                isVisible={isTimePickerVisible}
                                mode="time"
                                onConfirm={confirmarHora}
                                onCancel={hideTimePicker}
                                locale='es_ES'//para poner en español en IOS
                                headerTextIOS='Elige una hora'
                                cancelTextIOS='Confirmar'
                                is24Hour
                            />
                        <Text style={styles.label}>{ hora }</Text>
                </View>

                <View style={styles.row}>
                    <Text style={styles.label}>Sintomas:</Text>
                    <Image style={styles.imgIcon} source={enfermeda} />
                </View>
                    <TextInput 
                        multiline //es como tener una area de texto
                        style={styles.input} 
                        onChangeText={ ( texto ) => guardarSintomas(texto) } //para leer la entrada del input 
                        
                    />

                <View>
                    <TouchableHighlight onPress={ () => crearNuevaCita() } style={styles.btnSubmit}>
                        <Text style={styles.textoSubmit}>Crear Nueva Cita</Text>
                    </TouchableHighlight>
                </View>
        

            </ScrollView>
        </>
     );
}


const styles = StyleSheet.create({
    formulario:{
        backgroundColor: '#393e46',
        paddingHorizontal: 20,
        paddingVertical: 8,
        
    },  
    label:{
        fontWeight: 'bold',
        fontSize: 18,
        marginTop: 20,
        color: '#eeeeee'
        
    },
    input: {
        marginTop: 10,
        height: 50,
        borderColor: '#e1e1e1',
        borderWidth: 1,
        borderStyle: 'solid',
        color: '#fafafa'
    },
    btnSubmit:{
        padding: 10,
        backgroundColor: '#1fab89',
        marginVertical:10
    },
    textoSubmit:{
        color: '#FFF',
        fontWeight: 'bold',
        textAlign: 'center', 
    },
    imgIcon: {
        width: 50,
        height: 50,
        
    },
    row:{
        flexDirection:'row'
    }
})
 
export default Formulario;