<template>
  <div
    v-loading="loading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.5)"
    style="height:100%;"
  >
    <!-- <div v-width="500"> -->
    <div class="login-bg">
      <img src="../images/login-bg.png" alt />
    </div>
    <div class="login">
      <p>办公系统登录</p>
      <div class="login-window">
        <div class="login-window-top">
          <p class="user">账号登陆</p>

          <p class="e">Login User</p>
        </div>

        <div class="login-window-top1">
          <span></span>
          <p>欢迎登录办公系统平台</p>
        </div>

        <div id="username">
          <label for="login_username">
            <i class="el-icon-user"></i>
          </label>
          <input
            class="a"
            type="text"
            :placeholder="loginForm.loginType==1?'用户名':'手机号'"
            aria-label
            v-model="loginForm.account"
            autocomplete="off"
          />
          <span
            class="error el-icon-warning-outline"
            v-show="loginForm.account == ''"
            :title="(loginForm.loginType==1?'用户名':'手机号') + '不能为空'"
          ></span>
        </div>

        <div id="password">
          <label for="login_passWord">
            <i class="el-icon-unlock"></i>
          </label>
          <input
            type="password"
            class="a"
            placeholder="密码"
            v-model="loginForm.password"
            autocomplete="off"
            @keyup.enter="login"
          />
          <span
            class="error el-icon-warning-outline"
            v-show="loginForm.password == ''"
            title="密码不能为空"
          ></span>
        </div>
        <input id="submit" type="submit" @click="login" value="登录" />
        <div class="switch">
          <a @click="loginForm.loginType=1" :class="{active:loginForm.loginType==1}">账号登陆</a>
          <a @click="loginForm.loginType=2" :class="{active:loginForm.loginType==2}">手机登录</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      loginForm: {
        loginType: 1
      }
    };
  },
  methods: {
    login() {
      if (!this.loginForm.account || !this.loginForm.password) {
        this.$message.warning("表单不能为空");
        return;
      }
      this.loading = true;
      this.$store.dispatch("account/login", this.loginForm).then(
        res => {
          this.loading = false;
          this.$router.push("/");
        },
        error => {
          this.loading = false;
        }
      );
    }
  }
};
</script>

<style lang="scss" scoped>
.login-bg {
  width: 100%;
  height: 540px;
  position: relative;
}
.login-bg img {
  width: 100%;
  // height: 100%;
}
.login {
  width: 100%;
  min-width: 1200px;
  position: relative;
  text-align: center;
  top: -300px;
}
.login > p {
  font-size: 26px;
  color: #fff;
}
.login-window {
  margin: 30px auto;
  width: 430px;
  padding: 40px;
  background-color: #fff;
  text-align: center;
  box-shadow: 2px 5px 10px #aaa;
  overflow: hidden;
}
.login-window .login-window-top {
  text-align: center;
}
.login-window .login-window-top .user {
  display: inline-block;
  font-size: 28px;
  color: #308fe9;
  line-height: 40px;
}
.login-window .login-window-top .e {
  display: inline-block;
  font-size: 18px;
  color: #808080;
  line-height: 40px;
  margin-left: 4px;
}

.login-window .login-window-top1 {
  margin: 20px auto;
  text-align: center;
  position: relative;
}
.login-window .login-window-top1 span {
  display: inline-block;
  width: 100%;
  height: 2px;
  background-color: #d5d5d5;
}
.login-window .login-window-top1 p {
  width: 180px;
  height: 20px;
  background-color: #fff;
  font-size: 16px;
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
}
.login-window div {
  position: relative;
}
.login-window div {
  i {
    position: absolute;
    left: 0;
    font-size: 26px;
    color: #3e3e3e;
    line-height: 40px;
    margin-left: 14px;
  }
  .error {
    position: absolute;
    font-size: 23px;
    right: 6px;
    line-height: 40px;
    color: #ff912f;
  }
}
.login-window .a {
  width: 100%;
  height: 40px;
  padding: 0 50px;
  margin-bottom: 14px;
  border: 2px solid #d5d5d5;
}
input::-webkit-input-placeholder {
  /* placeholder颜色  */
  color: #d5d5d5;
  /* placeholder字体大小  */
  font-size: 16px;
  /* placeholder位置  */
  /*text-align: right;*/
}

.login-window .remember {
  height: 30px;
  padding: 0 5px;
  color: #8c8c8c;
  margin-top: 15px;
}
.login-window .remember div {
  margin-left: -7px;
  float: left;
}
.login-window .remember span {
  float: left;
  margin-left: 14px;
}
.login-window .remember a {
  float: right;
  color: #8c8c8c;
}
.remember:after {
  display: inline-block;
  content: "";
  clear: both;
}
.layui-form-checked[lay-skin="primary"] i {
  background-color: #0b9aff;
}
.layui-form-checkbox[lay-skin="primary"]:hover i {
  border-color: #0b9aff;
}

/*验证码*/
.login-window .verify {
  width: 100%;
  height: 40px;
}
.login-window .verify.phone {
  margin-top: 15px;
}
.login-window .verify::after {
  display: inline-block;
  content: "";
  clear: both;
}
.login-window .verify input {
  float: left;
  width: 190px;
  height: 40px;
  border: 2px solid #d5d5d5;
  text-align: center;
}
.login-window .verify .verify-img {
  width: 150px;
  height: 40px;
  background-color: #f2f2f2;
  float: right;
  text-align: center;
  line-height: 40px;
  color: #8c8c8c;
}

/* 登陆切换 */
.switch {
  margin-top: 18px;
  a {
    cursor: pointer;
    &:nth-child(2) {
      margin-left: 30px;
    }
    &:hover {
      color: $--color-primary;
    }
    &.active {
      color: #ccc;
      cursor: default;
    }
  }
}

.login-window input[type="submit"] {
  width: 100%;
  height: 40px;
  background-color: #2294f9;
  border: none;
  border-radius: 5px;
  color: #fff;
  font-size: 16px;
  margin-top: 20px;
  cursor: pointer;
  &:hover {
    background-color: rgb(116, 207, 250);
  }
}
</style>


<style lang='scss' scoped>
</style>