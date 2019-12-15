<template>
    <div>
        房子详情
        <button @click="$router.push('/hdetail?house_id=4')">点我</button>
    </div>
</template>

<script>
export default {
    data(){
        return {

        }
    },
    computed: {
        routeInfo() {
        }
    },
    beforeRouteEnter(to, from, next) {
        next(vm => {});
    },
    created(){
        console.log('更新');
    }
}
</script>

<style>

</style>