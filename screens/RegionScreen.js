import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';

function RegionScreen({ navigation }) {
  const [regions, setRegions] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [subregions, setSubregions] = useState([]);

  useEffect(() => {
    fetch('http://20.39.190.194/regions/')
      .then(response => response.json())
      .then(data => setRegions(data.unique_firsts))
      .catch(error => console.error('Error fetching data: ', error));
  }, []);

  const handleRegionSelect = (region) => {
    setSelectedRegion(region.first);
    setSubregions(region.second);
  };

  const handleSubregionSelect = (subregion) => {
    navigation.navigate('FundBoard', { region: selectedRegion, subregion });
  };

  return (
    <View style={styles.container}>
      <View style={styles.column}>
        
        <ScrollView>
          {regions.map(region => (
            <TouchableOpacity
              key={region.first}
              style={[styles.regionItem, { backgroundColor: selectedRegion === region.first ? '#FFFFFF' : '#F0F0F0' }]}
              onPress={() => handleRegionSelect(region)}
            >
              <Text style={styles.regionText}>{region.first}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      {subregions.length > 0 && (
        <View style={styles.column}>
          
          <ScrollView>
            {subregions.map(subregion => (
              <TouchableOpacity
                key={subregion}
                style={styles.regionItem}
                onPress={() => handleSubregionSelect(subregion)}
              >
                <Text style={styles.regionText}>{subregion}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#FFFFFF'
  },
  column: {
    flex: 1,
    paddingHorizontal: 10
  },
  headerText: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    color: '#333'
  },
  regionItem: {
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: '#F8F8F8',
    borderRadius: 10,
    marginVertical: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  regionText: {
    fontSize: 16,
    color: '#555'
  }
});

export default RegionScreen;
