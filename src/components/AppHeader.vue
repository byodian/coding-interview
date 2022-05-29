<script setup lang="ts">
import VButton from './VButton.vue'
import { reactive, computed } from 'vue'

// states
const state = reactive({ isClicked: false, show: false })

// computed properties
const iconName = computed(() => {
  return state.isClicked ? 'icon-arrow-up' : 'icon-arrow-down'
})

// Event handlers
const handleClick = () => {
  state.isClicked = !state.isClicked
}
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
      <v-button 
        :is-active="state.isClicked"
        :icon-name="iconName"
        @click="handleClick"
      >
        filters
      </v-button>
    </section>
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
    justify-content: space-between;
  }
}
</style>
