<script setup lang="ts">
import AppMap from '@/components/AppMap.vue'
import AppHeader from '@/components/AppHeader.vue'

</script>

<template>
  <AppMap />
  <div class="app-wrapper">
    <AppHeader />
  </div>
</template>

<style lang="scss">
.app-wrapper {
  position: relative;
}
</style>
