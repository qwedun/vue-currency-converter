class Api {

    API_KEY = '3e6a59e64c36a67b927dceb0'; //Знаю, что лучше такое хранить в .env.local, здесь решил просто оставить в классе

    async getUserCurrency() {
        try {
            const rawInfo = await fetch('https://ipapi.co/json/');
            const info = await rawInfo.json();
            return info.currency;
        } catch (e) {
            console.log(e);
        }
    }

    async getSupportedCurrencies() {
        try {
            const rawCurrencies = await fetch(`https://v6.exchangerate-api.com/v6/${this.API_KEY}/codes`);
            const currencies = await rawCurrencies.json();
            return currencies.supported_codes;
        } catch (e) {
            console.log(e);
        }
    }

    async convertRates(from, to) {
        try {
            const rawRate = await fetch(`https://v6.exchangerate-api.com/v6/${this.API_KEY}/latest/${from}`);
            const rate = await rawRate.json();
            return rate.conversion_rates[to];
        } catch (e) {
            console.log(e);
        }
    }
}

export default new Api();