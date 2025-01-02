function uniqueByField<T>(arr: T[], key: keyof T): T[] {
    const seen = new Map<any, T>()
    return arr.filter((item) => {
        const value = item[key]
        return seen.has(value) ? false : (seen.set(value, item), true)
    })
}

export { uniqueByField }
