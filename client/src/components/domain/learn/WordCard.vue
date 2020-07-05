<template>
  <!-- eslint-disable max-len -->
  <!-- class="bg-white rounded-lg overflow-hidden w-64 m-4" -->
  <div class="m-4 mx-auto max-w-md pb-5">
    <div class="relative bg-red-600 overflow-hidden rounded-lg" style="padding-bottom: 80%">
      <img :src="word.imageUrl" class="rounded-lg absolute h-full w-full object-cover"/>
    </div>
    <div class="px-4 -mt-16 relative">
      <div class="p-6 bg-white shadow-md rounded-lg">
        <div>
          <h1 class="font-semibold text-2xl leading-tight truncate">{{word.original}}</h1>
        </div>
        <div>
          <h1 class="text-gray-700 text-sm leading-tight truncate">{{word.translation}}</h1>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['word'],
};
</script>
