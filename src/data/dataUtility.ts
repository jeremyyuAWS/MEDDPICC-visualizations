import { VisualizationResult, VisualizationPayload } from '../types';
import { 
  barChartTemplates,
  lineChartTemplates,
  pieChartTemplates,
  columnChartTemplates,
  radarChartTemplates,
  areaChartTemplates,
  donutChartTemplates,
  scatterChartTemplates,
  waterfallChartTemplates,
  combinedChartTemplates,
  bubbleChartTemplates,
  rangeBarTemplates,
  boxPlotTemplates,
  candlestickTemplates,
  treemapTemplates,
  heatmapTemplates,
  sankeyTemplates,
  funnelTemplates,
  gaugeTemplates,
  nightingaleTemplates,
  histogramTemplates
} from './visualizationTemplates';
import { 
  manufacturingVisualizations,
  healthcareVisualizations,
  financeVisualizations,
  retailVisualizations,
  technologyVisualizations,
  securityVisualizations 
} from './industryData';
import {
  awsVisualizations,
  azureVisualizations,
  gcpVisualizations,
  multiCloudVisualizations
} from './cloudProviderData';
import {
  salesforceVisualizations,
  crmVisualizations,
  marketingAutomationVisualizations,
  salesAnalyticsVisualizations,
  customerSuccessVisualizations
} from './salesToolsData';
import {
  advancedBubbleVisualizations,
  advancedHeatmapVisualizations,
  advancedRadarAreaVisualizations,
  advancedWaterfallVisualizations,
  advancedSunburstVisualizations,
  advancedCombinationVisualizations,
  advancedStreamgraphVisualizations,
  advancedNetworkGraphVisualizations,
  advancedParallelCoordinatesVisualizations,
  advancedSankeyVisualizations,
  advancedChordVisualizations,
  advancedTreemapVisualizations
} from './advancedCharts';

/**
 * Generate a relevant visualization based on the input payload
 * This is used in demo mode to simulate an AI-powered chart selection
 * @param payload The visualization context parameters
 * @returns A visualization result (insight + chart data)
 */
