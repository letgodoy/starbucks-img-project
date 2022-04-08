type Maybe<T> = T | null;

export const isEmpty = (value?: any): boolean => {
  if (value === null || value === undefined) return true
  
  if (value.trim() === "") return true

  return false
}

export function genConvertArray<Input, Output>(
  itemFn: (i?: Input | null) => Output | null
) {
  const fn = (array?: (Input | null)[] | null) => {
    if (!array || !Array.isArray(array)) {
      return [];
    }

    return array.map(itemFn).filter((i) => i != null) as NonNullable<Output>[];
  };

  return fn;
}

// export const extractUTCDate = (i?: Maybe<string>): Date | null =>
//   parseFromUTC(i as string);

// export const extractNullableUTCDate = (i?: Maybe<string>): Date | null =>
//   i ? parseFromUTC(i as string) : null;

export const extractNumber = (i?: Maybe<any>): number => {
  let number = Number(i) || 0;

  if (Number.isNaN(number)) {
    number = 0;
  }

  return number;
};

export const extractNullNumber = (i?: Maybe<any>): number | null => {
  if (i == null) {
    return null;
  }

  let number = Number(i) || 0;

  if (Number.isNaN(number)) {
    number = 0;
  }

  return number;
};

export const extractFirstValidString = (
  ...array: (Maybe<string> | undefined)[]
): string => {
  if (!array || !array.length) {
    return "";
  }

  return (
    array.reduce<Maybe<string> | undefined>((selected, item) => {
      if (
        (!selected || isEmpty(selected.trim())) &&
        item &&
        !isEmpty(item.trim())
      ) {
        return item;
      }

      return selected;
    }, null) ?? ""
  );
};

export const extractString = (i?: Maybe<string | null>): string => i ?? "";

export const extractStringExcludeNull = (i?: Maybe<string>): string => {
  if (!i || isEmpty(i) || i.toLocaleUpperCase() === "NULL") {
    return "";
  }

  return `${i}`;
};

export const extractJSON = (i?: Maybe<any>): Record<string, any> => i ?? {};
