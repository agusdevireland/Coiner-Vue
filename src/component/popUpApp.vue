<template>

  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Anta&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@mdi/font/css/materialdesignicons.min.css">
  
  <div class="navbar flex justify-between py-2 px-4">
  <h1 class="text-3xl text-white anta-font">Coiner</h1>
  <div class="flex w-52"></div>
  <div class="flex gap-4">
    <button class="button py-1 px-2 rounded-lg shadow-xl">
      <i class="mdi mdi-eye-plus custom-icon"></i> 
    </button>
    <button class="button py-1 px-2 rounded-lg shadow-xl">
      <i class="mdi mdi-bell-cog-outline custom-icon"></i> 
    </button>
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
  name: 'popUpApp',
  data() {
    return {}
  }
}

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

</style>

