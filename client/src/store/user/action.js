export default {
    async getUserInfo({ commit }) {
        setTimeout(() => {
            let obj = {
                userName: 'test',
                age: 22
            };
            commit('Set_User_Info', obj);
        }, 0);
    }
}