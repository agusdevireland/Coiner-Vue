<template>

  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Anta&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@mdi/font/css/materialdesignicons.min.css">
  
  <div class="navbar flex justify-between py-2 px-4">
  <h1 class="text-3xl text-white anta-font">Coiner</h1>
  <div class="flex w-52"></div>
  <div class="flex gap-4">

    <!-- BellCogOutline Button with Dropdown -->
    <div class="relative" ref="settingsDropdown">
    <button class="button py-1 px-2 rounded-lg shadow-xl" 
            @click="toggleDropdown('settings')">
      <i class="mdi mdi-eye-plus custom-icon"></i> 
    </button>
    <div v-if="isSettingsDropdownOpen" class="dropdown-menu">
          <ul>
            <li class="font-bold mt-2 mb-2 mx-2" @click="selectOption('Language')">Language</li>
            <li class="font-bold mb-2 mx-2" @click="selectOption('Currency')">Currency</li>
          </ul>
        </div>
      </div>
     
    <!-- EyePlus Button with Dropdown and Input -->
    <div class="relative" ref="cryptoDropdown">
    <button class="button py-1 px-2 rounded-lg shadow-xl"
            @click="toggleDropdown('crypto')">
      <i class="mdi mdi-bell-cog-outline custom-icon"></i> 
    </button>
    <div v-if="isCryptoDropdownOpen" class="dropdown-menu">
          <ul>
            <li class="flex justify-center font-bold text-xs mt-2">Add Crypto</li>
          </ul>
          <input type="text" placeholder="Enter Crypto" class="dropdown-input" v-model="cryptoInput" @input="debouncedFetchCryptos"/>

           <!-- Display filtered cryptocurrencies -->
           <ul v-if="filteredCryptos.length > 0">
            <li v-for="crypto in filteredCryptos" :key="crypto.id" @click="selectCrypto(crypto)" class="crypto-item mt-2 py-2 px-2 hover:bg-white">
              <img :src="crypto.image" alt="crypto-icon" class="crypto-icon ml-4 mr-2"/>
              ({{ crypto.symbol.toUpperCase() }}) {{ crypto.name }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>

  <div class="flex justify-center py-2 gap-x-16">
    <p class="text-below-navbar font-bold">Coin</p>
    <p class="text-below-navbar font-bold">Price</p>
    <p class="text-below-navbar font-bold">Market Cap</p>
  </div>

  <div class="p px-10 py-20">
  </div>

</template>

<script>

export default {
  name: "my-component",
  components: {
  },
  data() {
    return {
      isSettingsDropdownOpen: false,
      isCryptoDropdownOpen: false,
      cryptoInput: "",
      cryptos: [], // Store all cryptos
      filteredCryptos: [], // Filtered list based on input
      debounceTimeout: null, // Timer to debounce API requests
    };
  },
  methods: {

    toggleDropdown(menu) {
      if (menu === 'settings') {
        this.isSettingsDropdownOpen = !this.isSettingsDropdownOpen;
        this.isCryptoDropdownOpen = false; // Close other dropdown
      } else if (menu === 'crypto') {
        this.isCryptoDropdownOpen = !this.isCryptoDropdownOpen;
        this.isSettingsDropdownOpen = false; // Close other dropdown
      }
    },

    selectOption(option) {
      alert(`Selected: ${option}`);
      this.closeDropdowns(); // Close all dropdowns after selection
    },

    closeDropdowns() {
      this.isSettingsDropdownOpen = false;
      this.isCryptoDropdownOpen = false;
    },

    handleClickOutside(event) {
      // Check if the click was outside both dropdowns
      if (
        this.isSettingsDropdownOpen &&
        this.$refs.settingsDropdown &&
        !this.$refs.settingsDropdown.contains(event.target)
      ) {
        this.isSettingsDropdownOpen = false;
      }
      if (
        this.isCryptoDropdownOpen &&
        this.$refs.cryptoDropdown &&
        !this.$refs.cryptoDropdown.contains(event.target)
      ) {
        this.isCryptoDropdownOpen = false;
      }
    },

     // Debounced method to fetch cryptos
     debouncedFetchCryptos() {
      if (this.debounceTimeout) clearTimeout(this.debounceTimeout); // Clear previous timeout

      this.debounceTimeout = setTimeout(() => {
        this.fetchCryptos();
      }, 500); // Wait for 500ms after user stops typing
    },

    async fetchCryptos() {
      if (this.cryptoInput.length >= 2) {
       try {
            const response = await fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur`);
            const data = await response.json();

      console.log("Full API Response:", data); // Log for debugging
      
      if (Array.isArray(data)) {
        this.cryptos = data;
        this.filteredCryptos = this.cryptos.filter((crypto) =>
          crypto.name.toLowerCase().includes(this.cryptoInput.toLowerCase())
        );
      } else {
        // Handle non-array response
        console.error("Unexpected API response structure:", data);
        if (data.error) {
          alert(`Error fetching cryptos: ${data.error}`); // Show API error message
        } else {
          alert("An unexpected error occurred. Please try again later.");
        }
        this.cryptos = [];
        this.filteredCryptos = [];
      }
    } catch (error) {
      console.error("Error fetching cryptos:", error.message);
      alert("Network error or API unavailable. Please try again later.");
      this.cryptos = [];
      this.filteredCryptos = [];
    }
   } else {
    this.filteredCryptos = []; // Clear the list for invalid input
    }
   },
   
    selectCrypto(crypto) {
      this.cryptoInput = `${crypto.name} (${crypto.symbol.toUpperCase()})`; // Set input to selected crypto
      this.isCryptoDropdownOpen = false; // Close dropdown after selection
    }
  },

  mounted() {
    // Listen for clicks on the entire document
    document.addEventListener('click', this.handleClickOutside);
  },

  beforeDestroy() {
    // Remove the listener when the component is destroyed
    document.removeEventListener('click', this.handleClickOutside);
  }
};

</script>

<style lang="css" scoped>

.navbar {
  background-color: #AE009D;
}

.button {
  background-color: #D9D9D9;
}

.button:hover {
  background-color: #c4c4c4; 
}

.button:active {
  background-color: #D9D9D9;
}

.anta-font{
  font-family: "Anta", sans-serif;
  font-weight: 400;
  font-style: bold;
}

.text-below-navbar{
  color: #AE009D;
}

.p{
  background-color: #D9D9D9;
}

.custom-icon{
  font-size: 20px;
}

/* Dropdown Menu Styles */
.dropdown-menu {
  position: absolute;
  top: 100%;
  right: 0;
  background-color: #D9D9D9;
  color: #8d007f;
  border: 1px solid #ffffff;
  border-radius: 4px;
  width: 150px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  z-index: 100;
  
  /* Add scrolling behavior */
  max-height: 200px; /* Adjust this value as needed for your layout */
  overflow-y: auto;
}

.dropdown-menu ul {
  list-style: none;
}

.dropdown-menu li {
  padding: 0px;
  cursor: pointer;
}

/* Optional: Customize scrollbar appearance */
.dropdown-menu::-webkit-scrollbar {
  width: 8px;
}

.dropdown-menu::-webkit-scrollbar-thumb {
  background-color: #8d007f;
  border-radius: 4px;
}

.dropdown-menu::-webkit-scrollbar-track {
  background-color: #f0f0f0;
}

/* Input Field Style */
.dropdown-input {
  width: calc(100% - 32px);
  margin: 8px 16px;
  padding: 2px;
  border: 1px solid #ccc;
}

/* Styling for the crypto items */
.crypto-item {
  padding: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
}

.crypto-icon {
  background-color: #8d007f;
  width: 18px;
  height: 18px;
  border-radius: 50%; 
  display: inline-block; 
}

</style>

