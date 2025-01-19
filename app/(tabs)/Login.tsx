import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, Image, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { auth } from '../components/firebase'; // تأكد من إعداد Firebase بشكل صحيح
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // استيراد AsyncStorage
import styles from '../components/styles';

const LoginScreen = () => {
  const navigation = useNavigation();
  
  const [storedEmail, setStoredEmail] = useState<string | null>(null);
  const [storedPassword, setStoredPassword] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false); // حالة لإظهار كلمة المرور

  // لتحميل المعلومات المخزنة عند تحميل الشاشة
  useEffect(() => {
    const loadStoredData = async () => {
      const email = await AsyncStorage.getItem('email');
      const password = await AsyncStorage.getItem('password');
      setStoredEmail(email);
      setStoredPassword(password);
    };

    loadStoredData();
  }, []);

  // مخطط التحقق من صحة المدخلات
  const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  });

  const handleLogin = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // حذف رسالة الترحيب
      navigation.navigate('Home'); // الانتقال إلى الصفحة الرئيسية
    } catch (error) {
      const errorCode = error.code;

      if (errorCode === 'auth/user-not-found') {
        Alert.alert('Login Error', 'No user found with this email.');
      } else if (errorCode === 'auth/wrong-password') {
        Alert.alert('Login Error', 'Incorrect password.');
      } else {
        Alert.alert('Login Error', 'An unexpected error occurred. Please try again.');
      }
    }
  };

  return (
    <Formik
      initialValues={{ email: storedEmail || '', password: storedPassword || '' }}  // استخدام القيم المخزنة إذا كانت موجودة
      validationSchema={LoginSchema}
      onSubmit={(values) => handleLogin(values.email, values.password)}
    >
      {({ handleChange, handleSubmit, values, errors }) => (
        <View style={styles.containerLog}>
          {/* صورة المستخدم */}
          <Image
            source={require('../assets/images/icons-usuario.png')} // تأكد من صحة المسار
            style={styles.logo}
          />

          {/* حقل اسم المستخدم */}
          <TextInput
            style={styles.input}
            placeholder="Username"
            value={values.email}
            onChangeText={handleChange('email')}
          />
          {errors.email && <Text style={styles.error}>{errors.email}</Text>}

          {/* حقل كلمة المرور */}
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry={!showPassword} // إخفاء/إظهار كلمة المرور حسب الحالة
              value={values.password}
              onChangeText={handleChange('password')}
            />
            {/* زر إظهار كلمة المرور */}
            <TouchableOpacity 
              style={styles.showPasswordButton} 
              onPress={() => setShowPassword(prevState => !prevState)}
            >
              <Text style={styles.showPasswordText}>
                {showPassword ? 'Hide' : 'Show'}
              </Text>
            </TouchableOpacity>
          </View>
          {errors.password && <Text style={styles.error}>{errors.password}</Text>}

          {/* زر تسجيل الدخول */}
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Sign in</Text>
          </TouchableOpacity>

          {/* نصوص إضافية */}
          <Text style={styles.forgotPassword}>Forgot password?</Text>
          <Text style={styles.newUser}>
            New user?{' '}
            <Text
              style={styles.link}
              onPress={() => navigation.navigate('Signup')}
            >
              Sign up
            </Text>
          </Text>
        </View>
      )}
    </Formik>
  );
};

export default LoginScreen;
