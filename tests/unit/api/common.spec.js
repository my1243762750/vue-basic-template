import { getData, getData2, getData3, getData4 } from '@/api/common'

beforeAll(() => {
    console.log('beforeAll');
})
beforeEach(() => {
    console.log('beforeEach');
})
afterEach(() => {
    console.log('afterEach');
})
afterAll(() => {
    console.log('afterAll');
})

describe('Api:common:getData', () => {
    it('getData:test data', (done) => {
        getData((res) => {
            expect(res).toEqual({message: 'hello world', code: 20000})
            done()
        })
    })
})

describe('Api:common:getData2', () => {
    it('getData2:test promise data', () => {
        return getData2().then((res) => {
            expect(res).toEqual({message: 'hello world', code: 20000})
        })
    })
})

describe('Api:common:getData3', () => {
    it('getData3:test error data', () => {
        // 必须执行一次expect
        expect.assertions(1)
        return getData3().catch((err) => {
            expect(err.toString().indexOf('404') > -1).toBe(true)
        })
    })
})

describe('Api:common:getData4', () => {
    it('getData4:test promise data', async () => {
        const res = await getData4()
        expect(res).toEqual({message: 'hello world', code: 20000})
        await expect(getData4()).resolves.toMatchObject({message: 'hello world', code: 20000})
    })
})