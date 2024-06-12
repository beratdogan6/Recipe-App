export const index = (req, res) => {
    res.status(200).send('Hello World')
}

export const ping = (req, res) => {
    res.status(200).json({ message: 'pong' })
}