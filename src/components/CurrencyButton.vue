<template>
  <button
      @click="() => changeActiveCurrency(shortCurrencyName, type)"
      :class="isActive && 'enabled'"
      class="button">
    <span class="label">{{fullCurrencyName}}</span>
    <slot/>
  </button>
</template>

<script>
export default {
  props: {
    isActive: Boolean,
    fullCurrencyName: String,
    shortCurrencyName: String,
    type: String,
  },
  inject: ['changeActiveCurrency'],
}
</script>

<style lang="scss" scoped>
.button {
  width: 85px;
  height: 40px;
  padding: 12px 0;
  cursor: pointer;
  border: 1px solid #cdcdcd;
  text-align: center;
  outline: none;
  background-color: white;
  position: relative;

  &:first-child {
    border-radius: 4px 0 0 4px;
  };

  &:hover {
    .label {
      display: block;
    }
  }
}

.label {
  display: none;
  position: absolute;
  width: auto;
  white-space: nowrap;
  left: 50%;
  transform: translateX(-50%);
  top: -40px;
  padding: 10px 20px;
  box-shadow: 0 8px 40px 0 rgba(0,0,0,.2);
  color: black;
}

.enabled {
  background-color: #16b67f;
  color: white;
}
</style>