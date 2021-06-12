import { Dispatch, SetStateAction, useState } from 'react';
import { Optional } from 'typescript-optional';

const useOptionalOfNullable = <T>(value?: T): [Optional<T>, Dispatch<SetStateAction<T>>] => {
  const [optional, set] = useState<Optional<T>>(Optional.ofNullable(value));
  const setOptional = (newValue: T): void => {
    set(Optional.ofNullable<T>(newValue));
  };
  return [optional, setOptional as Dispatch<SetStateAction<T>>];
};

export default useOptionalOfNullable;
