import { useLocalSearchParams, useRouter } from 'expo-router';
import {
    doc,
    getDoc,
    getFirestore,
    updateDoc,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import {
    Alert,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity
} from 'react-native';
import appFirebase from '../accesofirebase';

const db = getFirestore(appFirebase);

export default function EditarProducto() {
  const { productId } = useLocalSearchParams();
  const router = useRouter();

  const [producto, setProducto] = useState(null);
  const [cargando, setCargando] = useState(true);

  // Traer datos del producto
  useEffect(() => {
    if (productId) {
      obtenerProducto();
    }
  }, [productId]);

  const obtenerProducto = async () => {
    try {
      const docRef = doc(db, 'Product', productId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setProducto(docSnap.data());
      } else {
        Alert.alert('Error', 'Producto no encontrado');
        router.back();
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'No se pudo obtener el producto');
    } finally {
      setCargando(false);
    }
  };

  const handleGuardar = async () => {
    try {
      const docRef = doc(db, 'Product', productId);
      await updateDoc(docRef, {
        nombreProducto: producto.nombreProducto,
        codigoProducto: producto.codigoProducto,
        cantidad: producto.cantidad,
        fechaCaducidad: producto.fechaCaducidad,
      });
      Alert.alert('Éxito', 'Producto actualizado');
      router.back();
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'No se pudo actualizar el producto');
    }
  };

  if (cargando || !producto) {
    return (
      <SafeAreaView style={styles.centered}>
        <Text>Cargando producto...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Editar Producto</Text>

        <Text style={styles.label}>Nombre:</Text>
        <TextInput
          style={styles.input}
          value={producto.nombreProducto}
          onChangeText={(text) =>
            setProducto({ ...producto, nombreProducto: text })
          }
        />

        <Text style={styles.label}>Código:</Text>
        <TextInput
          style={styles.input}
          value={producto.codigoProducto}
          onChangeText={(text) =>
            setProducto({ ...producto, codigoProducto: text })
          }
        />

        <Text style={styles.label}>Cantidad:</Text>
        <TextInput
          style={styles.input}
          value={producto.cantidad}
          onChangeText={(text) =>
            setProducto({ ...producto, cantidad: text })
          }
          keyboardType="numeric"
        />

        <Text style={styles.label}>Fecha de Caducidad:</Text>
        <TextInput
          style={styles.input}
          value={producto.fechaCaducidad}
          onChangeText={(text) =>
            setProducto({ ...producto, fechaCaducidad: text })
          }
        />

        <TouchableOpacity style={styles.btnGuardar} onPress={handleGuardar}>
          <Text style={styles.btnText}>Guardar Cambios</Text>
        </TouchableOpacity>
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
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#2c3e50',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginTop: 5,
    marginBottom: 10,
  },
  btnGuardar: {
    backgroundColor: 'teal',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  btnText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});