import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { SavedVisualization, useSavedVisualizations } from '../../hooks/useSavedVisualizations';
import { History, FileBarChart, Calendar, ChevronRight, Tag, ExternalLink, Maximize2, Info, ChevronDown, ChevronUp, Download, BarChart, LineChart, PieChart, BarChart2, Hexagon, Layers, Donut } from 'lucide-react';
import ChartRenderer from './ChartRenderer';

const VisualizationHistory: React.FC = () => {
  const { savedVisualizations, isLoading } = useSavedVisualizations();
  const [expandedVisualization, setExpandedVisualization] = useState<string | null>(null);

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  };

  const toggleExpand = (id: string) => {
    if (expandedVisualization === id) {
      setExpandedVisualization(null);
    } else {
      setExpandedVisualization(id);
    }
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center mb-4">
          <FileBarChart className="h-5 w-5 text-gray-700 mr-2" />
          <h2 className="text-xl font-semibold">Recent Visualizations</h2>
        </div>
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-black"></div>
        </div>
      </div>
    );
  }

  if (savedVisualizations.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center mb-4">
          <FileBarChart className="h-5 w-5 text-gray-700 mr-2" />
          <h2 className="text-xl font-semibold">Recent Visualizations</h2>
        </div>
        <div className="text-center py-8 text-gray-500">
          <p>No saved visualizations found.</p>
          <p className="mt-2 text-sm">
            Generate visualizations to enhance your sales conversations.
          </p>
          <Link 
            to="/visualization" 
            className="inline-flex items-center mt-4 text-sm text-black hover:text-gray-700 font-medium"
          >
            Create My First Visualization
            <ChevronRight className="h-4 w-4 ml-1" />
          </Link>
        </div>
      </div>
    );
  }

  // Take the most recent 3 visualizations
  const recentVisualizations = savedVisualizations.slice(0, 3);

  // Helper function to get the right icon for each chart type
  const getChartIcon = (chartType: string) => {
    switch (chartType) {
      case 'Bar':
        return <BarChart className="h-4 w-4 text-gray-500" />;
      case 'Line':
        return <LineChart className="h-4 w-4 text-gray-500" />;
      case 'Pie':
        return <PieChart className="h-4 w-4 text-gray-500" />;
      case 'Column':
        return <BarChart2 className="h-4 w-4 text-gray-500" />;
      case 'Radar':
        return <Hexagon className="h-4 w-4 text-gray-500" />;
      case 'Area':
        return <Layers className="h-4 w-4 text-gray-500" />;
      case 'Donut':
        return <Donut className="h-4 w-4 text-gray-500" />;
      default:
        return <FileBarChart className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <FileBarChart className="h-5 w-5 text-gray-700 mr-2" />
          <h2 className="text-xl font-semibold">Recent Visualizations</h2>
        </div>
        <Link
          to="/visualization"
          className="text-sm text-gray-600 hover:text-black flex items-center"
        >
          View All
          <ChevronRight className="h-4 w-4 ml-1" />
        </Link>
      </div>

      <div className="space-y-4">
        {recentVisualizations.map((vis) => (
          <div 
            key={vis.id} 
            className="border border-gray-200 rounded-md overflow-hidden hover:shadow-md transition-shadow"
          >
            <div 
              className="bg-gray-50 p-3 border-b border-gray-200 cursor-pointer"
              onClick={() => toggleExpand(vis.id)}
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  {getChartIcon(vis.visualization.chartType)}
                  <h3 className="text-md font-medium">{vis.title}</h3>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="flex items-center text-xs text-gray-500">
                    <Calendar className="h-3 w-3 mr-1" />
                    {formatDate(vis.createdAt)}
                  </div>
                  {expandedVisualization === vis.id ? 
                    <ChevronUp className="h-4 w-4 text-gray-500" /> : 
                    <ChevronDown className="h-4 w-4 text-gray-500" />
                  }
                </div>
              </div>
            </div>
            
            {expandedVisualization === vis.id ? (
              <div className="p-4 bg-white animate-fadeDown">
                <p className="text-sm text-gray-600 mb-3">{vis.visualization.insight}</p>
                
                <div className="h-56 w-full mb-4">
                  <ChartRenderer chartData={vis.visualization} />
                </div>
                
                <div className="flex flex-wrap justify-between items-center">
                  <div className="flex flex-wrap gap-1 mb-2">
                    {vis.context.industry && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                        <Tag className="h-3 w-3 mr-1" />
                        {vis.context.industry}
                      </span>
                    )}
                    {vis.context.cloudProvider && (
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                        <Tag className="h-3 w-3 mr-1" />
                        {vis.context.cloudProvider}
                      </span>
                    )}
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-purple-100 text-purple-800">
                      <FileBarChart className="h-3 w-3 mr-1" />
                      {vis.visualization.chartType}
                    </span>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Link
                      to="/visualization"
                      className="inline-flex items-center px-2 py-1 text-xs text-gray-700 bg-gray-100 rounded hover:bg-gray-200 transition-colors"
                    >
                      <Info className="h-3 w-3 mr-1" />
                      Details
                    </Link>
                    <button
                      className="inline-flex items-center px-2 py-1 text-xs text-gray-700 bg-gray-100 rounded hover:bg-gray-200 transition-colors"
                      onClick={() => {
                        alert(`Export functionality will be implemented soon!`);
                      }}
                    >
                      <Download className="h-3 w-3 mr-1" />
                      Export
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-4 bg-white">
                <p className="text-sm text-gray-600 mb-2 line-clamp-2">{vis.visualization.insight}</p>
                <button
                  onClick={() => toggleExpand(vis.id)}
                  className="text-xs text-blue-600 hover:text-blue-800 flex items-center"
                >
                  View Chart
                  <ChevronRight className="h-3 w-3 ml-1" />
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-gray-200 text-center">
        <Link
          to="/visualization"
          className="inline-flex items-center bg-black text-white px-4 py-2 rounded-md text-sm hover:bg-gray-800 transition-colors"
        >
          <History className="h-4 w-4 mr-2" />
          Create New Visualization
        </Link>
      </div>
    </div>
  );
};

export default VisualizationHistory;