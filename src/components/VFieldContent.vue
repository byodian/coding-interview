<script setup lang="ts">
import { reactive } from 'vue'
import type { List } from './type'

// Types
export interface Props {
  list: List;
  multiple?: boolean;
  isEmpty: boolean;
}

type Id = number | string

interface Emit {
  (e: 'click', options: List): void,
  (e: 'update:isEmpty', value: boolean): void
}

// Emits
const emit = defineEmits<Emit>()

// Props
const props = withDefaults(defineProps<Props>(), {
  multiple: false,
  isEmpty: true
})

// Methods
const itemClassName = (value: boolean) => (
  ['v-field-content__item', { 'is-actived': value }]
)

// reset all fields when to click any button
const resetFields = () => {
  const initialOptions = props.list.map(item => ({ ...item, checked: false }))
  emit('update:isEmpty', true)
  emit('click', initialOptions)
}

const onEmit = (emitedValue: List) => {
  emit('update:isEmpty', false)
  emit('click', emitedValue)
}

// Event handlers
const handleMultipleClick = (id: Id) => {
  if (id === '') {
    resetFields()
  } else {
    const emitedValue = props.list.map(item => item.value === id
      ? { ...item, checked: !item.checked }
      : item
    )

    onEmit(emitedValue)
  }
}

const handleSingleClick = (id: Id) => {
  if (id === '') {
    resetFields()
  } else {
    const emitedValue = props.list.map(item => item.value === id
      ? { ...item, checked: true }
      : { ...item, checked: false }
    )

    onEmit(emitedValue)
  }
}

const handleClick = (id: Id): void => {
  if (props.multiple) {
    handleMultipleClick(id)
  } else {
    handleSingleClick(id)
  }
}

</script>

<template>
  <ul class="v-field-content">
    <li :class="itemClassName(props.isEmpty)" @click="handleClick('')">
      Any
    </li>
    <li
      v-for="item in props.list"
      :key="item.value"
      :class="itemClassName(item.checked)"
      @click="handleClick(item.value)"
    >
      {{ item.label }}
    </li>
  </ul>
</template>

<style lang="scss">
.v-field-content {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0;

  &__item {
    padding: .7rem 1rem;
    cursor: pointer;
    border: 1px solid rgb(0 0 0 / 10%);
    border-radius: 4px;
  }

  &__item.is-actived {
    color: $color-white;
    background-color: $primary-color;
  }
}
</style>
