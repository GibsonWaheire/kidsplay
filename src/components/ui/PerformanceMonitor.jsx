import React, { useEffect, useState } from 'react';

const PerformanceMonitor = ({ isVisible = false }) => {
  const [metrics, setMetrics] = useState({
    loadTime: 0,
    bundleSize: 0,
    imageCount: 0,
    apiCalls: 0,
  });

  useEffect(() => {
    if (!isVisible) return;

    // Measure page load time
    const measureLoadTime = () => {
      const loadTime = performance.now();
      setMetrics(prev => ({ ...prev, loadTime: Math.round(loadTime) }));
    };

    // Count images
    const countImages = () => {
      const images = document.querySelectorAll('img');
      setMetrics(prev => ({ ...prev, imageCount: images.length }));
    };

    // Measure bundle size (approximate)
    const measureBundleSize = () => {
      const scripts = document.querySelectorAll('script[src]');
      let totalSize = 0;
      scripts.forEach(script => {
        // This is a rough estimate - in production you'd use webpack-bundle-analyzer
        if (script.src.includes('chunk') || script.src.includes('main')) {
          totalSize += 100; // Approximate size in KB
        }
      });
      setMetrics(prev => ({ ...prev, bundleSize: totalSize }));
    };

    // Count API calls
    const countApiCalls = () => {
      const apiCalls = performance.getEntriesByType('resource')
        .filter(entry => entry.name.includes('localhost:3001')).length;
      setMetrics(prev => ({ ...prev, apiCalls }));
    };

    // Run measurements
    if (document.readyState === 'complete') {
      measureLoadTime();
      countImages();
      measureBundleSize();
      countApiCalls();
    } else {
      window.addEventListener('load', () => {
        measureLoadTime();
        countImages();
        measureBundleSize();
        countApiCalls();
      });
    }
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 right-4 bg-white rounded-lg shadow-lg border border-gray-200 p-4 z-50 max-w-xs">
      <h3 className="font-semibold text-gray-900 mb-2">Performance Metrics</h3>
      <div className="space-y-1 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-600">Load Time:</span>
          <span className="font-medium">{metrics.loadTime}ms</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Bundle Size:</span>
          <span className="font-medium">~{metrics.bundleSize}KB</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Images:</span>
          <span className="font-medium">{metrics.imageCount}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">API Calls:</span>
          <span className="font-medium">{metrics.apiCalls}</span>
        </div>
      </div>
    </div>
  );
};

export default PerformanceMonitor; 