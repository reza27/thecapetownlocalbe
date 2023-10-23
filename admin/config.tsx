
require('dotenv').config();

function CustomLogo () {
  let url = `${process.env.NODE_ENV==='production'? '/thecptlocal.png':'../images/thecptlocal.png'}`
    return <img width="auto" height="100" style={{marginLeft:"-20px"}} src={url} />
}

export const components = {
    Logo: CustomLogo
}
