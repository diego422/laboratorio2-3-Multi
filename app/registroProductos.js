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

export default function RegistrarProducto() {
  const inicioEstado = {
    nombreProducto: '',
    codigoProducto: '',
    cantidad: '',
    fechaCaducidad: '',
  };

  const [estado, setEstado] = useState(inicioEstado);

  const HandleChangeText = (value, name) => {
    setEstado({ ...estado, [name]: value });
  };

  const RegistrarProducto = async () => {
    const { nombreProducto, codigoProducto, cantidad, fechaCaducidad } = estado;

    if (!nombreProducto || !codigoProducto || !cantidad || !fechaCaducidad) {
      Alert.alert('Campos incompletos', 'Por favor complete todos los campos');
      return;
    }

    try {
      await addDoc(collection(db, 'Product'), {
        nombreProducto,
        codigoProducto,
        cantidad,
        fechaCaducidad,
      });

      Alert.alert('Éxito', 'El producto se registró correctamente');
      setEstado(inicioEstado);
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Hubo un problema al registrar el producto');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Image
          source={require('@/assets/images/image.jpg')} // ajusta esta ruta si es necesario
          style={styles.headerImage}
          contentFit="cover"
        />

        <View style={styles.formContainer}>
          <Text style={styles.title}>Registrar Producto</Text>

          <TextInput
            placeholder="Nombre Producto"
            style={styles.input}
            onChangeText={(value) => HandleChangeText(value, 'nombreProducto')}
            value={estado.nombreProducto}
          />
          <TextInput
            placeholder="Código Producto"
            style={styles.input}
            onChangeText={(value) => HandleChangeText(value, 'codigoProducto')}
            value={estado.codigoProducto}
          />
          <TextInput
            placeholder="Cantidad"
            style={styles.input}
            keyboardType="numeric"
            onChangeText={(value) => HandleChangeText(value, 'cantidad')}
            value={estado.cantidad}
          />
          <TextInput
            placeholder="Fecha caducidad"
            style={styles.input}
            onChangeText={(value) => HandleChangeText(value, 'fechaCaducidad')}
            value={estado.fechaCaducidad}
          />

          <TouchableOpacity style={styles.btnLogin} onPress={RegistrarProducto}>
            <Text style={styles.txtLogin}>Guardar</Text>
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
