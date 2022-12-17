<script setup>
import AggDocument from '../components/AggDocument.vue'
import OrderList from '../components/OrderList.vue'

import {ref, onBeforeMount, watch, computed, reactive} from 'vue'
import { collection, query, where, getDocs, limit, orderBy, onSnapshot, getCountFromServer } from "firebase/firestore";
import db from "../firebase/init.js"


const state = ref(0)
const title = ref('')

const ordersRef = collection(db,"orders")
const orders = ref({})
const aggData = ref()


const checkAgg = reactive({
    showAgg: false
})


const items = ref({})



const getQuery = async () => {

    let qry = null
    checkAgg.showAgg = false

    if(state.value === 1){
    qry = query(collection(db,"orders"), orderBy("order_date","desc"))
    title.value = "List orders"
    querySnap(qry)

    }
    else if(state.value === 2){
        checkAgg.showAgg = true
        qry = query(collection(db,"orders"))
        const querySnap = await getCountFromServer(qry)
        title.value = "Number of all orders"
        aggData.value = querySnap.data().count
        console.log(aggData.value)
    }

    else if(state.value === 3){
        title.value = "Customer buy game price > 3000"
       
        qry = query(ordersRef,where("order_total",">",3000), orderBy("order_total","desc"))

        querySnap(qry)

    }
    



   
}



const querySnap = async (qry) => {
    const getOrder= await getDocs(qry)

    orders.value = []
    

    getOrder.forEach( async (doc) => {
        let data = doc.data()
        data.id = doc.id
        let i = doc.data().order_items
  
       



    orders.value.push(data) 
    

    })

    console.log(orders.value)
    
}

onBeforeMount( async () => {
    await getQuery()
}),

watch(() => state.value, getQuery)

</script>
 
<template>
        <div class="m-10 flex justify-around">
        
        <div class="m-5 ">
           
        <h2 class="mb-2 text-lg font-semibold text-gray-900 dark:text-white">Query List:</h2>
        <ol class="space-y-1 max-w-md list-decimal list-inside text-gray-500 dark:text-gray-400">
       
         <li class="cursor-pointer" @click="state = 1">
            <span class="font-semibold text-gray-900 dark:text-white">List orders</span> 
        </li>


        <li class="cursor-pointer" @click="state = 2">
            <span class="font-semibold text-gray-900 dark:text-white">Get number of all orders</span> 
        </li>
        
        
        <li class="cursor-pointer" @click="state = 3">
            <span class="font-semibold text-gray-900 dark:text-white">List customers buy game price &gt; 3000 baht and sort by total order price (desc)</span> 
        </li>


    
 
    
        </ol>
        </div>

        <AggDocument v-if="checkAgg.showAgg" :title="title" :data="aggData" :checkAgg="checkAgg.showAgg" ></AggDocument>
        <OrderList v-else  :state="state" :title="title" :data="orders" :checkAgg="checkAgg.showAgg" ></OrderList>
        
</div>



</template>
 
<style>

</style>