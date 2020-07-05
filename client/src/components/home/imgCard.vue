<template>
  <!-- eslint-disable max-len -->
  <section class="md:flex md:items-center">
      <div id="img" class="md:w-1/2">
          <img v-bind:src="cardSrc.imgSrc">
      </div>
      <div id="card" class="md:w-1/2 my-10 md:my-0">
        <div class="w-8/12 m-auto">
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
  name: 'imgCard',
  props: ['cardSrc'],
};
</script>
