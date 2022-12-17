<script setup>
const props = defineProps({
    items: {
        type: Object,
        required: true
    },
})




</script>
 
<template>

    <div class="m-5">
        <p> - {{items.game_name}}</p>
    </div>



</template>
 
<style>

</style>