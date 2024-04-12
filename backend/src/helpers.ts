function env(_key: string, _default: any): any {
    if (typeof _default === 'number') {
        return process.env._key ? parseInt(process.env._key) : _default;
    }

    return process.env._key ? process.env._key : _default;
}

export { env };
