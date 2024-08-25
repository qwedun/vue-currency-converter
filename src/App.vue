<template>
  <div class="flex">
    <div>
      <CurrencyController
          :current-currencies="currentFromCurrencies"
          :type="'from'"
          :active-currency="activeFromCurrency"
          :choosing="choosing"
      />
      <div class="input-container">
        <input
            @input="(e) => this.convertRates(this.activeFromCurrency, this.activeToCurrency, e.target.value, 'left')"
            :value="fromAmount"
            class="input"
            type="number"
            placeholder="I have"
        />
        <div v-if="fromAmount" class="small">1 {{activeFromCurrency}} = {{rate}} {{activeToCurrency}} ({{date}})</div>
      </div>
    </div>
    <div class="img" @click="this.replaceCurrencies()"></div>
    <div>
      <CurrencyController
          :current-currencies="currentToCurrencies"
          :type="'to'"
          :active-currency="activeToCurrency"
          :choosing="choosing"
      />
      <div class="input-container">
        <input
            @input="(e) => this.convertRates(this.activeToCurrency, this.activeFromCurrency, e.target.value,'right')"
            :value="toAmount"
            class="input"
            type="number"
            placeholder="I want to buy"
        />
      </div>
    </div>
    <CurrencyList :choosing="choosing" v-if="choosing" :available-currencies="availableCurrencies"/>
  </div>
</template>

<script>
import CurrencyController from "@/components/CurrencyController.vue";
import Api from "@/api/api";
import CurrencyList from "@/components/CurrencyList.vue";

export default {
  name: 'App',
  components:{
    CurrencyList,
    CurrencyController,
  },
  data() {
    return {
      activeFromCurrency: 'RUB',
      activeToCurrency: 'USD',

      choosing: '',
      fromAmount: '',
      toAmount: '',
      date: '',
      rate: '',

      availableCurrencies: [],
      debounceTimeout: null,
      currentFromCurrencies: [
        {shortName: 'RUB', fullName: 'Russian ruble'},
        {shortName: 'EUR', fullName: 'Euro'},
        {shortName: 'USD', fullName: 'United States dollar'},
        {shortName: 'PHP', fullName: 'Philipine peso'}
      ],
      currentToCurrencies: [
        {shortName: 'RUB', fullName: 'Russian ruble'},
        {shortName: 'EUR', fullName: 'Euro'},
        {shortName: 'USD', fullName: 'United States dollar'},
        {shortName: 'PHP', fullName: 'Philipine peso'}
      ],
    }
  },
  methods: {
    setActiveCurrency(shortName, type) {
      if (type === 'from')
        this.activeFromCurrency = shortName;
      else this.activeToCurrency = shortName;
      this.choosing = '';
    },
    setChoosing(type) {
      if (type === 'from')
        this.choosing = 'from';
      else this.choosing = 'to';
    },
    setCurrentCurrencies(type, shortName, fullName) {
      if (type === 'from') {
        const index = this.currentFromCurrencies.findIndex(obj => obj.shortName === this.activeFromCurrency);
        this.currentFromCurrencies[index] = {shortName: shortName, fullName: fullName};
        this.activeFromCurrency = shortName;
      } else {
        const index = this.currentToCurrencies.findIndex(currencyInfo => currencyInfo.shortName === this.activeToCurrency);
        this.currentToCurrencies[index] = {shortName: shortName, fullName: fullName};
        this.activeToCurrency = shortName;
      }
      this.choosing = '';
    },
    replaceCurrencies() {
      let temp;

      temp = this.toAmount;
      this.toAmount = this.fromAmount;
      this.fromAmount = temp;

      temp = this.activeToCurrency;
      this.activeToCurrency = this.activeFromCurrency;
      this.activeFromCurrency = temp;

      temp = this.currentToCurrencies;
      this.currentToCurrencies = [...this.currentFromCurrencies];
      this.currentFromCurrencies = [...temp];
    },
    async convertRates(from, to, value, type) {
      clearTimeout(this.debounceTimeout);

      //Тут решил использовать debounce, чтобы каждый раз не отправлять запрос на сервер.
      //Тем не менее, бывает, что запрос от апишки приходит дольше, чем 200 мс, так-что инпуты могут немного дергаться
      this.debounceTimeout = setTimeout(async() => {
        const rate = await Api.convertRates(from, to);

        this.date = (new Date).toUTCString();
        this.rate = rate;

        if (type === 'left') {
          this.fromAmount = value;
          this.toAmount = (value * rate).toFixed(5);
        } else {
          this.toAmount = value;
          this.fromAmount = (value * rate).toFixed(5);
        }
      }, 200)
    },
    async getAvailableCurrencies() {
      this.availableCurrencies = await Api.getSupportedCurrencies();
      const userCurrency = await Api.getUserCurrency();

      const index = this.availableCurrencies.findIndex(currencyInfo => currencyInfo[0] === userCurrency);

      if (index !== -1) {
        this.currentFromCurrencies[0] = {shortName: this.availableCurrencies[index][0], fullName: this.availableCurrencies[index][1]};
        this.activeFromCurrency = this.availableCurrencies[index][0];
      }
    }
  },
  provide() {
    return {
      changeActiveCurrency: this.setActiveCurrency,
      changeChoosing: this.setChoosing,
      changeCurrentCurrencies: this.setCurrentCurrencies,
    }
  },
  mounted() {
    this.getAvailableCurrencies();
  },
  watch: {
    activeToCurrency(value) {
      this.convertRates(this.activeFromCurrency, value, this.fromAmount, 'left')
    },
    activeFromCurrency(value) {
      this.convertRates(value, this.activeToCurrency, this.fromAmount, 'left')
    }
  }
}
</script>

<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  font-size: 14px;
  font-family: "Inter", system-ui;
  font-optical-sizing: auto;
  font-weight: normal;
  font-style: normal;
}
html, body {
  min-height: 100vh;
  position: relative;
}
input[type=number]::-webkit-inner-spin-button,
input[type=number]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
.input-container {
  width: 405px;
  height: 140px;
  padding: 30px 20px 15px;
  margin: 24px 0;
  border: 1px solid #cdcdcd;
  flex-basis: 100%;
}
.input {
  width: 100%;
  height: 46px;
  font-size: 44px;
  margin-bottom: 30px;
  outline: 0;
  border: none;
  font-weight: bold;
  overflow: hidden;
}
.flex {
  display: flex;
  position: relative;
  margin: 0 auto;
  padding: 0 20px;
  max-width: 1000px;
  justify-content: space-between;
  align-items: center;
  top: 200px;
}
.img {
  background: url("@/assets/icons/transfer.svg") no-repeat 50%;
  width: 50px;
  height: 50px;
  cursor: pointer;
}
.small {
  font-size: 12px;
}
</style>
