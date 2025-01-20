import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { auth } from '../components/firebase'; 
import { createUserWithEmailAndPassword } from 'firebase/auth'; 
import { useNavigation } from '@react-navigation/native'; 
import styles from '../components/styles';

const SignupScreen = () => {
  const navigation = useNavigation();

  
  const SignupSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm Password is required'),
  });

  const handleSignup = async (email, password) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      Alert.alert('Sign Up Successful', `Welcome to the app, ${email}!`);
      navigation.navigate('Login'); 
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;

      if (errorCode === 'auth/email-already-in-use') {
        Alert.alert('Sign Up Error', 'This email is already in use.');
      } else if (errorCode === 'auth/weak-password') {
        Alert.alert('Sign Up Error', 'Password should be at least 6 characters.');
      } else {
        Alert.alert('Sign Up Error', errorMessage);
      }
    }
  };

  return (
    <Formik
      initialValues={{ email: '', password: '', confirmPassword: '' }}
      validationSchema={SignupSchema}
      onSubmit={(values) => handleSignup(values.email, values.password)}
    >
      {({ handleChange, handleSubmit, values, errors }) => (
        <View style={styles.containerLog}>
         
          <Text style={styles.title}>Create Account</Text>

          
          <TextInput
            style={styles.input}
            placeholder="Email"
            keyboardType="email-address"
            value={values.email}
            onChangeText={handleChange('email')}
          />
          {errors.email && <Text style={styles.error}>{errors.email}</Text>}

         
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            value={values.password}
            onChangeText={handleChange('password')}
          />
          {errors.password && <Text style={styles.error}>{errors.password}</Text>}

          
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            secureTextEntry
            value={values.confirmPassword}
            onChangeText={handleChange('confirmPassword')}
          />
          {errors.confirmPassword && <Text style={styles.error}>{errors.confirmPassword}</Text>}

          
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>

        
          <View style={styles.footer}>
            <Text style={styles.footerText}>
              Already have an account?{' '}
              <Text style={styles.link} onPress={() => navigation.navigate('Login')}>
                Login here
              </Text>
            </Text>
          </View>
        </View>
      )}
    </Formik>
  );
};



export default SignupScreen;
