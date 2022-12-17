<script setup>
import CustomerList from '../components/CustomerList.vue'
import AggDocument from '../components/AggDocument.vue'
import {ref, onBeforeMount, watch, computed, reactive} from 'vue'
import { getCountFromServer,collection, query, where, getDocs, limit, orderBy, onSnapshot } from "firebase/firestore";
import db from "../firebase/init.js"

const state = ref(0)
const title = ref('')


const customersRef = collection(db,"customers")
const customers = ref([])
const aggData = ref()


const checkAgg = reactive({
    showAgg: false
})



const getQuery = async () => {

    let qry = null
    checkAgg.showAgg = false
    if(state.value === 1){
        title.value = "Customers in Forney and Sacramento"
        qry = query(customersRef, where("addresses.city","in",["Forney","Sacramento"]))
        querySnap(qry)
    }
    else if(state.value === 2){
        title.value = "Customers that have member"
        qry = query(customersRef, where("member","==",true))
        querySnap(qry)
    }
    else if(state.value === 3){
        title.value = "Female customers"
        qry = query(customersRef, where("gender","==","F"), orderBy("addresses.state"))
        querySnap(qry)
    }

    else if(state.value === 4){
        title.value = "Customers in CA with age > 20"
        qry = query(customersRef, where("addresses.state","==","CA"), 
        where("age",">",20))
        querySnap(qry)
    }

    else if(state.value === 5){
        checkAgg.showAgg = true
        qry = query(customersRef, where("member","==",false))
        const querySnap = await getCountFromServer(qry)
        title.value = "Number of customer don't have member"
        aggData.value = querySnap.data().count
        console.log(aggData.value)
    }
}


const querySnap = async (qry) => {
    const getCustomer= await getDocs(qry)

    customers.value = []


    getCustomer.forEach((doc) => {
        let data = doc.data()
        data.id = doc.id
    customers.value.push(data)

    })

    console.log(customers.value)
    
}

onBeforeMount( async () => {
    await getQuery()
}),

watch(() => state.value, getQuery)

</script>
 
<template>
        <div class="m-10 flex justify-around">
        
        <div class="m-5">
           
        <h2 class="mb-2 text-lg font-semibold text-gray-900 dark:text-white">Query List:</h2>
        <ol class="space-y-1 max-w-md list-decimal list-inside text-gray-500 dark:text-gray-400">
       
        <li class="cursor-pointer" @click="state = 1">
            <span class="font-semibold text-gray-900 dark:text-white">List customers in Forney and Sacramento</span> 
        </li>

        <li class="cursor-pointer" @click="state = 2">
            <span class="font-semibold text-gray-900 dark:text-white">List customers have member</span> 
        </li>
    
        <li class="cursor-pointer" @click="state = 3">
            <span class="font-semibold text-gray-900 dark:text-white">List female customers sort by state</span> 
        </li>

        <li class="cursor-pointer" @click="state = 4">
            <span class="font-semibold text-gray-900 dark:text-white">List customers in CA with age &gt; 20</span> 
        </li>

        <li class="cursor-pointer" @click="state = 5">
            <span class="font-semibold text-gray-900 dark:text-white">Count customers don't have member</span> 
        </li>

   

        </ol>
        </div>

<AggDocument v-if="checkAgg.showAgg" :title="title" :data="aggData"></AggDocument>
<CustomerList v-else :title="title" :data="customers"></CustomerList>


</div>

</template>
 
<style>

</style>