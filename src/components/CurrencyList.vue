<template>
  <div class="list">
    <div
        @click="() => changeCurrentCurrencies(choosing, currency[0], currency[1])"
        v-for="currency in availableCurrencies"
        class="flexContainer"
        :key="currency[0]">
      <div>{{currency[1]}}</div>
      <div class="bold">{{currency[0]}}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    availableCurrencies: Array,
    choosing: String,
  },
  inject: ['changeCurrentCurrencies']
}
</script>

<style lang="scss" scoped>
.flexContainer {
  flex-basis: 25%;
  height: auto;
  display: flex;
  justify-content: space-between;
  padding: 8px 10px;
  margin: 2px 0;
  cursor: pointer;
  &:hover {
    background-color: #e0ecfc;
    border-radius: 4px;
  }
}
.list {
  display: flex;
  flex-wrap: wrap;
  position: absolute;
  box-shadow: 0 8px 40px 0 rgba(0, 0, 0, .2);
  width: calc(100% - 40px);
  left: 20px;
  top: 45px;
  background-color: white;
  border-radius: 4px;
  height: 600px;
  overflow-y: scroll;
  &::-webkit-scrollbar{
    width: 3px;
    background:white;
  }
  &::-webkit-scrollbar-thumb {
    background: #cdcdcd;
    border: none;
  }
}
.bold {
  font-weight: bold;
  margin-left: 4px;
}
</style>