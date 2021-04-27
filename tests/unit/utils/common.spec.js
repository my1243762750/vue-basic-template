import { lTrim, rTrim } from '@/utils/common'

describe('Utils:common', () => {
    describe('Utils:common:lTrim', () => {
        it('lTrim:parameter is not a string', () => {
            const arr = [
                1,
                {},
                function(){},
                undefined,
                null,
                false,
                true
            ]
            arr.forEach((item) => {
                expect(lTrim(item)).toBe(item)
            })
        })
        it.only('lTrim:space on the left', () => {
            expect(lTrim(' hello')).toBe('hello')
        })
        it('lTrim:space on the right', () => {
            expect(lTrim('hello ')).toBe('hello ')
        })
        it('lTrim:space on both sides', () => {
            expect(lTrim(' hello ')).toBe('hello ')
        })
    })
    
    describe('Utils:common:rTrim', () => {
        it('rTrim:parameter is not a string', () => {
            const arr = [
                1,
                {},
                function(){},
                undefined,
                null,
                false,
                true
            ]
            arr.forEach((item) => {
                expect(rTrim(item)).toBe(item)
            })
        })
        it('rTrim:space on the left', () => {
            expect(rTrim(' hello')).toBe(' hello')
        })
        it('rTrim:space on the right', () => {
            expect(rTrim('hello ')).toBe('hello')
        })
        it('rTrim:space on both sides', () => {
            expect(rTrim(' hello ')).toBe(' hello')
        })
    })
})

