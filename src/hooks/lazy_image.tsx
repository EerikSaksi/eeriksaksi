import React, {useState, useEffect} from 'react'
const useLazyImage: React.FC<{src: any}> = ({src}) => {
  const [sourceLoaded, setSourceLoaded] = useState(null)
  return sourceLoaded 
}
export default useLazyImage
