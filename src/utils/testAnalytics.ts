/**
 * Test utility to verify Google Analytics consent behavior
 * Run these functions in browser console to test
 */

export const testAnalyticsConsent = () => {
  console.log('=== Google Analytics Consent Test ===\n')
  
  // 1. Check localStorage consent
  const consent = localStorage.getItem('stratigo_cookie_consent')
  console.log('1. Consent Status:', consent || 'Not set')
  
  // 2. Check if gtag is available
  const gtagAvailable = typeof (window as any).gtag === 'function'
  console.log('2. gtag available:', gtagAvailable)
  
  // 3. Check dataLayer
  const dataLayer = (window as any).dataLayer || []
  console.log('3. dataLayer length:', dataLayer.length)
  console.log('   dataLayer contents:', dataLayer)
  
  // 4. Check for Google Analytics cookies
  const cookies = document.cookie.split(';').map(c => c.trim())
  const gaCookies = cookies.filter(c => 
    c.startsWith('_ga') || 
    c.startsWith('_gid') || 
    c.startsWith('_gat') ||
    c.startsWith('_gcl')
  )
  console.log('4. Google Analytics cookies:', gaCookies.length > 0 ? gaCookies : 'None found')
  
  // 5. Check consent mode state
  const consentCommands = dataLayer.filter((item: any) => 
    Array.isArray(item) && item[0] === 'consent'
  )
  console.log('5. Consent commands:', consentCommands)
  
  // 6. Monitor network requests
  console.log('\n6. To check network requests:')
  console.log('   - Open DevTools → Network tab')
  console.log('   - Filter by "google-analytics" or "gtag"')
  console.log('   - Navigate around the site')
  console.log('   - If rejected: NO requests should appear')
  
  // 7. Expected behavior
  console.log('\n=== Expected Behavior ===')
  if (consent === 'declined' || consent === null) {
    console.log('✅ Consent: DENIED')
    console.log('✅ Should see: No GA cookies, no network requests')
    console.log('✅ dataLayer should have consent:denied commands')
  } else {
    console.log('✅ Consent: GRANTED')
    console.log('✅ Should see: GA cookies, network requests to google-analytics.com')
  }
  
  return {
    consent,
    gtagAvailable,
    dataLayerLength: dataLayer.length,
    gaCookiesCount: gaCookies.length,
    consentCommands: consentCommands.length
  }
}

// Monitor gtag calls
export const monitorGtagCalls = () => {
  const originalGtag = (window as any).gtag
  if (!originalGtag) {
    console.log('❌ gtag is not available')
    return
  }
  
  console.log('🔍 Monitoring gtag calls...')
  let callCount = 0
  
  ;(window as any).gtag = function(...args: any[]) {
    callCount++
    console.log(`🔴 gtag call #${callCount}:`, args)
    return originalGtag.apply(this, args)
  }
  
  console.log('✅ Monitoring active. Navigate around the site to see calls.')
  console.log('If consent is denied, you should see NO calls.')
  
  return () => {
    ;(window as any).gtag = originalGtag
    console.log(`📊 Total gtag calls: ${callCount}`)
  }
}

// Check network requests
export const checkNetworkRequests = () => {
  console.log('=== Network Request Check ===')
  console.log('1. Open DevTools (F12)')
  console.log('2. Go to Network tab')
  console.log('3. Filter by: google-analytics OR googletagmanager')
  console.log('4. Reload page and navigate around')
  console.log('\nExpected when REJECTED:')
  console.log('  ❌ NO requests to google-analytics.com')
  console.log('  ❌ NO requests to googletagmanager.com')
  console.log('\nExpected when ACCEPTED:')
  console.log('  ✅ Requests to google-analytics.com')
  console.log('  ✅ Requests to googletagmanager.com')
}

// Make functions available globally for console testing
if (typeof window !== 'undefined') {
  ;(window as any).testAnalyticsConsent = testAnalyticsConsent
  ;(window as any).monitorGtagCalls = monitorGtagCalls
  ;(window as any).checkNetworkRequests = checkNetworkRequests
}

