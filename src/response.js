export const success = ({ data, status, statusText }) => {
  return {
    data, 
    status, 
    statusText
  }
}

export const error = errorArgs => {
  return {
    errorArgs
  }
}