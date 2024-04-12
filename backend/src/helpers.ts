function env(_key: string, _def: any): any {
    if (typeof _def === 'number') {
        return process.env._key ? parseInt(process.env._key) : _def;
    }

    return process.env._key ? process.env._key : _def;
}

export { env };