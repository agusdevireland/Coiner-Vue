
<template>
    <div class="p-4">
      <h1 class="text-xl font-bold bg-purple-800">Coiner</h1>
      <button @click="fetchCryptoData"
              class="mt-4 bg-purple-500 text-white py-2 px-4 rounded">
        Fetch Crypto Data
      </button>
      <div v-if="cryptoData" class="mt-4">
        <p>Bitcoin Price: ${{ cryptoData.bitcoin.usd }}</p>
      </div>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  
  export default {
    name: 'popUpApp',

    setup() {
      const cryptoData = ref(null);
  
      async function fetchCryptoData() {
        const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd');
        cryptoData.value = await response.json();
      }
  
      return { cryptoData, fetchCryptoData };
    },
  };
  </script>
  
  <style scoped>
  /* Additional styles */
  </style>
  