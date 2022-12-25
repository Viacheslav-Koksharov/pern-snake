const inputs = {
    INPUT_NAME: {
        TYPE: "text",
        NAME: "name",
        PLACEHOLDER: "e.g. John",
        PATTERN: /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/,
        LENGTH: 10,
        ERROR_TYPES: {
            MAX: 'isMax',
            MISMATCH: 'isMismatch'
        }
    }
}

export { inputs };