// Created by ZhangLeo on 2021-11-03
import { Component, Vue, Watch } from 'vue-property-decorator'
import { Route } from 'vue-router'
import { Dictionary } from 'vue-router/types/router'
import { Form as ElForm, Input } from 'element-ui'
import { UserModule } from '@/store/modules/user.store'
import { APP_NAME } from '@/types/constant'
import { removeToken } from '@/utils/stroage'
@Component({
  name: 'login-page',
  components: {}
})

export default class extends Vue {

  appName = APP_NAME;
  loginForm: any = {};
  loginRules: any = {
    username: [{ trigger: 'blur', required: true, min: 11, max: 11, pattern: /^1(3|4|5|6|7|8|9)\d{9}$/, message: '请输入正确的手机号码' }],
    password: [{ trigger: 'blur', required: true, min: 6, max: 20, message: '至少 6 个字符' }]
  };

  passwordType = 'password';
  loading = false;
  private redirect?: string;
  private otherQuery: Dictionary<string> = {};
  private animate;

  mounted() {
    removeToken()
    if (this.loginForm.username === '') {
      (this.$refs.username as Input).focus()
    } else if (this.loginForm.password === '') {
      (this.$refs.password as Input).focus()
    }
    this.init()
  }

  showPwd() {
    if (this.passwordType === 'password') {
      this.passwordType = ''
    } else {
      this.passwordType = 'password'
    }
    this.$nextTick(() => (this.$refs.password as Input).focus())
  }

  handleLogin() {
    (this.$refs.loginForm as ElForm).validate(async (valid: boolean) => {
      if (valid) {
        this.loading = true
        await UserModule.Login({
          phone: this.loginForm.username,
          ...this.loginForm
        })

        this.$router
          .push({
            path: this.redirect || '/',
            query: this.otherQuery
          })
          .catch((err) => {
            console.warn(err)
          })
        setTimeout(() => {
          this.loading = false
        }, 500)
        return true
        // Just to simulate the time of the request
      } else {
        return false
      }
    })
  }

  private getOtherQuery(query: Dictionary<string>) {
    return Object.keys(query).reduce((acc, cur) => {
      if (cur !== 'redirect') {
        acc[cur] = query[cur]
      }
      return acc
    }, {} as Dictionary<string>)
  }

  @Watch('$route', { immediate: true })
  onRouteChange(route: Route) {
    // TODO: remove the "as Dictionary<string>" hack after v4 release for vue-router
    // See https://github.com/vuejs/vue-router/pull/2050 for details
    const query = route.query as Dictionary<string>
    if (query) {
      this.redirect = query.redirect
      this.otherQuery = this.getOtherQuery(query)
    }
  }

  destroyed() {
    this.animate = () => { }
  }

