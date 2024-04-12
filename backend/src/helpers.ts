function env(_key: string, _default: any): any {
    let _config = process.env[_key];

    if (typeof _default === 'number') {
        return _config ? parseInt(_config) : _default;
    }

    return _config ? _config : _default;
}

export { env };
