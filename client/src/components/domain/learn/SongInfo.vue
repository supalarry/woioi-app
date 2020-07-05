<template>
  <!-- eslint-disable max-len -->
  <div class="shadow-md">
    <div class="flex flex-wrap justify-start max-w-md px-5 py-4 mx-auto mb-8 sm:px-0">
      <div>
        <img :src="song.albumCoverUrl" class="hidden h-32 rounded-md sm:block"/>
      </div>
      <div class="mx-auto my-auto">
        <h1 class="text-sm leading-tight text-gray-700 truncate">{{song.artist}}</h1>
        <h1 class="my-1 text-lg font-bold truncate">{{song.name}}</h1>
        <h1 class="text-sm truncate">{{song.nameTranslation}}</h1>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['song'],
};
</script>
