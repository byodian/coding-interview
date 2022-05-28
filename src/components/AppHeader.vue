<script setup lang="ts">
import VButton from './VButton.vue'
import { reactive } from 'vue'
const state = reactive({ isClicked: false, show: false })

const handleClick = () => {
  state.isClicked = !state.isClicked
}
</script>

<template>
  <div class="app-header">
    <v-button :is-active="state.isClicked" @click="handleClick">
      filters
    </v-button>
  </div>
</template>

<style lang="scss">
.app-header {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 14.4rem;
  background-color: #28A3B3;
}
</style>
