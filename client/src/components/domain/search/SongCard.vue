<template>
  <!-- eslint-disable max-len -->
  <!-- class="w-64 m-4 overflow-hidden bg-white rounded-lg" -->
  <div class="m-4">
    <div class="relative overflow-hidden bg-red-600 rounded-lg" style="padding-bottom: 80%">
      <img :src="song.albumCoverUrl" class="absolute object-cover w-full h-full rounded-lg"/>
    </div>
    <h1 class="relative px-4 font-bold text-red-400 shadow-md md:inline-block sm:flex"></h1>
    <div class="relative w-64 px-4 -mt-16">
      <div class="p-6 bg-white rounded-lg shadow-md">
        <div>
          <h1 class="text-sm leading-tight text-gray-700 truncate">{{song.artist}}</h1>
        </div>
        <div>
          <h1 class="text-2xl font-semibold leading-tight truncate">{{song.name}}</h1>
        </div>
        <div class="inline-block p-2 mt-2 bg-blue-400 rounded-md">
          <router-link class="font-semibold tracking-wide text-white" v-bind:to="'/learn/' + song.id">Learn</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['song'],
};
</script>
