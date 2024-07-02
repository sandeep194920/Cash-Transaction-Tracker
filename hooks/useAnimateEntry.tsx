import { Animated, FlatList } from "react-native";
import { useEffect, useRef } from "react";
import { Results } from "realm/dist/public-types/Results";
import { Order } from "../models/OrderSchema";

const useAnimateEntry = (data: Results<Order>) => {
  // Animated value for the flashing effect
  const flashAnim = useRef(new Animated.Value(0)).current;

  // Ref for the FlatList
  const animateRef = useRef<FlatList>(null);

  useEffect(() => {
    if (data.length > 0) {
      setTimeout(() => {
        animateRef.current?.scrollToEnd({ animated: true });
      }, 100);

      // Start flashing animation once
      Animated.sequence([
        Animated.timing(flashAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.timing(flashAnim, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [data]);

  return { animateRef, flashAnim };
};

export default useAnimateEntry;
