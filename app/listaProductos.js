import { useRouter } from 'expo-router';
import { collection, deleteDoc, doc, getDocs, getFirestore } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import appFirebase from '../accesofirebase';

const db = getFirestore(appFirebase);

export default function ListarProductos() {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const router = useRouter();

  useEffect(() => {
    obtenerProductos();
  }, []);

  const obtenerProductos = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'Product'));
      const datos = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProductos(datos);
    } catch (error) {
      console.error('Error al obtener productos:', error);
    } finally {
      setCargando(false);
    }
  };

  const eliminarProducto = async (id) => {
    Alert.alert(
      'Confirmar eliminación',
      '¿Estás seguro de que deseas eliminar este producto?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteDoc(doc(db, 'Product', id));
              obtenerProductos();
            } catch (error) {
              console.error('Error al eliminar producto:', error);
              Alert.alert('Error', 'No se pudo eliminar el producto');
            }
          },
        },
      ]
    );
  };

  const irAEditar = (id) => {
    router.push({ pathname: '/editarProducto', params: { productId: id } });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Lista de Productos</Text>

        {cargando ? (
          <ActivityIndicator size="large" color="teal" />
        ) : (
          productos.map((producto) => (
            <View key={producto.id} style={styles.card}>
              <Text style={styles.nombre}>Nombre: {producto.nombreProducto}</Text>
              <Text style={styles.correo}>Código: {producto.codigoProducto}</Text>
              <Text style={styles.correo}>Cantidad: {producto.cantidad}</Text>
              <Text style={styles.correo}>Fecha de Caducidad: {producto.fechaCaducidad}</Text>

              <View style={styles.buttonRow}>
                <TouchableOpacity
                  style={styles.btnEditar}
                  onPress={() => irAEditar(producto.id)}
                >
                  <Text style={styles.txtBtn}>Editar</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.btnEliminar}
                  onPress={() => eliminarProducto(producto.id)}
                >
                  <Text style={styles.txtBtn}>Eliminar</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))
        )}
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
    alignItems: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#2c3e50',
  },
  card: {
    width: '95%',
    backgroundColor: '#f2f2f2',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    elevation: 2,
  },
  nombre: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  correo: {
    fontSize: 16,
    marginBottom: 5,
    color: '#555',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  btnEditar: {
    backgroundColor: 'teal',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 25,
  },
  btnEliminar: {
    backgroundColor: '#e74c3c',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 25,
  },
  txtBtn: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
