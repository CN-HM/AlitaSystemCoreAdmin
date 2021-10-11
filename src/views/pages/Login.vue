<template>
  <div class="auth-wrapper auth-v1">
    <div class="auth-inner">
      <v-card class="auth-card">
        <!-- logo -->
        <v-card-title class="d-flex align-center justify-center py-7">
          <router-link
            to="/"
            class="d-flex align-center"
          >
            <v-img
              :src="require('@/assets/images/logos/logo.svg')"
              max-height="30px"
              max-width="30px"
              alt="logo"
              contain
              class="me-3"
            ></v-img>

            <h2 class="text-2xl font-weight-semibold">
              AlitaSystem
            </h2>
          </router-link>
        </v-card-title>

        <!-- title -->
        <v-card-text>
          <p class="text-2xl font-weight-semibold text--primary mb-2">
            Welcome to AlitaSystem! 👋🏻
          </p>
          <p class="mb-2">
            Please sign-in to your account and start the adventure
          </p>
        </v-card-text>

        <!-- login form -->
        <v-card-text>
          <v-form
            ref="loginForm"
            lazy-validation
          >
            <v-text-field
              v-model="loginFormData.username"
              outlined
              :rules="loginRules.nameRules"
              label="UserName"
              placeholder="username"
              hide-details
              class="mb-3"
            ></v-text-field>

            <v-text-field
              v-model="loginFormData.password"
              :rules="loginRules.passwordRules"
              outlined
              :type="isPasswordVisible ? 'text' : 'password'"
              label="Password"
              placeholder="············"
              :append-icon="isPasswordVisible ? icons.mdiEyeOffOutline : icons.mdiEyeOutline"
              hide-details
              @click:append="isPasswordVisible = !isPasswordVisible"
            ></v-text-field>

            <div class="d-flex align-center justify-space-between flex-wrap">
              <v-checkbox
                label="Remember Me"
                hide-details
                class="me-3 mt-1"
              >
              </v-checkbox>

              <!-- forgot link -->
              <a
                href="javascript:void(0)"
                class="mt-1"
              > Forgot Password? </a>
            </div>

            <v-btn
              :loading="loginLoading"
              block
              color="primary"
              class="mt-6"
              @click.prevent="handleLogin"
            >
              Login
            </v-btn>
          </v-form>
        </v-card-text>

        <!-- create new account  -->
        <!-- <v-card-text class="d-flex align-center justify-center flex-wrap mt-2">
          <span class="me-2">
            New on our platform?
          </span>
          <router-link :to="{name:'pages-register'}">
            Create an account
          </router-link>
        </v-card-text> -->

        <!-- divider -->
        <v-card-text class="d-flex align-center mt-2">
          <v-divider></v-divider>
          <span class="mx-5">Alita System</span>
          <v-divider></v-divider>
        </v-card-text>

        <!-- social links -->
        <!-- <v-card-actions class="d-flex justify-center">
          <v-btn
            v-for="link in socialLink"
            :key="link.icon"
            icon
            class="ms-1"
          >
            <v-icon :color="$vuetify.theme.dark ? link.colorInDark : link.color">
              {{ link.icon }}
            </v-icon>
          </v-btn>
        </v-card-actions> -->
      </v-card>
    </div>

    <!-- background triangle shape  -->
    <img
      class="auth-mask-bg"
      height="173"
      :src="require(`@/assets/images/misc/mask-${$vuetify.theme.dark ? 'dark' : 'light'}.png`)"
    />

    <!-- tree -->
    <v-img
      class="auth-tree"
      width="247"
      height="185"
      src="@/assets/images/misc/tree.png"
    ></v-img>

    <!-- tree  -->
    <v-img
      class="auth-tree-3"
      width="377"
      height="289"
      src="@/assets/images/misc/tree-3.png"
    ></v-img>
  </div>
</template>

<script>
// eslint-disable-next-line object-curly-newline
// import { mdiFacebook, mdiTwitter, mdiGithub, mdiGoogle, mdiEyeOutline, mdiEyeOffOutline } from '@mdi/js'
import { mdiEyeOutline, mdiEyeOffOutline } from '@mdi/js'
import { ref } from '@vue/composition-api'
import { validUserName, validUserPassword } from '@/utils/validate'

export default {
  methods: {
    handleLogin() {
      if (this.$refs.loginForm.validate()) {
        // 开启loading
        this.loginLoading = true

        this.$store.dispatch('user/login', this.loginFormData)
          .then(res => {
            console.log(res)
            this.$store.dispatch('message/success', '登陆成功!!!')
            setTimeout(() => {
              // 跳转首页
              this.$router.push({ name: 'dashboard' })
            }, 1500)
          })
          .catch(() => {

          })
          .finally(() => {
            this.loginLoading = false
          })

        return true
      }

      // 弹出提示框
      this.$store.dispatch('message/warning', 'Error submit!!!')

      return false
    },
  },
  setup() {
    const isPasswordVisible = ref(false)

    // const socialLink = [
    //   {
    //     icon: mdiFacebook,
    //     color: '#4267b2',
    //     colorInDark: '#4267b2',
    //   },
    //   {
    //     icon: mdiTwitter,
    //     color: '#1da1f2',
    //     colorInDark: '#1da1f2',
    //   },
    //   {
    //     icon: mdiGithub,
    //     color: '#272727',
    //     colorInDark: '#fff',
    //   },
    //   {
    //     icon: mdiGoogle,
    //     color: '#db4437',
    //     colorInDark: '#db4437',
    //   },
    // ]

    // 登录
    return {
      isPasswordVisible,
      loginFormData: {
        username: '',
        password: '',
      },
      loginRules: {
        nameRules: validUserName(),
        passwordRules: validUserPassword(),
      },
      loginLoading: false,

      // socialLink,

      icons: {
        mdiEyeOutline,
        mdiEyeOffOutline,
      },
    }
  },
}
</script>

<style lang="scss">
@import '~@/plugins/vuetify/default-preset/preset/pages/auth.scss';
</style>
