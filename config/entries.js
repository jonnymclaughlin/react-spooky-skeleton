const hotLoadedEntry = paths => {
    const entries = Array.isArray(paths) ? paths : [paths];
    return ['webpack/hot/only-dev-server', ...entries];
};

const hotloadedEntriesReducer = entryPoints => (acc, key) => {
    acc[key] = hotLoadedEntry(entryPoints[key]);
    return acc;
};

export const entries = {
    main: './scripts/main.js'
};

export const hotEntries = Object.keys(entries).reduce(hotloadedEntriesReducer(entries), {});
