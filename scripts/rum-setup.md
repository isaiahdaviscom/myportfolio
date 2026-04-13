# Real User Monitoring (RUM) Setup

## Overview
Real User Monitoring collects performance and experience data from actual users browsing your site, providing insights into real-world performance across different devices, networks, and geographical locations.

## 1. Core Web Vitals Tracking

### Web Vitals Library Integration (static/js/web-vitals.js)
```javascript
// Import web-vitals library (add to package.json dependencies)
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

class RUMTracker {
  constructor() {
    this.data = {
      sessionId: this.generateSessionId(),
      url: window.location.href,
      userAgent: navigator.userAgent,
      timestamp: Date.now(),
      metrics: {},
      deviceInfo: this.getDeviceInfo(),
      networkInfo: this.getNetworkInfo()
    };
    
    this.initTracking();
  }

  generateSessionId() {
    return 'rum_' + Math.random().toString(36).substring(2) + '_' + Date.now();
  }

  getDeviceInfo() {
    return {
      screenWidth: window.screen.width,
      screenHeight: window.screen.height,
      viewportWidth: window.innerWidth,
      viewportHeight: window.innerHeight,
      devicePixelRatio: window.devicePixelRatio || 1,
      platform: navigator.platform,
      language: navigator.language,
      cookieEnabled: navigator.cookieEnabled,
      onlineStatus: navigator.onLine
    };
  }

  getNetworkInfo() {
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    if (connection) {
      return {
        effectiveType: connection.effectiveType,
        downlink: connection.downlink,
        rtt: connection.rtt,
        saveData: connection.saveData
      };
    }
    return null;
  }

  initTracking() {
    // Track Core Web Vitals
    getCLS(this.onCLS.bind(this));
    getFID(this.onFID.bind(this));
    getFCP(this.onFCP.bind(this));
    getLCP(this.onLCP.bind(this));
    getTTFB(this.onTTFB.bind(this));

    // Track additional metrics
    this.trackNavigation();
    this.trackErrors();
    this.trackUserInteractions();
    this.trackCustomMetrics();
    
    // Send data on page unload
    window.addEventListener('beforeunload', () => this.sendData());
    
    // Send data periodically for long sessions
    setInterval(() => this.sendData(), 30000); // Every 30 seconds
  }

  onCLS(metric) {
    this.data.metrics.cls = {
      value: metric.value,
      rating: metric.rating,
      delta: metric.delta,
      entries: metric.entries.map(entry => ({
        startTime: entry.startTime,
        value: entry.value,
        hadRecentInput: entry.hadRecentInput
      }))
    };
    console.log('CLS:', metric);
  }

  onFID(metric) {
    this.data.metrics.fid = {
      value: metric.value,
      rating: metric.rating,
      entries: metric.entries.map(entry => ({
        startTime: entry.startTime,
        processingStart: entry.processingStart,
        processingEnd: entry.processingEnd
      }))
    };
    console.log('FID:', metric);
  }

  onFCP(metric) {
    this.data.metrics.fcp = {
      value: metric.value,
      rating: metric.rating
    };
    console.log('FCP:', metric);
  }

  onLCP(metric) {
    this.data.metrics.lcp = {
      value: metric.value,
      rating: metric.rating,
      entries: metric.entries.map(entry => ({
        startTime: entry.startTime,
        size: entry.size,
        elementType: entry.element?.tagName,
        elementId: entry.element?.id,
        url: entry.url
      }))
    };
    console.log('LCP:', metric);
  }

  onTTFB(metric) {
    this.data.metrics.ttfb = {
      value: metric.value,
      rating: metric.rating
    };
    console.log('TTFB:', metric);
  }

  trackNavigation() {
    if ('navigation' in performance) {
      const nav = performance.getEntriesByType('navigation')[0];
      this.data.navigation = {
        type: nav.type,
        loadEventEnd: nav.loadEventEnd,
        domContentLoadedEventEnd: nav.domContentLoadedEventEnd,
        responseStart: nav.responseStart,
        requestStart: nav.requestStart,
        fetchStart: nav.fetchStart,
        redirectCount: nav.redirectCount,
        transferSize: nav.transferSize,
        encodedBodySize: nav.encodedBodySize,
        decodedBodySize: nav.decodedBodySize
      };
    }
  }

  trackErrors() {
    // JavaScript errors
    window.addEventListener('error', (event) => {
      this.data.errors = this.data.errors || [];
      this.data.errors.push({
        type: 'javascript',
        message: event.message,
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
        timestamp: Date.now(),
        stack: event.error?.stack
      });
    });

    // Promise rejections
    window.addEventListener('unhandledrejection', (event) => {
      this.data.errors = this.data.errors || [];
      this.data.errors.push({
        type: 'promise_rejection',
        reason: event.reason?.toString(),
        timestamp: Date.now()
      });
    });

    // Resource loading errors
    window.addEventListener('error', (event) => {
      if (event.target && event.target !== window) {
        this.data.resourceErrors = this.data.resourceErrors || [];
        this.data.resourceErrors.push({
          type: 'resource',
          tagName: event.target.tagName,
          source: event.target.src || event.target.href,
          timestamp: Date.now()
        });
      }
    }, true);
  }

  trackUserInteractions() {
    let clickCount = 0;
    let scrollDepth = 0;
    let timeOnPage = Date.now();

    // Click tracking
    document.addEventListener('click', (event) => {
      clickCount++;
      
      // Track specific portfolio interactions
      if (event.target.closest('.portfolio-item')) {
        this.trackEvent('portfolio_click', {
          projectName: event.target.closest('.portfolio-item').dataset.project,
          element: event.target.tagName
        });
      }
      
      // Track navigation clicks
      if (event.target.closest('nav a')) {
        this.trackEvent('navigation_click', {
          href: event.target.href,
          text: event.target.textContent.trim()
        });
      }
    });

    // Scroll depth tracking
    window.addEventListener('scroll', () => {
      const scrollPercent = Math.round(
        (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100
      );
      if (scrollPercent > scrollDepth) {
        scrollDepth = Math.min(scrollPercent, 100);
      }
    });

    // Form interaction tracking
    document.addEventListener('submit', (event) => {
      if (event.target.tagName === 'FORM') {
        this.trackEvent('form_submit', {
          formAction: event.target.action,
          formMethod: event.target.method,
          fieldCount: event.target.elements.length
        });
      }
    });

    // Update session data periodically
    setInterval(() => {
      this.data.engagement = {
        clickCount,
        scrollDepth,
        timeOnPage: Date.now() - timeOnPage,
        activeTime: this.calculateActiveTime()
      };
    }, 10000);
  }

  trackCustomMetrics() {
    // Portfolio-specific metrics
    setTimeout(() => {
      const portfolioItems = document.querySelectorAll('.portfolio-item');
      const visibleItems = Array.from(portfolioItems).filter(item => {
        const rect = item.getBoundingClientRect();
        return rect.top >= 0 && rect.left >= 0 && 
               rect.bottom <= window.innerHeight && 
               rect.right <= window.innerWidth;
      });

      this.data.portfolioMetrics = {
        totalItems: portfolioItems.length,
        visibleItems: visibleItems.length,
        loadTime: Date.now() - this.data.timestamp
      };

      // Track image loading performance
      const images = document.querySelectorAll('img');
      const imageMetrics = Array.from(images).map(img => ({
        src: img.src,
        loaded: img.complete && img.naturalWidth > 0,
        width: img.naturalWidth,
        height: img.naturalHeight,
        visible: this.isElementVisible(img)
      }));

      this.data.imageMetrics = {
        total: images.length,
        loaded: imageMetrics.filter(img => img.loaded).length,
        visible: imageMetrics.filter(img => img.visible).length
      };
    }, 2000);
  }

  isElementVisible(element) {
    const rect = element.getBoundingClientRect();
    return rect.top >= 0 && rect.left >= 0 && 
           rect.bottom <= window.innerHeight && 
           rect.right <= window.innerWidth;
  }

  calculateActiveTime() {
    // Simple active time calculation (would be more sophisticated in production)
    return Date.now() - this.data.timestamp;
  }

  trackEvent(eventName, data = {}) {
    this.data.customEvents = this.data.customEvents || [];
    this.data.customEvents.push({
      name: eventName,
      data,
      timestamp: Date.now()
    });
  }

  async sendData() {
    if (!this.data.metrics || Object.keys(this.data.metrics).length === 0) {
      return; // Don't send empty data
    }

    try {
      // Use navigator.sendBeacon for reliable data sending
      if ('sendBeacon' in navigator) {
        const success = navigator.sendBeacon(
          '/api/rum-data', 
          JSON.stringify(this.data)
        );
        if (success) {
          console.log('RUM data sent via sendBeacon');
        }
      } else {
        // Fallback to fetch for older browsers
        await fetch('/api/rum-data', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(this.data),
          keepalive: true
        });
        console.log('RUM data sent via fetch');
      }
    } catch (error) {
      console.error('Failed to send RUM data:', error);
      
      // Store in localStorage as fallback
      try {
        const stored = JSON.parse(localStorage.getItem('rum_data') || '[]');
        stored.push(this.data);
        // Keep only last 10 entries to avoid storage bloat
        localStorage.setItem('rum_data', JSON.stringify(stored.slice(-10)));
      } catch (storageError) {
        console.error('Failed to store RUM data locally:', storageError);
      }
    }
  }
}

// Initialize RUM tracking when page loads
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.rumTracker = new RUMTracker();
  });
} else {
  window.rumTracker = new RUMTracker();
}

export default RUMTracker;
```

