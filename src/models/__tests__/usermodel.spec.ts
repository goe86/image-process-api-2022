import UserModel from "../user.model";
import Client from "../../database";
import user from "../../types/user.type"

const userModel = new UserModel();

describe('Authentication Module', () => {
    describe('Test Methods exits', () => {
        it('should have an authenticate user method', () => {
            expect(userModel.authenticate).toBeDefined();
        })
    })
})
describe('USER MODULE',()=>{
    describe('Test User model', () => {
      it('Shoud have a create user function',()=>{
        expect(userModel.create).toBeDefined();
      })
      it('should have a getall users function',()=>{
        expect(userModel.getall).toBeDefined();
      }) 
    })
})