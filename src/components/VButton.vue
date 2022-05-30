<script lang="ts">
export default {
  inheritAttrs: false
}
</script>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  isActive?: boolean;
  iconName?: string;
  type?: string;
  color?: string;
}

interface Emits {
  (e: 'click'): void
}

// Events
const emit = defineEmits<Emits>()

// Porps
const props = withDefaults(defineProps<Props>(), {
    type: 'button',
    iconName: '',
    color: ''
  })

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
  <button
    v-if="props.type === 'button'"
    class="v-button"
    :style="styleButton"
    v-bind="$attrs"
    @click="handleClick"
  >
    <span v-if="$slots.default">
      <slot />
    </span>
    <i v-if="props.iconName" :class="['v-icon', props.iconName]" />
  </button>

  <button
    v-if="props.type === 'text'"
    v-bind="$attrs"
    class="v-button"
    :style="{ color: props.color }"
    @click="handleClick"
  >
    <slot />
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
