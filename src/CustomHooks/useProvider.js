
import { getDocs, collection } from "firebase/firestore";
import { db } from "../firebase-config"; // importa la instancia de la conexión a Firebase

    let stock = [];
    const loadDocument = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "Stack"));
        const products = querySnapshot.docs.map((doc) => {
          const { name, quantity, size, price, color, state, imageUrl, brand } = doc.data();
          const id = doc.id;
          return  {
            name,
            color,
            quantity,
            size,
            price,
            id,
            state,
            brand,
            imageUrl: [...imageUrl]
          };
        });
        stock = products;
        
      } catch (error) {
        console.error("Error updating state: ", error);
      }
      return stock;
    };

export {
  loadDocument
}

