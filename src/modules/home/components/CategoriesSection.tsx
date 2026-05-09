import React from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";

import {
  BookOpen,
  BriefcaseBusiness,
  Cross,
  ShoppingBag,
  Store,
} from "lucide-react-native";

const categories = [
  { id: "1", title: "Bodegas", icon: Store, active: true },
  { id: "2", title: "Librerías", icon: BookOpen },
  { id: "3", title: "Ferreterías", icon: BriefcaseBusiness },
  { id: "4", title: "Farmacias", icon: Cross },
  { id: "5", title: "Comida", icon: ShoppingBag },
];

export const CategoriesSection = () => {
  return (
    <View className="mt-5">
      {/* HEADER */}
      <View className="flex-row items-center justify-between px-5 mb-4">
        <Text className="text-[18px] font-bold text-[#013220]">Categorías</Text>

        <TouchableOpacity activeOpacity={0.7}>
          <Text className="text-[14px] font-semibold text-green-700">
            Ver todas
          </Text>
        </TouchableOpacity>
      </View>

      {/* LISTA */}
      <FlatList
        horizontal
        data={categories}
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 18,
        }}
        renderItem={({ item }) => {
          const Icon = item.icon;

          return (
            <TouchableOpacity activeOpacity={0.8} className="mr-3 items-center">
              <View
                className={`w-[76px] h-[76px] rounded-[24px] justify-center items-center border ${
                  item.active
                    ? "bg-[#DDF5E7] border-[#CBECD8]"
                    : "bg-white border-[#ECECEC]"
                }`}
                style={{
                  shadowColor: "#000",
                  shadowOpacity: 0.04,
                  shadowRadius: 5,
                  shadowOffset: { width: 0, height: 2 },
                  elevation: 2,
                }}
              >
                <Icon size={27} color="#2ED760" strokeWidth={2.3} />
              </View>

              <Text className="mt-2 text-[12px] font-bold text-[#013220]">
                {item.title}
              </Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};
