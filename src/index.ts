type SegmentObjectKey = {
    type: 'object';
    name: string;
};

type SegmentArrayKey = {
    type: 'array';
    name: string;
};

const isSegmentObjectKey = (value: any): value is SegmentObjectKey => {
    return value?.type === 'object' && typeof value.name === 'string';
};

const isSegmentArrayKey = (value: any): value is SegmentArrayKey => {
    return value?.type === 'array' && typeof value.name === 'string';
};

const stringToSegments = (str: string): Array<SegmentArrayKey | SegmentObjectKey> => {
    const arr: Array<SegmentArrayKey | SegmentObjectKey> = [];

    if (!str.startsWith('$')) {
        throw new Error(`String does not start with '$'.`);
    }

    let newSegment: SegmentArrayKey | SegmentObjectKey | undefined;

    for (let i = 1; i < str.length; i += 1) {
        const ch = str[i];

        if (newSegment === undefined) {
            if (ch === '.') {
                newSegment = { type: 'object', name: '' };
            } else if (ch === '[') {
                newSegment = { type: 'array', name: '' };
            } else {
                throw new Error(`Unexpected character ${ch} at index ${i}.`);
            }
        } else if (isSegmentObjectKey(newSegment)) {
            if (ch === '.') {
                if (newSegment.name.length === 0) throw new Error(`Unexpected character ${ch} at index ${i}.`);
                arr.push(newSegment);
                newSegment = undefined;
                i -= 1;
            } else if (ch === '[') {
                if (newSegment.name.length === 0) throw new Error(`Unexpected character ${ch} at index ${i}.`);
                arr.push(newSegment);
                newSegment = undefined;
                i -= 1;
            } else {
                newSegment.name += ch;
            }
        } else if (isSegmentArrayKey(newSegment)) {
            if (ch === ']') {
                if (newSegment.name.length === 0) throw new Error(`Unexpected character ${ch} at index ${i}.`);
                arr.push(newSegment);
                newSegment = undefined;
            } else {
                newSegment.name += ch;
            }
        }
    }

    if (isSegmentArrayKey(newSegment)) {
        throw new Error(`Unexpected ending of string.`);
    } else if (isSegmentObjectKey(newSegment)) {
        if (newSegment.name.length === 0) {
            throw new Error(`Unexpected ending of string.`);
        }
        arr.push(newSegment);
    }

    return arr;
};

const modify = (obj: {} | [], path: string, value: any): any => {
    const segments = stringToSegments(path);

    let rootObject = obj as { [key: string]: any };

    if (Array.isArray(obj) && isSegmentObjectKey(segments[0])) rootObject = {};
    else if (!Array.isArray(obj) && isSegmentArrayKey(segments[0])) rootObject = [];

    let curObj: { [key: string]: any } = rootObject;

    for (let i = 0; i < segments.length; i += 1) {
        const segment = segments[i];
        const nextSegment = i + 1 < segments.length ? segments[i + 1] : undefined;

        if (nextSegment === undefined) {
            // >>> No Next Segment - We assign the value
            if (isSegmentArrayKey(segment) && segment.name.startsWith('+')) {
                if (segment.name === '+') {
                    curObj.push(value);
                } else {
                    const index = parseInt(segment.name.slice(1));
                    curObj.splice(index, 0, value);
                }
            } else {
                curObj[segment.name] = value;
            }
        } else {
            // >>> Next Segment Available
            if (isSegmentArrayKey(segment) && segment.name.startsWith('+')) {
                const newValue = isSegmentObjectKey(nextSegment) ? {} : [];

                if (segment.name === '+') {
                    curObj.push(newValue);
                } else {
                    const index = parseInt(segment.name.slice(1));
                    curObj.splice(index, 0, newValue);
                }

                curObj = newValue;
            } else {
                if (isSegmentObjectKey(nextSegment)) {
                    // Next Segment is an Object
                    if (!(segment.name in curObj && !Array.isArray(curObj[segment.name]))) {
                        curObj[segment.name] = {};
                    }
                    curObj = curObj[segment.name];
                } else if (isSegmentArrayKey(nextSegment)) {
                    // Next Segment is an Array
                    if (!(segment.name in curObj && Array.isArray(curObj[segment.name]))) {
                        curObj[segment.name] = [];
                    }
                    curObj = curObj[segment.name];
                }
            }
        }
    }

    return rootObject;
};

const jsonpathModifier = {
    modify
};

export default jsonpathModifier;
