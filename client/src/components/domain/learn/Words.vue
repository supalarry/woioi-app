<template>
  <!-- eslint-disable max-len -->
  <div>
    <div class="flex flex-wrap justify-center">
      <h1 class="inline p-2 m-1 rounded-md shadow-md cursor-pointer text-md"
      v-for="(word, wordIndex) in line.translatedWords" v-bind:key="word.wordIndex"
      v-bind:class="{ active: lineIndex === expandedWord.lineIndex && wordIndex === expandedWord.wordIndex}"
      v-on:click="expand(lineIndex, wordIndex)">
        {{word.original}}
      </h1>
    </div>
    <div class="mt-4">
      <span class="text-sm leading-tight text-gray-700"> {{line.translation}} </span>
    </div>
  </div>
</template>

<script>
export default {
  props: ['line', 'lineIndex', 'expandedWord'],
  methods: {
    expand(lineIndex, wordIndex) {
      this.$emit('expand', lineIndex, wordIndex);
    },
  },
};
</script>

<style scoped>
.active {
  @apply font-bold;
}
</style>
