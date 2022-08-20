export const getTime = () => {
    return {
        time: new Date().toLocaleDateString(),
        timestamp: Date.now()

    }
}