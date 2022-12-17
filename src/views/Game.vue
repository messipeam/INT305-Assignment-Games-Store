<script setup>

import {ref, onBeforeMount, watch, computed, reactive} from 'vue'
import { getCountFromServer,collection, query, where, getDocs, limit, orderBy, onSnapshot, startAt, endAt } from "firebase/firestore";
import db from "../firebase/init.js"
import GameList from '../components/GameList.vue'
import AggDocument from '../components/AggDocument.vue'



const gamesRef = collection(db,"games")

const games = ref([])
const state = ref(0)
const title = ref('')
const aggData = ref()


const checkAgg = reactive({
    showAgg: false
})


const getQuery = async () => {
   
    let qry = null

    checkAgg.showAgg = false

    if(state.value === 1){
        title.value = "List role-playing or platform games"
        qry = query(gamesRef,where("overview.genre","array-contains-any",['Platform','Role-playing'])
        
        )
        querySnap(qry)
    }
    else if(state.value === 2){
        title.value = "List action games"
        console.log("state = 2")
        qry = query(gamesRef,where("overview.genre","array-contains","Action"), limit(5), orderBy("name", "asc"))
        querySnap(qry)
    }
    else if(state.value === 3){
        title.value = "List multiplayer games"
        console.log("state = 3")
        qry = query(gamesRef,where("overview.mode","array-contains","Multiplayer", limit(5), orderBy("name","desc")))
        querySnap(qry)
    }
    else if(state.value === 4){
        title.value = "Games publisher by EA Sports and CD Projekt Red"
        console.log("state = 4")
        qry = query(gamesRef, where("overview.publisher","in",["CD Projekt Red","EA Sports"]))

        querySnap(qry)
    }

    else if(state.value === 5){
        title.value = "Number of game develop by CAPCOM"
        checkAgg.showAgg = true

        qry = query(gamesRef, where("overview.developer","array-contains","CAPCOM"))
        const querySnap = await getCountFromServer(qry)
        aggData.value = querySnap.data().count
        console.log(aggData.value)
    }

}

const querySnap = async (qry) => {
    const getGame = await getDocs(qry)

    games.value = []


    getGame.forEach((doc) => {
        let data = doc.data()
        data.id = doc.id
    games.value.push(data)

    })

    console.log(games.value)
    
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
        <span class="font-semibold text-gray-900 dark:text-white">List role-playing or platform games</span> 
    </li>


    <li class="cursor-pointer" @click="state = 2">
        <span class="font-semibold text-gray-900 dark:text-white">List action games and sort by name</span> 
    </li>

    <li class="cursor-pointer" @click="state = 3">
        <span class="font-semibold text-gray-900 dark:text-white">List multiplayer games and sort by name (desc)</span> 
    </li>

    <li class="cursor-pointer" @click="state = 4">
        <span class="font-semibold text-gray-900 dark:text-white">List games publisher by EA Sports and CD Projekt Red</span> 
    </li>

    <li class="cursor-pointer" @click="state = 5">
        <span class="font-semibold text-gray-900 dark:text-white">Count games have CAPCOM developer</span> 
    </li>

    
    </ol>
    </div>
  
    <AggDocument v-if="checkAgg.showAgg" :title="title" :data="aggData"></AggDocument>
    <GameList v-else :title="title" :data="games"> </GameList>
</div>

</template>
 
<style>

</style>