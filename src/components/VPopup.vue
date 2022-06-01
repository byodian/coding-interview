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
    <div class="v-popup__title">
      {{ props.title }}
    </div>

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

%box-shared {
  left: 50%;
  width: 100%;
  max-width: $page-width;
  transform: translateX(-50%);
}

.v-overlay {
  position: fixed;
  top: 0;

  @extend %box-shared;

  height: 100%;
  background-color: $overlay-background-color;
}

.v-popup {
  position: fixed;
  bottom: 0;
  padding: 0 1.6rem;

  @extend %box-shared;

  background-color: $overlay-content-background-color;
  box-shadow: 0 -1px 15px rgb(0 0 0 / 8%);

  &__title {
    display: flex;
    align-items: center;
    justify-content: center;
    height: $popup-header-height;
    padding: 3rem 0 2rem;
    font-size: 1.8rem;
    font-weight: bold;
    text-align: center;
  }

  &__content {
    max-height: calc(100% - $popup-header-height - $popup-footer-height);
    margin-bottom: 1.5rem;
    overflow-x: hidden;
    overflow-y: scroll;
  }

  &__footer {
    position: fixed;
    bottom: 0;
    left: 0;
    display: flex;
    justify-content: flex-end;
    width: 100%;
    height: $popup-footer-height;
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