  private init() {
    // pure javascrip random function ============
    const random = (min, max) => {
      return Math.random() * (max - min) + min
    }
    (<any>window).requestAnimFrame = (() => {
      return window.requestAnimationFrame ||
        function (callback, element) {
          window.setTimeout(callback, 1000 / 60)
        }
    })()

    this.animate = () => {
      (<any>window).requestAnimFrame(this.animate)
      draw()
    }
    const canvas: any = document.getElementById('hero-canvas')
    const ctx = canvas.getContext('2d')
    function draw() {
      // setup canvas enviroment
      const time = new Date().getTime() * 0.002
      // console.log(time);
      const color1 = 'rgba(75,112,226,0.2)'
      const color2 = 'rgba(75,112,226,0.3)'
      // let canvas: any = document.getElementById("hero-canvas");
      // let ctx = (<any>document.getElementById("hero-canvas")).getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.save()

      // random float to be used in the sin & cos
      const randomX = random(0.2, 0.9)
      const randomY = random(0.1, 0.2)

      // sin & cos for the movement of the triangles in the canvas
      const rectX = Math.cos(time * 1) * 1.5 + randomX
      const rectY = Math.sin(time * 1) * 1.5 + randomY
      const rectX2 = Math.cos(time * 0.7) * 3 + randomX
      const rectY2 = Math.sin(time * 0.7) * 3 + randomY
      const rectX3 = Math.cos(time * 1.4) * 4 + randomX
      const rectY3 = Math.sin(time * 1.4) * 4 + randomY

      // console.log(rectX + '-' + rectY + '-' + rectX2 + '-' + rectY2 + '-' + rectX3 + '-' + rectY3);

      // triangle gradiente ==========================================
      const triangle_gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
      triangle_gradient.addColorStop(0, color1)
      triangle_gradient.addColorStop(1, color2)

      // triangle group 1 ===========================================
      // triangle 1.1
      ctx.beginPath()
      ctx.moveTo(rectX2 + 120, rectY2 - 100)
      ctx.lineTo(rectX2 + 460, rectY2 + 80)
      ctx.lineTo(rectX2 + 26, rectY2 + 185)
      ctx.fillStyle = triangle_gradient
      ctx.fill()

      // triangle 1.2
      ctx.beginPath()
      ctx.moveTo(rectX - 50, rectY - 25)
      ctx.lineTo(rectX + 270, rectY + 25)
      ctx.lineTo(rectX - 50, rectY + 195)
      ctx.fillStyle = triangle_gradient
      ctx.fill()

      // triangle 1.3
      ctx.beginPath()
      ctx.moveTo(rectX3 - 140, rectY3 - 150)
      ctx.lineTo(rectX3 + 180, rectY3 + 210)
      ctx.lineTo(rectX3 - 225, rectY3 - 50)
      ctx.fillStyle = triangle_gradient
      ctx.fill()

      // triangle group 2 ===========================================
      // triangle 2.1
      ctx.beginPath()
      ctx.moveTo(rectX + (canvas.width - 40), rectY - 30)
      ctx.lineTo(rectX + (canvas.width + 40), rectY + 190)
      ctx.lineTo(rectX + (canvas.width - 450), rectY + 120)
      ctx.fillStyle = triangle_gradient
      ctx.fill()

      // triangle 2.2
      ctx.beginPath()
      ctx.moveTo(rectX3 + (canvas.width - 200), rectY3 - 240)
      ctx.lineTo(rectX3 + (canvas.width + 80), rectY3 - 240)
      ctx.lineTo(rectX3 + (canvas.width - 50), rectY3 + 460)
      ctx.fillStyle = triangle_gradient
      ctx.fill()

      // triangle 2.3
      ctx.beginPath()
      ctx.moveTo(rectX2 + (canvas.width - 400), rectY2 + 140)
      ctx.lineTo(rectX2 + (canvas.width + 20), rectY2 + 200)
      ctx.lineTo(rectX2 + (canvas.width - 350), rectY2 + 370)
      ctx.fillStyle = triangle_gradient
      ctx.fill()

      // triangle group 3 ===========================================
      // triangle 3.1
      ctx.beginPath()
      ctx.moveTo(rectX3 - 50, rectY3 + (canvas.height - 350))
      ctx.lineTo(rectX3 + 350, rectY3 + (canvas.height - 220))
      ctx.lineTo(rectX3 - 100, rectY3 + (canvas.height - 120))
      ctx.fillStyle = triangle_gradient
      ctx.fill()

      // triangle 3.2
      ctx.beginPath()
      ctx.moveTo(rectX + 100, rectY + (canvas.height - 380))
      ctx.lineTo(rectX + 320, rectY + (canvas.height - 180))
      ctx.lineTo(rectX - 275, rectY + (canvas.height + 150))
      ctx.fillStyle = triangle_gradient
      ctx.fill()

      // triangle 3.3
      ctx.beginPath()
      ctx.moveTo(rectX2 - 230, rectY2 + (canvas.height - 50))
      ctx.lineTo(rectX2 + 215, rectY2 + (canvas.height - 110))
      ctx.lineTo(rectX2 + 250, rectY2 + (canvas.height + 130))
      ctx.fillStyle = triangle_gradient
      ctx.fill()

      // triangle group 4 ===========================================
      // triangle 4.1
      ctx.beginPath()
      ctx.moveTo(rectX3 + (canvas.width - 80), rectY3 + (canvas.height - 320))
      ctx.lineTo(rectX3 + (canvas.width + 250), rectY3 + (canvas.height + 220))
      ctx.lineTo(rectX3 + (canvas.width - 200), rectY3 + (canvas.height + 140))
      ctx.fillStyle = triangle_gradient
      ctx.fill()

      // triangle 4.2
      ctx.beginPath()
      ctx.moveTo(rectX + (canvas.width - 100), rectY + (canvas.height - 160))
      ctx.lineTo(rectX + (canvas.width - 30), rectY + (canvas.height + 90))
      ctx.lineTo(rectX + (canvas.width - 420), rectY + (canvas.height + 60))
      ctx.fillStyle = triangle_gradient
      ctx.fill()

      // triangle 4.3
      ctx.beginPath()
      ctx.moveTo(rectX2 + (canvas.width - 320), rectY2 + (canvas.height - 200))
      ctx.lineTo(rectX2 + (canvas.width - 50), rectY2 + (canvas.height - 20))
      ctx.lineTo(rectX2 + (canvas.width - 420), rectY2 + (canvas.height + 120))
      ctx.fillStyle = triangle_gradient
      ctx.fill()

      ctx.restore()
    } // end function draw
    this.animate()
  }
}