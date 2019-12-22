import { Loading, Notification } from "element-ui";
const mixin = {
    methods: {
        judgeUser() {
            if (this.$store.getters.userId) {
                return true
            } else {
                this.$router.push({
                    path: '/user/login',
                    query: this.$route.fullPath
                })
            }
        },
        goHomne() {
            if (window.history.length <= 1) {
                this.$router.push({
                    name: 'home'
                })
            }
        },
        nitifyInfo(title, message, type = "warning") {
            Notification({
                showClose: false,
                duration: 1500,
                type,
                title,
                message,
                showClose: false,
                duration: 1500
            });
        }
    }
}
export default mixin