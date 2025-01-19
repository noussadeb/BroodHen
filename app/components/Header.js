import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Modal,
  StyleSheet,
  Pressable,
} from 'react-native';
// استخدم Link فقط إذا كنت تستخدم expo-router
import { Link } from 'expo-router';
import styles from '../components/styles';

const Header = ({ navigation }) => {
  const [menuVisible, setMenuVisible] = useState(false); // حالة القائمة

  const toggleMenu = () => {
    setMenuVisible(!menuVisible); // تبديل حالة القائمة
  };

  return (
    <View>
      {/* شريط العنوان */}
      <View style={styles.headerH}>
        <TouchableOpacity onPress={toggleMenu}>
          <Image
            source={require('../../assets/images/icon-menu.png')} // تأكد من المسار الصحيح للصورة
            style={styles.menuIcon}
          />
        </TouchableOpacity>
        <Text style={styles.headerText}>BroodHen</Text>
        <View style={styles.rightSpace}></View> {/* لضبط المحاذاة */}
      </View>

      {/* القائمة المنبثقة */}
      <Modal
        visible={menuVisible}
        transparent
        animationType="fade"
        onRequestClose={toggleMenu}
      >
        <Pressable style={styles.modalBackground} onPress={toggleMenu}>
  <View style={styles.menuContainer}>
    {/* قائمة الأزرار */}
    {navigation ? null : (
      <>
        {/* استخدام الروابط في حال عدم وجود navigation */}
        <Link href="/Nueva_ecl" style={styles.menuItem}>
          <Text style={styles.menuText}>Nueva eclosión</Text>
        </Link>

        <Link href="/Archivos" style={styles.menuItem}>
          <Text style={styles.menuText}>Archivo</Text>
        </Link>

        <Link href="/Tienda" style={styles.menuItem}>
          <Text style={styles.menuText}>Tienda</Text>
        </Link>

        <Link href="/Informacion" style={styles.menuItem}>
          <Text style={styles.menuText}>Información</Text>
        </Link>

        <Link href="/Ajustes" style={styles.menuItem}>
          <Text style={styles.menuText}>Ajustes</Text>
        </Link>

      </>
    )}
 
   
  </View>
</Pressable>

      </Modal>
    </View>
  );
};

export default Header;


