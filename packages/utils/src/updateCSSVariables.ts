function updateCSSVariables(variables: { [key: string]: string }, id = '__shweui-styles__'): void {
    const styleElement = document.querySelector(`#${id}`) || document.createElement('style')

    styleElement.id = id

    let cssText = ':root {'
    for (const key in variables) {
        if (Object.prototype.hasOwnProperty.call(variables, key)) {
            cssText += `${key}: ${variables[key]};`
        }
    }
    cssText += '}'

    styleElement.textContent = cssText

    if (!document.querySelector(`#${id}`)) {
        setTimeout(() => {
            document.head.append(styleElement)
        })
    }
}

export { updateCSSVariables }