## 2. Netlify Function for Data Collection (netlify/functions/rum-data.js)
```javascript
const faunadb = require('faunadb');

// Initialize FaunaDB client (or your preferred database)
const q = faunadb.query;
const client = new faunadb.Client({
  secret: process.env.FAUNADB_SECRET_KEY,
  domain: 'db.fauna.com',
  scheme: 'https'
});

exports.handler = async (event, context) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    const rumData = JSON.parse(event.body);
    
    // Validate required fields
    if (!rumData.sessionId || !rumData.url || !rumData.metrics) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing required fields' })
      };
    }

    // Add server-side metadata
    const enhancedData = {
      ...rumData,
      serverTimestamp: Date.now(),
      userIP: event.headers['x-forwarded-for'] || event.headers['x-real-ip'] || 'unknown',
      userCountry: event.headers['x-country'] || 'unknown',
      referer: event.headers.referer,
      userAgentDetails: parseUserAgent(rumData.userAgent || ''),
      geolocation: await getGeolocation(event.headers['x-forwarded-for'])
    };

    // Store in database
    const result = await client.query(
      q.Create(
        q.Collection('rum_data'),
        { data: enhancedData }
      )
    );

    // Process for real-time analytics
    await processRealTimeMetrics(enhancedData);

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST',
        'Access-Control-Allow-Headers': 'Content-Type'
      },
      body: JSON.stringify({ 
        success: true, 
        id: result.ref.id,
        message: 'RUM data stored successfully'
      })
    };

  } catch (error) {
    console.error('RUM data processing error:', error);
    
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        error: 'Internal server error',
        message: error.message
      })
    };
  }
};

function parseUserAgent(userAgent) {
  // Simple user agent parsing (use a proper library in production)
  const mobile = /Mobile|Android|iPhone|iPad/i.test(userAgent);
  const bot = /bot|crawler|spider/i.test(userAgent);
  
  let browser = 'Unknown';
  if (userAgent.includes('Chrome')) browser = 'Chrome';
  else if (userAgent.includes('Firefox')) browser = 'Firefox';
  else if (userAgent.includes('Safari')) browser = 'Safari';
  else if (userAgent.includes('Edge')) browser = 'Edge';
  
  let os = 'Unknown';
  if (userAgent.includes('Windows')) os = 'Windows';
  else if (userAgent.includes('Mac OS')) os = 'macOS';
  else if (userAgent.includes('Linux')) os = 'Linux';
  else if (userAgent.includes('Android')) os = 'Android';
  else if (userAgent.includes('iOS')) os = 'iOS';

  return { mobile, bot, browser, os };
}

async function getGeolocation(ip) {
  if (!ip || ip === 'unknown') return null;
  
  try {
    // Use a geolocation service (this is a mock implementation)
    // In production, integrate with services like MaxMind, IPinfo, etc.
    return {
      country: 'US',
      region: 'Unknown',
      city: 'Unknown',
      timezone: 'Unknown'
    };
  } catch (error) {
    return null;
  }
}

async function processRealTimeMetrics(data) {
  try {
    // Calculate performance ratings
    const ratings = {
      lcp: data.metrics.lcp?.rating || 'unknown',
      fid: data.metrics.fid?.rating || 'unknown',
      cls: data.metrics.cls?.rating || 'unknown',
      fcp: data.metrics.fcp?.rating || 'unknown',
      ttfb: data.metrics.ttfb?.rating || 'unknown'
    };

    // Store aggregated metrics for dashboards
    await client.query(
      q.Create(
        q.Collection('rum_aggregated'),
        {
          data: {
            timestamp: Date.now(),
            url: data.url,
            device: data.deviceInfo?.viewportWidth > 768 ? 'desktop' : 'mobile',
            browser: data.userAgentDetails?.browser,
            country: data.geolocation?.country,
            ratings,
            metrics: {
              lcp: data.metrics.lcp?.value,
              fid: data.metrics.fid?.value,
              cls: data.metrics.cls?.value,
              fcp: data.metrics.fcp?.value,
              ttfb: data.metrics.ttfb?.value
            },
            networkType: data.networkInfo?.effectiveType,
            errorCount: (data.errors || []).length + (data.resourceErrors || []).length
          }
        }
      )
    );

  } catch (error) {
    console.error('Real-time processing error:', error);
  }
}
```

