const mongoDbTimeToYYMMDD = (createdAt) => {
    return createdAt? new Date(createdAt).toISOString().split('T')[0] // YYYY-MM-DD
                : null
}

export default mongoDbTimeToYYMMDD