<script setup>
import QueryResult from '../components/QueryResult.vue'
import { ref, onMounted, watch } from "vue";
import { collection, query, where, getDocs, limit, orderBy } from "firebase/firestore";
import db from "../firebase/init.js";
import { useRoute } from "vue-router";

const games = ref([])
const title = ref("")
const route = useRoute()


const getQuery = async () => {
    let qryID = route.params.id


    const gamesRef = collection(db, "games")

    let qry = null
    
    if(qryID == 1){
        title.value = "List games order by price desc"
        qry = query(gamesRef, orderBy("price","desc"))
    }
    else if(qryID == 2){
        title.value = "List games Action"
        qry = query(gamesRef, where('overview.genre',"array-contains","Action"))

        console.log(qry)
    }

    const querySnap = await getDocs(qry)
    
    querySnap.forEach((doc) => {
        let data = doc.data()
        data.id = doc.id
        games.value.push(data)
    })

}



// onBeforeMount(async () => {
//     await getQuery()
// }),



watch(() => route.params.id, getQuery);

onMounted(() => {
  getQuery();
});




</script>
 
<template>
<QueryResult :title="title" :data="games"></QueryResult>
</template>
 
<style>

</style>