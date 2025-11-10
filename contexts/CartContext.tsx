import React, {createContext,useContext,useState} from 'react';


 interface Product {
    id: string;
    name: string;
    price: number;
    quantity: number;
    category: string;
    image: string;
    description: string;
  }



interface CartContextType {
    cart: Array<Product & { selectedQuantity: number }>;
    quantities: { [key: string]: number };
    addToCart: (productId: string) => void;
    increaseQuantity: (productId: string, maxStock: number) => void;
    decreaseQuantity: (productId: string) => void;
  }

  
export const PRODUCTS_DATA :Product[] = [
       {
      id: '1',
      name: 'Windshield Glass',
      price: 299.99,
      quantity: 15,
      category: 'glass',
      image: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?w=500&q=80',
      description: 'Front windshield replacement glass'
    },
    {
      id: '2',
      name: 'Side Window Glass',
      price: 149.99,
      quantity: 25,
      category: 'glass',
      image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=500&q=80',
      description: 'Driver/Passenger side window glass'
    },
    {
      id: '3',
      name: 'Rear Window Glass',
      price: 249.99,
      quantity: 10,
      category: 'glass',
      image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=500&q=80',
      description: 'Back windshield glass'
    },
    {
      id: '4',
      name: 'Glass Repair Kit',
      price: 29.99,
      quantity: 50,
      category: 'glass',
      image: 'https://images.unsplash.com/photo-1625047509168-a7026f36de04?w=500&q=80',
      description: 'DIY glass chip repair kit'
    },

    // Car Body Parts
    {
      id: '5',
      name: 'Front Bumper',
      price: 399.99,
      quantity: 12,
      category: 'body',
      image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=500&q=80',
      description: 'Front bumper replacement part'
    },
    {
      id: '6',
      name: 'Rear Bumper',
      price: 349.99,
      quantity: 18,
      category: 'body',
      image: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=500&q=80',
      description: 'Rear bumper replacement part'
    },
    {
      id: '7',
      name: 'Side Mirror',
      price: 89.99,
      quantity: 30,
      category: 'body',
      image: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=500&q=80',
      description: 'Side view mirror assembly'
    },
    {
      id: '8',
      name: 'Hood Panel',
      price: 499.99,
      quantity: 8,
      category: 'body',
      image: 'https://images.unsplash.com/photo-1541348263662-e068662d82af?w=500&q=80',
      description: 'Engine hood replacement panel'
    },
    {
      id: '9',
      name: 'Door Panel',
      price: 279.99,
      quantity: 20,
      category: 'body',
      image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=500&q=80',
      description: 'Car door panel replacement'
    },

    // Car Wheel Parts
    {
      id: '10',
      name: 'Tire Set (4 pcs)',
      price: 599.99,
      quantity: 40,
      category: 'wheel',
      image: 'https://images.unsplash.com/photo-1606767657183-d0cd8589dce3?w=500&q=80',
      description: 'All-season tire set'
    },
    {
      id: '11',
      name: 'Alloy Wheel Rim',
      price: 199.99,
      quantity: 35,
      category: 'wheel',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&q=80',
      description: '17-inch alloy wheel rim'
    },
    {
      id: '12',
      name: 'Brake Pads',
      price: 79.99,
      quantity: 60,
      category: 'wheel',
      image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=500&q=80',
      description: 'Ceramic brake pad set'
    },
    {
      id: '13',
      name: 'Brake Disc Rotor',
      price: 129.99,
      quantity: 45,
      category: 'wheel',
      image: 'https://images.unsplash.com/photo-1621939514649-280e2ee25f60?w=500&q=80',
      description: 'Front brake disc rotor'
    },
    {
      id: '14',
      name: 'Wheel Bearing',
      price: 45.99,
      quantity: 55,
      category: 'wheel',
      image: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=500&q=80',
      description: 'Front/Rear wheel bearing assembly'
    },
    {
      id: '15',
      name: 'Tire Repair Kit',
      price: 24.99,
      quantity: 100,
      category: 'wheel',
      image: 'https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?w=500&q=80',
      description: 'Emergency tire puncture repair kit'
    }
  ]



const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {


    const [cart, setCart] = useState<Array<Product & { selectedQuantity:number }>>([]);
    const [quantities, setQuantities] = useState<{ [key: string]: number}>({});

    const addToCart = (productId: string) => {
      const qty = quantities[productId] || 0;
      if (qty > 0) {
        const product = PRODUCTS_DATA.find(p => p.id === productId);
        if (product) {
                setCart(currentCart => [...currentCart, { ...product,
        selectedQuantity: qty }]);
                setQuantities(currentQuantities => ({ ...currentQuantities,
        [productId]: 0 }));
        }
      }
    };

    const increaseQuantity = (productId: string, maxStock: number) => {
      setQuantities(currentQuantities => {
        const currentQty = currentQuantities[productId] || 0;
        if (currentQty < maxStock) {
          return { ...currentQuantities, [productId]: currentQty + 1 };
        }
        return currentQuantities;
      });
    };

    const decreaseQuantity = (productId: string) => {
      setQuantities(currentQuantities => ({
        ...currentQuantities,
        [productId]: Math.max((currentQuantities[productId] || 0) - 1, 0)
      }));
    };

    return (
      <CartContext.Provider value={{ cart, quantities, addToCart, 
        increaseQuantity, decreaseQuantity }}>
                {children}
            </CartContext.Provider>
            );
  }

 export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
      throw new Error('useCart must be used within a CartProvider');
    }
    return context;
  }