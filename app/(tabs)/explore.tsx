import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, SafeAreaView } from'react-native';
import { useCart } from '@/contexts/CartContext';

  export default function CartScreen() {
    const { cart } = useCart();

    const totalPrice = cart.reduce((sum, item) => sum + (item.price *
  item.selectedQuantity), 0);

    if (cart.length === 0) {
      return (
        <SafeAreaView style={styles.container}>
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Your cart is empty</Text>
            <Text style={styles.emptySubtext}>Add some products to get
  started!</Text>
          </View>
        </SafeAreaView>
      );
    }

    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Shopping Cart</Text>
          <Text style={styles.headerSubtitle}>{cart.length} items</Text>
        </View>

        <FlatList
          data={cart}
          keyExtractor={(item, index) => `${item.id}-${index}`}
          renderItem={({ item }) => (
            <View style={styles.cartItem}>
              <Image source={{ uri: item.image }} style={styles.cartImage} />
              <View style={styles.cartInfo}>
                <Text style={styles.cartName}>{item.name}</Text>
                <Text style={styles.cartPrice}>${item.price.toFixed(2)}
  each</Text>
                <Text style={styles.cartQuantity}>Quantity:
  {item.selectedQuantity}</Text>
                <Text style={styles.cartSubtotal}>
                  Subtotal: ${(item.price * item.selectedQuantity).toFixed(2)}
                </Text>
              </View>
            </View>
          )}
        />

        <View style={styles.footer}>
          <Text style={styles.totalLabel}>Total:</Text>
          <Text style={styles.totalPrice}>${totalPrice.toFixed(2)}</Text>
        </View>
      </SafeAreaView>
    );
  }


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f5f5f5',
    },
    header: {
      backgroundColor: '#2e7d32',
      padding: 20,
      paddingTop: 60,
    },
    headerTitle: {
      fontSize: 28,
      fontWeight: 'bold',
      color: 'white',
    },
    headerSubtitle: {
      fontSize: 16,
      color: 'white',
      marginTop: 5,
    },
    emptyContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
    emptyText: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#666',
      marginBottom: 10,
    },
    emptySubtext: {
      fontSize: 16,
      color: '#999',
    },
    cartItem: {
      flexDirection: 'row',
      backgroundColor: 'white',
      marginHorizontal: 16,
      marginVertical: 8,
      borderRadius: 12,
      padding: 12,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    cartImage: {
      width: 80,
      height: 80,
      borderRadius: 8,
    },
    cartInfo: {
      flex: 1,
      marginLeft: 12,
      justifyContent: 'center',
    },
    cartName: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#333',
      marginBottom: 4,
    },
    cartPrice: {
      fontSize: 14,
      color: '#666',
      marginBottom: 4,
    },
    cartQuantity: {
      fontSize: 14,
      color: '#666',
      marginBottom: 4,
    },
    cartSubtotal: {
      fontSize: 16,
      fontWeight: '600',
      color: '#2e7d32',
    },
    footer: {
      backgroundColor: 'white',
      padding: 20,
      borderTopWidth: 1,
      borderTopColor: '#e0e0e0',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    totalLabel: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#333',
    },
    totalPrice: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#2e7d32',
    },
  });

  