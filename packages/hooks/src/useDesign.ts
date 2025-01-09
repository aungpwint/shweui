import variables from '@shweui/styles/variables.module.less'

export const useDesign = () => {
    const lessVariables = variables

    /**
     * @param scope
     * @returns
     */
    const getPrefixCls = (scope: string) => {
        return `${lessVariables.namespace}-${scope}`
    }

    return {
        variables: lessVariables,
        getPrefixCls
    }
}
