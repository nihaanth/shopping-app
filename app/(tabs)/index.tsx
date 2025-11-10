import React , {useState} from 'react';
import { View, Button, Text, StyleSheet,Image,ScrollView,TouchableOpacity } from 'react-native';
import { useCart } from '@/contexts/CartContext';
  import { PRODUCTS_DATA } from '@/contexts/CartContext';

interface Product {
    id: string;
    name: string;
    price: number;
    quantity: number;
    category: string;
    image: string;
    description: string;
  }







const Products = ({id,name,price,quantity,image,selectedQuantity,onIncrease,onDecrease,onAddToCart}:{id:string,name:string,price:number,quantity:number,image:string,selectedQuantity:number
  ,onIncrease:()=>void,onDecrease:()=>void,onAddToCart:() => void}) =>{
    return(
      
      <View style={styles.productCard}>
        {/* <Text style={styles.productQuantity}>Stock:{quantity}</Text> */}

   
        <Image source={{ uri: image }} style={styles.productImage} />
        <View style={styles.productInfo}>
          <Text style={styles.productName}>{name}</Text>
          <Text style={styles.productPrice}>${price}</Text>
          <Text style={styles.productQuantity}>Stock:{quantity}</Text>
        </View>
         <View style={styles.quantitySelector}>

    <TouchableOpacity onPress={onDecrease} style={styles.quantityButton}>
      <Text style={styles.quantityButtonText}>−</Text>
    </TouchableOpacity>

    <Text style={styles.quantityText}>{selectedQuantity}</Text>

    <TouchableOpacity onPress={onIncrease} style={styles.quantityButton}>
      <Text style={styles.quantityButtonText}>+</Text>
    
    </TouchableOpacity>
   

  </View>
   <TouchableOpacity onPress={onAddToCart} style = {styles.addToCartButton}>
      <Text>Add to Cart</Text>
    </TouchableOpacity>
      </View>
      

      
      
    );
};

  

export default function HomeScreen() {
  const [selectedFilter,setSelectedFilter] = useState('all');

  const { cart, quantities, addToCart, increaseQuantity, decreaseQuantity } =useCart();
 
  //- {[key: string]: number} = an object where keys are strings (product IDs) and values are numbers (quantities) quantities is an object with string keys and number values

  


  


  const filteredProducts = selectedFilter === 'all'?PRODUCTS_DATA:PRODUCTS_DATA.filter(product => product.category === selectedFilter)

    return (
  <ScrollView style={styles.container}>

    {/* <View style={styles.cartSummary}>
        <Text style={styles.cartText}>Cart: {cart.length} items</Text>
        <Text style={styles.cartText}>
          Total: ${cart.reduce((sum, item) => sum + (item.price *item.selectedQuantity), 0).toFixed(2)}
        </Text>
      </View> */}
      
    <View style={styles.filterContainer}>


        <TouchableOpacity onPress = {() => setSelectedFilter('all')}>
          <Text style={styles.filterButton}>All</Text>
        </TouchableOpacity>
         <TouchableOpacity onPress={() => setSelectedFilter('glass')}>
          <Text style={styles.filterButton}>Glass</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setSelectedFilter('body')}>
          <Text style={styles.filterButton}>Body</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setSelectedFilter('wheel')}>
          <Text style={styles.filterButton}>Wheel</Text>
        </TouchableOpacity>

    </View>
        <View style={styles.row}>
          {filteredProducts.map((product) => (
           <Products 
            key={product.id}
            id={product.id}
            name={product.name}
            price={product.price}
            quantity={product.quantity}
            image={product.image}
            selectedQuantity={quantities[product.id] || 0}
            onIncrease={() => increaseQuantity(product.id,product.quantity)}
            onDecrease={() => decreaseQuantity(product.id)}
            onAddToCart={()=> addToCart(product.id)}
           />
          ))}

        </View>
  </ScrollView>
    );
  }



const styles = StyleSheet.create({
    container: {
      // flex: 1,
      backgroundColor: '#f5f5f5',
       paddingTop:50,
    },
    addToCartButton: {
    backgroundColor: '#2e7d32',
    padding: 12,
    borderRadius: 8,
    margin: 10,
    alignItems: 'center',
  },
  addToCartText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
    cartSummary: {
    backgroundColor: '#2e7d32',
    padding: 15,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cartText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
    filterContainer: {
      flexDirection: 'row',
      padding: 10,
      gap: 10,
    },
    filterButton: {
      padding: 10,
      backgroundColor: '#ddd',
      borderRadius: 5,
      fontSize: 14,
    },
    row: {
      flexDirection: 'row',
      flexWrap:'wrap',
      justifyContent: 'space-between',
      marginBottom: 10,
    },
    quantitySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    gap: 15,
  },
  quantityButton: {
    width: 30,
    height: 30,
    backgroundColor: '#2e7d32',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  quantityText: {
    fontSize: 16,
    fontWeight: 'bold',
    minWidth: 30,
    textAlign: 'center',
  },
    productCard: {
      paddingTop:60,
      width: '48%',
      backgroundColor: 'white',
      borderRadius: 10,
      overflow: 'hidden',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    productImage: {
      // paddingTop:50,
      width: '100%',
      height: 150,
    },
    productInfo: {
      padding: 10,
    },
    productName: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#333',
      marginBottom: 5,
    },
    productPrice: {
      fontSize: 18,
      fontWeight: '600',
      color: '#2e7d32',
      marginBottom: 3,
    },
    productQuantity: {
      fontSize: 12,
      color: '#666',
    },
  });