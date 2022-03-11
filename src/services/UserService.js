
    static async getAll() {
        try {
        return async database.User.findAll();
    } catch(error) { 
        throw error
    }
}, 
    static async addOne(newUser) {
        try {
        return async database.User.create(newUser);
    } catch(error) { 
        throw error
    }
}, 
    static async updateOne(id,updateUser) {
        try {
         const userToUpdate =  async database.User.findOne(updateUser,{
    where: {
        id: id
    }
});if(userToUpdate) {
        return async database.User.update(updateUser,{
    where: {
        id: id
    }
});
    } 
    } catch(error) { 
        throw error
    }
}