<template>

  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Anta&display=swap" rel="stylesheet">
  
  <div class="navbar flex justify-start py-4 px-36">
    <h1 class="text-3xl text-white anta-font">Coiner</h1>
    <div class="flex justify-between gap-4">
      <button class="button p-2 rounded-lg shadow-xl">
      </button>
      <button class="button p-2 rounded-lg shadow-xl">
      </button>
    </div>
  </div>

  <div class="flex justify-center py-2 gap-x-16">
    <p class="text-below-navbar font-bold">Coin</p>
    <p class="text-below-navbar font-bold">Price</p>
    <p class="text-below-navbar font-bold">Market Cap</p>
  </div>

  <div class="p p-40">
  </div>

</template>

<script>

export default {
  name: 'popUpApp',
  data() {
    return {
     
      }
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

</style>
