<template>
  <button
      @click="() => changeChoosing(type)"
      :class="isActive ? 'enabled' : 'disabled' "
      class="button">
    <slot>

    </slot>
  </button>
</template>

<script>

export default {
  props: {
    isActive: Boolean,
    type: String,
  },
  inject: ['changeChoosing']
}
</script>

<style lang="scss" scoped>
.button {
  width: 85px;
  height: 40px;
  padding: 12px 0;
  cursor: pointer;
  border: 1px solid #cdcdcd;
  border-radius: 0 4px 4px 0;
  text-align: center;
  outline: none;
  background-color: white;
}
.disabled {
  background: url("@/assets/icons/angle-arrow-down.svg") no-repeat 50%;
  background-size: 12px;
}
.enabled {
  background: url("@/assets/icons/angle-arrow-up-white.svg") no-repeat 50% #16b67f;
  background-size: 12px;
}
</style>