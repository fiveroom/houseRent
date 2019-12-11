<template>
    <div class="login-from">
        <MyInput id="name" placeholder="账号手机号" />
        <MyInput id="pwd" placeholder="密码" type="password" />
        <div>
             <button>登录</button>
        </div>
    </div>
</template>

<script>
import MyInput from '../components/MyInput';
export default {
    components: {
        MyInput,
    },
}
</script>

<style lang="scss" scoped>
.login-from{
    width: 330px;
    padding: 20px;
    border: 1px solid red;
    margin: 20px auto;
}
</style>
