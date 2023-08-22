/* eslint-disable react/prop-types */
// SettingsScreen.js
import React, { useState } from 'react';
import { View, TouchableOpacity, ScrollView, Text, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Constants from 'expo-constants';
import styles from '../utils/styles';

const SettingsScreen = ({ navigation }) => {
  const [aboutModalVisible, setAboutModalVisible] = useState(false);

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleAboutPress = () => {
    setAboutModalVisible(true);
  };

  const closeAboutModal = () => {
    setAboutModalVisible(false);
  };



  return (
    <View style={styles.container}>
      {/* Top bar */}
      <View style={styles.topBarContainer}>
        <TouchableOpacity style={styles.topButton} onPress={handleBackPress}>
          <Icon name="arrow-left" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.topButton} onPress={handleAboutPress}>
          <Icon name="user" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* Main content */}
      <ScrollView
        contentContainerStyle={styles.scrollContentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Your settings elements */}
        <View style={styles.settingRow}>
          <Text style={styles.settingsText}>Name</Text>
        </View>

        <View style={styles.settingRow}>
          <Text style={styles.settingsText}>Playtime Animation</Text>

        </View>
        <View style={styles.settingRow}>
          <Text style={styles.settingsText}>Delete all sounds</Text>
        </View>
        <View style={styles.settingRow}>
          <Text style={styles.settingsText}>Update all sounds</Text>
        </View>

        {/* ... add more settings elements ... */}
      </ScrollView>

      {/* About Modal */}
      <Modal
        visible={aboutModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={closeAboutModal}
      >
        <TouchableOpacity
          style={styles.modalContainer}
          activeOpacity={1}
          onPress={closeAboutModal}
        >
          <View style={styles.modalContent}>
            {/* Display app information */}
            <Text style={styles.aboutText}>App Name: {Constants.manifest.name}</Text>
            <Text style={styles.aboutText}>Author: {Constants.manifest.author} </Text>
            <View style={styles.horizontalLine} />
            <Text style={styles.aboutText}>Support Email: {Constants.manifest.email}</Text>
            <Text style={styles.aboutText}>Support Website: {Constants.manifest.website}</Text>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default SettingsScreen;
