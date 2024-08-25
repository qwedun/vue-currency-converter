<template>
  <div class="currencies-list">
    <CurrencyButton v-for="currency in currentCurrencies"
                    :key="currency.shortName"
                    :type="type"
                    :is-active="activeCurrency === currency.shortName"
                    :short-currency-name="currency.shortName"
                    :full-currency-name="currency.fullName">
      {{currency.shortName}}
    </CurrencyButton>
    <CurrencyChooseButton :type="type" :is-active="choosing === type"/>
  </div>
</template>

<script>
import CurrencyButton from "@/components/CurrencyButton.vue";
import CurrencyChooseButton from "@/components/CurrencyChooseButton.vue";

export default {
  components: {
    CurrencyChooseButton,
    CurrencyButton
  },
  props: {
    activeCurrency: String,
    choosing: String,
    type: String,
    currentCurrencies: Array,
  },
}
</script>

<style lang="scss" scoped>
.currencies-list {
  display: flex;
  width: 405px;
}
</style>