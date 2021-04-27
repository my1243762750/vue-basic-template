import Vue from 'vue'
import { mount, shallowMount } from '@vue/test-utils'
import ElementUI from 'element-ui'
import Login from '@/views/login/index.vue'
import SvgIcon from '@/components/SvgIcon'
import router from '@/router/index'
import store from '@/store'

Vue.use(ElementUI)
Vue.component('svg-icon', SvgIcon)

const factory = (values = {}) => {
    return mount(Login, {
        router,
        store,
        data() {
            return {
                ...values
            }
        }
    })
}
describe('Login:validate', () => {
    it('renders an error when username is not admin', () => {
        const wrapper = factory({
            loginForm: {
                username: '',
                password: '111111'
            }
        })
        wrapper.find('button').trigger('click')
        const formItemError = wrapper.find('.login-container').find('.el-form-item:nth-of-type(2)').find('.el-form-item__error')
        expect(formItemError.exists()).toBeTruthy()
    })

    it('renders an error when password length less than 6 characters', () => {
        const wrapper = factory({
            loginForm: {
                username: 'admin',
                password: ''
            }
        })
        wrapper.find('button').trigger('click')
        const formItemError = wrapper.find('.login-container').find('.el-form-item:nth-of-type(3)').find('.el-form-item__error')
        expect(formItemError.exists()).toBeTruthy()
    })
})