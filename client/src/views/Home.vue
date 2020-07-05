<template>
  <div class="mt-6">
    <frontier></frontier>
    <imgCard v-bind:cardSrc="favoriteSongsCard"></imgCard>
    <cardImg v-bind:cardSrc="vocabularyCard"></cardImg>
    <imgCard v-bind:cardSrc="repetitionCard"></imgCard>
    <cardImg v-bind:cardSrc="friendsCard"></cardImg>
    <nutshell></nutshell>
  </div>
</template>

<script>

import frontier from '@/components/home/frontier.vue';
import imgCard from '@/components/home/imgCard.vue';
import cardImg from '@/components/home/cardImg.vue';
import nutshell from '@/components/home/nutshell.vue';

export default {
  name: 'Home',
  components: {
  // navigation,
    frontier,
    imgCard,
    cardImg,
    nutshell,
  },
  data() {
    return {
      favoriteSongsCard: {
        imgSrc: 'home/phone.jpg',
        cardTitle: 'Favorite songs',
        cardDescription: [
          '✓ Browse lyrics submitted by others',
          '✓ Submit lyrics of your own choice',
        ],
      },
      vocabularyCard: {
        imgSrc: 'home/vocabulary.jpg',
        cardTitle: 'Expand vocabulary',
        cardDescription: [
          '✓ Translate words and add images to them',
          '✓ Create awesome notes',
        ],
      },
      repetitionCard: {
        imgSrc: 'home/repetition.jpg',
        cardTitle: 'Easy repetition',
        cardDescription: [
          '✓ Flash cards and other exercises generated from translations',
        ],
      },
      friendsCard: {
        imgSrc: 'home/friends.jpg',
        cardTitle: 'Get and give',
        cardDescription: [
          '✓ Every translation is public',
          '✓ Exchange ideas and give suggestions',
        ],
      },
    };
  },
};
</script>
