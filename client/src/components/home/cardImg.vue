<template>
  <!-- eslint-disable max-len -->
  <section class="md:flex md:items-center">
      <div id="img" class="md:w-1/2 md:order-2">
          <img v-bind:src="cardSrc.imgSrc">
      </div>
      <div id="card" class="md:w-1/2 md:order-1 my-10 md:my-0">
        <div class="m-auto w-8/12">
          <h1 class="text-3xl text-blue-500 pb-2">{{cardSrc.cardTitle}}</h1>
          <h2 v-for="description in cardSrc.cardDescription"
          v-bind:key="description" class="text-xl text-gray-800">{{description}}</h2>
        </div>
      </div>
  </section>
</template>

<script>
/* eslint-disable indent */
/* eslint-disable quotes */

export default {
  name: 'cardImg',
  props: ['cardSrc'],
};
</script>
