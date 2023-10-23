
require('dotenv').config({ path: '../.env' });

function CustomLogo () {
  let url = `${process.env.NODE_ENV==='production'? process.env.RAILWAY_VOLUME_MOUNT_PATH + '/thecptlocal2.png':'../images/thecptlocal2.png'}`
    return <img width="auto" height="100" style={{marginLeft:"-20px"}} src={url} />
}

export const components = {
    Logo: CustomLogo
}
