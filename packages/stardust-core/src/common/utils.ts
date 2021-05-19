/** A dictionary class that maps string to ValueType */
// 提供类似ES6 set的功能
export class Dictionary<ValueType> {
  private _dict: { [name: string]: ValueType };
  constructor() {
    this._dict = {};
  }
  /** Set an entry */
  public set(key: string, value: ValueType) {
    this._dict[key] = value;
  }
  /** Determine if the dictionary has an entry */
  public has(key: string) {
    return this._dict.hasOwnProperty(key);
  }
  /** Delete an entry from the dictionary */
  public delete(key: string) {
    delete this._dict[key];
  }
  /** Get a entry, if not found, return undefined */
  public get(key: string): ValueType {
    if (this._dict.hasOwnProperty(key)) {
      return this._dict[key];
    } else {
      return undefined;
    }
  }
  /** Iterate over the dictionary */
  public forEach(cb: (value: ValueType, key: string) => any) {
    for (const key in this._dict) {
      if (this._dict.hasOwnProperty(key)) {
        cb(this._dict[key], key);
      }
    }
  }
  /** Create a copy of the dictionary */
  public clone() {
    const result = new Dictionary<ValueType>();
    this.forEach((value, key) => {
      result.set(key, value);
    });
    return result;
  }
}

/** Shallow clone an object */
export function shallowClone<T>(object: T): T {
  const result = {} as any;
  for (const key in object) {
    if (object.hasOwnProperty(key)) {
      result[key] = (object as any)[key];
    }
  }
  return result;
}

/** Attempt different names starting with prefix until check returns true */
// 用输入的check函数检测输入的prefix是否合理？如果不合理则改成prefix1, prefix2...直到check成功
export function attemptName(
  prefix: string,
  check: (candidate: string) => boolean
): string {
  if (check(prefix)) {
    return prefix;
  }
  for (let i = 1; ; i++) {
    const c = prefix + i.toString();
    if (check(c)) {
      return c;
    }
  }
}
