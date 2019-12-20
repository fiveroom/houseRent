const mixin = {
    methods: {
        judgeUser() {
            if (this.$store.getters.userId) {
                return true
            } else {
                this.$router.push('/user/login')
            }
        }
    }
}
export default mixin