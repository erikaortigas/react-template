const resolversOf = (actionMap) => {
    const resolvers = {
      default: (state) => () => state,
      ...actionMap
    }
    return (type) => (resolvers[type] || resolvers.default)
}

export const reducerOf = (actionMap = {}) => (defaultState) => {
    const resolvers = resolversOf(actionMap)
    return (state = defaultState(), action = {}) => {
        return resolvers(action.type)(state)(action)
    }
}
