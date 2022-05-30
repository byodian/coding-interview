<script setup lang="ts">
import { computed } from 'vue'

type Position = 'top' | 'bottom'

interface Props {
  show: boolean;
  position?: Position;
  style?: object,
  closeOnClickOverlay?: boolean,
  rounded?: boolean,
  closeable?: boolean,
  height: string,
  title: string,
}

interface Emit {
  (e: 'close'): void;
  (e: 'update:show', show: boolean): void;
  (e: 'click'): void;
  (e: 'click-overlay'): void;
}

// Events
const emit = defineEmits<Emit>()

// Props
const props = withDefaults(defineProps<Props>(), {
  position: 'top',
  closeOnClickOverlay: true,
  style: () => ({}),
  rounded: false,
  height: '70%',
  closeable: false
})

// Computed properties
const stylePopupContent = computed(() => {
  return {
    borderRadius: props.rounded ? '1.5rem 1.5rem 0 0' : '0',
    height: props.height
  }
})

// Event handlers
const handleClose = () => {
  emit('close')
  emit('update:show', false)
}

const onClickOverlay = () => {
  emit('click-overlay')

  // Whether to close popup when overlay is clicked
  if (props.closeOnClickOverlay) {
    handleClose()
  }
}

</script>

<template>
  <div v-if="props.show" class="v-overlay" @click="onClickOverlay" />

  <div v-if="props.show" class="v-popup" :style="stylePopupContent">
    <p class="v-popup__title">
      {{ props.title }}
    </p>

    <div v-if="closeable" class="v-close">
      <span class="v-close-inner" />
    </div>

    <div v-if="$slots.content" class="v-popup__content">
      <slot name="content" />
    </div>

    <div v-if="$slots.footer" class="v-popup__footer">
      <slot name="footer" />
    </div>
  </div>
</template>

<style lang="scss">
%line-shared {
  width: 15px;
  height: 1px;
  background-color: $secondary-color;
}

.v-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: $overlay-background-color;
}

.v-popup {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 0 1.6rem;
  overflow-y: scroll;
  background-color: $overlay-content-background-color;
  box-shadow: 0 -1px 15px rgb(0 0 0 / 8%);

  &__title {
    margin-top: 3rem;
    font-weight: bold;
    text-align: center;
  }

  &__content {
    height: 100%;
    margin-top: 2rem;
    margin-bottom: 1.5rem;
  }

  &__footer {
    position: fixed;
    bottom: 0;
    left: 0;
    display: flex;
    justify-content: flex-end;
    width: 100%;
    height: 13.6rem;
    padding: 6rem 1.6rem 0;
    background: linear-gradient(180deg, rgb(255 255 255 / .01%) 0%, #FFF 27.77%);
  }
}

.v-close {
  position: absolute;
  top: 2.5rem;
  right: 1.5rem;

  @extend %line-shared;

  transform: rotate(45deg);

  &::before {
    position: absolute;
    content: '';

    @extend %line-shared;

    transform: rotate(-90deg);
  }
}
</style>
