<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  isActive?: boolean,
  iconName?: string
}

interface Emits {
  (e: 'click'): void
}

// Events
const emit = defineEmits<Emits>()

// Porps
const props = defineProps<Props>()

// computed properties
const styleButton = computed(() => ({
  backgroundColor: props.isActive ? '#fff' : 'transparent',
  color: props.isActive ? '#28A3B3' : '#fff'
}))

// Methods
const handleClick = () => {
  emit('click')
}

</script>

<template>
  <button class="v-button" :style="styleButton" @click="handleClick">
    <span v-if="$slots.default">
      <slot />
    </span>
    <i v-if="props.iconName" :class="['v-icon', props.iconName]" />
  </button>
</template>

<style lang="scss">
.v-button {
  display: flex;
  column-gap: 1rem;
  align-items: center;
  height: 3rem;
  padding: 0 1rem;
  font-size: 1.6rem;
  color: $color-white;
  cursor: pointer;
  background-color: transparent;
  border: 1px solid $color-white;
  border-radius: 2.5rem;
  transition: all .2s cubic-bezier(.46, .03, .52, .96);
}

.v-icon {
  font-family: icondemo, sans-serif;
  font-style: normal;
  font-weight: normal;
  font-variant: normal;
  line-height: 1;
}
</style>
