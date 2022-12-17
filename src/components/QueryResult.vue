<script setup>
const props = defineProps({
    title: {
    type: String,
    required: true,
  },
    data: {
        type: Object,
        required: true
    }
})
</script>
 
<template>
    <div class="m-10">
  <h1 class="font-bold text-2xl">{{ title }}</h1>

  <div class="mt-5">
  <ol>
    <li v-for="(doc, index) in data" :key="doc.id">{{ doc.name }} price: {{doc.price}} genre: {{doc.overview.genre}}</li>

  </ol>
</div>
</div>
</template>
 
<style>

</style>