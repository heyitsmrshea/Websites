#!/usr/bin/env node
import crypto from 'node:crypto'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.dirname(fileURLToPath(import.meta.url))
const demo = path.join(root, 'demo')
const routes = ['executive', 'compliance', 'workbench', 'sources', 'onprem', 'vciso', 'appendix', 'trust']
const expectedMarks = new Map([
  ['rrsecure-mark.svg', '5067f9383248808c4d42fa5af5a55d18d002ac54f616bb36049c9086fe47ed27'],
  ['rrsecure-mark-white.svg', 'cf9d83f16f65592c0295c91eecd598fe756b0b4485fb7808a9a2c04fa1a747e5'],
])
const publishedPages = [
  'index.html',
  '404.html',
  'contact/index.html',
  'microsoft-security/index.html',
  'on-prem-attack-paths/index.html',
  'platform/index.html',
  'pricing/index.html',
  'security/index.html',
  'Contact.dc.html',
  'Demo.dc.html',
  'Home.dc.html',
  'Microsoft Security.dc.html',
  'OnPrem Attack Paths.dc.html',
  'Platform.dc.html',
  'Pricing.dc.html',
  'Security.dc.html',
]
const screenshotSources = ['attack.html', 'exec.html', 'portal.html', 'queue.html', 'report.html', 'vciso.html']
const forbiddenPolarisBranding = /polaris(?:consulting(?:\.net)?)?|polaris-logo|polaris-icon/i
const marketingAssetVersion = 'rr-mobile-header-20260803-1'
const failures = []

const indexPath = path.join(demo, 'index.html')
if (!fs.existsSync(indexPath)) failures.push('demo/index.html is missing')
else {
  const index = fs.readFileSync(indexPath, 'utf8')
  if (!index.includes('<title>RoadRunner Secure — Synthetic Security Assessment</title>')) failures.push('RoadRunner demo title is missing')
  if (!index.includes('roadrunner-favicon.svg?v=rr-logo-20260802-1')) failures.push('versioned RoadRunner favicon is missing')
  if (!index.includes('roadrunner-preview.png?v=rr-bird-20260802-1')) failures.push('RoadRunner social preview is missing')
  if (/polarisconsulting\.net\/icon\.svg/i.test(index)) failures.push('Polaris favicon leaked into the RoadRunner entry point')
  const activeBundleMatch = index.match(/src="\/demo\/assets\/(index-[^"]+\.js)"/)
  if (!activeBundleMatch) failures.push('RoadRunner demo entry bundle is missing')
  else {
    const activeBundlePath = path.join(demo, 'assets', activeBundleMatch[1])
    if (!fs.existsSync(activeBundlePath)) failures.push(`RoadRunner demo entry bundle is missing: ${activeBundleMatch[1]}`)
    else {
      const activeBundle = fs.readFileSync(activeBundlePath, 'utf8')
      if (forbiddenPolarisBranding.test(activeBundle)) failures.push('Polaris branding leaked into the active RoadRunner demo bundle')
      if (!activeBundle.includes('rr-bird-20260803-1')) failures.push('active RoadRunner mark version is stale')
      if (!activeBundle.includes('?v=${') || !activeBundle.includes('.markVersion}')) failures.push('active RoadRunner mark URL is not cache-versioned')
    }
  }
}

for (const route of routes) {
  const routePath = path.join(demo, route, 'index.html')
  if (!fs.existsSync(routePath)) {
    failures.push(`deep link is missing: /demo/${route}/`)
    continue
  }
  if (forbiddenPolarisBranding.test(fs.readFileSync(routePath, 'utf8'))) failures.push(`Polaris branding leaked into /demo/${route}/`)
}

for (const relativePath of publishedPages) assertRoadRunnerSurface(relativePath)
for (const file of screenshotSources) assertRoadRunnerSurface(path.join('shots', file))

const home = path.join(root, 'index.html')
if (fs.existsSync(home)) {
  const html = fs.readFileSync(home, 'utf8')
  const hasDemoUrl = html.includes('href="/demo/"') || html.includes('https://roadrunnersecure.com/demo/')
  if (!hasDemoUrl) failures.push('RoadRunner homepage is missing its first-party demo URL')
  if (!html.includes(`/styles.css?v=${marketingAssetVersion}`)) failures.push('marketing stylesheet is not cache-versioned')
  if (!html.includes(`/assets/roadrunner-mark.svg?v=${marketingAssetVersion}`)) failures.push('marketing header mark is not cache-versioned')
}

const marketingCss = path.join(root, 'styles.css')
if (!fs.existsSync(marketingCss)) failures.push('marketing stylesheet is missing')
else {
  const css = fs.readFileSync(marketingCss, 'utf8')
  if (!css.includes('.brand img{width:40px;height:29px;flex:0 0 40px')) failures.push('mobile header mark width is not locked')
  if (!css.includes('padding-left:max(16px,env(safe-area-inset-left))')) failures.push('mobile header safe-area padding is missing')
}

const marketingMark = path.join(root, 'assets', 'roadrunner-mark.svg')
if (!fs.existsSync(marketingMark)) failures.push('marketing RoadRunner mark is missing')
else {
  const svg = fs.readFileSync(marketingMark, 'utf8')
  if (!svg.includes('viewBox="0 0 590 420"')) failures.push('marketing RoadRunner mark has a non-zero viewBox origin')
}

for (const [file, expected] of expectedMarks) {
  const asset = path.join(demo, file)
  if (!fs.existsSync(asset)) { failures.push(`RoadRunner mark is missing: ${file}`); continue }
  const actual = crypto.createHash('sha256').update(fs.readFileSync(asset)).digest('hex')
  if (actual !== expected) failures.push(`RoadRunner mark digest changed: ${file}`)
}

if (failures.length) {
  console.error(`RoadRunner demo verification failed:\n- ${failures.join('\n- ')}`)
  process.exit(1)
}

console.log('RoadRunner brand verification passed: first-party marketing, screenshots, versioned bird, and eight assessment routes')

function assertRoadRunnerSurface(relativePath) {
  const file = path.join(root, relativePath)
  if (!fs.existsSync(file)) {
    failures.push(`RoadRunner surface is missing: ${relativePath}`)
    return
  }
  const contents = fs.readFileSync(file, 'utf8')
  if (forbiddenPolarisBranding.test(contents)) failures.push(`Polaris branding leaked into ${relativePath}`)
}
