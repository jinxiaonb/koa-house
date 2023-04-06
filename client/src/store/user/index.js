import State from './state.js';
import Mutation from './mutation.js';
import Action from './action.js';

const state = State

const mutations = Mutation;

const actions = Action;

export default {
    namespaced: true,
    state,
    mutations,
    actions
}