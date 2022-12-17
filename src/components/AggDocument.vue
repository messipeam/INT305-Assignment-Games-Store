<script setup>


const props = defineProps({
    title: {
        type: String,
        required: true
    },
    data: {
        type: Number,
        required: true
    },
    checkAgg: {
        type: Boolean,
        required: true
    }


})





</script>
 
<template>


<div >
    <p>Result: {{title}}</p>

<div class="w-full max-w-md p-4 bg-white border rounded-lg shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700">
       
    <div class="flow-root">

        <ul role="list" class="divide-y divide-gray-200 dark:divide-gray-700">
            <li class="py-3 sm:py-4">
                <div class="flex items-center space-x-4">
                    
                    <div class="flex-1 min-w-0">
                        <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                           {{ data }}
                        </p>
            
                      
                    </div>

                    <div>
                 
                     
                 
                    </div>


                </div>
            </li>
          
        </ul>
   </div>

</div>
</div>
</template>
 
<style>

</style>