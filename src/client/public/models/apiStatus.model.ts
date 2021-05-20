// eslint-disable-next-line no-shadow
export enum ApiStatusPendingEnum {
  LOADING = 'LOADING',
  LOAD = 'LOAD',
  ERROR = 'ERROR',
}

export type DefaultError = {
  code?: number;
  message?: string;
  description?: string;
  error_text?: string;
}

export interface ApiStatusError<T = DefaultError> {
  error: T;
}

/**
 * @param T - Тип apiData
 * @param E - Тип ошибки (apiStatus -> error)
 */
export interface ApiStatusState<T, E = DefaultError> {
  apiData: T | null,
  apiStatus: ApiStatusPendingEnum | null;
  apiError: ApiStatusError<E> | null;
}

export const initialApiState: ApiStatusState<null> = {
  apiData: null,
  apiStatus: null,
  apiError: null,
};
