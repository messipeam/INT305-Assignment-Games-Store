<script setup>
import AddGame from '../components/AddGame.vue'

import {ref, onBeforeMount, watch} from 'vue'
import { onSnapshot,query, collection, deleteDoc, doc } from '@firebase/firestore';
import db from '../firebase/init';



const games = ref([])

const getGames = async () => {
   
    const gamesRef = query(collection(db,"games"))
    games.value = []
    onSnapshot(gamesRef, (snapshot) => {
        snapshot.docChanges().forEach((game) => {
            let data = game.doc.data()
            data.id = game.doc.id
           
            games.value.push(data)
        })
    
    })

 
    console.log(games.value)

}

const deleteGames = async (index) => {
    const doc_id = games.value[index].id
    const gamesRef = doc(db,"games",doc_id)
    await deleteDoc(gamesRef)
    await getGames()
}


onBeforeMount( async () => {
    await getGames()
}),


watch(() => getGames)




</script>
 
<template>

<AddGame :games="games" @delete-games="deleteGames"></AddGame>
</template>
 
<style>

</style>