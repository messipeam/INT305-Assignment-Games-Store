import { createRouter, createWebHistory } from 'vue-router'
import App from '../App.vue'
import Home from '../views/Home.vue'
import Game from '../views/Game.vue'
import Order from '../views/Order.vue'
import Customer from '../views/Customer.vue'
import AddGame from '../views/AddGame.vue'

const history = createWebHistory(`${import.meta.env.BASE_URL}`)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/games',
        name: 'Game',
        component: Game
    },
    {
        path: '/orders',
        name: 'Order',
        component: Order
    },
    {
        path: '/customers',
        name: 'Customer',
        component: Customer
    },
    {
        path: '/addGames',
        name: 'AddGames',
        component: AddGame
    },


    
]

const router = createRouter({history,routes})
export default router