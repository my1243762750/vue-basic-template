import request from '@/utils/request'

export function getData(fn) {
    return request({
        url: 'http://localhost:8082/A'
    }).then((res) => {
       fn && fn(res)
    })
}

export function getData2() {
    return request({
        url: 'http://localhost:8082/A'
    })
}

export function getData3() {
    return request({
        url: 'http://localhost:8082/Other'
    })
}

export function getData4() {
    return request({
        url: 'http://localhost:8082/A'
    })
}