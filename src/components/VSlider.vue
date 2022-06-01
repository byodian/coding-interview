<script setup lang="ts">
interface Props {
  min?: number;
  max?: number;
}
const props = withDefaults(defineProps<Props>(), {
  min: 0,
  max: 4000000
})

</script>

<template>
  <div class="v-slider">
    <div class="v-slider__price">
      <span>${{ props.min }}</span> - <span>${{ props.max }}</span>
    </div>
    <div class="v-slider__line">
      <div class="v-slider__line-inner" />
    </div>
    <div class="v-slider__range">
      <input type="range" class="v-slider__range-min" min="0" max="15000" value="0">
      <input type="range" class="v-slider__range-max" min="0" max="15000" value="15000">
    </div>
  </div>
</template>

<style lang="scss">
.v-slider {
  &__price {
    margin-bottom: 2.4rem;
  }

  &__line {
    position: relative;
    height: 2px;
    margin-bottom: 2.4rem;
    background-color: $color-gray;
  }

  &__line-inner {
    position: absolute;
    right: 0;
    left: 0;
    height: 2px;
    content: '';
    background-color: $primary-color;
    border-radius: 4px;
  }

  &__range {
    position: relative;

    input {
      appearance: none;
      position: absolute;
      top: -28px;
      width: 100%;
      height: 2px;
      pointer-events: none;
      background: none;
    }

    input[type='range']::-moz-range-thumb {
      appearance: none;
      width: 17px;
      height: 17px;
      background: #FFF;
      border: none;
      border-radius: 100px;
      box-shadow: 0 1px 7px rgb(0 0 0 / 25%);
    }
  }
}
</style>
