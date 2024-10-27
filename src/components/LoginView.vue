<template>
    <div class="app">
        <div class="login-container" >
            <form @submit.prevent="handleSubmit">
                <div class="form-group">
                    <el-input v-model="state.userName" placeholder="Please input userName" class="custom-input"/>
                </div>
                <div class="form-group">
                    <el-input 
                        v-model="state.password"
                        type="password"
                        placeholder="Please input password"
                        show-password
                        class="custom-input"
                    />
                </div>
                <button type="submit" class="login custom-input">登录</button>
            </form>
            <div class="social-login">
                <button @click="loginWithQQ">使用QQ登录</button>
                <button @click="loginWithWeChat">使用WX登录</button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { ref } from 'vue';
    import { login } from '@/api/user';
    import router from '@/router';


    const state = ref({
      userName: '',
      password: ''
    });

    async function handleSubmit() {
        try{
            const response = await login(state.value);
            if(response.code == 200){
                router.push('/user')
            }
            else{
                alert(response.msg)
            }
        }
        catch(error){
            console.error('Failed to fetch data:', error);
        }
    
    };

    function loginWithQQ() {
      window.location.href = 'https://graph.qq.com/oauth2.0/authorize?response_type=code&client_id=YOUR_APP_ID&redirect_uri=http://example.com/callback';
      // 替换 YOUR_APP_ID 为你的 QQ 应用的 AppID
    };

    function loginWithWeChat() {
      window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=YOUR_APP_ID&redirect_uri=http%3A%2F%2Fexample.com%2Fcallback&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect';
      // 替换 YOUR_APP_ID 为你的微信应用的 AppID
    };

</script>

<style scoped>
    body, html {
        margin: 0;
        padding: 0;
        height: 100%; /* 确保 body 和 html 高度为 100%，以便使用 vh 单位 */
    }

    .app {
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: aliceblue;
    }

    .login-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        position: absolute;
        top: 20%;
        gap: 1rem;
        width: 50%;
        background-color: white;
        padding: 2rem;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        border-radius: 8px;
    }

    form {
        display: flex;
        flex-direction: column;
        gap: 2rem;
        width: 80%;
    }

    .form-group {
        display: flex;
        flex-direction: column;
    }

    button {
        padding: 0.5rem;
        background-color: blue;
        color: #fff;
        border-radius: 4px;
        cursor: pointer;
        border: none;
    }

    .form-group .custom-input {
        width: 100%;
    }

    .login {
        width: 100%;
    }

    .social-login {
        display: flex;
        gap: 1rem;
        align-items: center;
        justify-content: center;
        position: relative;
        width: 100%;
    }

</style>