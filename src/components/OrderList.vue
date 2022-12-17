<script setup>
import { Timestamp } from '@firebase/firestore';
import OrderItem from '../components/OrderItem.vue'
import {ref} from 'vue'

const props = defineProps({
    title: {
        type: String,
        required: true
    },
    data: {
        type: Object,
        required: true
    },
    checkAgg: {
        type: Boolean,
        required: true
    },
    state:{
        type: Number,
        required: true
    },

})




const dateFormat = (date) => {
    const dateFormat = new Date(date * 1000)
    return dateFormat.toLocaleString()
}



</script>
 
<template>

<p v-show="state === 0">Result: {{title}}</p>
<div v-show="state === 1">
    
    <h1>Result: {{title}}</h1>
    <table class="">
        <th class="py-3 px-6">
            Order Number
        </th>
        <th class="py-3 px-6">
          Customer 
        </th>
        <th class="py-3 px-6">
            Order Date
        </th>

        <th class="py-3 px-6">
            Order Items
        </th>



        <tr v-for="(doc, index) in data" >
            <td> {{index + 1}}</td>
            <td>  {{doc.customer_name}}</td>
            <td> {{dateFormat(doc.order_date.seconds)}}</td>
            <td> 
                <OrderItem v-for="(item,index) in data[index].order_items" :items="item"></OrderItem>
            </td>
            <td>
                
            </td>
        </tr>

    </table>
</div>



<div v-show="state === 2 ">
    
    <p>Result: {{title}}</p>

<div class="w-full max-w-md p-4 bg-white border rounded-lg shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700">
       
    <div class="flow-root">

        <ul role="list" class="divide-y divide-gray-200 dark:divide-gray-700">
            <li v-for="(doc, index) in data" :key="doc.id" class="py-3 sm:py-4">
                <div class="flex items-center space-x-4">
                    
                    <div class="flex-1 min-w-0">
                        <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                           {{doc}}
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

<div v-show="state === 3">
    <p>Result: {{title}}</p>

<div  class="w-full max-w-md p-4 bg-white border rounded-lg shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700">
       
    <div class="flow-root">

        <ul role="list" class="divide-y divide-gray-200 dark:divide-gray-700">
            <li v-for="(doc, index) in data" :key="doc.id" class="py-3 sm:py-4">
                <div class="flex items-center space-x-4">
                    
                    <div class="flex-1 min-w-0">
                        <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                           {{doc.customer_name}}
                         
                        </p>
                        <!-- <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                          {{convertDate(game.overview.release_date.seconds)}}
                        </p> -->
                    
                    </div>

                    <div>
                 
                     
                        total: {{doc.order_total}} Baht
          
                     
                 
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