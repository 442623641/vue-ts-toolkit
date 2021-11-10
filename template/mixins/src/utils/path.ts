export const resolve = function (...pathSegments:string[]): string {
    let resolvedPath = '',
        resolvedAbsolute = false;

    for (let i = pathSegments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
        pathSegments[i] = pathSegments[i].length > 1 && pathSegments[i].endsWith('/') ? pathSegments[i].slice(0, -1) : pathSegments[i]
        const path = i >= 0 ? pathSegments[i] : '/'
        // Skip empty and invalid entries
        if (typeof path !== 'string') {
            throw new TypeError('pathSegments to path.resolve must be strings');
        } else if (!path) {
            continue;
        }

        resolvedPath = path + '/' + resolvedPath;
        resolvedAbsolute = path.charAt(0) === '/';
    }

    // At this point the path should be resolved to a full absolute path, but
    // handle relative paths to be safe (might happen when process.cwd() fails)

    // Normalize the path
    resolvedPath = normalizeArray(filter(resolvedPath.split('/'), function (p) {
        return !!p;
    }), !resolvedAbsolute).join('/');

    return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
};

function filter(xs, f) {
    if (xs.filter) return xs.filter(f);
    const res = [];
    for (let i = 0; i < xs.length; i++) {
        if (f(xs[i], i, xs)) res.push(xs[i]);
    }
    return res;
}
function normalizeArray(parts, allowAboveRoot) {
    // if the path tries to go above the root, `up` ends up > 0
    let up = 0;
    for (let i = parts.length - 1; i >= 0; i--) {
        const last = parts[i];
        if (last === '.') {
            parts.splice(i, 1);
        } else if (last === '..') {
            parts.splice(i, 1);
            up++;
        } else if (up) {
            parts.splice(i, 1);
            up--;
        }
    }

    // if the path is allowed to go above the root, restore leading ..s
    if (allowAboveRoot) {
        for (; up--; up) {
            parts.unshift('..');
        }
    }

    return parts;
}