import { useState } from 'react';
import { Optional } from 'typescript-optional';

const useEmptyOptionalView = <T>() => useState<Optional<T>>(Optional.empty());

export default useEmptyOptionalView;
