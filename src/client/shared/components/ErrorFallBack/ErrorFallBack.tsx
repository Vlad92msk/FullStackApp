import React from 'react'

/**
 * TODO: потом стилизовать как нибудь
 * @param error
 * @constructor
 */
export const ErrorFallBack: React.FC<any> = ({ error }) => (
  <div role='alert'>
    <p>Что-то пошло не так...</p>
    <pre>{error.message}</pre>
  </div>
)