## 3. Analytics Dashboard (static/rum-dashboard.html)
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>RUM Analytics Dashboard</title>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <style>
        body { 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            margin: 0; padding: 20px; background: #f5f5f5; 
        }
        .dashboard { max-width: 1200px; margin: 0 auto; }
        .metrics-grid { 
            display: grid; 
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); 
            gap: 20px; 
            margin-bottom: 30px; 
        }
        .metric-card {
            background: white;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            text-align: center;
        }
        .metric-value {
            font-size: 2.5em;
            font-weight: bold;
            margin: 10px 0;
        }
        .metric-label {
            color: #666;
            font-size: 0.9em;
            text-transform: uppercase;
            letter-spacing: 1px;
        }
        .rating-good { color: #4CAF50; }
        .rating-needs-improvement { color: #FF9800; }
        .rating-poor { color: #F44336; }
        .chart-container {
            background: white;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            margin-bottom: 20px;
        }
        .filters {
            background: white;
            padding: 15px;
            border-radius: 8px;
            margin-bottom: 20px;
            display: flex;
            gap: 15px;
            flex-wrap: wrap;
        }
        select, input {
            padding: 8px 12px;
            border: 1px solid #ddd;
            border-radius: 4px;
        }
        .loading {
            text-align: center;
            padding: 40px;
            color: #666;
        }
    </style>
</head>
<body>
    <div class="dashboard">
        <h1>🔍 Real User Monitoring Dashboard</h1>
        
        <div class="filters">
            <select id="timeRange">
                <option value="1h">Last Hour</option>
                <option value="24h" selected>Last 24 Hours</option>
                <option value="7d">Last 7 Days</option>
                <option value="30d">Last 30 Days</option>
            </select>
            
            <select id="deviceFilter">
                <option value="all">All Devices</option>
                <option value="desktop">Desktop</option>
                <option value="mobile">Mobile</option>
            </select>
            
            <select id="browserFilter">
                <option value="all">All Browsers</option>
                <option value="Chrome">Chrome</option>
                <option value="Firefox">Firefox</option>
                <option value="Safari">Safari</option>
                <option value="Edge">Edge</option>
            </select>
            
            <input type="text" id="pageFilter" placeholder="Filter by page URL">
            
            <button onclick="loadDashboard()" id="refreshBtn">🔄 Refresh</button>
        </div>

        <div class="metrics-grid" id="metricsGrid">
            <div class="loading">Loading metrics...</div>
        </div>

        <div class="chart-container">
            <h3>📊 Core Web Vitals Trend</h3>
            <canvas id="vitalsChart"></canvas>
        </div>

        <div class="chart-container">
            <h3>🌍 Geographic Performance</h3>
            <canvas id="geoChart"></canvas>
        </div>

        <div class="chart-container">
            <h3>📱 Device & Browser Breakdown</h3>
            <canvas id="deviceChart"></canvas>
        </div>

        <div class="chart-container">
            <h3>⚠️ Error Rate Over Time</h3>
            <canvas id="errorChart"></canvas>
        </div>
    </div>

    <script>
        class RUMDashboard {
            constructor() {
                this.charts = {};
                this.data = null;
                this.loadDashboard();
                
                // Auto-refresh every 5 minutes
                setInterval(() => this.loadDashboard(), 5 * 60 * 1000);
            }

            async loadDashboard() {
                try {
                    const filters = this.getFilters();
                    document.getElementById('refreshBtn').disabled = true;
                    
                    // Fetch RUM data from your analytics API
                    const response = await fetch(`/api/rum-analytics?${new URLSearchParams(filters)}`);
                    this.data = await response.json();
                    
                    this.updateMetrics();
                    this.updateCharts();
                    
                } catch (error) {
                    console.error('Failed to load dashboard:', error);
                    document.getElementById('metricsGrid').innerHTML = 
                        '<div class="loading">Failed to load data. Please try again.</div>';
                } finally {
                    document.getElementById('refreshBtn').disabled = false;
                }
            }

            getFilters() {
                return {
                    timeRange: document.getElementById('timeRange').value,
                    device: document.getElementById('deviceFilter').value,
                    browser: document.getElementById('browserFilter').value,
                    page: document.getElementById('pageFilter').value
                };
            }

            updateMetrics() {
                const metrics = this.data.averageMetrics || {};
                
                const metricsHTML = `
                    <div class="metric-card">
                        <div class="metric-label">Largest Contentful Paint</div>
                        <div class="metric-value ${this.getRatingClass(metrics.lcp?.rating)}">
                            ${this.formatMetric(metrics.lcp?.value, 'ms')}
                        </div>
                        <div>Rating: ${metrics.lcp?.rating || 'N/A'}</div>
                    </div>
                    
                    <div class="metric-card">
                        <div class="metric-label">First Input Delay</div>
                        <div class="metric-value ${this.getRatingClass(metrics.fid?.rating)}">
                            ${this.formatMetric(metrics.fid?.value, 'ms')}
                        </div>
                        <div>Rating: ${metrics.fid?.rating || 'N/A'}</div>
                    </div>
                    
                    <div class="metric-card">
                        <div class="metric-label">Cumulative Layout Shift</div>
                        <div class="metric-value ${this.getRatingClass(metrics.cls?.rating)}">
                            ${this.formatMetric(metrics.cls?.value, '')}
                        </div>
                        <div>Rating: ${metrics.cls?.rating || 'N/A'}</div>
                    </div>
                    
                    <div class="metric-card">
                        <div class="metric-label">First Contentful Paint</div>
                        <div class="metric-value ${this.getRatingClass(metrics.fcp?.rating)}">
                            ${this.formatMetric(metrics.fcp?.value, 'ms')}
                        </div>
                        <div>Rating: ${metrics.fcp?.rating || 'N/A'}</div>
                    </div>
                    
                    <div class="metric-card">
                        <div class="metric-label">Time to First Byte</div>
                        <div class="metric-value ${this.getRatingClass(metrics.ttfb?.rating)}">
                            ${this.formatMetric(metrics.ttfb?.value, 'ms')}
                        </div>
                        <div>Rating: ${metrics.ttfb?.rating || 'N/A'}</div>
                    </div>
                    
                    <div class="metric-card">
                        <div class="metric-label">Total Sessions</div>
                        <div class="metric-value">
                            ${this.data.totalSessions || 0}
                        </div>
                        <div>Unique visitors</div>
                    </div>
                `;
                
                document.getElementById('metricsGrid').innerHTML = metricsHTML;
            }

            getRatingClass(rating) {
                switch (rating) {
                    case 'good': return 'rating-good';
                    case 'needs-improvement': return 'rating-needs-improvement';
                    case 'poor': return 'rating-poor';
                    default: return '';
                }
            }

            formatMetric(value, unit) {
                if (value === undefined || value === null) return 'N/A';
                return Math.round(value) + unit;
            }

            updateCharts() {
                this.updateVitalsChart();
                this.updateGeoChart();
                this.updateDeviceChart();
                this.updateErrorChart();
            }

            updateVitalsChart() {
                const ctx = document.getElementById('vitalsChart').getContext('2d');
                
                if (this.charts.vitals) {
                    this.charts.vitals.destroy();
                }

                this.charts.vitals = new Chart(ctx, {
                    type: 'line',
                    data: {
                        labels: this.data.timeSeriesLabels || [],
                        datasets: [
                            {
                                label: 'LCP (ms)',
                                data: this.data.timeSeriesData?.lcp || [],
                                borderColor: '#4CAF50',
                                backgroundColor: 'rgba(76, 175, 80, 0.1)',
                                tension: 0.4
                            },
                            {
                                label: 'FID (ms)',
                                data: this.data.timeSeriesData?.fid || [],
                                borderColor: '#2196F3',
                                backgroundColor: 'rgba(33, 150, 243, 0.1)',
                                tension: 0.4
                            },
                            {
                                label: 'CLS (×100)',
                                data: (this.data.timeSeriesData?.cls || []).map(v => v * 100),
                                borderColor: '#FF9800',
                                backgroundColor: 'rgba(255, 152, 0, 0.1)',
                                tension: 0.4
                            }
                        ]
                    },
                    options: {
                        responsive: true,
                        scales: {
                            y: {
                                beginAtZero: true
                            }
                        }
                    }
                });
            }

            updateGeoChart() {
                const ctx = document.getElementById('geoChart').getContext('2d');
                
                if (this.charts.geo) {
                    this.charts.geo.destroy();
                }

                this.charts.geo = new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels: this.data.geoData?.countries || [],
                        datasets: [{
                            label: 'Average LCP (ms)',
                            data: this.data.geoData?.averageLCP || [],
                            backgroundColor: 'rgba(76, 175, 80, 0.8)'
                        }]
                    },
                    options: {
                        responsive: true,
                        scales: {
                            y: {
                                beginAtZero: true
                            }
                        }
                    }
                });
            }

            updateDeviceChart() {
                const ctx = document.getElementById('deviceChart').getContext('2d');
                
                if (this.charts.device) {
                    this.charts.device.destroy();
                }

                this.charts.device = new Chart(ctx, {
                    type: 'doughnut',
                    data: {
                        labels: this.data.deviceBreakdown?.labels || [],
                        datasets: [{
                            data: this.data.deviceBreakdown?.values || [],
                            backgroundColor: [
                                '#4CAF50',
                                '#2196F3', 
                                '#FF9800',
                                '#9C27B0'
                            ]
                        }]
                    },
                    options: {
                        responsive: true
                    }
                });
            }

            updateErrorChart() {
                const ctx = document.getElementById('errorChart').getContext('2d');
                
                if (this.charts.errors) {
                    this.charts.errors.destroy();
                }

                this.charts.errors = new Chart(ctx, {
                    type: 'line',
                    data: {
                        labels: this.data.timeSeriesLabels || [],
                        datasets: [{
                            label: 'JavaScript Errors',
                            data: this.data.errorData?.javascript || [],
                            borderColor: '#F44336',
                            backgroundColor: 'rgba(244, 67, 54, 0.1)',
                            tension: 0.4
                        }, {
                            label: 'Resource Errors',
                            data: this.data.errorData?.resource || [],
                            borderColor: '#FF5722',
                            backgroundColor: 'rgba(255, 87, 34, 0.1)',
                            tension: 0.4
                        }]
                    },
                    options: {
                        responsive: true,
                        scales: {
                            y: {
                                beginAtZero: true
                            }
                        }
                    }
                });
            }
        }

        // Initialize dashboard
        const dashboard = new RUMDashboard();
        
        // Make loadDashboard available globally for the refresh button
        function loadDashboard() {
            dashboard.loadDashboard();
        }
    </script>
