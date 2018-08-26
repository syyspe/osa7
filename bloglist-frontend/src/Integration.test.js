import React from 'react'
import { mount } from 'enzyme'
import App from './App'

describe.only('<App />', () => {
    let app, user
    describe('when user is not logged in', () => {
        beforeEach(() => {
            app = mount(<App />)
        })

        it('shows login screen when user is not logged in', () => {
            app.update()
            const login = app.find('LoginForm')
            expect(login.length).toBe(1)
        })
    
        it('does not show blogs when user is not logged in', () => {
            app.update()
            const blogs = app.find('BlogList')
            expect(blogs.length).toBe(0)
        })

    })

    describe('when user is logged in', () => {
        beforeEach(async () => {
            app = mount(<App />)
            user = {
                username: 'user 1',
                name: 'User 1',
                token: '111111',
                _id: '111111'
            }
            window.localStorage.setItem('loggedInUser', JSON.stringify(user))
            app.update()
        })

        it('waists a little bit of time so that user is saved', () => {
            let dummy = app.find('BlogList')
            dummy = app.find('LoginForm')
            expect(dummy).toEqual(dummy)
        }) 

        it('shows blog list when user is logged in', () => {
            const blogs = app.find('BlogList')
            expect(blogs.length).toBe(1)
        })

        it('does not show login screen when user is logged in', () => {
            const login = app.find('LoginForm')
            expect(login.length).toBe(0)
        })

        
    })
})