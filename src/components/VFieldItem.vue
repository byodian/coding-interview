<script setup lang="ts">
interface Props {
  label: string;
}

const props = withDefaults(defineProps<Props>(), {
  label: ''
})

</script>

<template>
  <div class="v-field-item">
    <p class="v-field-item__title">
      {{ props.label }}
    </p>
    <div class="v-field-item__content">
      <slot />
    </div>
  </div>
</template>

<style lang="scss">
.v-field-item {
  position: relative;
  padding-bottom: 1.6rem;

  &::after {
    position: absolute;
    width: 100%;
    height: 1px;
    content: '';
    background-color: #E2E2E2;
  }

  &__title {
    margin-bottom: 1.6rem;
    font-size: 1.8rem;
    font-weight: bold;
  }

  &__content {
    margin-bottom: 1.6rem;
  }
}
</style>
