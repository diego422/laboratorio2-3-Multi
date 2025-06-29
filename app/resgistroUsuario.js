import { Image } from 'expo-image';
import { useState } from 'react';
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { addDoc, collection, getFirestore } from 'firebase/firestore';
import appFirebase from '../accesofirebase';

const db = getFirestore(appFirebase);

export default function RegistrarUsuario() {
  const inicioEstado = {
    nombreCompleto: '',
    correo: '',
    clave: '',
    confirmarClave: '',
  };

  const [estado, setEstado] = useState(inicioEstado);

  const HandleChangeText = (value, name) => {
    setEstado({ ...estado, [name]: value });
  };

  const RegistrarUsuario = async () => {
    const { nombreCompleto, correo, clave, confirmarClave } = estado;

    if (!nombreCompleto || !correo || !clave || !confirmarClave) {
      Alert.alert('Campos incompletos', 'Por favor complete todos los campos');
      return;
    }

    if (clave.length < 6) {
      Alert.alert('Contraseña débil', 'La contraseña debe tener al menos 6 caracteres');
      return;
    }

    if (clave !== confirmarClave) {
      Alert.alert('Error de coincidencia', 'Las contraseñas no coinciden');
      return;
    }

    try {
      await addDoc(collection(db, 'User'), {
        nombreCompleto,
        correo,
        clave,
      });

      Alert.alert('Éxito', 'El usuario se registró correctamente');
      setEstado(inicioEstado);
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Hubo un problema al registrar el usuario');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Image
          source={require('@/assets/images/image.jpg')} // Ajusta la ruta según tu proyecto
          style={styles.headerImage}
          contentFit="cover"
        />

        <View style={styles.formContainer}>
          <Text style={styles.title}>Crear cuenta nueva</Text>

          <TextInput
            placeholder="Nombre completo"
            style={styles.input}
            onChangeText={(value) => HandleChangeText(value, 'nombreCompleto')}
            value={estado.nombreCompleto}
          />
          <TextInput
            placeholder="Correo electrónico"
            style={styles.input}
            keyboardType="email-address"
            onChangeText={(value) => HandleChangeText(value, 'correo')}
            value={estado.correo}
          />
          <TextInput
            placeholder="Contraseña"
            style={styles.input}
            secureTextEntry
            onChangeText={(value) => HandleChangeText(value, 'clave')}
            value={estado.clave}
          />
          <TextInput
            placeholder="Confirmar contraseña"
            style={styles.input}
            secureTextEntry
            onChangeText={(value) => HandleChangeText(value, 'confirmarClave')}
            value={estado.confirmarClave}
          />

          <TouchableOpacity style={styles.btnLogin} onPress={RegistrarUsuario}>
            <Text style={styles.txtLogin}>Registrarse</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flexGrow: 1,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  headerImage: {
    width: '100%',
    height: 150,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
  },
  formContainer: {
    width: '90%',
    marginTop: -30,
    backgroundColor: '#f2f2f2',
    borderRadius: 20,
    alignItems: 'center',
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#111',
  },
  input: {
    width: '100%',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 25,
    marginVertical: 8,
    elevation: 2,
  },
  btnLogin: {
    backgroundColor: '#a12121',
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 40,
    marginTop: 20,
  },
  txtLogin: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
});
