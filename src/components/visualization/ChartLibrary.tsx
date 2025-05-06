import React, { useState, useEffect } from 'react';
import { BarChart2, LineChart, PieChart, BarChart, Activity, Layers, Donut, Hexagon, Search, Info, Filter, Download, Share, Maximize2, ArrowRight } from 'lucide-react';
import ChartRenderer from './ChartRenderer';
import ChartExports from './ChartExports';
import { 
  barChartTemplates, 
  lineChartTemplates,
  pieChartTemplates,
  columnChartTemplates,
  radarChartTemplates,
  areaChartTemplates,
  donutChartTemplates
} from '../../data/visualizationTemplates';

const ChartLibrary: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'bar' | 'line' | 'pie' | 'column' | 'area' | 'donut' | 'radar'>('bar');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [fullscreenChart, setFullscreenChart] = useState<number | null>(null);
  const [showDataTable, setShowDataTable] = useState(false);
  const [filterType, setFilterType] = useState<'all' | 'finance' | 'technology' | 'healthcare' | 'sales'>('all');
  
  // Handle keyboard events for Escape key to exit fullscreen
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && fullscreenChart !== null) {
        setFullscreenChart(null);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [fullscreenChart]);
  
  const getChartsByType = () => {
    switch(activeTab) {
      case 'bar':
        return barChartTemplates;
      case 'line':
        return lineChartTemplates;
      case 'pie':
        return pieChartTemplates;
      case 'column':
        return columnChartTemplates;
      case 'radar':
        return radarChartTemplates;
      case 'area':
        return areaChartTemplates;
      case 'donut':
        return donutChartTemplates;
      default:
        return barChartTemplates;
    }
  };
  
  const charts = getChartsByType();
  
  // Filter charts by search term and filter type if provided
  const filteredCharts = Object.values(charts).filter((chart) => {
    // Apply search filter
    if (searchTerm) {
      const lowerSearch = searchTerm.toLowerCase();
      const matchesSearch = chart.chartData && (
        (chart.chartData.title && chart.chartData.title.toLowerCase().includes(lowerSearch)) ||
        chart.insight.toLowerCase().includes(lowerSearch) ||
        (chart.chartData.subtitle && chart.chartData.subtitle.toLowerCase().includes(lowerSearch)) ||
        (Array.isArray(chart.chartData.x) && chart.chartData.x.some(label => label && label.toLowerCase().includes(lowerSearch)))
      );
      if (!matchesSearch) return false;
    }
    
    // Apply category filter
    if (filterType !== 'all') {
      const insight = chart.insight.toLowerCase();
      switch (filterType) {
        case 'finance':
          return insight.includes('finance') || 
                 insight.includes('banking') || 
                 insight.includes('investment') || 
                 insight.includes('budget') ||
                 insight.includes('cost') ||
                 insight.includes('roi');
        case 'technology':
          return insight.includes('tech') || 
                 insight.includes('cloud') || 
                 insight.includes('software') || 
                 insight.includes('ai') ||
                 insight.includes('platform');
        case 'healthcare':
          return insight.includes('health') || 
                 insight.includes('patient') || 
                 insight.includes('medical') ||
                 insight.includes('care');
        case 'sales':
          return insight.includes('sales') || 
                 insight.includes('customer') || 
                 insight.includes('marketing') ||
                 insight.includes('lead') ||
                 insight.includes('conversion');
        default:
          return true;
      }
    }
    
    return true;
  });

  // Fullscreen chart modal
  const FullscreenChartModal = () => {
    if (fullscreenChart === null) return null;
    const chart = filteredCharts[fullscreenChart];
    if (!chart || !chart.chartData) return null;
    
    return (
      <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg w-full max-w-6xl max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-2xl font-bold text-gray-900">{chart.chartData.title}</h3>
                {chart.chartData.subtitle && (
                  <p className="text-gray-600">{chart.chartData.subtitle}</p>
                )}
              </div>
              <button 
                onClick={() => setFullscreenChart(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                ×
              </button>
            </div>
            
            <p className="text-gray-700 mb-6">{chart.insight}</p>
            
            <div className="h-[60vh] w-full mb-6">
              <ChartRenderer chartData={chart} />
            </div>
            
            <div className="border-t border-gray-200 pt-4">
              <button
                onClick={() => setShowDataTable(!showDataTable)}
                className="text-sm text-blue-600 hover:text-blue-800 mb-2"
              >
                {showDataTable ? 'Hide Data Table' : 'Show Data Table'}
              </button>
              
              {showDataTable && (
                <div className="mt-2 bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{chart.chartData.xAxisLabel || 'Category'}</th>
                        <th className="px-4 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">{chart.chartData.yAxisLabel || 'Value'}</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {chart.chartData.x.map((label, i) => (
                        <tr key={i}>
                          <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{label}</td>
                          <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900 text-right">{chart.chartData.y[i]}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
              
              <ChartExports chartData={chart} />
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-lg p-4">
      {fullscreenChart !== null && <FullscreenChartModal />}
      
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 space-y-4 md:space-y-0">
        <div className="flex items-center">
          <BarChart2 className="h-5 w-5 text-gray-700 mr-2" />
          <h2 className="text-xl font-semibold">Chart Library</h2>
        </div>
        
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 w-full md:w-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search charts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all w-full md:w-64"
            />
          </div>
          
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value as any)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all appearance-none w-full md:w-auto"
            >
              <option value="all">All Categories</option>
              <option value="finance">Finance & ROI</option>
              <option value="technology">Technology & Cloud</option>
              <option value="healthcare">Healthcare</option>
              <option value="sales">Sales & Marketing</option>
            </select>
          </div>
        </div>
      </div>
      
      <div className="border-b border-gray-200 mb-6 overflow-x-auto">
        <div className="flex space-x-6 min-w-max">
          <button
            onClick={() => setActiveTab('bar')}
            className={`pb-2 text-sm font-medium transition-colors flex items-center ${
              activeTab === 'bar'
                ? 'border-b-2 border-black text-black'
                : 'text-gray-500 hover:text-black'
            }`}
          >
            <BarChart className="h-4 w-4 mr-2" />
            Bar Charts
          </button>
          <button
            onClick={() => setActiveTab('column')}
            className={`pb-2 text-sm font-medium transition-colors flex items-center ${
              activeTab === 'column'
                ? 'border-b-2 border-black text-black'
                : 'text-gray-500 hover:text-black'
            }`}
          >
            <BarChart2 className="h-4 w-4 mr-2" />
            Column Charts
          </button>
          <button
            onClick={() => setActiveTab('line')}
            className={`pb-2 text-sm font-medium transition-colors flex items-center ${
              activeTab === 'line'
                ? 'border-b-2 border-black text-black'
                : 'text-gray-500 hover:text-black'
            }`}
          >
            <LineChart className="h-4 w-4 mr-2" />
            Line Charts
          </button>
          <button
            onClick={() => setActiveTab('area')}
            className={`pb-2 text-sm font-medium transition-colors flex items-center ${
              activeTab === 'area'
                ? 'border-b-2 border-black text-black'
                : 'text-gray-500 hover:text-black'
            }`}
          >
            <Layers className="h-4 w-4 mr-2" />
            Area Charts
          </button>
          <button
            onClick={() => setActiveTab('pie')}
            className={`pb-2 text-sm font-medium transition-colors flex items-center ${
              activeTab === 'pie'
                ? 'border-b-2 border-black text-black'
                : 'text-gray-500 hover:text-black'
            }`}
          >
            <PieChart className="h-4 w-4 mr-2" />
            Pie Charts
          </button>
          <button
            onClick={() => setActiveTab('donut')}
            className={`pb-2 text-sm font-medium transition-colors flex items-center ${
              activeTab === 'donut'
                ? 'border-b-2 border-black text-black'
                : 'text-gray-500 hover:text-black'
            }`}
          >
            <Donut className="h-4 w-4 mr-2" />
            Donut Charts
          </button>
          <button
            onClick={() => setActiveTab('radar')}
            className={`pb-2 text-sm font-medium transition-colors flex items-center ${
              activeTab === 'radar'
                ? 'border-b-2 border-black text-black'
                : 'text-gray-500 hover:text-black'
            }`}
          >
            <Hexagon className="h-4 w-4 mr-2" />
            Radar Charts
          </button>
        </div>
      </div>
      
      {filteredCharts.length === 0 ? (
        <div className="text-center py-12">
          <Search className="h-12 w-12 mx-auto text-gray-300 mb-4" />
          <h3 className="text-lg font-medium text-gray-700 mb-2">No Matching Charts</h3>
          <p className="text-gray-500">
            No charts found matching "{searchTerm}" with the selected filter.
          </p>
          <button
            onClick={() => {
              setSearchTerm('');
              setFilterType('all');
            }}
            className="mt-4 inline-flex items-center px-4 py-2 border border-gray-300 text-sm rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <>
          <p className="text-sm text-gray-600 mb-6">
            Browse sample charts that can be generated by the visualization agent. These professionally designed charts enhance your sales conversations with data-backed insights.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {filteredCharts.map((chart, index) => (
              <div 
                key={chart.chartData?.title || index} 
                className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <div className="bg-gray-50 p-4 border-b border-gray-200">
                  <div className="flex items-start justify-between">
                    <div className="pr-8">
                      <h3 className="text-lg font-medium text-gray-900 mb-1">{chart.chartData.title}</h3>
                      <p className="text-sm text-gray-600 line-clamp-2">{chart.insight}</p>
                    </div>
                    <div className="flex space-x-1">
                      <button
                        onClick={() => setFullscreenChart(index)}
                        className="text-gray-400 hover:text-gray-700 p-1 rounded transition-colors"
                        title="View fullscreen"
                      >
                        <Maximize2 className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => setSelectedTemplate(selectedTemplate === index.toString() ? null : index.toString())}
                        className={`text-gray-400 hover:text-gray-700 p-1 rounded transition-colors ${
                          selectedTemplate === index.toString() ? 'text-blue-500 hover:text-blue-700' : ''
                        }`}
                        title="Show details"
                      >
                        <Info className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="p-4">
                  <div className="h-64 w-full mb-2">
                    <ChartRenderer chartData={chart} />
                  </div>
                  
                  <div className="flex justify-between items-center mt-2">
                    <div className="text-xs text-gray-500">
                      {chart.chartType} Chart • {chart.chartData.x.length} data points
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => setFullscreenChart(index)}
                        className="text-xs text-gray-600 hover:text-black flex items-center"
                      >
                        Expand <ArrowRight className="h-3 w-3 ml-1" />
                      </button>
                    </div>
                  </div>
                </div>
                
                {selectedTemplate === index.toString() && (
                  <div className="p-4 border-t border-gray-200 bg-gray-50 animate-fadeDown">
                    <h4 className="font-medium text-sm mb-2">Full Insight:</h4>
                    <p className="text-sm text-gray-600 mb-3">{chart.insight}</p>
                    
                    <h4 className="font-medium text-sm mb-2">Data Points:</h4>
                    <div className="bg-white p-3 border border-gray-200 rounded-md">
                      <table className="min-w-full divide-y divide-gray-200 text-sm">
                        <thead>
                          <tr>
                            <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{chart.chartData.xAxisLabel || 'Category'}</th>
                            <th className="px-3 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">{chart.chartData.yAxisLabel || 'Value'}</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                          {chart.chartData.x.map((label, i) => (
                            <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                              <td className="px-3 py-2 whitespace-nowrap">{label}</td>
                              <td className="px-3 py-2 whitespace-nowrap text-right">{chart.chartData.y[i]}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    
                    <div className="mt-4">
                      <h4 className="font-medium text-sm mb-2">Use in Sales Conversation:</h4>
                      <div className="bg-white p-3 border border-gray-200 rounded-md text-sm text-gray-700 mb-3">
                        "I came across an interesting data point that might be relevant to your industry - {chart.insight.split('.')[0]}. This kind of insight can help us think about how our solution could add value to your organization."
                      </div>
                      
                      <div className="flex justify-between">
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(chart.insight);
                          }}
                          className="text-xs text-gray-600 hover:text-black flex items-center"
                        >
                          <Share className="h-3 w-3 mr-1" />
                          Copy Insight
                        </button>
                        
                        <button
                          onClick={() => {
                            // In a real implementation, this would trigger a download
                            alert(`Chart "${chart.chartData.title}" would be exported as PNG.`);
                          }}
                          className="text-xs text-gray-600 hover:text-black flex items-center"
                        >
                          <Download className="h-3 w-3 mr-1" />
                          Export Chart
                        </button>
                      </div>
                    </div>
                    
                    <div className="mt-3 text-xs text-gray-500">
                      {chart.chartData.subtitle && <p>Subtitle: {chart.chartData.subtitle}</p>}
                      {chart.chartData.xAxisLabel && <p>X-Axis: {chart.chartData.xAxisLabel}</p>}
                      {chart.chartData.yAxisLabel && <p>Y-Axis: {chart.chartData.yAxisLabel}</p>}
                    </div>
                    
                    <div className="flex justify-end mt-4">
                      <button
                        onClick={() => setSelectedTemplate(null)}
                        className="text-xs text-gray-500 hover:text-gray-700"
                      >
                        Close Details
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </>
      )}
      
      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mt-6">
        <h3 className="text-sm font-medium mb-2 flex items-center">
          <Info className="h-4 w-4 mr-2 text-gray-600" />
          Using Charts in Sales Conversations
        </h3>
        <p className="text-sm text-gray-600 mb-3">
          Data visualizations can significantly enhance your sales conversations by establishing credibility and providing valuable context. Here are some tips for using these charts effectively:
        </p>
        <ul className="list-disc list-inside text-sm text-gray-600 space-y-1 ml-2">
          <li>Select charts relevant to your client's industry, pain points, or strategic initiatives</li>
          <li>Use visualizations to highlight market trends that create urgency for your solution</li>
          <li>Combine charts with MEDDPICC qualification to strengthen specific components</li>
          <li>Include 1-2 relevant charts in follow-up emails to improve engagement</li>
          <li>Use charts to frame business challenges in a way that positions your solution as the answer</li>
        </ul>
      </div>

      <style jsx>{`
        @keyframes fadeDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeDown {
          animation: fadeDown 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default ChartLibrary;