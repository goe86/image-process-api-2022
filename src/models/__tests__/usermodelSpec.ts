import UserModel from "../user.model";
import Client from "../../database";
import user from "../../types/user.types"

const userModel = new UserModel();
describe('Authentication Module', () => {
    describe('Test Methods exits', () => {
        it('should have an authenticate user method', () => {
            expect(userModel.authenticate).toBeDefined();
        })
    })
})