export function generateVisualization(payload: VisualizationPayload): VisualizationResult {
  // Get all available chart templates grouped by type
  const allTemplates = {
    // Chart type templates
    bar: Object.values(barChartTemplates),
    line: Object.values(lineChartTemplates),
    pie: Object.values(pieChartTemplates),
    column: Object.values(columnChartTemplates),
    radar: Object.values(radarChartTemplates),
    area: Object.values(areaChartTemplates),
    donut: Object.values(donutChartTemplates),
    scatter: Object.values(scatterChartTemplates || {}),
    waterfall: Object.values(waterfallChartTemplates || {}),
    combined: Object.values(combinedChartTemplates || {}),
    
    // New chart types
    bubble: Object.values(bubbleChartTemplates || {}),
    rangebar: Object.values(rangeBarTemplates || {}),
    boxplot: Object.values(boxPlotTemplates || {}),
    candlestick: Object.values(candlestickTemplates || {}),
    treemap: Object.values(treemapTemplates || {}),
    heatmap: Object.values(heatmapTemplates || {}),
    sankey: Object.values(sankeyTemplates || {}),
    funnel: Object.values(funnelTemplates || {}),
    gauge: Object.values(gaugeTemplates || {}),
    nightingale: Object.values(nightingaleTemplates || {}),
    histogram: Object.values(histogramTemplates || {}),
    
    // Industry templates
    manufacturing: Object.values(manufacturingVisualizations),
    healthcare: Object.values(healthcareVisualizations),
    finance: Object.values(financeVisualizations),
    retail: Object.values(retailVisualizations),
    technology: Object.values(technologyVisualizations),
    security: Object.values(securityVisualizations),
    
    // Cloud provider templates
    aws: Object.values(awsVisualizations),
    azure: Object.values(azureVisualizations),
    gcp: Object.values(gcpVisualizations),
    multicloud: Object.values(multiCloudVisualizations),
    
    // Sales tools templates
    salesforce: Object.values(salesforceVisualizations),
    crm: Object.values(crmVisualizations),
    marketing: Object.values(marketingAutomationVisualizations),
    sales_analytics: Object.values(salesAnalyticsVisualizations || {}),
    customer_success: Object.values(customerSuccessVisualizations || {}),
    
    // Advanced chart templates
    bubble: Object.values(advancedBubbleVisualizations || {}),
    heatmap: Object.values(advancedHeatmapVisualizations || {}),
    radar_area: Object.values(advancedRadarAreaVisualizations || {}),
    advanced_waterfall: Object.values(advancedWaterfallVisualizations || {}),
    sunburst: Object.values(advancedSunburstVisualizations || {}),
    combination: Object.values(advancedCombinationVisualizations || {}),
    streamgraph: Object.values(advancedStreamgraphVisualizations || {}),
    network: Object.values(advancedNetworkGraphVisualizations || {}),
    parallel: Object.values(advancedParallelCoordinatesVisualizations || {}),
    sankey: Object.values(advancedSankeyVisualizations || {}),
    chord: Object.values(advancedChordVisualizations || {}),
    treemap: Object.values(advancedTreemapVisualizations || {})
  };
  
  // Try to find the most relevant template based on the payload
  
  // Match by industry (more specific)
  if (payload.industry) {
    const industry = payload.industry.toLowerCase();
    if (industry.includes('manufacturing') || industry.includes('factory') || industry.includes('production')) {
      return randomItem(allTemplates.manufacturing);
    } else if (industry.includes('health') || industry.includes('medical') || industry.includes('hospital')) {
      return randomItem(allTemplates.healthcare);
    } else if (industry.includes('finance') || industry.includes('banking') || industry.includes('insurance') || industry.includes('financial')) {
      return randomItem(allTemplates.finance);
    } else if (industry.includes('retail') || industry.includes('ecommerce') || industry.includes('e-commerce') || industry.includes('shop')) {
      return randomItem(allTemplates.retail);
    } else if (industry.includes('tech') || industry.includes('software') || industry.includes('it') || industry.includes('technology')) {
      return randomItem(allTemplates.technology);
    } else if (industry.includes('energy') || industry.includes('utility') || industry.includes('power')) {
      // Default to manufacturing which has relevant charts
      return randomItem(allTemplates.manufacturing);
    } else if (industry.includes('education') || industry.includes('school') || industry.includes('university')) {
      // Default to relevant charts from other categories
      return randomItem([...allTemplates.pie, ...allTemplates.line]);
    }
  }
  
  // Match by cloud provider (also specific)
  if (payload.cloudProvider) {
    const provider = payload.cloudProvider.toLowerCase();
    if (provider.includes('aws') || provider.includes('amazon')) {
      return randomItem(allTemplates.aws);
    } else if (provider.includes('azure') || provider.includes('microsoft')) {
      return randomItem(allTemplates.azure);
    } else if (provider.includes('gcp') || provider.includes('google')) {
      return randomItem(allTemplates.gcp);
    } else if (provider.includes('multi') || provider.includes('hybrid') || provider.includes('multiple')) {
      return randomItem(allTemplates.multicloud);
    } else if (provider.includes('ibm') || provider.includes('oracle') || provider.includes('alibaba')) {
      // Default to general cloud comparisons
      return randomItem(allTemplates.multicloud);
    }
  }
  
  // Match by technologies (more specific than topic)
  if (payload.technologies?.length) {
    const techs = payload.technologies.map(t => t.toLowerCase());
    if (techs.some(t => t.includes('salesforce') || t.includes('sales force'))) {
      return randomItem(allTemplates.salesforce);
    } else if (techs.some(t => t.includes('crm') || t.includes('customer relationship'))) {
      return randomItem(allTemplates.crm);
    } else if (techs.some(t => t.includes('marketing'))) {
      return randomItem(allTemplates.marketing);
    } else if (techs.some(t => t.includes('sales') || t.includes('revenue'))) {
      return randomItem([...allTemplates.sales_analytics, ...allTemplates.crm]);
    } else if (techs.some(t => t.includes('ai') || t.includes('artificial intelligence') || t.includes('machine learning'))) {
      return randomItem([...allTemplates.bar, ...allTemplates.line, ...allTemplates.column]);
    } else if (techs.some(t => t.includes('cloud') || t.includes('aws') || t.includes('azure') || t.includes('gcp'))) {
      return randomItem(allTemplates.multicloud);
    } else if (techs.some(t => t.includes('security') || t.includes('protection') || t.includes('compliance'))) {
      return randomItem(allTemplates.security);
    }
  }
  
  // Match by pain points
  if (payload.painPoints?.length) {
    const pains = payload.painPoints.map(p => p.toLowerCase());
    if (pains.some(p => p.includes('security') || p.includes('breach') || p.includes('threat') || p.includes('compliance'))) {
      return randomItem(allTemplates.security);
    } else if (pains.some(p => p.includes('cost') || p.includes('expense') || p.includes('budget'))) {
      return randomItem([...allTemplates.area, ...allTemplates.column].filter(chart => 
        chart.insight.toLowerCase().includes('cost') || 
        chart.insight.toLowerCase().includes('spend') || 
        chart.insight.toLowerCase().includes('saving')
      ));
    } else if (pains.some(p => p.includes('efficiency') || p.includes('productivity') || p.includes('time'))) {
      return randomItem([...allTemplates.bar, ...allTemplates.column].filter(chart => 
        chart.insight.toLowerCase().includes('productivity') || 
        chart.insight.toLowerCase().includes('efficiency') || 
        chart.insight.toLowerCase().includes('time')
      ));
    } else if (pains.some(p => p.includes('growth') || p.includes('revenue') || p.includes('sales'))) {
      return randomItem([...allTemplates.line, ...allTemplates.area].filter(chart => 
        chart.insight.toLowerCase().includes('growth') || 
        chart.insight.toLowerCase().includes('revenue') || 
        chart.insight.toLowerCase().includes('sales')
      ));
    }
  }
  
  // Match by topic (more general)
  if (payload.topic) {
    const topic = payload.topic.toLowerCase();
    if (topic.includes('security') || topic.includes('protect') || topic.includes('threat')) {
      return randomItem(allTemplates.security);
    } else if (topic.includes('cloud')) {
      return randomItem(allTemplates.multicloud);
    } else if (topic.includes('growth') || topic.includes('trend') || topic.includes('adoption')) {
      return randomItem([...allTemplates.line, ...allTemplates.area]);
    } else if (topic.includes('comparison') || topic.includes('versus') || topic.includes('vs')) {
      return randomItem([...allTemplates.bar, ...allTemplates.column, ...allTemplates.radar]);
    } else if (topic.includes('distribution') || topic.includes('breakdown') || topic.includes('allocation')) {
      return randomItem([...allTemplates.pie, ...allTemplates.donut]);
    } else if (topic.includes('roi') || topic.includes('return') || topic.includes('investment')) {
      return randomItem([...allTemplates.line, ...allTemplates.column].filter(chart => 
        chart.insight.toLowerCase().includes('roi') || 
        chart.insight.toLowerCase().includes('return') || 
        chart.insight.toLowerCase().includes('investment')
      ));
    } else if (topic.includes('cost') || topic.includes('saving') || topic.includes('budget')) {
      return randomItem([...allTemplates.area, ...allTemplates.column, ...allTemplates.line].filter(chart => 
        chart.insight.toLowerCase().includes('cost') || 
        chart.insight.toLowerCase().includes('saving') || 
        chart.insight.toLowerCase().includes('budget')
      ));
    } else if (topic.includes('customer') || topic.includes('client') || topic.includes('retention')) {
      return randomItem(allTemplates.customer_success || [...allTemplates.bar, ...allTemplates.pie]);
    } else if (topic.includes('performance') || topic.includes('metric') || topic.includes('kpi')) {
      return randomItem([...allTemplates.radar, ...allTemplates.column, ...allTemplates.bar]);
    }
  }
  
  // If company name is provided but no other specific matches, try to pick something relevant
  if (payload.company) {
    const company = payload.company.toLowerCase();
    // Try to make some educated guesses based on company name
    if (company.includes('tech') || company.includes('soft') || company.includes('data') || company.includes('ai')) {
      return randomItem(allTemplates.technology);
    } else if (company.includes('health') || company.includes('care') || company.includes('med') || company.includes('pharma')) {
      return randomItem(allTemplates.healthcare);
    } else if (company.includes('bank') || company.includes('financial') || company.includes('invest') || company.includes('capital')) {
      return randomItem(allTemplates.finance);
    } else if (company.includes('retail') || company.includes('shop') || company.includes('store') || company.includes('mart')) {
      return randomItem(allTemplates.retail);
    } else if (company.includes('factory') || company.includes('manufact') || company.includes('product') || company.includes('industrial')) {
      return randomItem(allTemplates.manufacturing);
    } else {
      // No specific industry match, pick a random business-relevant chart
      const businessCharts = [
        ...allTemplates.bar,
        ...allTemplates.line,
        ...allTemplates.pie,
        ...allTemplates.column
      ];
      return randomItem(businessCharts);
    }
  }
  
  // Default to a mix of chart types to showcase variety if no specific criteria matched
  const allChartTypes = [
    ...allTemplates.bar,
    ...allTemplates.line,
    ...allTemplates.pie,
    ...allTemplates.column,
    ...allTemplates.radar,
    ...allTemplates.area,
    ...allTemplates.donut,
    ...allTemplates.bubble,
    ...allTemplates.heatmap,
    ...allTemplates.radar_area,
    ...allTemplates.advanced_waterfall,
    ...allTemplates.sunburst,
    ...allTemplates.treemap
  ];
  
  return randomItem(allChartTypes);
}

// Helper function to pick a random item from an array with protection against empty arrays
function randomItem<T>(items: T[]): T {
  if (!items || items.length === 0) {
    // Fallback to a default visualization if the selected category has no items
    return {
      insight: "Enterprise AI adoption has reached 56% in 2024, with companies reporting an average 23% improvement in operational efficiency.",
      chartType: 'Column',
      chartData: {
        title: 'Enterprise AI Adoption',
        subtitle: '2020-2024 growth trend',
        x: ['2020', '2021', '2022', '2023', '2024'],
        y: [27, 34, 42, 51, 56],
        xAxisLabel: 'Year',
        yAxisLabel: 'Adoption Rate %'
      }
    } as T;
  }
  return items[Math.floor(Math.random() * items.length)];
}