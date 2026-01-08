/**
 * Composable for Google Analytics event tracking
 * Respects cookie consent - only tracks if consent is granted
 */

export const useAnalytics = () => {
  const hasConsent = (): boolean => {
    const consent = localStorage.getItem('stratigo_cookie_consent')
    return consent === 'accepted'
  }

  const trackEvent = (eventName: string, eventParams?: Record<string, any>) => {
    // Only track if consent is granted and gtag is available
    if (!hasConsent() || !(window as any).gtag) {
      return
    }

    try {
      ;(window as any).gtag('event', eventName, eventParams || {})
    } catch (error) {
      console.error('Failed to track analytics event:', error)
    }
  }

  return {
    trackEvent,
    hasConsent,
  }
}

