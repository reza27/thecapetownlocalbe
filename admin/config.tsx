
require('dotenv').config({ path: '../.env' });

function CustomLogo () {
//  console.log('logo path', process.env.RAILWAY_VOLUME_MOUNT_PATH,process.env)
  let url = `${process.env.NODE_ENV==='production'? process.env.RAILWAY_VOLUME_MOUNT_PATH + '/thecptlocal.png':'./../images/thecptlocal.png'}`
    return <img width="auto" height="100" style={{marginLeft:"-20px"}} src={url} />
}

export const components = {
    Logo: CustomLogo
}
