require('dotenv').config({ path: '.env.local' })
const fs = require('fs')
const path = require('path')

const appID = process.env.NEXT_PUBLIC_APP_ID || ''
const sha256Fingerprint = process.env.NEXT_PUBLIC_SHA_256 || ''

const aasaContent = {
  applinks: {
    apps: [],
    details: [
      {
        appID: appID,
        paths: ['/[a-zA-Z0-9_-]+/work'],
      },
    ],
  },
  activitycontinuation: {
    apps: [appID],
  },
  webcredentials: {
    apps: [appID],
  },
}

const assetlinksContent = [
  {
    relation: ['delegate_permission/common.handle_all_urls'],
    target: {
      namespace: 'android_app',
      package_name: 'com.eolluga.eollugage',
      sha256_cert_fingerprints: [sha256Fingerprint],
    },
  },
]

// 파일 경로 정의
const wellKnownDir = path.join(__dirname, '../public/.well-known')
const aasaPath = path.join(wellKnownDir, 'apple-app-site-association')
const assetlinksPath = path.join(wellKnownDir, 'assetlinks.json')

// 디렉터리 생성 (존재하지 않을 경우)
if (!fs.existsSync(wellKnownDir)) {
  fs.mkdirSync(wellKnownDir, { recursive: true })
}

// apple-app-site-association 파일 생성
fs.writeFileSync(aasaPath, JSON.stringify(aasaContent, null, 2))
console.log(`Generated ${aasaPath}`)

// assetlinks.json 파일 생성
fs.writeFileSync(assetlinksPath, JSON.stringify(assetlinksContent, null, 2))
console.log(`Generated ${assetlinksPath}`)
