<template>
    <div>
        <h1>{{ name }}</h1>
        <input v-model="name" />
        <button @click="onClick">TESTE</button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            name: 'Teste'
        }
    },
    methods: {
        onClick() {
            alert(this.name)
        }
    },
}
</script>

<style>
</style>
