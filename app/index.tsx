import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [clave, setClave] = useState('');

  return (
    <ImageBackground
      source={require('@/assets/images/image.jpg')} // Ajusta esta ruta
      style={styles.background}
      resizeMode="cover"
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.keyboardView}
      >
        <View style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <MaterialIcons name="email" size={20} color="#888" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="correo electrónico"
              placeholderTextColor="#888"
              value={email}
              onChangeText={setEmail}
            />
          </View>

          <View style={styles.inputContainer}>
            <MaterialIcons name="lock" size={20} color="#888" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="contraseña"
              placeholderTextColor="#888"
              secureTextEntry
              value={clave}
              onChangeText={setClave}
            />
          </View>

          <TouchableOpacity onPress={() => router.push('/listaProductos')} style={styles.loginButton}>
            <Text style={styles.loginText}>Ingresar</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.push('/resgistroUsuario')}>
            <Text style={styles.linkText}>Crear cuenta nueva Registrarse</Text>
          </TouchableOpacity>

          <TouchableOpacity>
          <Text style={styles.linkText} onPress={()=>router.push("/registroProductos")}>Resgistrar productos</Text>
        </TouchableOpacity>

        </View>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  keyboardView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  formContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 25,
    padding: 25,
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 10,
    width: '100%',
    marginBottom: 15,
    elevation: 3,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#000',
  },
  loginButton: {
    backgroundColor: '#a12121',
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 30,
    marginTop: 10,
    width: '100%',
    alignItems: 'center',
  },
  loginText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  linkText: {
    color: '#000',
    fontSize: 14,
    marginTop: 10,
    textDecorationLine: 'underline',
  },
});
