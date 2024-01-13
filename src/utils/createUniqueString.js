import { customAlphabet } from 'nanoid'

const createUniqueString = () => {
  const nanoid = customAlphabet('0123456789ABCDEF', 10)
  return nanoid()
}

export default createUniqueString
