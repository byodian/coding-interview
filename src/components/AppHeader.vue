<script setup lang="ts">
import { reactive, computed, onUnmounted } from 'vue'
import VButton from './VButton.vue'
import VPopup from './VPopup.vue'
import VSlider from './VSlider.vue'
import VFieldItem from './VFieldItem.vue'
import VFieldContent from './VFieldContent.vue'
import { beedRoomData, bathroomData, garageData } from '@/config/filterData'
import { useFilterStore } from '@/stores/index'
import { setItem, clearItems } from '@/utils/localstorage'
import { isUnEmpty } from '@/utils/common'

import type { List } from './type'

let timer: number

// store
const store = useFilterStore()

interface State {
  isBedroomsEmpty: boolean,
  isBathroomEmpty: boolean,
  isGarageEmpty: boolean,
  isClicked: boolean,
  isOpened: boolean,
  keywordValue: string,
  bedroomsOption: List,
  bathroomOption: List,
  garageOption: List
}

// states
const state = reactive<State>({
  isBedroomsEmpty: true,
  isBathroomEmpty: true,
  isGarageEmpty: true,
  isClicked: false,
  isOpened: false,
  keywordValue: '',
  bedroomsOption: [],
  bathroomOption: [],
  garageOption: []
})

// computed properties
const iconName = computed(() => {
  return state.isClicked ? 'icon-arrow-up' : 'icon-arrow-down'
})

// Event handlers
const handleClick = () => {
  state.isClicked = !state.isClicked
  if (state.isClicked) {
    state.isOpened = true

    state.garageOption = isUnEmpty(store.garage) ? store.garage : garageData
    state.bedroomsOption = isUnEmpty(store.bedrooms) ? store.bedrooms : beedRoomData
    state.bathroomOption = isUnEmpty(store.bathroom) ? store.bathroom : bathroomData
    state.keywordValue = store.keyword ? store.keyword : ''
  }
}

const handleClose = () => {
  state.isClicked = false
  state.isOpened = false
}

const handleApply = () => {
  handleClose()
  timer = setTimeout(() => {
    alert('已完成筛选操作')
  })
}

// 重置筛选条件
const handleClear = () => {
  state.isGarageEmpty = true
  state.isBathroomEmpty = true
  state.isBedroomsEmpty = true
  state.garageOption = garageData
  state.bathroomOption = bathroomData
  state.bedroomsOption = beedRoomData
  state.keywordValue = ''
  handleClose()
  store.$reset()
  clearItems()
}

// TODO: DRY
const handleBathroomClick = (option: List) => {
  state.bathroomOption = option
  store.setBathroom(option)
  setItem('bathroom', option)
}

const handleGarageClick = (option: List) => {
  state.garageOption = option
  store.setGarage(option)
  setItem('garage', option)
}

const handleMultipleChange = (option: List) => {
  state.bedroomsOption = option
  store.setBedRooms(option)
  setItem('bedrooms', option)
}

const handleInput = (e: Event) => {
  state.keywordValue = (e.target as HTMLInputElement).value
  store.setKeyword(state.keywordValue)
  setItem('keyword', state.keywordValue)
}

onUnmounted(() => {
  clearTimeout(timer)
})
</script>

<template>
  <div class="app-header">
    <section class="app-header__button-group">
      <v-button icon-name="icon-arrow-down">
        All Property Types
      </v-button>

      <v-button icon-name="icon-arrow-down">
        3d
      </v-button>
      <v-button :is-active="state.isClicked" :icon-name="iconName" @click="handleClick">
        filters
      </v-button>
    </section>
    <v-popup
      v-model:show="state.isOpened"
      height="85%"
      rounded
      title="Filters"
      @close="handleClose"
    >
      <template #content>
        <v-field-item label="Price Range">
          <v-slider />
        </v-field-item>
        <v-field-item label="Description Contains Keywords">
          <input
            id="v-field__keyword"
            :value="state.keywordValue"
            class="v-field__keyword"
            type="text"
            placeholder="Waterfront, Pool, FirePlace..."
            @input="handleInput"
          >
        </v-field-item>
        <v-field-item label="Bedrooms">
          <v-field-content
            v-model:isEmpty="state.isBedroomsEmpty"
            :list="state.bedroomsOption"
            multiple
            @click="handleMultipleChange"
          />
        </v-field-item>
        <v-field-item label="Bathroom">
          <v-field-content
            v-model:isEmpty="state.isBathroomEmpty"
            :list="state.bathroomOption"
            @click="handleBathroomClick"
          />
        </v-field-item>
        <v-field-item label="Garage/Parking">
          <v-field-content
            v-model:isEmpty="state.isGarageEmpty"
            :list="state.garageOption"
            @click="handleGarageClick"
          />
        </v-field-item>
      </template>
      <template #footer>
        <div class="popup-content__buttons flex">
          <v-button type="text" color="#28A3B3" @click="handleClear">
            Clear
          </v-button>
          <v-button
            type="text"
            color="#28A3B3"
            :class="'pr-0'"
            @click="handleApply"
          >
            Apply
          </v-button>
        </div>
      </template>
    </v-popup>
  </div>
</template>

<style lang="scss">
.app-header {
  display: flex;
  height: 14.4rem;
  padding: 5.6rem 1.6rem .9rem;
  background-color: $primary-color;

  &__button-group {
    display: flex;
    flex: 1;
    flex-wrap: wrap;
    justify-content: space-between;
  }
}

.v-field__keyword {
  width: 100%;
  padding: 1.2rem 0 1.2rem 1rem;
  border: 1px solid rgb(0 0 0 / 10%);
  border-radius: 4px;

  &::placeholder {
    color: #808080;
    opacity: .8;
  }
}

</style>
