import React, { useState } from 'react';
import { SavedVisualization, useSavedVisualizations } from '../../hooks/useSavedVisualizations';
import { FileBarChart, Trash2, Calendar, ArrowLeft, ArrowRight, BarChart2, Search, Download, Tag, Share } from 'lucide-react';
import ChartRenderer from './ChartRenderer';

const SavedVisualizationsList: React.FC = () => {
  const { 
    savedVisualizations, 
    isLoading, 
    deleteVisualization 
  } = useSavedVisualizations();
  
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedVisualization, setSelectedVisualization] = useState<SavedVisualization | null>(null);
  
  const PAGE_SIZE = 5;
  
  // Filter visualizations based on search term
  const filteredVisualizations = savedVisualizations.filter(
    vis => vis.title.toLowerCase().includes(search.toLowerCase()) || 
           vis.visualization.insight.toLowerCase().includes(search.toLowerCase()) ||
           (vis.context.industry && vis.context.industry.toLowerCase().includes(search.toLowerCase())) ||
           (vis.context.cloudProvider && vis.context.cloudProvider.toLowerCase().includes(search.toLowerCase())) ||
           (vis.context.topic && vis.context.topic.toLowerCase().includes(search.toLowerCase()))
  );
  
  // Calculate pagination
  const totalPages = Math.ceil(filteredVisualizations.length / PAGE_SIZE);
  const startIndex = currentPage * PAGE_SIZE;
  const paginatedVisualizations = filteredVisualizations.slice(startIndex, startIndex + PAGE_SIZE);
  
  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this visualization?')) {
      deleteVisualization(id);
      
      // If the deleted visualization was selected, deselect it
      if (selectedVisualization && selectedVisualization.id === id) {
        setSelectedVisualization(null);
      }
    }
  };
  
  // Export the selected visualization (placeholder)
  const handleExport = () => {
    alert('Export feature coming soon!');
  };
  
  // Share the selected visualization (placeholder)
  const handleShare = () => {
    if (!selectedVisualization) return;
    
    const subject = encodeURIComponent(selectedVisualization.title);
    const body = encodeURIComponent(`Here's an interesting data point for our discussion:\n\n${selectedVisualization.visualization.insight}\n\nView the full visualization in the MEDDPICC Qualification Agent.`);
    
    window.open(`mailto:?subject=${subject}&body=${body}`);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-black"></div>
      </div>
    );
  }
  
  if (savedVisualizations.length === 0) {
    return (
      <div className="text-center py-12">
        <FileBarChart className="h-12 w-12 mx-auto text-gray-300 mb-4" />
        <h3 className="text-lg font-medium text-gray-700 mb-2">No Saved Visualizations</h3>
        <p className="text-gray-500 mb-6">
          Generate and save some visualizations to see them here.
        </p>
        <button 
          onClick={() => window.location.reload()}
          className="inline-flex items-center bg-black text-white px-4 py-2 rounded-md text-sm hover:bg-gray-800 transition-colors"
        >
          <BarChart2 className="h-4 w-4 mr-2" />
          Create New Visualization
        </button>
      </div>
    );
  }
  
  return (
    <div>
      {/* Detail view */}
      {selectedVisualization ? (
        <div>
          <button 
            onClick={() => setSelectedVisualization(null)}
            className="flex items-center text-gray-600 hover:text-black mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to visualizations
          </button>
          
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <div className="bg-gray-50 p-4 border-b border-gray-200">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-1">{selectedVisualization.title}</h3>
                  <div className="flex items-center text-xs text-gray-500">
                    <Calendar className="h-3 w-3 mr-1" />
                    {formatDate(selectedVisualization.createdAt)}
                  </div>
                </div>
                
                <div className="flex gap-2 mt-4 md:mt-0">
                  <button
                    onClick={handleExport}
                    className="flex items-center text-sm bg-gray-100 text-gray-800 px-3 py-1.5 rounded-md hover:bg-gray-200 transition-colors"
                  >
                    <Download className="h-4 w-4 mr-1" />
                    Export
                  </button>
                  <button
                    onClick={handleShare}
                    className="flex items-center text-sm bg-gray-100 text-gray-800 px-3 py-1.5 rounded-md hover:bg-gray-200 transition-colors"
                  >
                    <Share className="h-4 w-4 mr-1" />
                    Share
                  </button>
                </div>
              </div>
            </div>
            
            <div className="p-4">
              <p className="text-sm text-gray-700 mb-4">{selectedVisualization.visualization.insight}</p>
              
              <div className="h-96 w-full mb-4">
                <ChartRenderer chartData={selectedVisualization.visualization} />
              </div>
              
              <div className="mt-4 border-t border-gray-100 pt-4">
                <h4 className="text-xs font-medium text-gray-700 mb-2">Context Information</h4>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {selectedVisualization.context.industry && (
                    <div>
                      <span className="font-medium">Industry:</span> {selectedVisualization.context.industry}
                    </div>
                  )}
                  {selectedVisualization.context.cloudProvider && (
                    <div>
                      <span className="font-medium">Cloud Provider:</span> {selectedVisualization.context.cloudProvider}
                    </div>
                  )}
                  {selectedVisualization.context.company && (
                    <div>
                      <span className="font-medium">Company:</span> {selectedVisualization.context.company}
                    </div>
                  )}
                  {selectedVisualization.context.topic && (
                    <div>
                      <span className="font-medium">Topic:</span> {selectedVisualization.context.topic}
                    </div>
                  )}
                </div>
                
                {selectedVisualization.context.technologies?.length > 0 && (
                  <div className="mt-2">
                    <span className="text-xs font-medium text-gray-700">Technologies:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {selectedVisualization.context.technologies.map(tech => (
                        <span key={tech} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                          <Tag className="h-3 w-3 mr-1" />
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              <div className="bg-gray-50 p-4 border border-gray-200 rounded-md mt-4">
                <div className="text-sm text-gray-600">
                  <h4 className="font-medium mb-2">How to use this in your sales conversation:</h4>
                  <p className="mb-2">
                    "I came across an interesting data point that might be relevant to your {selectedVisualization.context.industry || 'industry'} - {selectedVisualization.visualization.insight} I thought this might provide some helpful context for our discussion about how our solution could help {selectedVisualization.context.company || 'your organization'}."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">Saved Visualizations</h3>
            
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search visualizations..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9 pr-4 py-1.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all w-48 md:w-64"
              />
            </div>
          </div>
          
          <div className="space-y-4">
            {paginatedVisualizations.map(visualization => (
              <div 
                key={visualization.id}
                onClick={() => setSelectedVisualization(visualization)}
                className="border border-gray-200 rounded-md p-4 hover:border-gray-300 hover:bg-gray-50 transition-colors cursor-pointer"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-md font-medium text-gray-900">{visualization.title}</h4>
                    <p className="text-sm text-gray-500 line-clamp-2 mt-1">{visualization.visualization.insight}</p>
                    
                    <div className="flex flex-wrap mt-2 gap-2">
                      {visualization.context.industry && (
                        <span className="text-xs bg-gray-100 px-2 py-0.5 rounded-md">
                          {visualization.context.industry}
                        </span>
                      )}
                      {visualization.context.cloudProvider && (
                        <span className="text-xs bg-gray-100 px-2 py-0.5 rounded-md">
                          {visualization.context.cloudProvider}
                        </span>
                      )}
                      <span className="text-xs bg-gray-100 px-2 py-0.5 rounded-md">
                        {visualization.visualization.chartType} Chart
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-end">
                    <button
                      onClick={(e) => handleDelete(visualization.id, e)}
                      className="text-gray-400 hover:text-red-500"
                      aria-label="Delete visualization"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                    
                    <div className="text-xs text-gray-500 mt-auto">
                      <div className="flex items-center mt-2">
                        <Calendar className="h-3 w-3 mr-1" />
                        {formatDate(visualization.createdAt).split(' ')[0]}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Pagination controls */}
          {totalPages > 1 && (
            <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-200">
              <button
                onClick={() => setCurrentPage(prev => Math.max(0, prev - 1))}
                disabled={currentPage === 0}
                className={`flex items-center text-sm ${currentPage === 0 ? 'text-gray-400 cursor-not-allowed' : 'text-gray-600 hover:text-black'}`}
              >
                <ArrowLeft className="h-4 w-4 mr-1" />
                Previous
              </button>
              
              <span className="text-sm text-gray-600">
                {currentPage + 1} of {totalPages}
              </span>
              
              <button
                onClick={() => setCurrentPage(prev => Math.min(totalPages - 1, prev + 1))}
                disabled={currentPage === totalPages - 1}
                className={`flex items-center text-sm ${currentPage === totalPages - 1 ? 'text-gray-400 cursor-not-allowed' : 'text-gray-600 hover:text-black'}`}
              >
                Next
                <ArrowRight className="h-4 w-4 ml-1" />
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default SavedVisualizationsList;