</body>
</html>
```

## 4. Package.json Dependencies
```json
{
  "dependencies": {
    "web-vitals": "^3.5.0",
    "faunadb": "^4.8.0"
  },
  "scripts": {
    "rum:dashboard": "open static/rum-dashboard.html",
    "rum:test": "node scripts/test-rum.js"
  }
}
```

## 5. Benefits of RUM Implementation

### Real-World Performance Insights
- **Actual User Data**: See how your site performs for real users, not just in lab conditions
- **Geographic Variations**: Identify performance issues in specific regions or countries  
- **Device-Specific Issues**: Understand how your site performs on different devices and screen sizes
- **Network Conditions**: See impact of slow connections, mobile networks, and data-saver modes

### Business Intelligence
- **User Behavior Tracking**: Understand how users interact with your portfolio
- **Conversion Optimization**: Identify which pages and elements drive engagement
- **Performance Impact**: Correlate site speed with user engagement and business metrics
- **A/B Testing Data**: Make data-driven decisions about design and functionality changes

### Proactive Issue Detection
- **Error Monitoring**: Catch JavaScript errors and broken resources before users report them
- **Performance Degradation**: Get alerts when Core Web Vitals start declining
- **Browser Compatibility**: Identify issues specific to certain browsers or versions
- **Mobile Experience**: Monitor mobile-specific performance and usability issues

This comprehensive RUM setup provides deep insights into your real user experience and helps optimize your portfolio for actual visitor conditions! 📊