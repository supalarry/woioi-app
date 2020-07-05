<template>
  <!-- eslint-disable max-len -->
  <section class="w-11/12 m-auto mb-8 md:mb-10 md:mb-0 md:flex">
      <div class="md:order-2 md:w-1/2 md:my-auto">
        <div id="background-square" class="rounded-md text-center bg-blue-500 pb-5 max-w-sm m-auto md:m-0 md:ml-auto">
            <h1 id="translation" class="text-2xl text-white py-2 tracking-wider">pocket</h1>
            <!-- If we had certain height for image and made it w-full,
            it would distort image, for that use object-cover to size image properly -->
            <!-- If we have image that should take whole div, we can use
             inset-0 h-full w-full object-cover object-center -->
            <img src="../../../public/home/pocket.jpg"
            class="m-auto w-10/12 rounded-md">
        </div>
        <div id="russian" class="text-center py-5 text-xl md:max-w-sm md:ml-auto">
          <h1 class="text-2xl">в   <span class="bg-blue-500 text-white py-1 px-2 rounded-md tracking-wider">карман</span>   засунул сотик</h1>
        </div>
      </div>

      <div id="headline" class="md:order-1 md:w-1/2 md:my-auto text-center md:text-left">
        <h1 class="mb-5 text-3xl md:text-5xl lg:text-6xl xl:text-7xl text-gray-800">Learn languages <br> through songs</h1>
        <router-link to="/register" class="btn btn-blue btn-small lg:btn-medium">Get Started</router-link>
      </div>
  </section>
</template>

<script>

export default {
  name: 'Frontier',
};
</script>
