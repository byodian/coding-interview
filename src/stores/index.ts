import { defineStore } from 'pinia'
import type { Option } from '@/components/type'
type List = Option[]

interface FilterState {
  keyword?: string;
  minPrice?: number;
  maxPrice?: number;
  bedrooms: List;
  bathroom: List;
  garage: List;
}

export const useFilterStore = defineStore({
  id: 'filter',
  state: (): FilterState => ({
    keyword: undefined,
    minPrice: undefined,
    maxPrice: undefined,
    bedrooms: [],
    bathroom: [],
    garage: []
  }),
  actions: {
    setBedRooms(options: List) {
      this.bedrooms = options
    },
    setGarage(option: List) {
      this.garage = option
    },
    setBathroom(option: List) {
      this.bathroom = option
    },
    setKeyword(value: string) {
      this.keyword = value
    }
  }
})
